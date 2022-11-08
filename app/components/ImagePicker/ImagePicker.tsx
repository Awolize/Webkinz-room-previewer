import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getPreviewImages, searchImages } from "../../client_api/api";
import LoadMore from "./LoadMore";

// type = "flooring" or "wallpaper"
type Props = { type: string; callback: Function };

export default function ImagePicker({
    type,
    callback: selectedImageCallback,
}: Props) {
    const [search, setSearch] = useState<string>("");
    const [previews, setPreviews] = useState<Array<string>>([]);
    const [nextCursor, setNextCursor] = useState<number>(0);
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            await fetchImagePreviews(type, nextCursor);
        };
        fetchData();
    }, []);

    async function fetchImagePreviews(type: string, nextCursor: number) {
        const responseJson = await getPreviewImages(type, nextCursor);
        for (let index = 0; index < responseJson.data.length; index++) {
            const name = responseJson.data[index];
            responseJson.data[index] = `/${type}/${name}`;
        }

        setPreviews(responseJson.data);
        setNextCursor(responseJson.nextCursor);
    }

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();

        const responseJson = await searchImages(type, search, nextCursor);
        setPreviews(responseJson.data);
        setNextCursor(responseJson.nextCursor);
    };

    const resetForm = async (event: any) => {
        await fetchImagePreviews(type, 0);
        setSearch("");
    };

    const handleLoadMoreButtonClick = async (
        type: string,
        searchValue: string,
        nextCursor: number
    ) => {
        const responseJson = await searchImages(type, searchValue, nextCursor);

        setPreviews((currents) => [...currents, ...responseJson.data]);
        setNextCursor(responseJson.nextCursor);
    };

    const imageClick = async (image: string) => {
        let url = image;
        let urlParts = url.split("/");
        let itemName = urlParts[urlParts.length - 1];
        itemName = itemName.split(".")[0]; // remove .png

        selectedImageCallback(type, itemName);
        setSelected(itemName);
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className="px-4 py-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={`Search ${type}...`}
                        onChange={(event) => {
                            setNextCursor(0);
                            setSearch(event.target.value);
                        }}
                    ></input>
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div
                className={"flex flex-wrap gap-2 content-start p-1"}
                style={{
                    minHeight: "83vh",
                    maxHeight: "83vh",
                    overflow: "auto",
                }}
            >
                {previews.map(
                    (
                        image: string, // image is a src_url to the server. like http://192.168.1.5:5000/api/image/flooring/Bakeshopflooring.png
                        index: number
                    ) => (
                        <a
                            onClick={() => imageClick(image)}
                            key={index}
                            className="relative flex w-36 h-36"
                        >
                            <Image src={image} key={index} layout="fill" />
                        </a>
                    )
                )}
            </div>

            <LoadMore
                callback={() =>
                    handleLoadMoreButtonClick(type, search, nextCursor)
                }
                disabled={nextCursor ? false : true}
            />
        </>
    );
}
