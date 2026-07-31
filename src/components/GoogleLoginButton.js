"use client";
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

export default function GoogleLoginButton() {
    const [status, setStatus] = useState('');

    const handleSuccess = async (credentialResponse) => {
        setStatus('Authenticating with server...');

        try {
            // Send the token to your Node.js backend REST API
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/google_user_login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: credentialResponse.credential, // This is the JWT ID token Google provides
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('Login successful!');
                // TODO: Save your backend's custom JWT or session data here
                // Example: localStorage.setItem('authToken', data.myCustomToken);
                // window.location.href = '/web/dashboard'; 
            } else {
                setStatus(`Login failed: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setStatus('Network error occurred.');
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center p-4">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.log('Login Failed');
                    setStatus('Google Login popup closed or failed.');
                }}
                useOneTap // Optional: Prompts the user automatically if they are logged into Google
            />
            {status && <p className="text-sm mt-2 text-gray-600">{status}</p>}
        </div>
    );
}