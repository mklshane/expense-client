import React, { useState } from 'react';


function Apps() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className='mx-auto max-w-md p-4 text-center'>
      <h1>Count: {count}</h1>
      <button className='font-bold border border-black p-2' onClick={increment}>Increment</button>
    </div>
  );
}

export default Apps;
