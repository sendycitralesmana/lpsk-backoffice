import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const take = Number(searchParams.get("take") ?? 1);
        const skip = Number(searchParams.get("skip"));
        const search = searchParams.get("search") ?? "";

        // get news categories
        const newsCategory = await prisma.newsCategory.findMany({
            take: isNaN(take) ? 1 : take,
            skip: isNaN(skip) ? 0 : skip,
            where: {
                name: {
                    contains: search
                }
            },
            include: {
                _count: {
                    select: {
                        news: true
                    }
                },
                news: true
            }
        });

        // get count news category
        const countNewsCategory = await prisma.newsCategory.count({
            where: {
                name: {
                    contains: search
                }
            }
        });

        return NextResponse.json({ countNewsCategory, newsCategory });
    } catch (error) {
        console.log(error);
    }
}