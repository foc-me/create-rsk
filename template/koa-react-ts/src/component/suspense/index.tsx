import { Suspense, type SuspenseProps } from "react"

export default function(props: SuspenseProps) {
    return <Suspense fallback="loading" {...props}/>
}