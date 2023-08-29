import React, { useState } from "react";

export default function Counter() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<button onClick={() => setCount(count - 1)}>Decrement</button>
			<p>Counter: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
}
