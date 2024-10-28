import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const applications = await prisma.application.findMany();
        return NextResponse.json({ applications });
    } catch (error) {
        console.log(error);
    }
}