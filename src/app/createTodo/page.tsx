'use client';

import React, {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';


export default function createTodoPage() {

    const router = useRouter();

    const [todos, setTodos] = useState({
        todo: ""
    });

    const createTodoButton = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token', token)
            const response = await axios.post('/api/user/createTodo', {todo: todos.todo}, {
                headers: {
                    'Authorization': `Bearer ${token} `
                }
            });
            console.log(response.data)
            if(response.data.status != 200) {
                toast.error("Todo not created")
            } else {
                toast.success("Todo created successfully");
                router.push('/')
            }
        } catch(error: any) {
            toast.error("Error", error)
        }
    }

    return (
        <div> 
            <div>
                <h1 className="md-5 pb-2">Create Todo</h1>
            </div>
            <div className="pb-2 md-5">
                <input
                    id="todo"
                    type="todo"
                    value={todos.todo}
                    placeholder="Todo"
                    className="text-black"
                    onChange={(e) => setTodos({ ...todos, todo: e.target.value })}
                />
            </div>
            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => createTodoButton()} 
                >
                    Create Todo
                </button>
            </div>
        </div>
    )
}