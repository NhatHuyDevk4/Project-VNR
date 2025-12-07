import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * POST /api/game/submit-score
 * Submit game score to leaderboard
 */
export async function POST(req: Request) {
  try {
    const { deviceId, name, correctAnswers, wrongAnswers, duration } =
      await req.json();

    // Validation
    if (
      !deviceId ||
      !name ||
      typeof correctAnswers !== "number" ||
      typeof wrongAnswers !== "number" ||
      typeof duration !== "number"
    ) {
      return NextResponse.json(
        { error: "Thiếu thông tin hoặc dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    if (name.trim().length < 2 || name.trim().length > 20) {
      return NextResponse.json(
        { error: "Tên phải từ 2-20 ký tự" },
        { status: 400 }
      );
    }

    if (correctAnswers < 0 || wrongAnswers < 0 || duration < 0) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    // Call Supabase RPC function
    const { data, error } = await supabase.rpc("upsert_leaderboard_entry", {
      p_device_id: deviceId,
      p_name: name.trim(),
      p_correct: correctAnswers,
      p_wrong: wrongAnswers,
      p_duration: duration,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Không thể lưu điểm" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data[0],
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}

/**
 * GET /api/game/leaderboard?limit=100
 * Get top players from leaderboard
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");

    if (limit < 1 || limit > 1000) {
      return NextResponse.json(
        { error: "Limit phải từ 1-1000" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .order("score", { ascending: false })
      .order("duration", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Không thể tải bảng xếp hạng" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
