import React, { useState } from "react";
import getUser from "../../utils/hooks/useAuth";
import { getTasks } from "../../utils/hooks/tasks";

export default function Counter({ request }) {
	const [count, setCount] = useState(0);

	getTasks().then((tasks) => {
		console.log(tasks);
	});

	return (
		<div>
			<button onClick={() => setCount(count - 1)}>Decrement</button>
			<p>Counter: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
}
