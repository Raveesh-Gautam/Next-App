"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router=useRouter();
  function validate() {
    let err = {};
    if (!form.email) {
      err.email = "Value for email is required";
    }
    if (!form.password) {
      err.password = "Value for password is required";
    } else {
      if (form.password.length < 6) {
        err.password = "password needs to be greater than 6";
      }
    }
    return err;
  }
async  function onSubmitHandler(e) {
    e.preventDefault();
    let err=validate();
    if(Object.keys(err).length>0){
        return ;
    }
    const res=await fetch("/api/login",{
        method:'POST',
        body:JSON.stringify({email:form.email,password:form.password}),
        headers:{
            'Content-Type':'application/json'
        }
    })

    if(res.ok){
router.push("/dashboard");
    }else{
        alert("Login failed !")
    }
  }
  return (
    <div>
      <h1>Login page</h1>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
        <button type="submit" onClick={onSubmitHandler}>
          Login
        </button>
      </form>
    </div>
  );
}
