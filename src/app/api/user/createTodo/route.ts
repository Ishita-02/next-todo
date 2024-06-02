import Todo from "@/model/todoModel";
import { connect } from "@/dbConfig/dbConfig"; 
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        const reqBody = await req.json();
        const { todo } = reqBody;

        const userId = req.headers.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized: No user ID found" }, { status: 401 });
        }

        const newTodo = new Todo({
            todo: todo,
            timestamp: Date.now(),
            user: userId
        });

        const savedTodo = await newTodo.save();

        return NextResponse.json({
            message: "Todo created",
            success: true,
            savedTodo
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
