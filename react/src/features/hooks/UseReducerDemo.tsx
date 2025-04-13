import React, { useReducer } from 'react';

// 定义reducer函数
function counterReducer(state: number, action: { type: string }) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return 0;
    default:
      return state;
  }
}

export const UseReducerDemo = () => {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <h2>useReducer示例</h2>
      <p>当前计数: {count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>增加</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>减少</button>
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </div>
  );
};
