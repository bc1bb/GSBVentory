import getCookie from "./getCookie";
import checkLogin from "./checkLogin";
import type Hardware from "@/objs/Hardware";

export default async (cookies: string, type: string) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        await checkLogin(cookies);
    } catch {
        throw NotLoggedInError;
    }
    const token = getCookie("token", cookies);

    try {
        const response = await fetch(PUBLIC_BACKEND_URL + "/hmu", {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        });

        const responseJson = await response.json() as Hardware[];
        let finalJson: Hardware[] = [];

        for (const i in responseJson) {
            if(responseJson[i].type == type) {
                finalJson.push(responseJson[i]);
            }
        }

        return finalJson as Hardware[];
    } catch (error) {
        throw error;
    }
}