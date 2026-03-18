export const CONTENT_ROUTES = [
  {
    name: "Bo bo — Món ăn từ ngô thời tem phiếu",
    path: "/contents/bo-bo",
    number: "01",
  },
  {
    name: "Cơm độn khoai — No lòng thời bao cấp",
    path: "/contents/com-don-khoai",
    number: "02",
  },
  {
    name: "Đậu phụ tẩm hành — Món đạm bạc mà ấm bụng",
    path: "/contents/dau-phu-tam-hanh",
    number: "03",
  },
  {
    name: "Rau muống & Nước sấu — Vị mát của mùa hè Hà Nội",
    path: "/contents/rau-muong-nuoc-sau",
    number: "04",
  },
  {
    name: "Dưa cải / Cà pháo — Vị chua giòn của mâm cơm",
    path: "/contents/dua-cai-ca-phao",
    number: "05",
  },
  {
    name: "Cá rô ron chiên giòn — Món mặn từ ao đồng",
    path: "/contents/ca-ro-ron-chien-gion",
    number: "06",
  },
  {
    name: "Hạt mít luộc — Quà vặt từ trái chín mùa hè",
    path: "/contents/hat-mit-luoc",
    number: "07",
  },
  {
    name: "Mắm kho quẹt + Cơm cháy — Đậm vị từ phần còn lại",
    path: "/contents/mam-kho-quet-com-chay",
    number: "08",
  },
  {
    name: "Củ sắn xào — Món no bụng từ vườn nhà",
    path: "/contents/cu-san-xao",
    number: "09",
  },
  {
    name: "Muối đậu phộng — Chén muối mộc mạc bên nồi cơm",
    path: "/contents/muoi-dau-phong",
    number: "10",
  },
] as const;

export type ContentRoute = (typeof CONTENT_ROUTES)[number];
