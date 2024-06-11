import { dbManager } from "@/utils/dbManager";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import Matchup from "common/types/matchup.types";
import { headers } from "next/headers";

export default function Home() {
  console.log(process.env.TABLE_NAME);
  const headersList = headers();
  console.log(process.env.VERCEL_URL);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        The server is running
      </div>
    </main>
  );
}
