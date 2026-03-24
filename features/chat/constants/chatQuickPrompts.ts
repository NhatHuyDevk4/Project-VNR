/** Câu hỏi / tình huống đầy đủ — chạm là điền sẵn vào ô chat */
export interface QuickScenario {
  id: string;
  label: string;
  prompt: string;
}

export const QUICK_SCENARIOS: QuickScenario[] = [
  {
    id: "mon-bao-cap",
    label: "Món Bao cấp",
    prompt:
      "Kể các món ăn đặc trưng thời Bao cấp (1976–1986) và vì sao chúng phổ biến.",
  },
  {
    id: "tem-phieu",
    label: "Tem phiếu",
    prompt:
      "Giải thích cách tem phiếu thực phẩm hoạt động thời Bao cấp và ảnh hưởng tới bữa ăn.",
  },
  {
    id: "bo-bo-vs-gao",
    label: "Bo bo vs gạo",
    prompt: "So sánh bo bo (cao lương) với gạo trắng trong bữa ăn thời Bao cấp.",
  },
  {
    id: "bua-com",
    label: "Bữa cơm xưa",
    prompt:
      "Mô tả một bữa cơm điển hình của gia đình Việt Nam thời Bao cấp.",
  },
  {
    id: "com-don",
    label: "Cơm độn",
    prompt:
      "Cơm độn khoai, sắn thời Bao cấp được nấu và ăn như thế nào?",
  },
  {
    id: "chao-cam",
    label: "Cháo cám",
    prompt:
      "Cháo cám là gì, thường dùng khi nào và có ý nghĩa gì trong đời sống thời đó?",
  },
  {
    id: "mon-ngon",
    label: "Món “xa xỉ”",
    prompt:
      "Những món ăn được coi là “hiếm” hoặc “ngon” hơn trong thời kỳ thiếu thốn?",
  },
  {
    id: "van-hoa",
    label: "Văn hóa bàn ăn",
    prompt:
      "Nét văn hóa quanh bàn ăn gia đình Việt Nam thời Bao cấp.",
  },
];

/** Gợi ý món + hành động (đã ghép sẵn, cuộn ngang) */
export interface QuickActionChip {
  id: string;
  label: string;
  prompt: string;
}

export const QUICK_ACTION_CHIPS: QuickActionChip[] = [
  {
    id: "nau-chao-cam",
    label: "🍲 Cháo cám",
    prompt:
      "Cách nấu cháo cám thời Bao cấp: nguyên liệu, các bước và bối cảnh lịch sử.",
  },
  {
    id: "nl-bobo",
    label: "🥬 Bo bo",
    prompt: "Nguyên liệu và cách chế biến bo bo (cao lương) trong bữa ăn thời Bao cấp.",
  },
  {
    id: "ke-com-don",
    label: "📖 Cơm độn",
    prompt: "Kể về cơm độn khoai sắn: cảm giác ăn, cách nấu và ký ức thời Bao cấp.",
  },
  {
    id: "ss-gao-bobo",
    label: "⚖️ Gạo & bo bo",
    prompt: "So sánh gạo trắng và bo bo về dinh dưỡng, hương vị và vai trò thời Bao cấp.",
  },
  {
    id: "nau-banh-bot-mi",
    label: "🍲 Bánh bột mì",
    prompt: "Cách làm bánh bột mì hấp đơn giản theo kiểu nhà nghèo thời Bao cấp.",
  },
  {
    id: "nl-tem-phieu",
    label: "🥬 Tem phiếu",
    prompt: "Nguyên liệu và món ăn thường đổi được bằng tem phiếu thực phẩm.",
  },
  {
    id: "ke-mam-toi",
    label: "📖 Mắm tôm",
    prompt: "Kể về mắm tôm, nước mắm trong bữa ăn dân dã thời thiếu thốn.",
  },
  {
    id: "ss-chao-com",
    label: "⚖️ Cháo & cơm",
    prompt: "So sánh bữa cháo loãng với bữa cơm độn trong sinh hoạt hàng ngày.",
  },
  {
    id: "nau-rau-muong",
    label: "🍲 Rau muống",
    prompt: "Cách nấu rau muống xào tỏi / luộc khi ít dầu mỡ thời Bao cấp.",
  },
  {
    id: "ke-trung-thit",
    label: "📖 Trứng thịt",
    prompt: "Kể về món trứng đúc thịt hoặc món có trứng, thịt hiếm thời Bao cấp.",
  },
];
