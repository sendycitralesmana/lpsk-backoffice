import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    
    // get service category
    const serviceCategory = await prisma.serviceCategory.findFirstOrThrow({
        where: {
            id
        }
    });

    // get services by category
    const services = await prisma.service.findMany({
        where: {
            serviceCategoryId: id
        }
    });

    return NextResponse.json({ serviceCategory, services });
}