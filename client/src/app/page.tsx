import Image from "next/image";
import { revalidatePath } from "next/cache";
import { Quiz } from "@/components/Quiz.component";
import mock from "@/mocks/matchups";
import { QuizProvider } from "@/context/Quiz.context";
export default function Home() {
  const matchupData = mock;
  return (
    <QuizProvider>
      <div>
        <Quiz />
      </div>
    </QuizProvider>
  );
}
