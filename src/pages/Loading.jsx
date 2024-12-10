import React from 'react';
import { FaSpinner } from 'react-icons/fa'; // Importing the spinner icon from React Icons

const Loading = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
            <div className="flex justify-center items-center space-x-2 mb-6">
                <FaSpinner className="animate-spin text-red-600 text-4xl" />
                <span className="text-red-600 text-xl font-semibold">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;
