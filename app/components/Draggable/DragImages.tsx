import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

export interface DragItem {
    type: string;
    id: string;
}

type Props = { wallpaper: string; flooring: string };
export default function DragImages({ wallpaper, flooring }: Props) {
    const [boxes, setBoxes] = useState<{
        [key: string]: {
            url: string;
        };
    }>({
        a: { url: wallpaper },
        b: { url: flooring },
    });

    useEffect(() => {
        setBoxes({
            a: { url: wallpaper },
            b: { url: flooring },
        });
    }, [wallpaper, flooring]);

    return (
        <>
            {Object.keys(boxes).map((key) => {
                const { url } = boxes[key] as {
                    url: string;
                };

                return (
                    <Draggable key={key}>
                        <Resizable
                            defaultSize={{
                                width: 400,
                                height: 360,
                            }}
                            style={{
                                position: "absolute",
                                backgroundSize: "contain",
                                backgroundImage: `url(${url})`,
                                backgroundRepeat: "no-repeat",
                            }}
                            lockAspectRatio={true}
                        ></Resizable>
                    </Draggable>
                );
            })}
        </>
    );
}
