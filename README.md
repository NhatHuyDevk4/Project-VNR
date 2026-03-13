# Hương Vị Bao Cấp

Website về ẩm thực thời kỳ bao cấp Việt Nam (1976–1986) — ký ức, văn hoá và lịch sử. Các món như bo bo, cơm độn khoai, cháo cám, bánh bột mì hấp in đậm trong tâm trí những ai đã sống qua giai đoạn đó.

## 🎮 Tính năng

- **Trang chủ**: Giới thiệu chủ đề Hương Vị Bao Cấp, hành trình ẩm thực (7 món / cột mốc)
- **Game**: Trả lời câu hỏi về ẩm thực thời bao cấp để thu thập mảnh ghép và hoàn thành bức tranh
  - Màn 1: Trắc nghiệm (9 mảnh ghép)
  - Màn 2: Điền từ (9 mảnh ghép)
  - Màn 3: Ghép hình (18 mảnh)
- **Món ăn / Tài liệu**: Chi tiết từng món (bo bo, cơm độn khoai, cháo cám, bánh bột mì hấp, tem phiếu, v.v.)
- **Về thời bao cấp**: Nội dung bối cảnh, ý nghĩa ẩm thực, nguyên tắc nấu ăn
- **Hỏi đáp (Used AI)**: Công cụ AI và nguồn tham khảo

## 🚀 Cài đặt

```bash
npm install
npm run dev
```

Truy cập: `http://localhost:3000`

## 📁 Cấu trúc dự án

- `app/` — Routes và layout
- `features/` — Home, game, tai-lieu (món ăn), contents, principle, used-ai, content1–7
- `common/` — Constants, types (posts, routes)
- `actions/` — Chat (hỏi đáp) server actions
- `public/` — Hình ảnh, audio

## 📝 Chủ đề

Ẩm thực thời bao cấp (tem phiếu): bo bo, cơm độn khoai, cháo cám, bánh bột mì hấp — đơn giản, no lòng và đầy hoài niệm. Dự án lưu lại và chia sẻ những câu chuyện ẩm thực này, kết nối lịch sử với thế hệ trẻ.

## 📄 License

MIT
