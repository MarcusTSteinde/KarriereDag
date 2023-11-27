"use client"
import Login from "@/components/Login";
import "./globals.css";
import Logo from "../public/logo.svg";
import Image from "next/image";
import IndexScoreboard from "@/components/indexscoreboard";
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center self-center justify-between bg">
        <div className="mt-12">
          <Image src={Logo} alt="game logo" />
        </div>
        
        <div className="logo-container2">
        </div>

        <div className="logo-container3">
        </div>

        <div className="flex flex-row gap-20 justify-around">
        <div className="">
          <Login />
        </div>
        <div className="">
          <IndexScoreboard />
        </div>
        </div>
        <div className="adminbutton">
          <Link href="/admin" style={{ textDecoration: 'none' }}>
            <p>Admin Page</p>
          </Link>
        </div>
      </div> 
    </main>
  );
}
