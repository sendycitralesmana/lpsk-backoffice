import {  NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const profile = await prisma.profile.findMany();
        return NextResponse.json({ profile });
    } catch (error) {
        console.log(error);
    }
}