import getCookie from "./getCookie";
import checkLogin from "./checkLogin";
import User from "@/objs/User";
import Hardware from "@/objs/Hardware";

const findUser = async (cookies: string, username: string) => {
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

    const responseJson = await response.json() as User[];

    for (const i of responseJson) {
        if(i.username == username) {
            return i;
        }
    }

    throw NotFoundError;
}

export default findUser;