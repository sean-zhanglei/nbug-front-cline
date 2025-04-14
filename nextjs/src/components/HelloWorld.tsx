/**
 * React核心Hook和API导入
 * 1. useState - 基础状态管理
 * 2. useMemo - 性能优化-记忆计算结果
 * 3. useEffect - 副作用处理
 * 4. useCallback - 性能优化-记忆函数
 * 5. useRef - DOM引用/可变值容器
 * 6. useReducer - 复杂状态管理
 * 7. useLayoutEffect - DOM变更后同步执行
 * 8. useImperativeHandle - 自定义暴露给父组件的实例值
 * 9. forwardRef - Ref转发
 */
import React, { 
  useState,       
  useMemo,        
  useEffect,      
  useCallback,    
  useRef,        
  useReducer,     
  useLayoutEffect,
  useImperativeHandle,
  forwardRef      
} from 'react';
import { ExampleController } from '../controller/example.controller';
import ChildComponent from './ChildComponent';
import { useTheme } from './context/ThemeContext';
import { UseReducerDemo } from './features/hooks/UseReducerDemo';
import { CompoundComponentDemo } from './features/patterns/CompoundComponent';

/**
 * 列表项数据结构
 * @property id - 唯一标识
 * @property name - 显示名称 
 */
interface Item {
  id: number;
  name: string;
}

/**
 * Todo项数据结构
 * @property id - 唯一标识
 * @property text - 任务内容
 * @property completed - 完成状态
 */
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * Reducer Action类型定义
 * 支持三种操作:
 * 1. ADD - 添加新任务
 * 2. TOGGLE - 切换任务状态
 * 3. DELETE - 删除任务
 */
type Action = 
  | { type: 'ADD'; text: string }      // 添加任务时需要文本内容
  | { type: 'TOGGLE'; id: number }     // 切换状态需要任务ID
  | { type: 'DELETE'; id: number };    // 删除任务需要任务ID

/**
 * Todo Reducer函数
 * @param state - 当前状态
 * @param action - 分发的动作
 * @returns 新的状态
 */
function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [...state, {
        id: Date.now(),
        text: action.text,
        completed: false
      }];
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

/**
 * 组件暴露给父级的Ref方法
 */
interface HelloWorldRef {
  focusInput: () => void;               // 聚焦输入框
  getInputValue: () => string | undefined; // 获取输入框值
}

/**
 * 组件Props定义
 * (当前组件无外部传入props，保留接口以备扩展)
 */
interface HelloWorldProps {}

/**
 * HelloWorld组件 - React特性演示组件
 * 演示了React的主要Hook和高级特性
 */
const HelloWorld = forwardRef<HelloWorldRef, HelloWorldProps>((props, ref) => {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const controller = new ExampleController();
  const [message, setMessage] = useState(controller.getMessage());
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTodo, setNewTodo] = useState('');
  const [count, setCount] = useState(0);
  const [showExtra, setShowExtra] = useState(true);
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'React' },
    { id: 2, name: 'Vue' },
    { id: 3, name: 'Angular' }
  ]);
  const [newItem, setNewItem] = useState('');
  const [childMessage, setChildMessage] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const doubledCount = useMemo(() => count * 2, [count]);
  // 复杂计算缓存示例 - 使用useMemo避免重复计算
  const heavyComputation = useMemo(() => {
    let result = 0;
    // 模拟复杂计算
    for(let i = 0; i < 1000; i++) {
      result += Math.sqrt(i);
    }
    return result;
  }, []); // 空依赖数组表示只计算一次

  // 副作用示例 - 组件挂载时执行
  useEffect(() => {
    setCreatedAt(new Date().toLocaleTimeString()); // 记录创建时间
  }, []); // 空依赖数组表示只在挂载时执行

  const reverseMessage = useCallback(() => {
    setMessage(message.split('').reverse().join(''));
  }, [message]);

  const increment = useCallback(() => setCount(c => c + 1), []);
  const toggleShow = useCallback(() => setShowExtra(s => !s), []);

  const addItem = useCallback(() => {
    if (newItem.trim()) {
      setItems([...items, { 
        id: items.length + 1,
        name: newItem 
      }]);
      setNewItem('');
    }
  }, [items, newItem]);

  const handleChildEvent = useCallback(
    (payload: { message: string; timestamp: string }) => {
      setChildMessage(`${payload.message} (${payload.timestamp})`);
    }, 
    []
  );

  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      dispatch({ 
        type: 'ADD', 
        text: newTodo 
      });
      setNewTodo('');
    }
  }, [newTodo]);

  // 副作用示例 - 在DOM更新后执行
  useEffect(() => {
    console.log('DOM更新后执行');
  }, [count]); // count变化时执行

  /**
   * 使用useImperativeHandle自定义暴露给父组件的实例值
   * 1. 避免直接暴露整个组件实例
   * 2. 提供明确的API接口给父组件调用
   * 3. 配合forwardRef使用实现ref转发
   */
  useImperativeHandle(ref, () => {
    return {
      // 聚焦输入框方法
      focusInput: () => {
        inputRef.current?.focus();
      },
      // 获取输入框当前值方法
      getInputValue: () => {
        return inputRef.current?.value;
      }
    };
  }, []); // 空依赖数组确保只初始化一次

  return (
    <div 
      className="main-content" 
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
      style={{ background: theme.background, color: theme.foreground }}
    >
      <h1>{message}</h1>
      <button onClick={reverseMessage}>反转消息</button>

      <p>计数: {count}</p>
      <p>翻倍计数: {doubledCount}</p>
      <button onClick={increment}>增加</button>

      {showExtra ? (
        <div>
          <p>当前计数是: {count}</p>
          <button onClick={toggleShow}>隐藏</button>
        </div>
      ) : (
        <button onClick={toggleShow}>显示更多</button>
      )}

      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            {item.name} - 索引: {index}
          </li>
        ))}
      </ul>
      <input 
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && addItem()}
      />
      <p>复杂计算结果: {heavyComputation}</p>
      
      <ChildComponent 
        message={message}
        count={count}
        onChildEvent={handleChildEvent}
      />

      <div>
        <h3>Todo List (useReducer示例)</h3>
        <input
          ref={inputRef}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && addTodo()}
        />
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
              <button onClick={() => dispatch({ type: 'TOGGLE', id: todo.id })}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => dispatch({ type: 'DELETE', id: todo.id })}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 新增的特性演示组件 */}
      <UseReducerDemo />
      <CompoundComponentDemo />

      <p>组件创建时间: {createdAt}</p>
      {childMessage && <p>子组件消息: {childMessage}</p>}
    </div>
  );
});

export default HelloWorld;
