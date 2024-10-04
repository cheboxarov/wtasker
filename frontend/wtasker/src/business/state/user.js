import { signal } from "@preact/signals-react"
import Cookies from 'js-cookie';
import { login, register } from "../http/userClient";

function createUserState() {
    const user = {
        me: {
            username: signal("username"),
            refreshToken: null,
            accessToken: null,
            authentificated: false,
            authError: signal(""),
            authProcess: signal(false),
            registerError: signal(""),
            registerProcess: signal(false)
        },

        init() {
            this.me.accessToken = Cookies.get("access_token")
            this.me.refreshToken = Cookies.get("refresh_token")
            if (this.me.accessToken) {
                this.me.authentificated = true
            }
        },

        logout() {
            Cookies.remove("access_token")
            Cookies.remove("refresh_token")
            this.init()
            this.me.authentificated = false
        },

        login: login,

        register: register
        
    }
    return user
}

export default createUserState