const MANY_URL = "http://localhost/api/v1/tasks"
function instanceUrl(id) {
    return `${MANY_URL}/${id}`
}


const getHeaders = (todos) => {
    const token = todos.userState.me.accessToken
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    return headers
}

export function getTodos() {
    this.all.value = []
    fetch(MANY_URL, {
        headers: getHeaders(this)
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
    console.log(todo)
    fetch(MANY_URL, {
        method: "POST",
        headers: getHeaders(this),
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

export function updateTodo(todo) {
    const todos = this
    todos.serverError.value = null 
    fetch(instanceUrl(todo.id), {
        method: "PATCH",
        headers: getHeaders(this),
        body: JSON.stringify(todo)
    }).then(response => {
        response.json().then(data => {
            console.log("Ответ от сервера ", data)
            if(response.ok) {
                todos.set(
                    todos.all.value.map(_todo => _todo.id === todo.id ? data : _todo)
                );
            } else {
                console.log("Ошибка при обновлении таски")
                todos.http_get()
                console.log(data)
            }
        })
    })

}

export function deleteTodo(todo) {
    const todos = this
    todos.serverError.value = null
    const todoId = todo.id
    fetch(instanceUrl(todoId), {
        method: "DELETE",
        headers: getHeaders(this)
    }).then(response => {
        if (response.ok) {
            todos.set(todos.all.value.filter(_todo => _todo.id != todoId))
        } else {
            response.json().then(data => {
                console.log(data)
            })  
        }
    })
}