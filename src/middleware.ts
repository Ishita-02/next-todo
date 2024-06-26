import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// Middleware function to authenticate JWT
export async function middleware(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader) {
        return NextResponse.json({ status: 401, message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return NextResponse.json({ status: 401, message: 'Unauthorized: Invalid token format' });
    }

    try {
        const payload = verify(token, 'SECRET');
        
        if (typeof payload !== 'object' || !payload.id) {
            return NextResponse.json({ status: 403, message: 'Forbidden: Invalid token payload' });
        }

        req.headers.set('userId', payload.id);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({ status: 403, message: 'Forbidden: Token verification failed' });
    }
}

// Configure the middleware to apply to specific paths
export const config = {
    matcher: [
        '/api/user/createTodo',
        '/api/user/getAllTodos',
    ],
};
