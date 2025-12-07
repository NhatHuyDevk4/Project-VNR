export interface PrinciplePoint {
  label: string;
  content: string;
}

export interface Principle {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  points: PrinciplePoint[];
}

export const PRINCIPLES_DATA: Principle[] = [
  {
    number: "01",
    title: "Nguyên tắc Tập trung dân chủ",
    subtitle: "Nền tảng của sự thống nhất",
    description:
      "Tập trung dân chủ là nguyên tắc tổ chức cơ bản, được Hồ Chí Minh xác định là điều kiện tiên quyết để tổ chức Đảng trong sạch, vững mạnh.",
    points: [
      {
        label: "Tập trung trên cơ sở dân chủ",
        content:
          "Phải phát huy tinh thần trách nhiệm và tính tích cực của mọi đảng viên, tạo điều kiện để tất cả mọi đảng viên đều có ý kiến ở trong Đảng.",
      },
      {
        label: "Dân chủ đi đến tập trung",
        content:
          "Sau khi đã thảo luận và bày tỏ ý kiến, khi đi đến tập trung thì mọi người phải chấp hành thống nhất, hành động đồng nhất.",
      },
      {
        label: "Về lãnh đạo",
        content:
          "Trong hoạt động, Đảng phải tuân thủ nguyên tắc tập thể lãnh đạo, cá nhân phụ trách.",
      },
      {
        label: "Hai điều cần tránh",
        content:
          "(1) Độc đoán, chuyên quyền, coi thường tập thể; (2) Dựa dẫm, buông xuôi, không dám quyết đoán.",
      },
    ],
  },
  {
    number: "02",
    title: "Nguyên tắc Tự phê bình và Phê bình",
    subtitle: '"Thang thuốc tốt nhất"',
    description:
      "Hồ Chí Minh coi tự phê bình và phê bình là nguyên tắc sinh hoạt nhằm tự làm trong sạch Đảng, đồng thời là phương pháp để củng cố đoàn kết và thống nhất nội bộ.",
    points: [
      {
        label: "Vai trò củng cố đoàn kết",
        content:
          'Người khẳng định tự phê bình và phê bình là "thang thuốc tốt nhất" để củng cố đoàn kết và thống nhất trong Đảng.',
      },
      {
        label: "Tính thường xuyên",
        content:
          'Tự phê bình được xem là việc làm thường xuyên, ví như "như rửa mặt mỗi ngày phải rửa mặt".',
      },
      {
        label: "Mục đích xây dựng",
        content:
          "Phê bình phải giúp cho mọi người như nở hoa mùa xuân và xua cái xấu đi.",
      },
      {
        label: "Yêu cầu về tinh thần",
        content:
          'Việc phê bình phải trung thực, kiên quyết, đúng người, đúng việc và phải có văn hóa. Đặc biệt, cần giữ "tình đồng chí thương yêu lẫn nhau".',
      },
    ],
  },
  {
    number: "03",
    title: "Nguyên tắc Kỷ luật nghiêm minh, tự giác",
    subtitle: "Sức mạnh đồng nhất",
    description:
      "Kỷ luật nghiêm minh và tự giác là yếu tố tạo nên sức mạnh đồng nhất, phân biệt Đảng Cộng sản với các tổ chức quần chúng khác.",
    points: [
      {
        label: "Tính nghiêm khắc và tự giác",
        content:
          'Đảng tổ chức nghiêm khắc. Kỷ luật của Đảng đòi hỏi sự tuân thủ tuyệt đối từ trên xuống dưới, nhưng đó phải là kỷ luật tự giác, tức là "lòng tự giác của đảng viên về nhiệm vụ của họ đối với Đảng".',
      },
      {
        label: "Nguồn gốc sức mạnh",
        content:
          'Sức mạnh của một đảng cộng sản bắt nguồn từ kỷ luật. Khi đảng viên có ý chí và hành động đồng nhất, "muốn đồng người như một", thì Đảng mới có sức mạnh.',
      },
      {
        label: "Kết quả",
        content:
          "Kỷ luật tự giác giúp Đảng trở nên mới mẻ và bền bỉ, thực sự tạo sức mạnh cho Đảng.",
      },
    ],
  },
];
