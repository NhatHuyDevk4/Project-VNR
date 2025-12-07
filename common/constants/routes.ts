export const CONTENT_ROUTES = [
  {
    name: "Content 1",
    path: "/contents/content-1",
    number: "01",
  },
  {
    name: "Đảng phải trong sạch, vững mạnh",
    path: "/contents/dang-phai-trong-sach-vung-manh",
    number: "02",
  },
  {
    name: "Content 3",
    path: "/contents/content-3",
    number: "03",
  },
  {
    name: "Bản chất giai cấp công nhân của Nhà nước và nguyên lý Nhà nước của nhân dân",
    path: "/contents/Ban-chat-nha-nuoc",
    number: "04",
  },
] as const;

export type ContentRoute = (typeof CONTENT_ROUTES)[number];
