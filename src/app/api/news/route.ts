import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const news = await prisma.news.findMany();
        return NextResponse.json({ news });
    } catch (error) {
        console.log(error);
    }
}