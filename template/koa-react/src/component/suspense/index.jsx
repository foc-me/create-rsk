import { Suspense } from "react"

export default function(props) {
    return <Suspense fallback="loading" {...props}/>
}