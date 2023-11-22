import * as React from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import "../styles/login.css";

export default function InputFormProps() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        alert(JSON.stringify(formJson));
      }}
    >
      <Stack spacing={1} sx={{
        width: 400
      }}>
        <Input placeholder="Nickname" required />
        <Input placeholder="Phone number" required />
        <button 
        // type="submit"
        className="buttonbox">
          Login
        </button>
      </Stack>
    </form>
  );
}
