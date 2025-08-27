"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [user, setUser] = useState([]);
   async function addUsers() {
    if(!name){
        alert("Enter the values");
    }
    const res= await fetch("api/users",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name}),
    });
    const data=await res.json();
    setUser(data)
    fetchUser();
  }
  async function fetchUser() {
    let data = await fetch("/api/users");
    let jsonData = await data.json();
    setUser(jsonData);
  }
  return (
    <div>
      <div>
        <h1>Enter the values for users</h1>
        <input
          type="text"
          placeholder="Enter the name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={addUsers}>Add User</button>
      </div>
      <button onClick={fetchUser}>Get Users</button>
      {user.map((item) => {
        return (
          <li>
            {item.id}- {item.name}
          </li>
        );
      })}
    </div>
  );
}
