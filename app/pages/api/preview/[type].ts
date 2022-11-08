import { NextApiRequest, NextApiResponse } from "next";
import { readdirSync, readFileSync } from "fs";
import { join, resolve } from "path";

const CURSOR_STEPS = 25;

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

async function getPreviews(type, cursor) {
    const file = join(resolve("public"), "generatedSource", type + ".json");
    const previewList = JSON.parse(readFileSync(file, "utf-8"));
    const slicedPreview = previewList.slice(cursor, cursor + CURSOR_STEPS);

    if (cursor + CURSOR_STEPS >= previewList.length) {
        return [slicedPreview, true] as const;
    } else {
        return [slicedPreview, false] as const;
    }
}
