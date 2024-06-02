'use client';

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from 'next/navigation'

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const handleButtonClick = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/user/signup', user);
            console.log("Signup success", response.data);
            toast.success('You are successfully signed up');
            router.push('/login');
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.name.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [user]);

    return (
        <div>
            <div>
                <h1 className="md-5 pb-2">Signup here</h1>
            </div>
            <div className="md-5 pb-2">
                <div className="pb-2 md-5 rounded">
                    <input
                        id="name"
                        type="text"
                        value={user.name}
                        className="text-black"
                        placeholder="Name"
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                </div>
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
                {loading ? 'Signing up...' : 'Signup'}
            </button>
        </div>
    )
}
