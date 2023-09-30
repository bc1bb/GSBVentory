import getCookie from "./getCookie";
import checkLogin from "./checkLogin";
import fetchHardwareType from "@/scripts/fetchHardwareType";

const deleteHardwareType = async (cookies: string, hardwareTypeName: string) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        await checkLogin(cookies);
    } catch {
        throw NotLoggedInError;
    }

    try {
        await fetchHardwareType(cookies, hardwareTypeName);
    } catch (error) {
        throw error;
    }

    const token = getCookie("token", cookies);

    let urlencoded = new URLSearchParams();
    urlencoded.append("name", hardwareTypeName);

    const response = await fetch(PUBLIC_BACKEND_URL + "/hmu/type", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': token
        },
        body: urlencoded
    });

    return response.ok;
}

export default deleteHardwareType;