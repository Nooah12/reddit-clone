'use client'

import { logOut } from "@/actions/log-out"
import { Button } from "./button"

export const LogOutButton = () => {
    return <Button className="bg-slate-600 hover:bg-slate-500" onClick={() => logOut()}>Log Out</Button>
}