import { useEffect, useState } from 'react'

// 获取当前窗口的url中的origin
export const useOrigin = () => {
    const [mounted, setMounted] = useState(false)
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return ""
    }
    return origin
}