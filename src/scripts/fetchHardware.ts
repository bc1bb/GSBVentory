import getCookie from "./getCookie";
import checkLogin from "./checkLogin";
import type Hardware from "@/objs/Hardware";

const fetchHardware = async (cookies: string, internalId: string) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        await checkLogin(cookies);
    } catch {
        throw NotLoggedInError;
    }
    const token = getCookie("token", cookies);

    const response = await fetch(PUBLIC_BACKEND_URL + "/hmu", {
        method: 'GET',
        headers: {
            'Authorization': token
        },
    });

    const allHardware = await response.json() as Hardware[];

    for (const hardware of allHardware) {
        if(hardware.internalId === internalId) {
            return hardware as Hardware;
        }
    }
    throw NotFoundError;
}

export default fetchHardware;