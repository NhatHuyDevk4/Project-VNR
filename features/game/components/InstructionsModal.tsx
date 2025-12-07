'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Edit3, Puzzle } from 'lucide-react';
import { setInstructionsSeen } from '../lib/storage';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstructionsModal({ isOpen, onClose }: InstructionsModalProps) {
  useEffect(() => {
    if (isOpen) {
      setInstructionsSeen(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#DC143C] to-[#8B0000] p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#FFD700]">
                    Hướng dẫn chơi
                  </h2>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Stage 1 */}
                <div className="border-2 border-[#DC143C] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-8 h-8 text-[#DC143C]" />
                    <h3 className="text-xl font-bold text-[#DC143C]">
                      Màn 1: Trắc nghiệm
                    </h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">•</span>
                      <span>Trả lời 9 câu hỏi trắc nghiệm về tư tưởng Hồ Chí Minh</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">•</span>
                      <span>Chọn đáp án đúng trong 4 lựa chọn A, B, C, D</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">•</span>
                      <span>Mỗi câu trả lời đúng sẽ nhận được 1 mảnh ghép</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">•</span>
                      <span>Bạn có tối đa 2 lần thử cho mỗi câu hỏi</span>
                    </li>
                  </ul>
                </div>

                {/* Stage 2 */}
                <div className="border-2 border-[#DC143C] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Edit3 className="w-8 h-8 text-[#DC143C]" />
                    <h3 className="text-xl font-bold text-[#DC143C]">
                      Màn 2: Điền từ
                    </h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">•</span>
                      <span>Hoàn thành 9 câu hỏi điền từ vào chỗ trống</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">•</span>
                      <span>Nhập đáp án vào ô trống và nhấn "Xác nhận"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">•</span>
                      <span>Mỗi câu đúng sẽ nhận thêm 1 mảnh ghép</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">•</span>
                      <span>Bạn cũng có 2 lần thử cho mỗi câu</span>
                    </li>
                  </ul>
                </div>

                {/* Stage 3 */}
                <div className="border-2 border-[#DC143C] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Puzzle className="w-8 h-8 text-[#DC143C]" />
                    <h3 className="text-xl font-bold text-[#DC143C]">
                      Màn 3: Ghép hình
                    </h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">•</span>
                      <span>Sử dụng các mảnh ghép đã thu thập để hoàn thành bức tranh</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">•</span>
                      <span>Kéo và thả các mảnh ghép vào đúng vị trí</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">•</span>
                      <span>Mảnh ghép sẽ tự động khóa khi đặt đúng vị trí</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">•</span>
                      <span>Hoàn thành tất cả để chiến thắng!</span>
                    </li>
                  </ul>
                </div>

                {/* Tips */}
                <div className="bg-[#FFD700]/10 border-2 border-[#FFD700] rounded-lg p-4">
                  <h3 className="text-lg font-bold text-[#DC143C] mb-2">
                    💡 Mẹo chơi
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Đọc kỹ câu hỏi trước khi trả lời</li>
                    <li>• Thời gian chơi được tính để xếp hạng</li>
                    <li>• Bạn có thể tạm dừng game bất cứ lúc nào</li>
                    <li>• Càng trả lời đúng nhiều, càng có nhiều mảnh ghép</li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 rounded-b-2xl">
                <button
                  onClick={handleClose}
                  className="w-full btn-revolutionary"
                >
                  Đã hiểu, bắt đầu chơi!
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
