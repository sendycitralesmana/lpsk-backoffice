import { getUsers } from "@/server/user-action";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await getUsers();
        return NextResponse.json({ users });
    } catch (error) {
        console.log(error);
    }
}