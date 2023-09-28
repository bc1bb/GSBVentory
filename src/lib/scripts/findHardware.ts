import {PUBLIC_BACKEND_URL} from "$env/static/public";
import getCookie from "$lib/scripts/getCookie";
import checkLogin from "$lib/scripts/checkLogin";
import type Hardware from "$lib/objs/Hardware";

export default async (cookies: string) => {
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

        return await response.json() as Hardware[];
    } catch (error) {
        throw error;
    }
}