import getCookie from "./getCookie";
import checkLogin from "./checkLogin";
import type HardwareType from "@/objs/HardwareType";

const fetchHardwareTypes = async (cookies: string) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        await checkLogin(cookies);
    } catch {
        throw NotLoggedInError;
    }
    const token = getCookie("token", cookies);

    try {
        const response = await fetch(PUBLIC_BACKEND_URL + "/hmu/type", {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        });

        return await response.json() as HardwareType[];
    } catch (error) {
        throw error;
    }
}

export default fetchHardwareTypes;