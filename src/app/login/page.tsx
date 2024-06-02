// components/LoginPage.tsx
'use client';

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const handleButtonClick = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/user/login', user);
            console.log("Login success", response.data);
            toast.success('You are successfully logged in');
            router.push('/');
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [user]);

    return (
        <div>
            <div>
                <h1 className="md-5 pb-2">Login here</h1>
            </div>
            <div className="md-5 pb-2">
                <div className="pb-2 md-5">
                    <input
                        id="email"
                        type="email"
                        value={user.email}
                        placeholder="Email"
                        className="text-black"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="pb-2 md-5">
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        placeholder="Password"
                        className="text-black"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleButtonClick()} 
                disabled={disabled || loading}
            >
                {loading ? 'Logging...' : 'Login'}
            </button>
        </div>
    );
}
