export const getCookie = (name: string) => {
    if (typeof window === "undefined") return false

    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));

    if (!match) return false

    return match[2]
}

export const removeCookie = (name: string) => {
    if (typeof window === "undefined") return

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=-999`
}