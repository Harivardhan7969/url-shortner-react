import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center w-full h-[450px]">
            <div className="flex flex-col items-center gap-1">
                <RotatingLines
                    visible={true}
                    //  height="65"                 // ✅ Must be a string
                    width="65"                  // ✅ Must be a string
                    //  color="red"
                    strokeWidth="5"            // ✅ Must be a string
                    animationDuration="0.75"   // ✅ Must be a string
                    ariaLabel="rotating-lines-loading"
                //wrapperStyle={{}}
                // wrapperClass=""
                />
            </div>
        </div>
    );
};

export default Loader;
