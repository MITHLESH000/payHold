'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
    const router = useRouter();

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setError(false)
        const { search } = window.location;
        const urlParams = new URLSearchParams(search);
        const urlToken = urlParams.get("token");

        if (urlToken) {
            setToken(urlToken);
        }
    }, []);

    useEffect(() => {
        setError(false)
        const verifyUserEmail = async () => {
            try {
                console.log("Axios POST request sent");
                const response = await axios.post("/api/auth/verifyemail", { token });
                console.log("Axios response received");
                console.log(`response from /api/auth/verifyemail(route): ${response.message} and ${response.success}`);
                setVerified(true);
                setError(false)
            } catch (error) {
                setError(error.response?.data || "Error verifying email");
                console.log(error.response?.data || "Error verifying email");
            }
        };

        if (token) {
            console.log("useEffect token")
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl mb-4 text-blue-500'>Email verification</h1>
            <h2 className='text-2xl m-2 text-yellow-500'>{token ? `${token}` : "No Token"}</h2> 
            {verified && (
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-3xl m-2 text-green-500 '>Email Verified</h2>
                    <Link className='text-2xl m-2 p-2 text-blue-600 bg-cyan-400 rounded-md' href='/auth/login'>Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className='text-2xl m-4 text-red-400'>Error:${error}</h2>
                </div>
            )}
        </div>
    );
}
