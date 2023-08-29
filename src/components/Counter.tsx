import React, { useState } from "react";

export default function Counter() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<button onClick={() => setCount(count - 1)}>Decrement</button>
			<h1>Counter: {count}</h1>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
}
