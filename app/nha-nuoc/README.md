# Bài Thuyết Trình: Tư Tưởng Hồ Chí Minh Về Nhà Nước

## Mô tả
Component thuyết trình tương tác về tư tưởng Hồ Chí Minh về nhà nước của nhân dân, do nhân dân, vì nhân dân.

## Cách sử dụng

### 1. Chạy ứng dụng
```bash
npm run dev
```

### 2. Truy cập
Mở trình duyệt và truy cập: `http://localhost:3000/nha-nuoc`

## Tính năng

### 1. **Navigation Tabs**
- 4 phần chính được hiển thị dưới dạng tabs
- Click vào tab để chuyển đến phần tương ứng

### 2. **Accordion cho nội dung chi tiết**
- Mỗi điểm chính có thể mở rộng/thu gọn
- Giúp tập trung vào từng phần một

### 3. **Trích dẫn nổi bật**
- Các câu nói của Hồ Chí Minh được highlight đặc biệt
- Icon Quote để dễ nhận biết

### 4. **Navigation Buttons**
- Nút "Phần trước" và "Phần tiếp theo"
- Hiển thị tiến độ (Phần X / 4)

## Cấu trúc nội dung

### Phần 1: Bản chất giai cấp của nhà nước
- Đảng Cộng sản Việt Nam giữ vị trí cầm quyền
- Tính định hướng xã hội chủ nghĩa
- Nguyên tắc tập trung dân chủ

### Phần 2: Bản chất giai cấp thống nhất với tính nhân dân và dân tộc
- Nhà nước là kết quả đấu tranh của toàn dân tộc
- Mục tiêu vì quyền lợi nhân dân và dân tộc
- Đảm đương nhiệm vụ toàn dân tộc giao phó

### Phần 3: Nhà nước của nhân dân - "Dân là chủ"
- Dân chủ trực tiếp
- Dân chủ gián tiếp (Dân chủ đại diện)

### Phần 4: Nguyên tắc dân chủ gián tiếp
- Quyền lực nhà nước là "thừa ủy quyền" của nhân dân
- Nhân dân có quyền kiểm soát và phê bình nhà nước
- Luật pháp dân chủ là công cụ quyền lực của nhân dân

## Tùy chỉnh nội dung

Để thay đổi nội dung, chỉnh sửa file: `data/nha-nuoc-content.json`

### Cấu trúc JSON:
```json
{
  "title": "Tiêu đề chính",
  "sections": [
    {
      "id": "id-unique",
      "title": "Tiêu đề phần",
      "subtitle": "Phụ đề",
      "content": [
        {
          "type": "intro|quote|points|subsection|principles",
          ...
        }
      ]
    }
  ]
}
```

### Các loại content type:
- **intro**: Đoạn giới thiệu
- **quote**: Trích dẫn
- **points**: Danh sách điểm với accordion
- **subsection**: Phần con trong card
- **principles**: Nguyên tắc với quotes và key points

## Components sử dụng

- **shadcn/ui Card**: Hiển thị nội dung trong các card
- **shadcn/ui Tabs**: Navigation giữa các phần
- **shadcn/ui Accordion**: Mở rộng/thu gọn nội dung
- **shadcn/ui Button**: Nút điều hướng
- **lucide-react Icons**: Icons (Quote, ChevronLeft, ChevronRight)

## Responsive Design

- Desktop: Hiển thị đầy đủ thông tin
- Mobile: Tabs được tối ưu, ẩn một số text phụ
