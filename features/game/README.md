# Game Feature - Tư tưởng Hồ Chí Minh

Trò chơi giáo dục về Tư tưởng Hồ Chí Minh với 3 màn chơi.

## Cấu trúc

```
features/game/
├── README.md
├── components/              # Game UI components (12 files)
│   ├── WelcomeScreen.tsx
│   ├── GameHeader.tsx
│   ├── Stage1MultipleChoice.tsx
│   ├── Stage2FillInBlank.tsx
│   ├── Stage3PuzzleGame.tsx
│   ├── VictoryScreen.tsx
│   ├── InstructionsModal.tsx
│   ├── LeaderboardModal.tsx
│   ├── QuestionCard.tsx
│   ├── AnswerFeedback.tsx
│   ├── PuzzleBoard.tsx
│   └── PuzzlePiece.tsx
├── context/                 # Game state management
│   └── GameContext.tsx
├── hooks/                   # Custom hooks
│   ├── useGameState.ts
│   └── useTimer.ts
└── lib/                     # Utilities
    ├── storage.ts          # LocalStorage operations
    └── puzzleUtils.ts      # Puzzle game logic
```

## Route

Game được serve tại `/game` route:
- `app/game/page.tsx` - Main game page
- `app/page.tsx` - Redirects to `/game`

## Sử dụng

Truy cập: `http://localhost:3000/game`

## Tính năng

- ✅ 3 màn chơi: Trắc nghiệm, Điền từ, Ghép hình
- ✅ 100 câu hỏi ngẫu nhiên từ data/questions.json
- ✅ Timer và bảng xếp hạng (localStorage)
- ✅ Giao diện cách mạng (màu đỏ-vàng)
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Drag & drop puzzle game
- ✅ Auto-advance khi đủ 9 mảnh ghép

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion (animations)
- @dnd-kit (drag & drop)
