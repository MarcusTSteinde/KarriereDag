import * as React from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import "../styles/login.css";
import { useEffect, useState } from "react";

export default function InputFormProps() {

const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://boopabug.azurewebsites.net/api/players");

      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
        // You can also store the users in local storage or state as needed
        localStorage.setItem('users', JSON.stringify(usersData));
        console.log(users)
        console.log(usersData); // Log the data structure

      } else {
        console.error(`Failed to fetch users with status code: ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred while fetching users:", error);
    }
  };

  fetchUsers();
}, []);

const handleSubmit = async (event: {
  preventDefault: () => void;
  currentTarget: HTMLFormElement | undefined;
}) => {
  event.preventDefault();

  // Extract data from the form
  const formData = new FormData(event.currentTarget);
  const nickname = formData.get('nickname') as string; // Type assertion
  const phoneNumber = formData.get("phoneNumber");

  // Your registration logic here (replace with actual API call)
  try {
    const response = await fetch(
      "https://boopabug.azurewebsites.net/api/players",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: nickname,
          phoneNumber: phoneNumber,
        }),
      }
    );




    if (response.ok) {
      localStorage.setItem('nickname', nickname);
      alert("Registration successful!");
      
    } else {
      alert(`Registration failed with status code: ${response.status}`);
      const errorText = await response.text();
      console.error(errorText);
    }
  } catch (error) {
    console.error("An error occurred during registration:", error);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1} sx={{ width: 400 }}>
        <Input name="nickname" placeholder="Nickname" required />
        <Input name="phoneNumber" placeholder="Phone number" required />
        <div>
          <button className="buttonbox">Register</button>
        </div>
      </Stack>
    </form>
  );
}
