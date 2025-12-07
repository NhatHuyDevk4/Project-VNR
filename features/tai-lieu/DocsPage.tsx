"use client";

import Link from "next/link";
import { posts } from "@/app/tai-lieu/[slug]/page";

const TaiLieuPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
        >
          <span>←</span> Quay lại
        </Link>

        <h1 className="text-5xl font-bold text-white mb-6">
          Tư tưởng Hồ Chí Minh
        </h1>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Giới thiệu</h2>
          <p className="text-white/90 text-lg leading-relaxed mb-4">
            Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc về
            những vấn đề cơ bản của cách mạng Việt Nam, là kết quả của sự vận
            dụng sáng tạo chủ nghĩa Mác - Lênin vào điều kiện cụ thể của Việt
            Nam, kế thừa và phát triển các giá trị truyền thống tốt đẹp của dân
            tộc, tiếp thu tinh hoa văn hóa nhân loại.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Các cột mốc quan trọng
          </h2>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/tai-lieu/${post.slug}`}
              className="block bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-16 h-16 bg-amber-600/20 backdrop-blur-sm border border-amber-600/30 rounded-lg flex items-center justify-center">
                  <span className="text-amber-200 font-bold text-sm">
                    {post.milestone}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-200 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {post.shortDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaiLieuPage;
