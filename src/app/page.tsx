import Image from "next/image";
import getMatchupData from "@/utils/scrape";
import { revalidatePath } from "next/cache";
import {Quiz} from "@/components/quiz";
import mock from "@/mocks/matchups";
export default function Home() {
  const matchupData = mock
  return (
    <Quiz data={matchupData}/>
  );
}



  
