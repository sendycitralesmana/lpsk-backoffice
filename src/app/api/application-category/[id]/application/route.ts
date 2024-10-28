import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // get application category
    const applicationCategory = await prisma.applicationCategory.findFirstOrThrow({
        where: {
            id,
        },
    });

    // get applications by category
    const applications = await prisma.application.findMany({
        where: {
            applicationCategoryId: id,
        },
    });

    return NextResponse.json({ 
        applicationCategory, 
        applications 
    });

}