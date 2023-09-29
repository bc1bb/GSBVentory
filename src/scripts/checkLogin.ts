import getCookie from "./getCookie";

const checkLogin = async (cookies: string) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const token = getCookie("token", cookies);

    const response = await fetch(PUBLIC_BACKEND_URL + "/user", {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });

    if (response.ok) return true;
    else throw NotLoggedInError;
}

export default checkLogin;