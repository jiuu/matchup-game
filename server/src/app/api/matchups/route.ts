import { manager } from "@/utils/dbManager";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic'




export async function PUT(req: Request) {

  const  messages  = await req.json();
  const response = await manager.createNewMatchup(messages);
  return NextResponse.json({response});
}

export async function GET() {


  let resArr = []
  for (let i = 0; i < 10 ; i++) {
    let response = await manager.getRandomMatchup();
    if (Math.random() > 0.5) {
      let placeholder = response?.myChamp
      response = {...response, myChamp: response?.enemyChamp, enemyChamp: placeholder, winRate: 100 - response?.winRate}
    }
    resArr.push(response)
  }
  let nextRes = NextResponse.json({data: resArr})
  nextRes.headers.append('Access-Control-Allow-Origin', '*')

  return nextRes;
}
