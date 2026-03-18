export interface FoodArticlePoint {
  id: number;
  title: string;
  content: string;
  highlights?: string[];
  keyPoints?: string[];
}

export interface FoodArticleVirtues {
  title: string;
  content: string;
  virtues: {
    title: string;
    items: string[];
  };
  qualities: string[];
  quote: string;
}

export interface FoodArticleCharacter {
  id: number;
  title: string;
  content: string;
}

export interface FoodArticleData {
  title: string;
  subtitle: string;
  introduction: {
    context: string;
    quote: string;
    description: string;
    author: string;
  };
  moralityPoints: [FoodArticlePoint, FoodArticlePoint, FoodArticleVirtues];
  civilizedParty: {
    title: string;
    description: string;
    characteristics: FoodArticleCharacter[];
  };
  warning: {
    title: string;
    quote: string;
    author: string;
    message: string;
  };
  conclusion: {
    text: string;
  };
  sidebarNotes?: {
    title: string;
    text: string;
  }[];
}

export type FoodArticleSlug =
  | "dau-phu-tam-hanh"
  | "rau-muong-nuoc-sau"
  | "dua-cai-ca-phao"
  | "ca-ro-ron-chien-gion"
  | "hat-mit-luoc"
  | "mam-kho-quet-com-chay"
  | "cu-san-xao"
  | "muoi-dau-phong";

