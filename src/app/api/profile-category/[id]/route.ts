import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const profileCategories = await prisma.profileCategory.findFirstOrThrow({
        where: {
            id
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
    return NextResponse.json({ profileCategories });
}