import {PUBLIC_BACKEND_URL} from "$env/static/public";
import getCookie from "$lib/scripts/getCookie";
import checkLogin from "$lib/scripts/checkLogin";
import type Hardware from "$lib/objs/Hardware";

export default async (cookies: string, type: string) => {
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