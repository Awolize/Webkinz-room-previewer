import { readFileSync } from "fs";
import { join, resolve } from "path";

const CURSOR_STEPS = 25;

export default async function handler(req, res) {
    // Init
    const expression = (req.query.expression || "").toLowerCase();
    const cursor = parseInt(req.query.nextCursor) || 0;
    const previewType = (req.query.type || "").toLowerCase();

    // Pre-Check
    if (!["wallpaper", "flooring", "wallpaint"].includes(previewType))
        return res.send({
            success: false,
            type: previewType,
            data: [],
            nextCursor: cursor,
        });

    // Logic
    const [previews, cursorStop] = await getFilteredPreviews(
        previewType,
        expression,
        cursor
    );

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

async function getFilteredPreviews(type, expression, cursor) {
    const file = join(resolve("public"), "generatedSource", type + ".json");
    const previewList = JSON.parse(readFileSync(file, "utf-8"));

    const filteredPreview = previewList.filter((fileName) => {
        let name = fileName.toLowerCase();
        return name.search(expression) != -1;
    });
    const slicedPreview = filteredPreview.slice(cursor, cursor + CURSOR_STEPS);
    const urlPreview = slicedPreview.map((name) => {
        return `/${type}/` + name;
    });

    if (cursor + CURSOR_STEPS >= filteredPreview.length)
        return [urlPreview, true] as const;
    else {
        return [urlPreview, false] as const;
    }
}
