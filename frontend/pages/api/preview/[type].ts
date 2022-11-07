import { NextApiRequest, NextApiResponse } from "next";

const CURSOR_STEPS = 25;
const { readdirSync } = require("fs");
const path = require("path");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Init
    const cursor = parseInt(req.query.nextCursor as string) || 0;
    const previewType = req.query.type as string;

    // Pre-Check
    if (!["wallpaper", "flooring", "wallpaint"].includes(previewType))
        return res.send({
            success: false,
            type: previewType,
            data: [],
            nextCursor: cursor,
        });

    // Logic
    const [previews, cursorStop] = await getPreviews(previewType, cursor);

    // Post-Check
    const success = previews.length > 0 ? true : false;
    const nextCursor = cursorStop ? false : cursor + CURSOR_STEPS;

    // Done
    return res.send({
        success: success,
        type: previewType,
        data: previews,
        nextCursor: nextCursor,
    });
}

async function getPreviews(folder, cursor) {
    const filePath = path.join("./public", folder);
    const preview = readdirSync(filePath).filter(
        (name) =>
            !(
                name.endsWith("Small.png") ||
                name.endsWith("Medium.png") ||
                name.endsWith("Large.png")
            )
    );

    const slicedPreview = preview.slice(cursor, cursor + CURSOR_STEPS);

    if (cursor + CURSOR_STEPS >= preview.length) {
        return [slicedPreview, true] as const;
    } else {
        return [slicedPreview, false] as const;
    }
}
