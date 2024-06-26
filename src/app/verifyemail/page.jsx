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
                const response = await axios.post("/api/users/verifyemail", { token });
                console.log("Axios response received");
                console.log(`response from /api/users/verifyemail(route): ${response.message} and ${response.success}`);
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
            <h1>Verify Email</h1>
            <h2>{token ? `${token}` : "No Token"}</h2>
            {verified && (
                <div>
                    <h2>Verified</h2>
                    <Link href='/login'>Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error</h2>
                </div>
            )}
        </div>
    );
}
