import todosState from "./todos"
import userState from "./user"


export function createState() {

    const user = userState()

    const todos = todosState(user)

    return { todos }
}