"use client";
import { signIn, signOut } from "next-auth/react"

export const Appbar = () => {
    return <div>
    <button onClick={() => signOut()}><p className="text-white">SignOut</p></button>
  </div>
}