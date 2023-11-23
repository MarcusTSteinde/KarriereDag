import Login from "@/components/Login";
import "../app/globals.css";
import Logo from "../public/logo.svg";
import Image from "next/image";
import IndexScoreboard from "@/components/indexscoreboard";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center self-center justify-between bg">
        <div className="mt-12">
          <Image src={Logo} alt="game logo" />
        </div>
        <div className="columns-2">
          <div className="absolute inset-y-0 left-32 w-16 top-80">
            <Login />
          </div>
          <div><IndexScoreboard /></div>
        </div>
      </div>
    </main>
  );
}
