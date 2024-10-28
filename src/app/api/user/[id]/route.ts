import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const user = await prisma.user.findFirstOrThrow({
        where: {
            id
        }
    });
    return NextResponse.json({ user });
}