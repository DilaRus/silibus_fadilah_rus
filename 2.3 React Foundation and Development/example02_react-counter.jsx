// FIX: the slide shows this component without the import below, so useState would be undefined.
// The import line is added so the component runs.
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export default Counter
