import fetch from "node-fetch";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { id } = data;

    const url = `https://adminclasificados.lavoz.com.ar/republicacion-individual-aviso/${id}/107172`;
    const resp = await fetch(url);
    console.log(resp)

    return NextResponse.json({ id });
  } catch (error) {
    console.log("Error /blockchain/wallets ", JSON.stringify(error));
    return NextResponse.json(error);
  }
}
