import React from "react";

type Props = { callback: Function; disabled: boolean };

export default function LoadMore({ callback, disabled }: Props) {
    return (
        <>
            <div className="flex items-center justify-center px-4 pt-5">
                <button
                    disabled={disabled}
                    type="button"
                    className="border 
                        focus:outline-none  focus:ring-4 
                        font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
                        bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-70
                        focus:ring-gray-700
                        
                        disabled:transform-none disabled:transition-none disabled:text-gray-500
                        disabled:bg-gray disabled:shadow-none disabled:hover:bg-gray-70"
                    onClick={() => callback()}
                >
                    Load More
                </button>
            </div>
        </>
    );
}
