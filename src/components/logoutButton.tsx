'use client'

import { logOut } from "@/actions/log-out"
import { Button } from "./button"

export const LogOutButton = () => {
    return <Button onClick={() => logOut()}>log out</Button>
}