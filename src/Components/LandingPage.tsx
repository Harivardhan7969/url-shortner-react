import React from "react";
// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const dashBoardNavigateHandler = (): void => {
        navigate("/dashboard");
    };

    return (
        <div className="min-h-[calc(100vh-64px)] lg:px-14 sm:px-8 px-4">
            <div className="flex flex-col lg:flex-row justify-between items-center pt-16 lg:py-5 gap-8 lg:gap-10">
                <div className="flex-1">
                    <motion.h1
                        initial={{ opacity: 0, y: -80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="font-bold font-roboto text-slate-800 text-3xl sm:text-4xl md:text-5xl leading-10 sm:leading-[45px] md:leading-[55px] lg:w-full md:w-[70%] w-full"
                    >
                        Wisestep Simplifies URL Shortening For Efficient Sharing.
                    </motion.h1>
                    <p className="text-slate-700 text-sm my-5">
                        Wisestep streamlines the process of URL shortening, making link
                        sharing effortless and efficient. With its intuitive and
                        user-friendly interface, Wisestep allows you to generate concise,
                        easy-to-share URLs in seconds. Simplify your sharing experience and
                        track performance with powerful insights—only with Wisestep’s smart
                        link management.
                    </p>
                    <div className="flex items-center gap-3">
                        <motion.button
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            onClick={dashBoardNavigateHandler}
                            className="bg-custom-gradient w-40 text-white rounded-md py-2"
                        >
                            Manage Links
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            onClick={dashBoardNavigateHandler}
                            className="border-btnColor border w-40 text-btnColor rounded-md py-2"
                        >
                            Create Short Link
                        </motion.button>
                    </div>
                </div>

                <div className="flex-1 flex justify-center w-full">
                    <motion.img
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="sm:w-[480px] w-[400px] object-cover rounded-md"
                        src="/images/gif.gif"
                        alt="Illustration"
                    />
                </div>
            </div>

            <div className="sm:pt-12 pt-7">
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-slate-800 font-roboto font-bold text-3xl text-center mx-auto sm:w-[80%] md:w-[70%] lg:w-[60%]"
                >
                    Trusted by individuals and teams at the world best companies
                </motion.p>

                <div className="pt-4 pb-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-7 mt-4">
                    <Card
                        title="Simple URL Shortening"
                        desc="Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle."
                    />
                    <Card
                        title="Powerful Analytics"
                        desc="Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies."
                    />
                    <Card
                        title="Enhanced Security"
                        desc="Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure."
                    />
                    <Card
                        title="Fast and Reliable"
                        desc="Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users."
                    />
                </div>

                {/* Testimonials Section */}
                <div className="bg-gray-100 py-16 px-4 rounded-md mt-12 mb-16">
                    <h2 className="text-center text-4xl font-bold mb-6 text-slate-800">
                        What Users Say
                    </h2>
                    <p className="text-center text-lg max-w-2xl mx-auto mb-8 text-slate-700 whitespace-nowrap">
                        Hear from businesses and individuals who trust LinkLitez for their
                        URL management needs.
                    </p>

                    <div className="flex justify-center mb-10">
                        <img
                            src="/images/nearmandv.png"
                            alt="User Testimonials"
                            className="w-full max-w-xl rounded-lg shadow-md"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-md shadow-lg">
                            <p className="italic">
                                "LinkLitez made link tracking effortless. Highly recommended!"
                            </p>
                            <h3 className="font-semibold mt-4">
                                - John Doe, Digital Marketer
                            </h3>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-md shadow-lg">
                            <p className="italic">
                                "Seamless integration with my tools. Game-changer!"
                            </p>
                            <h3 className="font-semibold mt-4">- Sarah, Content Creator</h3>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-md shadow-lg">
                            <p className="italic">
                                "Love the analytics! Helps me understand audience behavior
                                better."
                            </p>
                            <h3 className="font-semibold mt-4">- Alex, E-commerce Owner</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
