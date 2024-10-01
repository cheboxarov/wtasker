import { signal } from "@preact/signals-react"

function createUserState() {
    const user = {
        me: {
            username: signal("username"),
            accessToken: signal("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4Mjk0NTc1LCJpYXQiOjE3Mjc2ODk3NzUsImp0aSI6IjVmYTMwMGMwNjI3ZTQyOTc5YWViNzdkYjlhZWQ4NGY2IiwidXNlcl9pZCI6MX0.kZQjqCGCZEjjsrRGmCSv-nAGDofYW1IKpPqWLMMAdNk")
        }
    }
    return user
}

export default createUserState