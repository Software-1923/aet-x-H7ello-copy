import { observeData } from './data';
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = req.headers.get('x-user-id') || 'anonymous'; // Gerçek kullanıcı ID'si izleniyor
  const query = req.url; // Sorgu izleniyor

  // Kullanıcı sorgusunu kaydet
  await observeData(userId, query);

  return NextResponse.json({ message: `Merhaba ${userId}, sorgunuz işlendi: ${query}` });
}
