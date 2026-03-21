import { CodeBlock } from "./code-block";
import { Quiz } from "./quiz";
import { LessonQuiz } from "./lesson-quiz";

export const mdxComponents = {
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock {...props}>{children}</CodeBlock>
  ),
  // Lesson pages already render an <h1> title above the content.
  // Map MDX `# Heading` → <h2> to prevent duplicate H1.
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props}>{children}</h2>
  ),
  Quiz,
  LessonQuiz,
};
