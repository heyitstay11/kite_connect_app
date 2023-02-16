import reactLogo from "./assets/react.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const searchParams = new URLSearchParams(document.location.search);
  const request_token = searchParams.get("request_token");
  const [user, setUser] = useState(null);

  const handleToken = async () => {
    if (!request_token) return;
    try {
      const res = await fetch("http://localhost:5000/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: request_token }),
      });
      const data = await res.json();
      console.log(data);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {user && JSON.stringify(user)}
      {request_token ? (
        <button onClick={handleToken} style={{ background: "powderblue" }}>
          Call API
        </button>
      ) : (
        <a href="https://kite.zerodha.com/connect/login?api_key=l5jgi9wzwsfuc6ip&v=3">
          Login to Kite
        </a>
      )}
    </div>
  );
}

export default App;
