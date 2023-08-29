import { get, set } from "idb-keyval";
import { general } from "../config";

export default async function useAuth() {
	const authToken = await get("auth");

	if (!authToken) return null;

	const res = await fetch(`${general.backend_url}/auth/jwt/verify`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});

	if (res.status !== 200) {
		set("auth", null);

		return null;
	}

	const resJson = await res.json();

	return { authToken, email: resJson.email };
}
