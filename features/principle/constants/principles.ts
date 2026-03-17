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
    title: "Đơn giản, no lòng",
    subtitle: "Tinh thần bữa ăn thời tem phiếu",
    description:
      "Ẩm thực thời bao cấp không cầu kỳ — bo bo, cơm độn khoai, cháo cám — đều hướng đến mục tiêu no bụng, giữ sức cho cả gia đình trong điều kiện khan hiếm.",
    points: [
      {
        label: "Nguyên liệu tại chỗ",
        content:
          "Gạo, ngô, khoai, sắn — những thứ có thể trồng hoặc phân phối theo tem phiếu — được tận dụng tối đa. Không lãng phí, không đòi hỏi xa xỉ.",
      },
      {
        label: "Cách nấu dân dã",
        content:
          "Nấu một nồi cơm độn, một nồi bo bo, hay một nồi cháo cám đều đơn giản: vo, cho nước, đun. Bữa ăn no là ưu tiên hàng đầu.",
      },
      {
        label: "Chia sẻ trong gia đình",
        content:
          "Mỗi suất định lượng ít ỏi được chia đều. Các bà các mẹ thường nhường phần cho con cháu, ông bà — tình thương gắn với từng bữa ăn.",
      },
    ],
  },
  {
    number: "02",
    title: "Tem phiếu và sự thích nghi",
    subtitle: '"Sống qua thời đó"',
    description:
      "Thời bao cấp (1976–1986), gạo, thịt, đường, vải vóc đều cấp theo tem phiếu. Gia đình nào cũng phải thích nghi: độn thêm bo bo, khoai, sắn, đôi khi cả cháo cám.",
    points: [
      {
        label: "Định lượng không đủ",
        content:
          "Định lượng gạo mỗi tháng không đủ cho cả nhà. Mua thêm khoai lang, khoai sọ — rẻ và no — để nấu chung với gạo thành cơm độn khoai.",
      },
      {
        label: "Bo bo thay cơm",
        content:
          "Khi gạo khan hiếm, bo bo (hạt ngô xay vỡ) trở thành \"cứu tinh\". Nấu bo bo thay cơm hoặc trộn bo bo với gạo để có nồi cơm no hơn.",
      },
      {
        label: "Cháo cám — cùng đường",
        content:
          "Khi thiếu gạo đến mức không đủ nấu cơm, cháo cám là món \"cùng đường\". Cám vốn cho heo ăn, nhưng nhiều nhà phải dùng để chống đói.",
      },
    ],
  },
  {
    number: "03",
    title: "Ký ức ẩm thực",
    subtitle: "Văn hóa và hoài niệm",
    description:
      "Ẩm thực thời ấy không chỉ là chuyện no đói — mà còn là ký ức, văn hóa và sự thích nghi của cả một thế hệ. Các món đơn giản in đậm trong tâm trí những ai đã sống qua giai đoạn đó.",
    points: [
      {
        label: "Món in đậm ký ức",
        content:
          "Cơm độn khoai, bo bo, cháo cám, bánh bột mì hấp — món nào cũng gắn với một giai đoạn, một câu chuyện gia đình, một ký ức không quên.",
      },
      {
        label: "Kết nối thế hệ",
        content:
          "Dự án Hương Vị Bao Cấp mong muốn lưu lại và chia sẻ những câu chuyện ẩm thực này, kết nối lịch sử với thế hệ trẻ qua website và trải nghiệm thực tế.",
      },
      {
        label: "Ý nghĩa văn hóa",
        content:
          "Bữa ăn đơn giản ấy thể hiện sự kiên cường, tình thương và sức sống của người Việt trong giai đoạn khó khăn — đáng được ghi nhận và truyền lại.",
      },
    ],
  },
];
