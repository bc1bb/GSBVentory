import getCookie from "./getCookie";
import type User from "@/objs/User";

const fetchUser = async (cookies: string) => {
    const token = getCookie("token", cookies);
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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

export default fetchUser;