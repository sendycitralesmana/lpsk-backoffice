import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const take = Number(searchParams.get("take") ?? 1);
        const skip = Number(searchParams.get("skip") ?? 0);
        const search = searchParams.get("search") ?? undefined;

        // get service categories
        const serviceCategories = await prisma.serviceCategory.findMany({
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
                        services: true
                    }
                },
                services: true
            }
        });

        // get count service category
        const countServiceCategory = await prisma.serviceCategory.count({});

        return NextResponse.json({ serviceCategories });
    } catch (error) {
        console.log(error);
    }
}