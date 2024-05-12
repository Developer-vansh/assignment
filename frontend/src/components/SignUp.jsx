import React, { useState } from "react";
import signup from "../signup.jpg";

export default function SignUp() {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if(data.email === "" || data.firstName === "" || data.lastName === "") 
        return alert("Please fill all the fields");
    setLoading(true);
    console.log(data);
    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setLoading(false); // Set loading to false after response
    if (res.status === 200) {
      alert("User registered successfully");
      setData({
        email: "",
        firstName: "",
        lastName: "",
      });
    } else {
      alert("User already exists");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-yellow-400 to-blue-500">
      <div className="md:max-w-3xl md:flex-row mx-4 my-4 items-center justify-center w-full flex flex-col bg-white rounded-2xl shadow-lg">
        <div className="w-1/2 pr-4">
          <img
            src={signup}
            alt="Logo"
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>
        <div className="w-1/2 pl-4 p-4">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            TechHub
          </h2>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Sign Up
          </h2>
          <form className="space-y-6 mt-8" onSubmit={submit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                required
                className="input-field block w-full rounded-md border-2 p-2 border-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                required
                className="input-field block w-full rounded-md p-2 border-gray-300 border-2"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                required
                className="input-field block w-full rounded-md p-2 border-gray-300 border-2"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full py-3 font-semibold hover:from-blue-600 hover:to-green-500 transition duration-300"
                disabled={loading} // Disable button when loading is true
              >
                {loading ? "Signing Up..." : "Sign Up"} 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
