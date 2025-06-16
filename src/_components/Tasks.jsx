import { useState } from "react";
import Header from "./Header";

function Tasks() {
  const [inputValue, setInputValue] = useState("test");
  const [messages, setMessages] = useState([
    "Hello World, This is a test message",
  ]);

  const handleButtonClick = () => {
    setMessages([...messages, inputValue]);
  };

  return (
    <div>
      <Header>Add a new task</Header>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button className="button" onClick={handleButtonClick}>
        Add Task
      </button>

      <Header>
        <h1>Tasks</h1>
      </Header>

      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
