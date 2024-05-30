import Cookies from 'js-cookie';

export function getTokenFromCookie() {
    return Cookies.get('access_token');
}