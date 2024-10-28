import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const newsCategory = await prisma.newsCategory.findFirstOrThrow({
        where: {
            id
        },
        include: {
            news: true,
            _count: {
                select: {
                    news: true
                }
            }
        }
    });
    return NextResponse.json({ newsCategory });
}