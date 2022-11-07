const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "http://192.168.1.5:5000";

export const getPreviewImages = async (type, nextCursor) => {
    const params = new URLSearchParams();

    if (nextCursor) {
        params.append("nextCursor", nextCursor);
    } else params.append("nextCursor", 0);

    const response = await fetch(`${API_URL}/api/preview/${type}?${params}`);
    const responseJson = await response.json();
    return responseJson;
};

export const getImage = async (type, name, cursor) => {
    const response = await fetch(`${API_URL}/api/image/${type}/${name}`);
    return response;
};

export const searchImages = async (type, searchValue, nextCursor) => {
    const params = new URLSearchParams();
    params.append(`expression`, searchValue);

    if (nextCursor) {
        params.append("nextCursor", nextCursor);
    } else params.append("nextCursor", 0);

    const response = await fetch(`${API_URL}/api/search/${type}?${params}`);
    const responseJson = await response.json();

    return responseJson;
};
