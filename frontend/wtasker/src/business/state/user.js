import { signal } from "@preact/signals-react"

function createUserState() {
    const user = {
        me: {
            username: signal("username"),
            accessToken: signal("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4NDMxOTI4LCJpYXQiOjE3Mjc4MjcxMjgsImp0aSI6ImJlZTJkZDM5ZjA2ZjQ5Zjk4NTJkMzQ3MzkyOWY5MTAwIiwidXNlcl9pZCI6MX0.fTE5KwZXxwGl6CFPcCvFjp6Jq2wdvHm9WiKSHRCP9GM")
        }
    }
    return user
}

export default createUserState