import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const serviceCategory = await prisma.serviceCategory.findFirstOrThrow({
        where: {
            id,
        },
        include: {
            _count: {
                select: {
                    services: true,
                },
            },
            services: true,
        },
    });
    return NextResponse.json({ serviceCategory });
}