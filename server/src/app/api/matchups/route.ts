import { manager } from "@/utils/dbManager";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic'




export async function PUT(req: Request) {

  const  messages  = await req.json();
  const response = await manager.createNewMatchup(messages);
  return NextResponse.json({response});
}

export async function GET() {



  const response = await manager.getRandomMatchup();
  return NextResponse.json({data: response});
}
