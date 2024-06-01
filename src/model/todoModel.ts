import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: {
        type: String
    },
    completed: {
        type: Boolean
    },
    timestamp: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId
    }
})

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;