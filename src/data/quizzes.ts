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
  "defi-basics/12-mev": [
    {
      question: "MEV là viết tắt của gì?",
      options: [
        "Miner Extracted Volume",
        "Maximal Extractable Value",
        "Maximum Ethereum Value",
        "Market Extractable Value"
      ],
      correct: 1,
      explanation: "MEV là Maximal Extractable Value - giá trị tối đa mà block producers có thể khai thác bằng cách sắp xếp lại thứ tự giao dịch trong block."
    },
    {
      question: "Sandwich attack hoạt động như thế nào?",
      options: [
        "Bot bán token sau giao dịch của bạn",
        "Bot mua trước và bán sau giao dịch của bạn, khiến bạn nhận giá xấu hơn",
        "Bot copy giao dịch của bạn",
        "Bot hủy giao dịch của bạn"
      ],
      correct: 1,
      explanation: "Trong sandwich attack, bot frontrun (mua trước) giao dịch của bạn đẩy giá lên, rồi backrun (bán sau) khi giá đã cao - kẹp bạn ở giữa như bánh sandwich."
    },
    {
      question: "Flashbots Protect giúp bảo vệ khỏi MEV bằng cách nào?",
      options: [
        "Mã hóa tất cả giao dịch",
        "Gửi giao dịch qua private mempool, không để MEV bots thấy",
        "Trả phí cao hơn để giao dịch được ưu tiên",
        "Tự động hủy giao dịch nếu bị frontrun"
      ],
      correct: 1,
      explanation: "Flashbots Protect gửi giao dịch qua private mempool, chỉ có builders thấy được - MEV bots trên public mempool không thể frontrun."
    },
    {
      question: "Loại MEV nào được coi là 'tốt' cho DeFi ecosystem?",
      options: [
        "Frontrunning",
        "Sandwich attacks",
        "Arbitrage - giúp cân bằng giá giữa các sàn",
        "Gas wars"
      ],
      correct: 2,
      explanation: "Arbitrage được coi là MEV 'tốt' vì nó giúp cân bằng giá token giữa các sàn DEX khác nhau, tăng hiệu quả thị trường."
    }
  ],
};

export function getQuizByLessonId(lessonId: string): QuizQuestion[] | null {
  return quizzes[lessonId] || null;
}
