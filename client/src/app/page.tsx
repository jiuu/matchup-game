import Image from "next/image";
import { revalidatePath } from "next/cache";
import { Quiz } from "@/components/Quiz.component";
import mock from "@/mocks/matchups";
import { QuizProvider } from "@/context/Quiz.context";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  return (
    <>
      <QuizProvider>
        <div>
          <Quiz />
        </div>
      </QuizProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
