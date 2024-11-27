import { refresh } from "./userClient"

export const send = async (url, request = {}, refreshToken) => {
    const response = await fetch(url, request)
    if (response.status == 401) {
        const refreshResponse = await refresh(refreshToken)
    }
    return response
}