'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async (e) => {
        e.preventDefault();  // Prevent form from reloading the page
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            router.push("/home");
        } catch (error) {
            console.log("Login failed", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(
            !(user.email.length > 0 && user.password.length > 0)
        );
    }, [user]);

    return (
        <div className="flex items-center justify-center bg-slate-600 h-screen w-screen">
            <div className="flex flex-col items-center justify-center h-96 w-96">
                <form className="flex flex-col items-center" onSubmit={onLogin}>
                    <h1 className='text-3xl text-sky-300 font-bold pb-6'>
                        {loading ? "Processing" : "Login"}
                    </h1>
                    
                    <input
                        type="email"
                        id='email'
                        name='email'
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full px-4 py-2 mb-4 text-black border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="password"
                        id='password'
                        name='password'
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="w-full px-4 py-2 mb-4 text-black border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <button
                        type="submit"
                        disabled={buttonDisabled}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        {buttonDisabled ? "Fill your details" : "Login"}
                    </button>
                    <Link className='pt-6 text-green-400 hover:text-green-300' href='/signup'>Visit SignUp page</Link>
                </form>
            </div>
        </div>
    );
}
