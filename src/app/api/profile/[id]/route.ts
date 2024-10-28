import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const profile = await prisma.profile.findFirstOrThrow({
        where: {
            id
        }
    });
    return NextResponse.json({ profile });
}