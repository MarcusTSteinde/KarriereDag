import Login from "@/components/Login";
import "../app/globals.css";
import Logo from "../public/logo.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center self-center justify-between bg">
        <div className="mt-12">
        <Image src={Logo} alt="game logo" />
        </div>
        <div className="absolute right-2/3 top-1/3">
          <Login />
        </div>
      </div>
    </main>
  );
}
