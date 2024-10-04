import todosState from "./todos"
import userState from "./user"


export function createState(_render) {

    const user = userState()

    user.init()

    const todos = todosState(user)

    function render() {
        if(user.me.authentificated) {
            todos.http_get()
        }
        _render()
    }

    return { todos, user, render }
}