import { useEffect, useState } from "react"


export const useDebounce = (value, delay = 300) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay);
    }, [value, delay])

    return debounceValue
}