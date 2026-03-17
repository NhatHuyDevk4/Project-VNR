export const CONTENT_ROUTES = [
  {
    name: "Bo bo — Món ăn từ ngô thời tem phiếu",
    path: "/contents/tinh-tat-yeu-va-vai-tro-lanh-dao",
    number: "01",
  },
  {
    name: "Cơm độn khoai — No lòng thời bao cấp",
    path: "/contents/dang-phai-trong-sach-vung-manh",
    number: "02",
  },
  {
    name: "Cháo cám — Ký ức một thời kham khổ",
    path: "/contents/nguyen-tac-to-chuc-cua-dang",
    number: "03",
  },
  {
    name: "Bánh bột mì hấp — Quà vặt thời bao cấp",
    path: "/contents/Ban-chat-nha-nuoc",
    number: "04",
  },
  {
    name: "Tem phiếu và định lượng",
    path: "/contents/Nha-nuoc-do-nhan-dan-va-nha-nuoc-vi-nhan-dan",
    number: "05",
  },
  {
    name: "Các món ăn đơn giản — No lòng và hoài niệm",
    path: "/contents/Xay-dung-Nha-nuoc-phap-quyen",
    number: "06",
  },
  {
    name: "Bối cảnh và ý nghĩa ẩm thực thời bao cấp",
    path: "/contents/Nha-nuoc-trong-sach-vung-manh",
    number: "07",
  },
] as const;

export type ContentRoute = (typeof CONTENT_ROUTES)[number];
