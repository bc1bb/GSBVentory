import getCookie from "./getCookie";
import checkLogin from "./checkLogin";
import User from "@/objs/User";

const findUsers = async (cookies: string) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        await checkLogin(cookies);
    } catch {
        throw NotLoggedInError;
    }
    const token = getCookie("token", cookies);

    const response = await fetch(PUBLIC_BACKEND_URL + "/umu", {
        method: 'GET',
        headers: {
            'Authorization': token
        },
    });

    return await response.json() as User[];
}

export default findUsers;