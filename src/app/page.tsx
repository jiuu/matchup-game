import Image from "next/image";
import getMatchupData from "@/utils/scrape";
import { revalidatePath } from "next/cache";
import {Quiz} from "@/components/quiz.component";
import mock from "@/mocks/matchups";
import { QuizProvider } from "@/context/quiz.context";
export default function Home() {
  const matchupData = mock
  return (
    <QuizProvider>
      <div>
        <Quiz/>
      </div>
    </QuizProvider>
  );
}



  
