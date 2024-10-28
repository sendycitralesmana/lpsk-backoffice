import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const application = await prisma.application.findFirstOrThrow({
        where: {
            id
        }
    });
    return NextResponse.json({ application });
}