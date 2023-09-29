import getCookie from "./getCookie";
import checkLogin from "./checkLogin";
import fetchHardware from "@/scripts/fetchHardware";

const deleteHardware = async (cookies: string, internalId: string) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        await checkLogin(cookies);
    } catch {
        throw NotLoggedInError;
    }

    try {
        await fetchHardware(cookies, internalId);
    } catch (error) {
        throw error;
    }

    const token = getCookie("token", cookies);

    let urlencoded = new URLSearchParams();
    urlencoded.append("internalId", internalId);

    const response = await fetch(PUBLIC_BACKEND_URL + "/hmu", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': token
        },
        body: urlencoded
    });

    return response.ok;
}

export default deleteHardware;