import Todo from "@/model/todoModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const userId = req.headers.get("userId");
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized: No user ID found" }, { status: 401 });
        }

        const todos = await Todo.find();
        
        return NextResponse.json({
            success: true,
            todos
        })
    } catch(err: any) {
        return NextResponse.json({error: err.message},
            {status: 500}
        )
    }
}