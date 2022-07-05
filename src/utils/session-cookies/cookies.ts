
import Cookies from "js-cookie";
import { setCookie} from 'nookies';
export function getCookie(key: string) {
	return Cookies.get(key);
}
export function setSession (key: string, value: string) {
	setCookie(undefined, key,value, { maxAge: 31536000 }); //2023-05-22T20:18:29.891Z
}

