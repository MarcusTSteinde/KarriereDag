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

        <div className="adminbutton">
          <Link href="/admin" style={{ textDecoration: 'none' }}>
            <p>Admin Page</p>
          </Link>
        </div>

        <div className="absolute inset-y-0 left-32 top-64">
          <Login />
        </div>

        <div className="absolute inset-y-0 right-64 top-64 w-00">
          <IndexScoreboard />
        </div>
      </div> 
    </main>
  );
}
