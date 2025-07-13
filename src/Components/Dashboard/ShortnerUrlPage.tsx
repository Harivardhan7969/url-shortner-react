import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ShortenUrlPage: React.FC = () => {
    const { url } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRedirect = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${url}`, {
                    maxRedirects: 0,
                    validateStatus: (status) => status >= 200 && status < 400,
                });

                const location = res.headers.location;
                if (location) {
                    window.location.href = location;
                } else {
                    throw new Error("No Location header found");
                }
            } catch (error: any) {
                console.error("Redirection failed:", error);
                navigate("/error");
            }
        };

        if (url) fetchRedirect();
    }, [url, navigate]);

    return <p>Redirecting...</p>;
};

export default ShortenUrlPage;
