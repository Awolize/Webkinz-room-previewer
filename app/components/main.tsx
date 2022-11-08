import React, { useState } from "react";

import styles from "../styles/layout.module.css";

import ImageInteraction from "./ImageInteraction";
import ImagePicker from "./ImagePicker/ImagePicker";

type Props = {};

// #page > header {
//     grid-area: head;
//     background-color: #8ca0ff;
//   }

//   #page > #sidebar {
//     grid-area: sidebar;
//     background-color: #ffa08c;
//   }

//   #page > #middle {
//     grid-area: middle;
//     background-color: #ffff64;
//   }

//   #page > footer {
//     grid-area: footer;
//     background-color: #8cffa0;
//   }

export default function GenerateRoom({}: Props) {
    const [selectedWallpaper, setSelectedWallpaper] = useState<string>("");
    const [selectedFlooring, setSelectedFlooring] = useState<string>("");
    const [imageSize, setImageSize] = useState<string>("Small");
    const [showModal, setShowModal] = React.useState(false);

    const callbackShowPart = async (type: string, item: string) => {
        if (type == "wallpaper") setSelectedWallpaper(item);
        if (type == "flooring") setSelectedFlooring(item);
    };

    return (
        <div>
            <div className={styles.page}>
                <header className="flex items-center justify-center px-4 py-5">
                    <Button
                        callback={() => setImageSize("Small")}
                        text="Small"
                    />
                    <Button
                        callback={() => setImageSize("Medium")}
                        text="Medium"
                    />
                    <Button
                        callback={() => setImageSize("Large")}
                        text="Large"
                    />
                </header>

                <div className={styles.sidebar}>
                    <div className="border-r-2  border-slate-700">
                        <ImagePicker
                            type="wallpaper"
                            callback={callbackShowPart}
                        />
                    </div>
                </div>

                <div className={styles.middle}>
                    <ImageInteraction
                        size={imageSize}
                        wallpaperPreview={selectedWallpaper}
                        flooringPreview={selectedFlooring}
                    />
                </div>

                <div className={styles.sidebar2}>
                    <div className="border-l-2 border-slate-700">
                        <ImagePicker
                            type="flooring"
                            callback={callbackShowPart}
                        />
                    </div>
                </div>

                {showModal ? (
                    <>
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                            <div className="relative w-auto max-w-3xl mx-auto my-6 shadow-2xl">
                                {/*content*/}
                                <div className="relative flex flex-col w-full rounded-md outline-none bg-slate-800 focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                                        <h3 className="text-3xl font-semibold text-slate-200">
                                            About this <i>website</i>
                                        </h3>
                                        <button
                                            className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        ></button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative flex-auto p-6">
                                        <p className="my-4 text-lg leading-relaxed text-slate-200">
                                            This is a website where you can mix
                                            and match wallpapers and floorings
                                            for the game Webkinz. All images are
                                            the intellectual property of Ganz
                                        </p>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                                        <Button
                                            style="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                            text="Close"
                                            callback={() => setShowModal(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                    </>
                ) : null}

                <footer className="flex items-center justify-center px-4 py-5">
                    <Button callback={() => setShowModal(true)} text="About" />
                </footer>
            </div>
        </div>
    );
}

type ButtonProps = { text: string; callback: Function; style?: any };
function Button({ text, callback: callback, style = "" }: ButtonProps) {
    const button_style =
        "border focus:outline-none focus:ring-4 \
        font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 \
        bg-gray-800 text-white border-gray-600 hover:bg-gray-70 \
        focus:ring-gray-700 \
        disabled:transform-none disabled:transition-none disabled:text-gray-500 \
        disabled:bg-gray disabled:text-white disabled:shadow-none disabled:hover:bg-gray-70" +
        style;

    return (
        <button onClick={() => callback()} className={button_style}>
            {text}
        </button>
    );
}
