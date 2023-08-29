import { get, set } from "idb-keyval";
import { createTask, deleteTask, getTasks, updateTask } from "./hooks/tasks";

if (window !== undefined) {
	window.addEventListener("online", async (e) => {
		console.log("Internet conenction detected. Syncing with server...");

		const indexedDbTasks = await get("tasks");
		await indexedDbTasks.forEach(async (task) => {
			if (task.created) {
				createTask(task);
				console.log(`Created task with ID: ${task.id}`);
			} else if (task.updated) {
				updateTask(task);
				console.log(`Updated task with ID: ${task.id}`);
			} else if (task.deleted) {
				deleteTask(task.id);
				console.log(`Deleted task with ID: ${task.id}`);
			}
		});

		const apiTasks = await getTasks();
		await set("tasks", apiTasks);

		console.log("Updated all tasks with API database!");
	});
}
