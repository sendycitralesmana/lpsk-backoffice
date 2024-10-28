import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const applicationCategory = await prisma.applicationCategory.findFirstOrThrow({
        where: {
            id,
        },
        include: {
            applications: true,
            _count: {
                select: {
                    applications: true,
                },
            },
        },
    });
    return NextResponse.json({ applicationCategory });
}