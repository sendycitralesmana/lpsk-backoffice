import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const take = Number(searchParams.get("take") ?? 1);
        const skip = Number(searchParams.get("skip") ?? 0);
        const search = searchParams.get("search") ?? undefined;

        const applicationCategories = await prisma.applicationCategory.findMany({
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
                        applications: true
                    }
                },
                applications: true
            }
        });

        // get count application category
        const countApplicationCategory = await prisma.applicationCategory.count({});

        return NextResponse.json({ countApplicationCategory, applicationCategories });
    } catch (error) {
        console.log(error);
    }
}