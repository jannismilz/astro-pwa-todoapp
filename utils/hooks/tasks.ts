import { get, set } from "idb-keyval";
import useFetch from "./useFetch";

type Task = {
	id: number;
	title: string;
	completed: boolean;
};

type CreatedTask = Omit<Task, "id"> & { created: boolean };
type UpdatedTask = Task & { updated: boolean };
type DeletedTask = Task & { deleted: boolean };

export async function getTasks() {
	let res;

	// Online
	if (navigator.onLine) {
		res = await useFetch("/auth/jwt/tasks");

		if (!res) return null;

		if (!res.ok) {
			console.error(res.status, res);
			return null;
		}

		res = await res.json();
		await set("tasks", res);
	}
	// Offline
	else {
		const tasks = await get("tasks");

		res = tasks || [];
	}

	return res;
}

export async function getTask(id: number) {
	let res;

	// Online
	if (navigator.onLine) {
		res = await useFetch(`/auth/jwt/task/${id}`);

		if (!res) return null;

		if (!res.ok) {
			console.error(res.status, res);
			return null;
		}

		res = await res.json();
	}
	// Offline
	else {
		const tasks = await get<Task[]>("tasks");

		res = tasks?.find((task) => task.id === id) || null;
	}

	return res;
}

export async function createTask(task: Omit<Task, "id"> | CreatedTask) {
	let res;

	// Online
	if (navigator.onLine) {
		res = await useFetch(`/auth/jwt/tasks`, "POST", JSON.stringify(task));

		if (!res) return null;

		if (!res.ok) {
			console.error(res.status, res);
			return null;
		}

		res = await res.json();

		const tasks = await get("tasks");
		tasks.push(res);
		await set("tasks", tasks);
	}
	// Offline
	else {
		const tasks = await get("tasks");
		(task as CreatedTask).created = true;
		tasks.push(task);
		await set("tasks", tasks);

		res = task;
	}

	return res;
}

export async function updateTask(task: Task) {
	let res;

	// Online
	if (navigator.onLine) {
		res = await useFetch(`/auth/jwt/tasks`, "PUT", JSON.stringify(task));

		if (!res) return null;

		if (!res.ok) {
			console.error(res.status, res);
			return null;
		}

		const tasks = await get("tasks");
		const taskIndex = tasks.findIndex((t) => t.id === task.id);
		tasks[taskIndex] = res;
		await set("tasks", tasks);
	}
	// Offline
	else {
		const tasks = await get("tasks");
		const taskIndex = tasks.findIndex((t) => t.id === task.id);
		(tasks[taskIndex] as UpdatedTask).updated = true;
		await set("tasks", tasks);

		res = tasks[taskIndex];
	}

	return res;
}

export async function deleteTask(id: number) {
	let res;

	// Online
	if (navigator.onLine) {
		await useFetch(`/auth/jwt/task/${id}`, "DELETE");

		const tasks = await get("tasks");
		const taskIndex = tasks.findIndex((t) => t.id === id);
		(tasks[taskIndex] as DeletedTask).deleted = true;
		await set("tasks", tasks);
	}
	// Offline
	else {
		const tasks = await get("tasks");
		const taskIndex = tasks.findIndex((t) => t.id === id);
		(tasks[taskIndex] as DeletedTask).deleted = true;
		await set("tasks", tasks);

		res = tasks[taskIndex];
	}

	return res;
}
