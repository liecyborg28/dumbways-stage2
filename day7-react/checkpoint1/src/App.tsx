/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type PropsWithChildren } from "react";
import "./App.css";

function TodoContainer({ children }: PropsWithChildren) {
  return <div className="w-full">{children}</div>;
}

function TodoItem({ todo, handleClick }: any) {
  return (
    <div className="todo-item">
      {
        <p className={`text-amber-600 mr-3 ${todo.done ? "line-through" : ""}`}>
          {todo.text}
        </p>
      }
      <input
        type="checkbox"
        checked={todo.index}
        onChange={() => handleClick()}
      />
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { text: "Merapikan tempat tidur", done: false },
    { text: "Mandi", done: false },
    { text: "Sarapan", done: false },
    { text: "Masuk kelas bootcamp", done: false },
    { text: "Kerjain tugas bootcamp", done: false },
  ]);

  const toggleTodo = (index: number) => {
    setTodos((prev: any) =>
      prev.map((t: any, i: any) => (i === index ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="app">
      <span className="title">TO DO LIST:</span>
      <TodoContainer>
        {todos.map((todo: any, i: number) => (
          <TodoItem todo={todo} handleClick={() => toggleTodo(i)} />
        ))}
      </TodoContainer>
    </div>
  );
}

export default App;
