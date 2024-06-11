import { dbManager } from "@/utils/dbManager";
import { NextResponse } from "next/server";


const manager = new dbManager();


export async function PUT(req: Request) {

  const  messages  = await req.json();
  const response = manager.createNewMatchup(messages);
  return NextResponse.json({response});
}

export async function GET() {

  const response = await manager.getRandomMatchup();
  return NextResponse.json({data: response.Item});
}
