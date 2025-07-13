import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdOutlineAdsClick, MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../../api/api";


interface Props {
    id: string;
    originalUrl: string;
    shortUrl: string;
    createdAt?: string;
    clickCount?: number;
    refetch?: () => void;
}

const ShortenItem: React.FC<Props> = ({
    originalUrl,
    shortUrl,
    createdAt,
    clickCount = 0,
    refetch,
}) => {
    const [isCopied, setIsCopied] = useState(false);

    const fullShortUrl = `${shortUrl}`;
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const shortId = shortUrl.includes("http")
                ? new URL(shortUrl).pathname.split("/").pop()
                : shortUrl;

            console.log("ShortId to delete:", shortId);

            const res = await api.delete(`/${shortId}`);

            toast.success("✅ Short URL deleted successfully!");
            refetch && refetch(); // reload the list after successful delete
        } catch (error: any) {
            console.error("Delete failed:", error);
            toast.error("❌ Failed to delete short URL");

            // Redirect to /error after a delay
            setTimeout(() => navigate("/error"), 1500);
        }
    };




    const handleCustomize = async () => {
        const newOriginalUrl = prompt("Enter new Original URL:");

        if (!newOriginalUrl || newOriginalUrl.length > 2048) {
            toast.error("❌ Invalid or too long URL");
            return;
        }

        try {
            const shortId = shortUrl.includes("http")
                ? new URL(shortUrl).pathname.split("/").pop()
                : shortUrl;

            console.log("ShortId to update:", shortId);

            await api.put(`/${shortId}`, {
                originalUrl: newOriginalUrl,
            });

            toast.success("✅ Original URL updated successfully!");
            refetch && refetch();
        } catch (error: any) {
            const status = error?.response?.status;
            const msg = error?.response?.data?.error || "Update failed";

            toast.error(status === 400 ? "❌ Invalid URL format" : msg);
        }
    };


    return (
        <div className="bg-slate-100 shadow-lg border border-dotted border-slate-500 px-6 py-4 rounded-md transition-all duration-100">
            <div className="flex sm:flex-row flex-col sm:justify-between gap-5 py-3">
                <div className="flex-1 sm:space-y-1 overflow-x-auto">
                    <div className="text-slate-900 flex items-center gap-2">
                        <Link
                            target="_blank"
                            className="text-[17px] font-semibold text-linkColor"
                            to={fullShortUrl}
                        >
                            {shortUrl}
                        </Link>
                        <FaExternalLinkAlt className="text-linkColor" />
                    </div>

                    <div className="text-slate-700 text-[17px] truncate">{originalUrl}</div>

                    <div className="flex items-center gap-8 pt-4">
                        <div className="flex gap-1 items-center text-green-800 font-semibold">
                            <MdOutlineAdsClick className="text-[22px]" />
                            <span>{clickCount}</span>
                            <span className="text-[15px]">
                                {clickCount === 1 ? "Click" : "Clicks"}
                            </span>
                        </div>

                        {createdAt && (
                            <div className="flex items-center gap-2 text-slate-800 font-semibold text-lg">
                                <FaRegCalendarAlt />
                                <span>{dayjs(createdAt).format("MMM DD, YYYY")}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap sm:justify-end gap-4 items-center">
                    {/* Copy Button */}
                    <CopyToClipboard text={fullShortUrl} onCopy={() => setIsCopied(true)}>
                        <div className="cursor-pointer flex gap-2 items-center bg-btnColor py-2 px-6 rounded-md text-white shadow-md shadow-slate-500 font-semibold">
                            <button>{isCopied ? "Copied" : "Copy"}</button>
                            {isCopied ? <LiaCheckSolid /> : <IoCopy />}
                        </div>
                    </CopyToClipboard>

                    {/* Customize Button */}
                    <div
                        onClick={handleCustomize}
                        className="cursor-pointer flex gap-2 items-center bg-yellow-500 py-2 px-6 rounded-md text-white shadow-md font-semibold"
                    >
                        <button>Customize</button>
                        <MdEdit />
                    </div>

                    {/* Delete Button */}
                    <div
                        onClick={handleDelete}
                        className="cursor-pointer flex gap-2 items-center bg-red-600 py-2 px-6 rounded-md text-white shadow-md font-semibold"
                    >
                        <button>Delete</button>
                        <MdDelete />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShortenItem;
