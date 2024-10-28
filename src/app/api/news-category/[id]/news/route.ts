import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    // get news category
    const newsCategory = await prisma.newsCategory.findFirstOrThrow({
        where: {
            id
        }
    });

    // get news by category
    const newsByCategory = await prisma.news.findMany({
        where: {
            newsCategoryId: id
        }
    });
    return NextResponse.json({ 
        newsCategory : newsCategory,
        news : newsByCategory
     });
}