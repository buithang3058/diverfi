export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export const quizzes: Record<string, QuizQuestion[]> = {
  "defi-basics/11-flash-loans": [
    {
      question: "Tại sao Flash Loans không cần thế chấp?",
      options: [
        "Vì protocol tin tưởng người vay",
        "Vì tiền được trả lại trong cùng một block, nếu không trả được thì giao dịch bị revert",
        "Vì số tiền vay nhỏ",
        "Vì có bảo hiểm từ protocol"
      ],
      correct: 1,
      explanation: "Flash Loans là atomic - tất cả các bước phải thành công trong cùng một block. Nếu không trả được tiền, toàn bộ giao dịch bị revert và như chưa từng xảy ra."
    },
    {
      question: "Flash Loan phí của Aave V3 là bao nhiêu?",
      options: [
        "0%",
        "0.05%",
        "0.3%",
        "1%"
      ],
      correct: 1,
      explanation: "Aave V3 có phí flash loan là 0.05%, thấp hơn so với Aave V2 (0.09%) và Uniswap V2 (0.3%)."
    },
    {
      question: "Use case PHỔ BIẾN NHẤT của Flash Loans là gì?",
      options: [
        "Mua NFT",
        "Arbitrage và Liquidations",
        "Staking rewards",
        "Governance voting"
      ],
      correct: 1,
      explanation: "Flash Loans được sử dụng phổ biến nhất cho arbitrage (kiếm lợi từ chênh lệch giá) và liquidations (thanh lý các vị thế không đủ thế chấp)."
    },
    {
      question: "Điều gì xảy ra nếu bạn không trả được Flash Loan?",
      options: [
        "Bạn nợ protocol",
        "Protocol sẽ liquidate tài sản của bạn",
        "Toàn bộ giao dịch bị revert, bạn chỉ mất gas fee",
        "Bạn bị ban khỏi protocol"
      ],
      correct: 2,
      explanation: "Do tính chất atomic của Flash Loans, nếu không thể trả lại tiền vay, toàn bộ giao dịch sẽ bị revert. Bạn chỉ mất phí gas cho giao dịch thất bại đó."
    }
  ],
};

export function getQuizByLessonId(lessonId: string): QuizQuestion[] | null {
  return quizzes[lessonId] || null;
}
