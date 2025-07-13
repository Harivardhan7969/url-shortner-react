import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { FaLink } from "react-icons/fa";
import ShortenPopUp from "./ShortnerPopUp";
import ShortnerUrlList from "./ShortnerUrlList";
import Graph from "./Graph";
import api from "../../api/api";

const DashboardLayout: React.FC = () => {
    const [token, setToken] = useState<string>("");
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<string>("00:00:00");
    const [endTime, setEndTime] = useState<string>("23:59:59");
    const [shortenPopUp, setShortenPopUp] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [myShortenUrls, setMyShortenUrls] = useState<any[]>([]);

    useEffect(() => {
        fetchMyShortUrls();
    }, []);

    const fetchMyShortUrls = async () => {
        try {
            const response = await api.get("/urls");
            setMyShortenUrls(response.data);
            console.log(myShortenUrls);

        } catch (error) {
            console.error("Error fetching URLs:", error);
            navigate("/error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDateChange = () => {
        fetchMyShortUrls();
    };

    return (
        <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="lg:w-[90%] w-full mx-auto py-16">
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700">Start Date</label>
                            <DatePicker
                                selected={startDate}
                                //  onChange={(date: Date) => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="border px-2 py-1 rounded-md"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700">End Date</label>
                            <DatePicker
                                selected={endDate}
                                // onChange={(date: Date) => setEndDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="border px-2 py-1 rounded-md"
                            />
                        </div>

                        {startDate.toISOString().split("T")[0] === endDate.toISOString().split("T")[0] && (
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700">Start Time</label>
                                    <input
                                        type="time"
                                        className="border px-2 py-1 rounded-md"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700">End Time</label>
                                    <input
                                        type="time"
                                        className="border px-2 py-1 rounded-md"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md self-end"
                            onClick={handleDateChange}
                        >
                            Filter Analytics
                        </button>
                    </div>

                    <div className="relative min-h-[300px] flex flex-col items-start justify-between mt-40">
                        <h3 className="text-4xl font-semibold text-gray-800 text-left mb-4">
                            Click Analytics Over Time
                        </h3>

                        {myShortenUrls.length === 0 ? (
                            <div className="text-center w-full">
                                <h1 className="text-slate-800 font-serif sm:text-2xl text-[18px] font-bold mb-2">
                                    No Data For This Time Period
                                </h1>
                                <h3 className="sm:w-96 w-[90%] text-center sm:text-lg text-sm text-slate-600">
                                    Share your short link to view where your engagements are coming from.
                                </h3>
                            </div>
                        ) : (
                            <div className="h-[350px] w-full overflow-hidden">
                                {/* <Graph graphData={[]} /> */}
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-100 p-6 mt-8 rounded-lg shadow-md mt-24">
                        <h2 className="text-4xl font-semibold text-gray-800">Manage Links</h2>

                        <div className="py-5 sm:text-end text-center">
                            <button
                                className="bg-blue-500 font-bold px-4 py-2 rounded-md text-white"
                                onClick={() => setShortenPopUp(true)}
                            >
                                + Create a New Short URL
                            </button>
                        </div>

                        <div className="mt-4">
                            {myShortenUrls.length === 0 ? (
                                <div className="flex justify-center pt-8">
                                    <div className="flex gap-2 items-center justify-center py-6 sm:px-8 px-5 rounded-md shadow-lg bg-white">
                                        <h1 className="text-gray-800 font-montserrat sm:text-lg text-md font-semibold">
                                            You haven’t created any short links yet.
                                        </h1>
                                        <FaLink className="text-blue-500 sm:text-xl text-sm" />
                                    </div>
                                </div>
                            ) : (
                                <ShortnerUrlList
                                    data={myShortenUrls}
                                // refetch={fetchMyShortUrls}
                                // startDate={startDate}
                                //  endDate={endDate}
                                />
                            )}
                        </div>
                    </div>

                    <ShortenPopUp
                        refetch={fetchMyShortUrls}
                        open={shortenPopUp}
                        setOpen={setShortenPopUp}
                    />
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
