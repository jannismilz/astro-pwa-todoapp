import { set } from "idb-keyval";
import useFetch from "./useFetch";

type LoginCredentials = {
	email: string;
	password: string;
};

export default async function useLogin(credentials: LoginCredentials) {
	const res = await useFetch(
		`/auth/jwt/sign`,
		"POST",
		JSON.stringify(credentials)
	);

	if (!res) return null;

	if (!res.ok) {
		console.error(res.status, res);
		return null;
	}

	const resJson = await res.json();

	const authToken = resJson.token;

	await set("auth", authToken);

	return authToken;
}
