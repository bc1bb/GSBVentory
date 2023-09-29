import getCookie from "./getCookie";

const checkLogin = async (cookies: string) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const token = getCookie("token", cookies);

    try {
        const response = await fetch(PUBLIC_BACKEND_URL + "/user", {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });

        return response.ok;
    } catch (error) {
        return false
    }
}

export default checkLogin;