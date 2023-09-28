import {PUBLIC_BACKEND_URL} from "$env/static/public";
import getCookie from "$lib/scripts/getCookie";
import type User from "$lib/objs/User";

export default async (cookies: string) => {
    const token = getCookie("token", cookies);

    try {
        const response = await fetch(PUBLIC_BACKEND_URL + "/user", {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        });

        return await response.json() as User;
    } catch (error) {
        throw NotLoggedInError;
    }
}