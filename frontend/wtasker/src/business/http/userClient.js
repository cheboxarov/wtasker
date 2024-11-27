import { BaseUrl } from "./config"
import Cookies from "js-cookie"

export function login(login, password, onSuccess) {
    console.log(`Login ${login} ${password}`)
    const user = this
    user.me.authProcess.value = true
    fetch(`${BaseUrl}/api/v1/token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: login, 
            password: password
        })
    }).then(response => {
        if (response.ok) {
            response.json().then(data => {
                Cookies.set("access_token", data.access)
                Cookies.set("refresh_token", data.refresh)
                user.init()
                if (onSuccess)
                    onSuccess()
            })
        } else {
            user.me.authError.value = ""
            const errorString = "Wrong login or pass!"
            errorString.split("").forEach((ch, index) => {
                setTimeout(() => {
                    user.me.authError.value = user.me.authError.value + ch
                }, (index/100*1)*1000)
            })
        }
    }).finally(() => {
        user.me.authProcess.value = false
    })
}

export async function refresh(user) {
    const refreshToken = user.me.refreshToken
    const response = await fetch(`${BaseUrl}/api/v1/token/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            refresh: refreshToken
        })
    })
    console.log("refresh", response)
    if (response.ok) {
        const data = await response.json()
        Cookies.set("access_token", data.access)
        Cookies.set("refresh_token", data.refresh)
        user.init()
    }
}

export function register(registrationData, onSuccsess = () => {}) {
    const user = this
    user.me.registerProcess.value = true
    fetch(`${BaseUrl}/api/v1/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registrationData)
    }).then(response => {
        response.json(data => {
            console.log(data)
            if (response.ok) {
                onSuccsess()
            }
        })
    }).catch(r => {
        console.log(r)
    })
}