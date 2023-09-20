export default (cookieName: string, cookies: string): string => {
    const cookiesArray = cookies.split(';');

    for (let i = 0; i < cookiesArray.length; i++) {
        const cookie = cookiesArray[i].trim();
        const cookieParts = cookie.split('=');
        const name = cookieParts[0];
        const value = cookieParts[1];
        if (name === cookieName) {
            return value;
        }
    }
    return "";
}
