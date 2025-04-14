import React from 'react';

interface ChildEventPayload {
  message: string;
  timestamp: string;
}

interface Props {
  message: string;
  count: number;
  onChildEvent: (payload: ChildEventPayload) => void;
}

const ChildComponent: React.FC<Props> = ({ 
  message, 
  count,
  onChildEvent 
}) => {
  const handleClick = () => {
    onChildEvent({
      message: `子组件消息 - 父组件计数: ${count}`,
      timestamp: new Date().toLocaleTimeString()
    });
  };

  return (
    <div className="child-component">
      <h3>子组件</h3>
      <p>来自父组件的消息: {message}</p>
      <p>来自父组件的计数: {count}</p>
      <button onClick={handleClick}>触发子组件事件</button>
    </div>
  );
};

export default ChildComponent;
