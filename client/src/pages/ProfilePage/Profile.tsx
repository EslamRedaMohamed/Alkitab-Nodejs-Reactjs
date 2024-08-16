// src/components/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user data from local storage
        const userData = localStorage.getItem('user');
        if (userData) {
        setUser(JSON.parse(userData));
        } else {
        // Redirect to login if user data is not found
        navigate('/login');
        }
    }, [navigate]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Profile</h2>
            <div className="flex flex-col items-center mb-6">
            {user.image ? (
                <img
                src={`http://localhost:8080/${user.image}`} // Update the base URL as needed
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-secondary"
                />
            ) : (
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-primary text-xl border-2 border-secondary">
                No Image
                </div>
            )}
            </div>
            <div className="mb-4 flex space-x-1">
            <label className="block text-secondary font-medium mb-2">Full Name:</label>
            <p className="text-primary font-semibold">{user.firstName +" "+user.lastName}</p>
            </div>
            <div className="mb-4 flex space-x-1">
            <label className="block text-secondary font-medium mb-2">Email:</label>
            <p className="text-primary font-semibold">{user.email}</p>
            </div>
            <div className="mb-4 flex space-x-1">
            <label className="block text-secondary font-medium mb-2">Username:</label>
            <p className="text-primary font-semibold">{user.username}</p>
            </div>
            <button
            onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                navigate('/login');
            }}
            className="w-full bg-yellow text-white font-extrabold py-2 px-8 rounded-md hover:bg-primary transition duration-300"
            >
            Logout
            </button>
        </div>
        </div>
    );
    };

export default ProfilePage;
