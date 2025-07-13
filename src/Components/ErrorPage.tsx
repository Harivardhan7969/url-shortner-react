import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
            <h1 className="text-4xl font-bold text-red-700 mb-4">⚠️ Link Expired or Invalid</h1>
            <p className="text-lg text-gray-700 mb-6">The link you're trying to access has either expired or doesn't exist.</p>
            <Link
                to="/"
                className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
