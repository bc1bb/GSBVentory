import getCookie from "./getCookie";
import checkLogin from "./checkLogin";
import type HardwareType from "@/objs/HardwareType";

const fetchHardwareType = async (cookies: string, hardwareTypeName: string) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        await checkLogin(cookies);
    } catch {
        throw NotLoggedInError;
    }
    const token = getCookie("token", cookies);

    const response = await fetch(PUBLIC_BACKEND_URL + "/hmu/type", {
        method: 'GET',
        headers: {
            'Authorization': token
        },
    });

    const responseJson = await response.json() as HardwareType[];

    for (const i of responseJson) {
        if(i.name == hardwareTypeName) {
            return i;
        }
    }

    throw NotFoundError;
}

export default fetchHardwareType;