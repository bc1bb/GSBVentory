import getCookie from "./getCookie";
import checkLogin from "./checkLogin";
import type Hardware from "@/objs/Hardware";

export default async (cookies: string) => {
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

        return await response.json() as Hardware[];
    } catch (error) {
        throw error;
    }
}