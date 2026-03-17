import { CodeBlock } from "./code-block";
import { Quiz } from "./quiz";
import { LessonQuiz } from "./lesson-quiz";

export const mdxComponents = {
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock {...props}>{children}</CodeBlock>
  ),
  Quiz,
  LessonQuiz,
};
