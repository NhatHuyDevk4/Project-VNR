# Bài Thuyết Trình: Tư Tưởng Hồ Chí Minh Về Nhà Nước

## ✅ Đã hoàn thành

### 1. Cấu trúc file
```
hcm-202-fe/
├── app/
│   └── nha-nuoc/
│       ├── page.tsx          # Trang chính với MainLayout
│       └── SETUP.md          # File này
├── components/
│   ├── layouts/
│   │   ├── MainLayout.tsx    # Layout với background & navigation
│   │   └── NavigateButton.tsx # Đã thêm route "Nhà Nước"
│   ├── ui/                   # Shadcn components
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   ├── accordion.tsx
│   │   └── button.tsx
│   └── NhaNuocPresentation.tsx # Component thuyết trình chính
└── data/
    └── nha-nuoc-content.json # Nội dung JSON

```

### 2. Design System
- ✅ Sử dụng MainLayout giống trang home
- ✅ Background image với overlay
- ✅ Glassmorphism effect (backdrop-blur, white/10)
- ✅ Amber color scheme (amber-600, amber-700, amber-800)
- ✅ Navigation sidebar với GSAP animations
- ✅ Music player component

### 3. Components đã cài đặt
- Card (shadcn/ui)
- Tabs (shadcn/ui)
- Accordion (shadcn/ui)
- Button (shadcn/ui)

### 4. Tính năng

#### Navigation
- **Sidebar**: Icon "Landmark" cho route "/nha-nuoc"
- **Tabs**: 4 phần chính, click để chuyển
- **Buttons**: Phần trước/Phần tiếp theo với progress indicator

#### Content Types
1. **Intro**: Đoạn giới thiệu với background glass
2. **Quote**: Trích dẫn Hồ Chí Minh với border amber
3. **Points**: Accordion expandable với 3 điểm chính
4. **Subsection**: Card nhỏ cho phần con
5. **Principles**: Nguyên tắc với quotes và key points

#### Styling
- Background: `bg-white/10 backdrop-blur-md`
- Border: `border border-white/20`
- Text: `text-white`, `text-white/90`, `text-white/80`
- Accent: `text-amber-400`, `text-amber-200`
- Hover: `hover:bg-white/5`
- Active: `bg-amber-600/60`

## 🚀 Cách sử dụng

### Chạy development server
```bash
cd hcm-202-fe
npm run dev
```

### Truy cập
```
http://localhost:3000/nha-nuoc
```

### Navigation
1. Click icon "Landmark" (🏛️) trên sidebar bên phải
2. Hoặc truy cập trực tiếp URL `/nha-nuoc`

## 📝 Cấu trúc nội dung JSON

```json
{
  "title": "Tiêu đề chính",
  "sections": [
    {
      "id": "unique-id",
      "title": "1. Tiêu đề phần",
      "subtitle": "Mô tả ngắn",
      "content": [
        {
          "type": "intro|quote|points|subsection|principles",
          // ... data theo type
        }
      ]
    }
  ]
}
```

## 🎨 Color Palette

| Element | Class | Color |
|---------|-------|-------|
| Background | `bg-white/10` | White 10% opacity |
| Border | `border-white/20` | White 20% opacity |
| Text Primary | `text-white` | White 100% |
| Text Secondary | `text-white/80` | White 80% |
| Accent | `text-amber-400` | Amber 400 |
| Button Active | `bg-amber-600/60` | Amber 600 60% |
| Button Hover | `bg-amber-700/50` | Amber 700 50% |
| Quote Border | `border-amber-500` | Amber 500 |

## 📱 Responsive

- **Desktop**: Full layout với tabs và navigation
- **Mobile**: 
  - Tabs responsive (ẩn subtitle trên màn hình nhỏ)
  - Content stack vertically
  - Buttons full width

## 🔧 Tùy chỉnh

### Thay đổi nội dung
Edit file: `data/nha-nuoc-content.json`

### Thay đổi màu sắc
Edit các class trong: `components/NhaNuocPresentation.tsx`

### Thêm animation
Sử dụng GSAP như trong `NavigateButton.tsx`

## 📚 4 Phần nội dung

1. **Bản chất giai cấp của nhà nước**
   - Đảng Cộng sản cầm quyền
   - Định hướng xã hội chủ nghĩa
   - Nguyên tắc tập trung dân chủ

2. **Bản chất giai cấp thống nhất với tính nhân dân và dân tộc**
   - Kết quả đấu tranh toàn dân tộc
   - Mục tiêu vì quyền lợi nhân dân
   - Nhiệm vụ toàn dân tộc

3. **Nhà nước của nhân dân - "Dân là chủ"**
   - Dân chủ trực tiếp
   - Dân chủ gián tiếp

4. **Nguyên tắc dân chủ gián tiếp**
   - Quyền lực "thừa ủy quyền"
   - Quyền kiểm soát của nhân dân
   - Luật pháp dân chủ

## ✨ Highlights

- Glassmorphism design matching homepage
- Interactive accordion for better UX
- Beautiful quote styling with icons
- Smooth transitions and hover effects
- Progress tracking
- Mobile responsive
- Easy to update content via JSON
