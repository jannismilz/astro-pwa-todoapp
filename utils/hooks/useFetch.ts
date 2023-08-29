import { general } from "../config";
import useAuth from "./useAuth";

export default async function useFetch(
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
	body: string | null = null
) {
	const auth = await useAuth();

	if (!auth) return null;

	const res = await fetch(`${general.backend_url}${url}`, {
		method,
		headers: {
			Authorization: `Bearer ${auth.authToken}`,
		},
		...(body && { body: JSON.stringify(body) }),
	});

	if (!res.ok) return null;

	return res;
}
