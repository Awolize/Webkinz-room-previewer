export const getPreviewImages = async (type, nextCursor) => {
    const params = new URLSearchParams();

    if (nextCursor) {
        params.append("nextCursor", nextCursor);
    } else {
        params.append("nextCursor", 0);
    }

    const response = await fetch(`/api/preview/${type}?${params}`);
    const responseJson = await response.json();
    return responseJson;
};

export const searchImages = async (type, searchValue, nextCursor) => {
    const params = new URLSearchParams();
    params.append(`expression`, searchValue);

    if (nextCursor) {
        params.append("nextCursor", nextCursor);
    } else params.append("nextCursor", 0);

    const response = await fetch(`/api/search/${type}?${params}`);
    const responseJson = await response.json();

    return responseJson;
};
