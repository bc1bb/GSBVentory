import getCookie from "./getCookie";
import checkLogin from "./checkLogin";
import fetchHardware from "@/scripts/fetchHardware";
import findUser from "@/scripts/findUser";

const deleteUser = async (cookies: string, username: string) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        await checkLogin(cookies);
    } catch {
        throw NotLoggedInError;
    }

    try {
        await findUser(cookies, username);
    } catch (error) {
        throw error;
    }

    const token = getCookie("token", cookies);

    let urlencoded = new URLSearchParams();
    urlencoded.append("username", username);

    const response = await fetch(PUBLIC_BACKEND_URL + "/umu", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': token
        },
        body: urlencoded
    });

    return response.ok;
}

export default deleteUser;