export const FOOD_ARTICLES: Record<FoodArticleSlug, FoodArticleData> = {
  "dau-phu-tam-hanh": {
    title: "Đậu phụ tẩm hành — Món đạm bạc mà ấm bụng",
    subtitle: "Mâm cơm ít đạm nhưng vẫn có mùi nhà",
    introduction: {
      context: "Bếp nhà / Bữa cơm tiết kiệm",
      quote: "Một miếng đậu rán vàng, thêm chút hành phi, đã đủ làm bữa cơm có cảm giác ấm và đủ đầy hơn.",
      description:
        "Đậu phụ tẩm hành là món thay đạm rất quen của những gia đình phải chắt chiu từng bữa. Vừa rẻ, vừa dễ chia, món ăn này giúp mâm cơm giản dị vẫn có điểm nhấn thơm và béo.",
      author: "Ký ức bếp nhà",
    },
    moralityPoints: [
      {
        id: 1,
        title: "Đậu phụ trong bữa cơm",
        content:
          "Một bìa đậu có thể cắt ra nhiều miếng, đủ cho cả nhà. Khi thịt cá khan hiếm, đậu phụ là nguồn đạm rẻ và dễ mua, nên xuất hiện rất thường trong bữa ăn gia đình.",
        highlights: ["Rẻ", "Dễ chia", "Dễ nấu"],
      },
      {
        id: 2,
        title: "Hành phi làm dậy mùi",
        content:
          "Chỉ cần chút hành phi nóng rưới lên đậu là món ăn đã khác hẳn. Mùi thơm ấy làm gian bếp ấm hơn và khiến món ăn nhỏ trở nên đáng nhớ.",
        keyPoints: ["Mùi thơm gắn với bếp nhà", "Đơn sơ nhưng đủ vị", "Ăn cùng rau hoặc canh đều hợp"],
      },
      {
        title: "Bữa ăn vì no lòng",
        content:
          "Món ăn không cầu kỳ nhưng giúp bữa cơm có cảm giác no mà vẫn giữ được sự tiết kiệm, đúng với nếp ăn chắt chiu của thời khó khăn.",
        virtues: {
          title: "Nguyên liệu chính",
          items: ["Đậu phụ", "Hành lá", "Dầu/mỡ", "Muối"],
        },
        qualities: ["Tiết kiệm", "Chia đều", "Giữ ấm bữa cơm"],
        quote: "Một món nhỏ cũng có thể làm bữa cơm trọn vị.",
      },
    ],
    civilizedParty: {
      title: "Ẩm thực bếp nhà",
      description:
        "Ẩm thực thời ấy không chỉ là chuyện no đói — mà còn là cách người nội trợ giữ cho bữa cơm luôn có tình và có nếp.",
      characteristics: [
        { id: 4, title: "Ký ức bữa cơm", content: "Miếng đậu rán, bát canh và chén cơm nóng là những chi tiết rất dễ gọi lại ký ức gia đình." },
        { id: 5, title: "Sự chăm chút", content: "Hành phi, lửa vừa và cách bày đĩa cho thấy bữa ăn dù giản dị vẫn được nâng niu." },
        { id: 6, title: "Nếp sống chắt chiu", content: "Tận dụng nguyên liệu rẻ mà vẫn làm cho ngon là thói quen đặc trưng của bếp nhà thời bao cấp." },
        { id: 7, title: "Món ăn thân thuộc", content: "Đậu phụ tẩm hành không phải món lớn, nhưng lại là món rất gần gũi với hầu hết gia đình." },
      ],
    },
    warning: {
      title: "Ý nghĩa",
      quote: "Nếu không ghi lại, một món ăn nhỏ bé cũng có thể biến mất khỏi ký ức tập thể.",
      author: "Hương Vị Bao Cấp",
      message:
        "Dự án lưu giữ những món như đậu phụ tẩm hành để nhắc rằng bữa cơm thời khó khăn vẫn chứa đựng rất nhiều tình cảm và sự khéo co kéo.",
    },
    conclusion: {
      text: "Đậu phụ tẩm hành nhắc rằng bữa cơm thời khó khăn vẫn có thể ấm áp nhờ một nguyên liệu nhỏ và đôi bàn tay khéo léo.",
    },
    sidebarNotes: [
      {
        title: "Chú thích Bếp Nút",
        text: "Đậu phụ rán vàng rồi tẩm hành là một trong những món đạm bạc nhưng rất dễ làm bữa cơm ấm hơn.",
      },
      {
        title: "Mùi bếp nhà",
        text: "Chỉ một chút hành phi cũng đủ kéo ký ức bữa cơm xưa trở lại rất rõ.",
      },
    ],
  },
  "rau-muong-nuoc-sau": {
    title: "Rau muống & Nước sấu — Vị mát của mùa hè Hà Nội",
    subtitle: "Rau luộc xanh, bát nước sấu chua dịu, bữa cơm nào cũng thêm thanh mát",
    introduction: {
      context: "Bữa trưa mùa hè",
      quote: "Một đĩa rau muống luộc và bát nước sấu mát lạnh đủ làm dịu cái nắng oi của ngày nóng.",
      description:
        "Rau muống dễ trồng, dễ mua, lại nhanh chín. Khi đi cùng bát nước sấu chua dịu, nó tạo thành một kiểu bữa cơm rất Hà Nội, rất mát và rất dễ nhớ.",
      author: "Ký ức bếp nhà",
    },
    moralityPoints: [
      {
        id: 1,
        title: "Rau muống trong bữa ăn",
        content:
          "Rau muống là món rau quen thuộc vì rẻ, nhanh và hợp với mọi bữa cơm. Luộc lên, chấm mắm tỏi, món rau này luôn giữ được độ giòn và mùi xanh đặc trưng.",
        highlights: ["Nhanh", "Rẻ", "Giòn xanh"],
      },
      {
        id: 2,
        title: "Nước sấu giải nhiệt",
        content:
          "Bát nước sấu chua dịu làm bữa cơm mùa hè thanh hơn và đỡ ngán. Đó là vị mát rất riêng của những ngày nóng ở Hà Nội.",
        keyPoints: ["Giải nhiệt", "Chua dịu", "Đỡ ngán"],
      },
      {
        title: "Bữa ăn mùa nóng",
        content:
          "Món ăn không phô trương nhưng biết cân bằng vị, giúp cả nhà ăn ngon hơn trong những ngày oi bức.",
        virtues: {
          title: "Thành phần quen",
          items: ["Rau muống", "Quả sấu", "Muối/mắm", "Nước"],
        },
        qualities: ["Thanh mát", "Tiết kiệm", "Dễ làm"],
        quote: "Một bát nước sấu mát lành làm bữa cơm bớt nặng nề.",
      },
    ],
    civilizedParty: {
      title: "Vị Hà Nội",
      description:
        "Rau muống và nước sấu không chỉ là món ăn, mà còn là một phần của ký ức thành phố mỗi khi hè đến.",
      characteristics: [
        { id: 4, title: "Rau từ vườn nhà", content: "Loại rau này thường được hái từ vườn hay mua ở chợ, gắn với nếp ăn đơn sơ và tiết kiệm." },
        { id: 5, title: "Nước chua dịu", content: "Sấu ngâm hoặc đun thành nước uống là vị quen của mùa hè, giúp bữa ăn nhẹ bụng hơn." },
        { id: 6, title: "Cân bằng vị", content: "Món rau luộc và nước sấu tạo thế cân bằng rất đẹp: mộc mạc nhưng không đơn điệu." },
        { id: 7, title: "Ký ức mùa nóng", content: "Chỉ cần nhắc đến rau muống luộc và nước sấu là đã gợi ra ngay một mùa hè rất rõ nét." },
      ],
    },
    warning: {
      title: "Ý nghĩa",
      quote: "Không giữ lại những món rất quen này, ta sẽ mất một mảnh rất đời của ký ức mùa hè.",
      author: "Hương Vị Bao Cấp",
      message:
        "Những bữa ăn mát, đơn sơ và chắt chiu là phần ký ức không nên để trôi đi, vì đó là cách người Hà Nội từng sống qua những ngày nóng và thiếu thốn.",
    },
    conclusion: {
      text: "Rau muống & nước sấu là kiểu bữa ăn đơn sơ nhưng lưu giữ rất rõ dấu ấn mùa hè và nếp sống tiết kiệm của gia đình Việt.",
    },
    sidebarNotes: [
      {
        title: "Chú thích Bếp Nút",
        text: "Rau muống luộc và nước sấu là cặp đôi rất quen trong những ngày hè nóng nực.",
      },
      {
        title: "Mát và đưa",
        text: "Món rau đơn sơ nhưng lại làm bữa cơm thanh và dễ ăn hơn hẳn.",
      },
    ],
  },
  "dua-cai-ca-phao": {
    title: "Dưa cải / Cà pháo — Vị chua giòn của mâm cơm",
    subtitle: "Món ăn kèm làm bữa cơm đơn sơ thêm đưa vị",
    introduction: {
      context: "Hũ muối chua / Gian bếp nhỏ",
      quote: "Có bát dưa cải, đĩa cà pháo là cơm trắng cũng thấy đưa hơn.",
      description:
        "Dưa cải và cà pháo là hai món muối chua rất quen, vừa để dành, vừa để đổi vị cho mâm cơm ngày thường.",
      author: "Ký ức bếp nhà",
    },
    moralityPoints: [
      {
        id: 1,
        title: "Muối chua để dành",
        content:
          "Muối chua là cách đơn giản để giữ rau quả được lâu hơn và dùng dần trong nhiều bữa. Một hũ dưa trong bếp là cách dự trữ rất quen của nhiều gia đình.",
        highlights: ["Để dành", "Giòn", "Chua vừa"],
      },
      {
        id: 2,
        title: "Ăn kèm để đổi vị",
        content:
          "Dưa cải và cà pháo giúp cân bằng vị, làm cơm trắng hay món kho đều đậm đà hơn. Chút chua giòn ấy khiến bữa cơm tròn vị hơn hẳn.",
        keyPoints: ["Đi với món kho", "Làm bữa ăn đậm đà", "Giữ được độ giòn"],
      },
      {
        title: "Vị chua của mâm cơm",
        content:
          "Dưa cải / cà pháo cho thấy một hũ muối chua cũng có thể làm mâm cơm ngày thường trở nên thân thuộc và đáng nhớ hơn.",
        virtues: {
          title: "Món ăn kèm",
          items: ["Dưa cải", "Cà pháo", "Muối", "Nước"],
        },
        qualities: ["Chắt chiu", "Để dành", "Không bỏ phí"],
        quote: "Có hũ dưa trong bếp là có thêm một mùi vị quen thuộc của nhà.",
      },
    ],
    civilizedParty: {
      title: "Nếp ăn dân dã",
      description:
        "Những món muối chua như dưa cải và cà pháo nói nhiều về bếp nhà, về cách người Việt giữ đồ ăn và đổi vị cho bữa cơm.",
      characteristics: [
        { id: 4, title: "Món dự trữ", content: "Dưa và cà được làm để dùng dần, rất hợp với nếp sống tính toán từng bữa." },
        { id: 5, title: "Độ giòn và chua", content: "Ngon nhất là khi dưa giữ được độ giòn, chua vừa đủ và không quá mặn." },
        { id: 6, title: "Ăn với món kho", content: "Khi đi với thịt kho hay cá kho, vị chua giòn làm món chính ngon hơn hẳn." },
        { id: 7, title: "Ký ức bếp nhà", content: "Chỉ một hũ dưa trong bếp cũng đủ gợi lại một thời gian khó nhưng rất đỗi thân quen." },
      ],
    },
    warning: {
      title: "Ý nghĩa",
      quote: "Nếu bỏ quên, hũ dưa trong bếp cũng là một phần ký ức bị mất đi.",
      author: "Hương Vị Bao Cấp",
      message:
        "Dưa cải và cà pháo là phần rất nhỏ của bữa cơm, nhưng lại mang trong nó thói quen chắt chiu, để dành và giữ nếp ăn rất đời thường.",
    },
    conclusion: {
      text: "Dưa cải / cà pháo cho thấy một hũ muối chua cũng có thể làm mâm cơm ngày thường trở nên thân thuộc và đáng nhớ hơn.",
    },
    sidebarNotes: [
      {
        title: "Chú thích Bếp Nút",
        text: "Một hũ dưa cải hay cà pháo trong bếp là cách để dành rất quen của nhiều gia đình.",
      },
      {
        title: "Vị chua giòn",
        text: "Món ăn kèm nhỏ bé nhưng làm cơm trắng, cá kho và thịt kho ngon hơn rất nhiều.",
      },
    ],
  },
  "ca-ro-ron-chien-gion": {
    title: "Cá rô ron chiên giòn — Món mặn từ ao đồng",
    subtitle: "Con cá nhỏ nhưng đủ làm bữa cơm có vị mặn mà",
    introduction: {
      context: "Ao đồng / Mùa nước",
      quote: "Con cá nhỏ nhưng khi chiên lên lại thành món mặn khiến cả nhà nhớ rất lâu.",
      description:
        "Cá rô ron gợi nhớ những ngày đi bắt cá ở ao, mương hay ruộng sau mùa nước lên. Chiên giòn lên, cá thành món mặn dân dã mà đậm đà.",
      author: "Ký ức ẩm thực",
    },
    moralityPoints: [
      {
        id: 1,
        title: "Cá đồng từ ao mương",
        content:
          "Cá rô ron nhỏ nhưng chắc thịt, thường xuất hiện trong những bữa cơm gia đình ở vùng quê, nơi nguồn mặn đến từ ao hồ và ruộng nước.",
        highlights: ["Ao đồng", "Chắc thịt", "Món quê"],
      },
      {
        id: 2,
        title: "Chiên giòn để giữ vị",
        content:
          "Chiên vàng lên làm cá thơm và dễ ăn hơn, đặc biệt khi ăn với cơm nóng. Một dĩa cá vàng ruộm thường là món mặn đáng giá nhất của bữa cơm.",
        keyPoints: ["Ăn nóng ngon nhất", "Đậm vị", "Rất đưa cơm"],
      },
      {
        title: "Món mặn cho bữa cơm",
        content:
          "Món cá cho thấy bữa ăn quê không nhiều nhưng vẫn đủ vị mặn mà, rất khó quên.",
        virtues: {
          title: "Cách chế biến",
          items: ["Cá rô ron", "Muối", "Dầu/mỡ", "Nhiệt độ chiên"],
        },
        qualities: ["Tận dụng", "Giản dị", "Giữ vị quê"],
        quote: "Cá nhỏ nhưng khi chiên lên lại thành món mặn khiến cả nhà nhớ rất lâu.",
      },
    ],
    civilizedParty: {
      title: "Vị đồng quê",
      description:
        "Cá rô ron chiên giòn là lát cắt rất gần của đời sống nông thôn, nơi nguồn thức ăn gắn với ao hồ và ruộng nước.",
      characteristics: [
        { id: 4, title: "Tự tay bắt", content: "Nhiều người nhớ món cá vì gắn với việc tự bắt, tự làm và tự dọn thành bữa ăn cho cả nhà." },
        { id: 5, title: "Món mặn hiếm hoi", content: "Trong những bữa ăn ít thịt cá, một đĩa cá đồng chiên giòn là món mặn rất đáng quý." },
        { id: 6, title: "Mùi thơm đồng ruộng", content: "Mùi cá chiên gợi rõ cái mộc mạc của bếp quê và của đồng ruộng Việt Nam." },
        { id: 7, title: "Ký ức rất sống", content: "Món ăn này không chỉ ngon mà còn mang theo cả cảm giác lao động, mùa vụ và gia đình." },
      ],
    },
    warning: {
      title: "Ý nghĩa",
      quote: "Nếu chỉ nhớ món sang, người ta sẽ quên mất vị cá đồng của những ngày xưa.",
      author: "Hương Vị Bao Cấp",
      message:
        "Những món cá đồng như thế này nhắc ta rằng cái ngon của thời trước nằm ở sự gần gũi, chứ không nằm ở sự cầu kỳ.",
    },
    conclusion: {
      text: "Cá rô ron chiên giòn nhắc người ta nhớ đến vị mặn mà của đồng quê và những bữa cơm tuy ít nhưng rất có tình.",
    },
    sidebarNotes: [
      {
        title: "Chú thích Thư khế",
        text: "Cá đồng chiên giòn là món mặn rất rõ của bữa cơm quê và mùa nước.",
      },
      {
        title: "Hương vị đồng ruộng",
        text: "Chỉ cần một dĩa cá nhỏ thôi là mâm cơm đã có cảm giác đầy đặn hơn.",
      },
    ],
  },
  "hat-mit-luoc": {
    title: "Hạt mít luộc — Quà vặt từ trái chín mùa hè",
    subtitle: "Phần hạt nhỏ bé nhưng thành món ăn chơi rất vui",
    introduction: {
      context: "Trái chín đầu mùa",
      quote: "Bóc múi mít xong, hạt còn lại đem luộc lên cũng thành một món quà vặt rất vui.",
      description:
        "Hạt mít là phần không bị bỏ phí trong bếp nhà. Khi luộc lên, nó trở thành món ăn chơi bùi thơm, rất hợp với mùa hè và ký ức trẻ con.",
      author: "Ký ức quê nhà",
    },
    moralityPoints: [
      {
        id: 1,
        title: "Tận dụng phần hạt",
        content:
          "Hạt mít được giữ lại, luộc chín và ăn nóng như một cách tận dụng rất quen của bếp nhà, đúng tinh thần chắt chiu.",
        highlights: ["Tận dụng", "Không bỏ phí", "Dễ làm"],
      },
      {
        id: 2,
        title: "Bùi và thơm",
        content:
          "Hạt mít chín luộc lên có vị bùi, thơm nhẹ và thường được chấm thêm chút muối, rất hợp làm quà vặt giữa buổi.",
        keyPoints: ["Ăn nóng ngon nhất", "Bùi nhưng không ngấy", "Trẻ con rất thích"],
      },
      {
        title: "Quà vặt mùa hè",
        content:
          "Hạt mít luộc gói lại tinh thần tận dụng mọi phần của mùa quả chín và bếp nhà.",
        virtues: {
          title: "Phần dùng được",
          items: ["Hạt mít", "Muối", "Nước", "Nồi luộc"],
        },
        qualities: ["Tận dụng", "Tiết kiệm", "Thân thuộc"],
        quote: "Sau múi ngọt, hạt luộc lên cũng thành một niềm vui nhỏ.",
      },
    ],
    civilizedParty: {
      title: "Ký ức trái chín",
      description:
        "Món ăn này gắn rất rõ với mùa mít chín ở quê, nơi mọi phần của trái cây đều được tận dụng và chia sẻ trong nhà.",
      characteristics: [
        { id: 4, title: "Niềm vui nhỏ", content: "Trẻ con thường chờ phần hạt mít vì đó là món quà vặt vui hơn cả múi chín." },
        { id: 5, title: "Ăn chơi mà no nhẹ", content: "Hạt mít luộc ăn chơi nhưng vẫn có cảm giác no nhẹ, rất hợp với mùa hè." },
        { id: 6, title: "Không bỏ phí", content: "Không chỉ múi ngon, phần hạt cũng được tận dụng, cho thấy nếp ăn rất tiết kiệm." },
        { id: 7, title: "Ký ức mùa hè", content: "Chỉ một rổ mít chín cũng đủ gợi lại cả một mùa hè ở quê." },
      ],
    },
    warning: {
      title: "Ý nghĩa",
      quote: "Nếu không lưu giữ, món quà vặt này sẽ mất hút trong ký ức mùa hè.",
      author: "Hương Vị Bao Cấp",
      message:
        "Những món như hạt mít luộc cho thấy ngay cả phần hạt nhỏ bé cũng có thể lưu lại một thói quen sống chắt chiu và vui miệng.",
    },
    conclusion: {
      text: "Hạt mít luộc là minh chứng rằng trong những bữa ăn giản dị, ngay cả phần hạt cũng có thể trở thành một niềm vui đáng nhớ.",
    },
    sidebarNotes: [
      {
        title: "Chú thích Bếp Nút",
        text: "Phần hạt mít được luộc lên là một món quà vặt rất bùi, rất mùa hè.",
      },
      {
        title: "Không phí phần nào",
        text: "Tận dụng cả hạt là cách bếp nhà xưa giữ được tinh thần chắt chiu.",
      },
    ],
  },
  "mam-kho-quet-com-chay": {
    title: "Mắm kho quẹt + Cơm cháy — Đậm vị từ phần còn lại",
    subtitle: "Món tận dụng nhưng rất khó quên",
    introduction: {
      context: "Bếp lửa nhỏ / Món chấm",
      quote: "Chỉ một nồi kho quẹt và phần cơm cháy cũng đủ giữ no cho cả nhà.",
      description:
        "Kho quẹt là món mắm đậm đà từ những nguyên liệu sẵn có trong bếp; khi ăn cùng cơm cháy, nó trở thành món tận dụng rất được nhớ.",
      author: "Ký ức bữa cơm",
    },
    moralityPoints: [
      {
        id: 1,
        title: "Kho quẹt từ bếp nghèo",
        content:
          "Nước mắm, tiêu, đường và tóp mỡ được đun nhỏ lửa cho sánh lại, tạo thành món chấm đậm đà rất hợp với bữa cơm tiết kiệm.",
        highlights: ["Mắm", "Tiêu", "Tóp mỡ"],
      },
      {
        id: 2,
        title: "Cơm cháy giòn rụm",
        content:
          "Phần cơm cháy ở đáy nồi không bỏ đi mà được tận dụng để ăn cùng kho quẹt, vừa giòn vừa đậm vị.",
        keyPoints: ["Ăn cùng kho quẹt", "Không bỏ phí", "Rất đưa"],
      },
      {
        title: "Đậm vị từ phần còn lại",
        content:
          "Món ăn đậm đà từ những phần nhỏ bé nhất, đúng tinh thần ăn hết và tận dụng hết của bếp núc xưa.",
        virtues: {
          title: "Món tận dụng",
          items: ["Nước mắm", "Tóp mỡ", "Tiêu", "Cơm cháy"],
        },
        qualities: ["Tận dụng", "Tiết kiệm", "Không bỏ phí"],
        quote: "Mùi tiêu, mùi mắm và độ giòn của cơm cháy khiến món ăn này rất khó phai trong ký ức.",
      },
    ],
    civilizedParty: {
      title: "Tận dụng tối đa",
      description:
        "Kho quẹt và cơm cháy cho thấy bếp nhà thời trước luôn tìm cách làm cho phần còn lại trở nên ngon miệng và hữu ích.",
      characteristics: [
        { id: 4, title: "Món chấm mặn mà", content: "Kho quẹt là món chấm rất đậm vị, đủ làm rau luộc và cơm trắng ngon hơn." },
        { id: 5, title: "Cơm cháy thành món", content: "Phần cơm cháy giòn không bị bỏ đi mà được tận dụng thành một món ăn riêng." },
        { id: 6, title: "Bếp nghèo nhưng khéo", content: "Chỉ với những nguyên liệu sẵn có, người nấu vẫn tạo ra một món rất đáng nhớ." },
        { id: 7, title: "Ký ức đậm", content: "Kho quẹt gắn với ký ức về sự chắt chiu, vừa nghèo vừa ngon theo cách rất riêng." },
      ],
    },
    warning: {
      title: "Ý nghĩa",
      quote: "Bỏ qua những món tận dụng này là bỏ qua một cách sống của thời xưa.",
      author: "Hương Vị Bao Cấp",
      message:
        "Mắm kho quẹt + cơm cháy là một ví dụ rất rõ cho thấy từ phần còn lại của bữa cơm cũng có thể sinh ra một món ngon đáng nhớ.",
    },
    conclusion: {
      text: "Mắm kho quẹt + cơm cháy là món ăn đậm đà từ những phần nhỏ bé nhất, đúng tinh thần ăn hết và tận dụng hết của bếp núc xưa.",
    },
    sidebarNotes: [
      {
        title: "Chú thích Thư khế",
        text: "Món chấm đậm vị này biến phần còn lại của bữa cơm thành một thứ rất đáng nhớ.",
      },
      {
        title: "Mùi mắm",
        text: "Kho quẹt và cơm cháy gắn với ký ức về bếp lửa nhỏ và thói quen không bỏ phí.",
      },
    ],
  },
  "cu-san-xao": {
    title: "Củ sắn xào — Món no bụng từ vườn nhà",
    subtitle: "Món ăn từ cây nhà lá vườn",
    introduction: {
      context: "Vườn nhà / Bữa ăn lót dạ",
      quote: "Một đĩa củ sắn xào giản dị nhưng có thể làm bữa ăn bớt trống trải.",
      description:
        "Củ sắn là nguyên liệu rất gần gũi ở nông thôn, thường được tận dụng khi cần thêm món ăn no bụng. Xào lên, nó thành món lót dạ bùi ngọt rất quen.",
      author: "Ký ức quê bếp",
    },
    moralityPoints: [
      {
        id: 1,
        title: "Sắn dễ kiếm, dễ để dành",
        content:
          "Sắn có thể trồng quanh nhà và được dùng làm nguyên liệu khi bữa cơm cần no hơn. Nó gắn chặt với vườn nhà và cách sống cây nhà lá vườn.",
        highlights: ["Vườn nhà", "Dễ trồng", "No bụng"],
      },
      {
        id: 2,
        title: "Xào lên cho dễ ăn",
        content:
          "Sắn xào cùng hành và chút gia vị thành món lót dạ bùi ngọt, ăn với cơm hay ăn riêng đều được.",
        keyPoints: ["Ăn lót dạ khá no", "Xào nhanh giữ vị", "Dễ kết hợp hành mỡ"],
      },
      {
        title: "Tinh thần không bỏ phí",
        content:
          "Món ăn này phản ánh rất rõ thói quen tận dụng cây nhà lá vườn và không bỏ phí bất kỳ thứ gì quanh bếp.",
        virtues: {
          title: "Nguyên liệu chính",
          items: ["Củ sắn", "Hành", "Muối", "Mỡ/dầu"],
        },
        qualities: ["Chắt chiu", "Tiết kiệm", "Tận dụng"],
        quote: "Củ sắn xào cho thấy đôi khi điều quan trọng nhất của bữa ăn là cảm giác no bụng.",
      },
    ],
    civilizedParty: {
      title: "Bếp vườn nhà",
      description:
        "Từ một nguyên liệu đơn giản như sắn, người ta có thể thấy cả một nếp sống tận dụng, khéo léo và không bỏ phí.",
      characteristics: [
        { id: 4, title: "Cây nhà lá vườn", content: "Nguyên liệu lấy từ vườn nhà luôn là nguồn dự trữ quan trọng của nhiều gia đình." },
        { id: 5, title: "No mà không cầu kỳ", content: "Món xào này giúp bữa ăn bớt trống trải mà vẫn giữ đúng tinh thần tiết kiệm." },
        { id: 6, title: "Gắn với quê", content: "Vị bùi ngọt của sắn rất dễ làm người ta nhớ đến bếp quê và vườn nhà." },
        { id: 7, title: "Chắt chiu từng bữa", content: "Từ củ sắn nhỏ thôi cũng có thể nhìn thấy sự bền bỉ của bữa cơm gia đình." },
      ],
    },
    warning: {
      title: "Ý nghĩa",
      quote: "Nếu không còn nhớ, một phần nếp sống vườn nhà cũng mất theo.",
      author: "Hương Vị Bao Cấp",
      message:
        "Củ sắn xào không cầu kỳ nhưng lại giúp nhìn ra cách người Việt tận dụng mọi thứ quanh mình để giữ cho bữa cơm luôn đủ đầy.",
    },
    conclusion: {
      text: "Củ sắn xào cho thấy đôi khi điều quan trọng nhất của bữa ăn không phải sự sang trọng, mà là cảm giác no bụng và đủ sức cho cả nhà.",
    },
    sidebarNotes: [
      {
        title: "Chú thích Bếp Nút",
        text: "Củ sắn xào là món lót dạ quen của những bữa ăn cây nhà lá vườn.",
      },
      {
        title: "No bụng",
        text: "Từ nguyên liệu vườn nhà, bếp xưa vẫn tạo được một món ăn đủ chắc dạ.",
      },
    ],
  },
  "muoi-dau-phong": {
    title: "Muối đậu phộng — Chén muối mộc mạc bên nồi cơm",
    subtitle: "Gia vị nhỏ nhưng rất đưa cơm",
    introduction: {
      context: "Chén muối bên mâm cơm",
      quote: "Chỉ một chén muối đậu phộng cũng đủ làm bữa cơm với rau luộc trở nên đậm đà hơn.",
      description:
        "Muối đậu phộng là món chấm rất đơn giản, thường đi cùng rau luộc, khoai luộc hay cơm nóng. Ít nguyên liệu nhưng lại tạo ra cảm giác bùi và mặn rất rõ.",
      author: "Ký ức bếp nhà",
    },
    moralityPoints: [
      {
        id: 1,
        title: "Đậu phộng rang giã",
        content:
          "Từ vài nắm đậu phộng rang giã cùng muối, người nội trợ đã có ngay một chén chấm đủ dùng cho cả bữa cơm.",
        highlights: ["Nguyên liệu ít", "Làm nhanh", "Bùi mặn"],
      },
      {
        id: 2,
        title: "Ăn với rau luộc rất hợp",
        content:
          "Vị bùi mặn của đậu phộng làm những món đơn giản trở nên ngon miệng hơn nhiều, đặc biệt là với rau luộc và cơm nóng.",
        keyPoints: ["Cơm nóng ăn rất hợp", "Rau luộc bớt nhạt", "Bữa cơm có thêm vị bùi"],
      },
      {
        title: "Chén muối bên mâm cơm",
        content:
          "Muối đậu phộng là minh chứng rõ cho tinh thần chắt chiu: ít nguyên liệu nhưng vẫn tạo ra một món chấm làm cả mâm cơm thêm ngon.",
        virtues: {
          title: "Thành phần nhỏ",
          items: ["Đậu phộng", "Muối", "Ớt", "Mè"],
        },
        qualities: ["Tiết kiệm", "Không bỏ phí", "Bền bỉ"],
        quote: "Muối đậu phộng làm rau luộc và cơm nóng ngon hơn rất nhiều.",
      },
    ],
    civilizedParty: {
      title: "Nếp ăn dân dã",
      description:
        "Một chén muối nhỏ nhưng đủ cho thấy cách người Việt làm ngon lên từ những thứ rất giản dị, rất ít mà rất tình.",
      characteristics: [
        { id: 4, title: "Gia vị quê nhà", content: "Muối đậu phộng là món chấm gần như ai cũng từng gặp trong bữa cơm gia đình." },
        { id: 5, title: "Đưa cơm", content: "Đậu phộng rang giã làm vị của rau luộc và cơm nóng trở nên rõ hơn, ngon hơn." },
        { id: 6, title: "Làm nhanh, dùng lâu", content: "Chén muối này rất dễ làm và có thể ăn trong nhiều bữa, đúng tinh thần tiết kiệm." },
        { id: 7, title: "Ký ức chắt chiu", content: "Từ một chén muối nhỏ cũng có thể thấy lại nếp sống mộc mạc của bếp nhà." },
      ],
    },
    warning: {
      title: "Ý nghĩa",
      quote: "Nếu không ghi nhớ, ta sẽ quên mất cả thói quen làm muối thật mộc mạc.",
      author: "Hương Vị Bao Cấp",
      message:
        "Muối đậu phộng giúp ta hiểu rằng bữa cơm xưa ít nhưng vẫn có cách làm cho ngon, và cái ngon ấy đến từ sự chăm chút rất nhỏ.",
    },
    conclusion: {
      text: "Muối đậu phộng là minh chứng rất rõ cho tinh thần chắt chiu: ít nguyên liệu nhưng vẫn tạo ra một món chấm làm cả mâm cơm thêm ngon.",
    },
    sidebarNotes: [
      {
        title: "Chú thích Bếp Nút",
        text: "Muối đậu phộng là món chấm rất quen, nhất là với rau luộc và cơm nóng.",
      },
      {
        title: "Chén muối nhỏ",
        text: "Chỉ một chén nhỏ thôi cũng đủ làm mâm cơm đậm đà hơn rất nhiều.",
      },
    ],
  },
};
