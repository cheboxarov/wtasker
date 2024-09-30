const MANY_URL = "http://localhost/api/v1/tasks"
function instanceUrl(id) {
    return `${MANY_URL}/${id}`
}

const headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4Mjk0NTc1LCJpYXQiOjE3Mjc2ODk3NzUsImp0aSI6IjVmYTMwMGMwNjI3ZTQyOTc5YWViNzdkYjlhZWQ4NGY2IiwidXNlcl9pZCI6MX0.kZQjqCGCZEjjsrRGmCSv-nAGDofYW1IKpPqWLMMAdNk",
    "Content-Type": "application/json"
}


export function getTodos() {
    fetch(MANY_URL, {
        headers: headers
    }).then(response => {
        response.json().then(data => {
            data.forEach(todo => {
                this.add(todo)
            })
        })
    })
}

export function addTodo(todo) {
    const todos = this
    todos.serverError.value = null
    fetch(MANY_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(todo)
    }).then(response => {
        response.json().then(data => {
            if (!response.ok)
                todos.serverError.value = JSON.stringify(data)
            else {
                todos.add(data)
            }
        })
    })
}