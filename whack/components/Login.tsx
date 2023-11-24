import * as React from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import "../styles/login.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface User {
  id: number;
  nickname: string;
  phoneNumber: string;
}

export default function InputFormProps() {
  const [users, setUsers] = useState<User[]>([]);
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://boopabug.azurewebsites.net/api/players"
      );

      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
        localStorage.setItem("users", JSON.stringify(usersData));
        console.log(usersData);
      } else {
        console.error(`Failed to fetch users with status code: ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred while fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nickname = formData.get("nickname") as string;
    const phoneNumber = formData.get("phoneNumber");

    if (isUserExisting(nickname)) {
      alert("User with the same nickname already exists. Please choose a different nickname.");
      return;
    }

    try {
      const response = await fetch("https://boopabug.azurewebsites.net/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: nickname,
          phoneNumber: phoneNumber,
        }),
      });

      if (response.ok) {
        // Fetch users again after successful registration to get the updated list
        fetchUsers();
        localStorage.setItem("nickname", nickname);
        alert("Registration successful!");
        router.push("/howtoplay");

      } else {
        alert(`Registration failed with status code: ${response.status}`);
        const errorText = await response.text();
        console.error(errorText);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  const isUserExisting = (nickname: string) => {
    return users.some((user) => user.nickname === nickname);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1} sx={{ width: 400 }}>
        <Input name="nickname" placeholder="Nickname" required />
        <Input name="phoneNumber" placeholder="Phone number" required />
        <div>
          <button className="buttonbox" type="submit">Register</button>
        </div>
      </Stack>
    </form>
  );
}
