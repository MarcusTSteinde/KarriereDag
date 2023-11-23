import * as React from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import "../styles/login.css";


  const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();

    // Extract data from the form
    const formData = new FormData(event.currentTarget);
    const nickname = formData.get('nickname');
    const phoneNumber = formData.get('phoneNumber');

    // Your registration logic here (replace with actual API call)
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
        alert("Registration successful!");
      } else {
        alert(`Registration failed with status code: ${response.status}`);
        const errorText = await response.text();
        console.error(errorText);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  }


export default function InputFormProps() {
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1} sx={{ width: 400 }}>
        <Input name="nickname" placeholder="Nickname" required />
        <Input name="phoneNumber" placeholder="Phone number" required />
        <div>
          <button className="buttonbox">
            Register
          </button>
        </div>
      </Stack>
    </form>
  );
}
