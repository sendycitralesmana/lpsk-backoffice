import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    
    // get profile category
    const profileCategory = await prisma.profileCategory.findFirstOrThrow({
        where: {
            id
        }
    });

    // get profiles by category
    const profiles = await prisma.profile.findMany({
        where: {
            profileCategoryId: id
        }
    });

    return NextResponse.json({ profileCategory, profiles });
}