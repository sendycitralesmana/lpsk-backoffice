import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const take = Number(searchParams.get("take") ?? 1);
        const skip = Number(searchParams.get("skip") ?? 0);
        const search = searchParams.get("search") ?? undefined;

        // get profile categories
        const profileCategories = await prisma.profileCategory.findMany({
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
                        profiles: true
                    }
                },
                profiles: true
            }
        });

        // get count profile category
        const countProfileCategory = await prisma.profileCategory.count({}); 

        return NextResponse.json({ countProfileCategory, profileCategories });
    } catch (error) {
        console.log(error);
    }
}