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

    let response = await manager.getRandomMatchups();
    


  let nextRes = NextResponse.json({data: response})
  nextRes.headers.append('Access-Control-Allow-Origin', '*')

  return nextRes;
}
