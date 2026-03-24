/** Danh sách các tên món ăn / cụm từ liên quan ẩm thực Việt thời Bao cấp (dùng để detect) */
export const FOOD_KEYWORDS: string[] = [
  // Món ăn thời Bao cấp
  "bobo", "bò bố", "bơ bo", "bo bo",
  "cơm độn", "cơm độn khoai", "cơm độn sắn",
  "cháo cám", "cháo", "cháo loãng",
  "bánh bột mì", "bánh bột mì hấp", "bánh đa",
  "khoai lang", "khoai tây", "sắn", "mì tôm", "mì gói",
  "rau muống", "rau lang", "bắp cải", "cải xào",
  "thịt lợn", "thịt bò", "trứng", "đậu phụ",
  "nước mắm", "nước mắm phèo", "mắm tôm", "mắm ruốc",
  "xôi", "xôi nếp", "bánh giò", "bánh bao",
  "phở", "bún", "bún bò", "bún chả",
  "cơm", "cơm rang", "cơm tấm",
  "lạc", "đậu", "đậu phộng", "đỗ",

  // Món ăn chung
  "thịt kho", "cá kho", "cá chiên", "cá rán",
  "gà luộc", "gà rang", "vịt luộc",
  "rau xào", "canh", "canh chua", "canh rau",
  "bún dăm", "bún ốc", "bún cá",
  "món ăn", "đồ ăn", "món ngon", "ẩm thực",
  "nấu", "chế biến", "cách nấu", "công thức",
  "nguyên liệu", "mua", "mua sắm", "chợ",
  "tem phiếu", "bia sài gòn", "bia hơi",
  "cà phê", "trà đá", "nước", "nước giải khát",
  "xoài", "cam", "chuối", "đu đủ",
];

export interface FoodMatch {
  matchedWord: string;
  start: number;
  end: number;
}

/**
 * Detect whether `text` contains any known food name (case-insensitive, partial match).
 * Returns array of matches with their positions.
 */
export function detectFood(text: string): FoodMatch[] {
  const lower = text.toLowerCase();
  const matches: FoodMatch[] = [];

  for (const keyword of FOOD_KEYWORDS) {
    const idx = lower.indexOf(keyword);
    if (idx !== -1) {
      matches.push({
        matchedWord: text.slice(idx, idx + keyword.length),
        start: idx,
        end: idx + keyword.length,
      });
    }
  }

  // Deduplicate overlapping matches (prefer longer ones)
  if (matches.length <= 1) return matches;

  matches.sort((a, b) => a.start - b.start);
  const deduped: FoodMatch[] = [];
  let lastEnd = -1;

  for (const m of matches) {
    if (m.start >= lastEnd) {
      deduped.push(m);
      lastEnd = m.end;
    }
  }

  return deduped;
}

/** Trích từ đã match, hoặc toàn bộ text nếu không match */
export function extractFoodName(text: string): string {
  const matches = detectFood(text);
  if (matches.length > 0) {
    return matches[0].matchedWord;
  }
  return text.trim();
}
