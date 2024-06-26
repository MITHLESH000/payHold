'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async (e) => {
        e.preventDefault();  // Prevent form from reloading the page
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error) {
            console.log("Signup failed", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(
            !(user.username.length > 0 && user.email.length > 0 && user.password.length > 0)
        );
    }, [user]);

    return (
        <div className="flex items-center justify-center bg-slate-600 h-screen w-screen">
            <div className="flex flex-col items-center justify-center h-96 w-96">
                <form className="flex flex-col items-center" onSubmit={onSignup}>
                    <h1 className='text-3xl text-sky-300 font-bold pb-6'>
                        {loading ? "Processing" : "Signup"}
                    </h1>
                    <input
                        type="text"
                        id='username'
                        name='username'
                        placeholder="User Name"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className="w-full px-4 py-2 mb-4 text-black border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
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
                        {buttonDisabled ? "Fill your details" : "Signup"}
                    </button>
                    <Link className='pt-6 text-green-400 hover:text-green-300' href='/login'>Visit login page</Link>
                </form>
            </div>
        </div>
    );
}
