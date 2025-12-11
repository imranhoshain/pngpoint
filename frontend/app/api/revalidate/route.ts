import { REVALIDATE_SECRET } from "@/utils/api";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (body.secret !== REVALIDATE_SECRET) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 },
            );
        }
        const path = body.path;
        revalidatePath(path);

        return NextResponse.json({
            revalidated: true,
            path,
            now: Date.now(),
        });
    } catch (error) {
        return NextResponse.json(
            { error: String(error) },
            { status: 400 },
        );
    };
};
