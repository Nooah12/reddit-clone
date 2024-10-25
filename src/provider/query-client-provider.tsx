// setup för att kunna använda useQuery !

'use client'
import { QueryClient, QueryClientProvider as OriginalQueryProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

const makeQueryClient = () => {
    return new QueryClient()
}

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
    if (typeof window === 'undefined') {
        // server
        return makeQueryClient()
    } else {
        // browser
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
            return browserQueryClient
    }
}

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
    const QueryClient = getQueryClient()

    return (
        <OriginalQueryProvider client={QueryClient}>
            {children}
        </OriginalQueryProvider>
    )
}