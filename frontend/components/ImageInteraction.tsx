import React, { useEffect, useState } from "react";
import styles from "../styles/generateRoom.module.css";
import DragImages from "./Draggable/DragImages";

type Props = {
    size: string;
    wallpaperPreview: string;
    flooringPreview: string;
};

export default function ImageInteraction({
    size,
    wallpaperPreview,
    flooringPreview,
}: Props) {
    const [selectedWallpaper, setSelectedWallpaper] = useState<string>("");
    const [selectedFlooring, setSelectedFlooring] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            if (wallpaperPreview != "") {
                await fetchImage("wallpaper", wallpaperPreview + size + ".png");
            }
            if (flooringPreview != "") {
                await fetchImage("flooring", flooringPreview + size + ".png");
            }
        };

        fetchData();
    }, [size, wallpaperPreview, flooringPreview]);

    async function fetchImage(type: string, name: string) {
        if (type == "wallpaper") setSelectedWallpaper(`${type}/${name}`);
        if (type == "flooring") setSelectedFlooring(`${type}/${name}`);
    }

    return (
        <div
            className={styles.image_stack}
            style={{ width: "100%", height: "100%" }}
        >
            <DragImages
                wallpaper={selectedWallpaper}
                flooring={selectedFlooring}
            />
        </div>
    );
}
