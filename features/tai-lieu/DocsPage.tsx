"use client";

import Link from "next/link";
import { getAllPosts } from "@/features/tai-lieu/data";
import { Calendar } from "lucide-react";

const TaiLieuPage = () => {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 sm:mb-8 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Quay lại</span>
        </Link>

        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
            Tư tưởng Hồ Chí Minh
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 mb-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
            Giới thiệu
          </h2>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed">
            Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc về
            những vấn đề cơ bản của cách mạng Việt Nam, là kết quả của sự vận
            dụng sáng tạo chủ nghĩa Mác - Lênin vào điều kiện cụ thể của Việt
            Nam, kế thừa và phát triển các giá trị truyền thống tốt đẹp của dân
            tộc, tiếp thu tinh hoa văn hóa nhân loại.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-amber-500 rounded-full"></div>
            <span>Các cột mốc quan trọng</span>
          </h2>
          {posts.map((post, index) => (
            <Link
              key={post.id}
              href={`/tai-lieu/${post.slug}`}
              className="block bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 hover:border-amber-500/50 transition-all duration-300 group shadow-md hover:shadow-xl"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-20 sm:w-24 min-w-[80px] sm:min-w-[96px] bg-gradient-to-br from-amber-600/30 to-amber-700/30 backdrop-blur-sm border-2 border-amber-500/40 rounded-xl sm:rounded-2xl flex items-center justify-center py-3 sm:py-4 shadow-lg group-hover:border-amber-400/60 group-hover:from-amber-600/40 group-hover:to-amber-700/40 transition-all">
                    <div className="flex flex-col items-center gap-1">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 mb-1" />
                      <span className="text-amber-200 font-bold text-xs sm:text-sm whitespace-nowrap leading-tight">
                        {post.milestone}
                      </span>
                    </div>
                  </div>
                  {index < posts.length - 1 && (
                    <div className="w-0.5 h-6 sm:h-8 bg-gradient-to-b from-amber-500/50 to-transparent mt-2"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-amber-200 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed line-clamp-2">
                    {post.shortDescription}
                  </p>
                  <div className="mt-3 sm:mt-4 flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Đọc thêm</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
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
