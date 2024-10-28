import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const service = await prisma.service.findFirstOrThrow({
        where: {
            id,
        },
    });
    return NextResponse.json({ service });
}