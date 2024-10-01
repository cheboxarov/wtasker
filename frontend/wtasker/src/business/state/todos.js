import { computed, signal } from "@preact/signals-react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../http/TodosClient";
import * as Yup from "yup"

const todoValidationSchema = Yup.object().shape({
    id: Yup.number(),
    title: Yup.string().required(),
    description: Yup.string().default("1"),
    is_done: Yup.boolean().default(false),
    in_backlog: Yup.boolean().default(true),
    due_date: Yup.string().required(false).nullable().default(null)
})

function createTodosState(userState) {
    const todos = {
        all: signal([]),
        
        allCount: computed(()=>{
            return todos.all.value.length
        }),

        serverError: signal(null),

        get(id) {
            return this.all.value.find(todo => todo.id == id)
        },

        validateTodo(todo) {
            try {
                console.log(todo)
                const valid = todoValidationSchema.validateSync(todo, {
                    abortEarly: false
                })
                return valid
            } catch(errors) {
                const validatedError = []
                errors.errors.forEach(error => {
                    const field = error.split(" ")[0]
                    validatedError.push({
                        field: field,
                        error: error.replace(field+" ", "")
                    })
                })
                throw new Error(validatedError)
            }
        },

        add(todo, http = false) {
            const valid = this.validateTodo(todo)
            if (!valid)
                return
            if(http) {
                this.http_add(valid)
                return
            }
            let last_id = 0;
            if (this.all.value.length > 0)
                last_id = this.all.value[this.all.value.length-1].id
            this.set([...this.all.value, {
                id: last_id + 1,
                ...valid
            }])
        },

        update(todo) {
            if(!this.all.value.find(_todo => _todo.id === todo.id)) {
                console.log("Не нашел такую таску ", todo)
                return
            }
            const valid = this.validateTodo(todo)
            if (!valid) {
                return
            }
            this.http_update(valid)
        },

        set(_todos) {
            this.all.value = _todos
        },

        delete(todo) {
            if(!this.all.value.find(_todo => _todo.id === todo.id)) {
                console.log("Не нашел такую таску ", todo)
                return
            }
            const valid = this.validateTodo(todo)
            if (!valid) {
                return
            }
            this.http_delete(valid)
        },

        http_get: getTodos,

        http_add: addTodo,

        http_update: updateTodo,

        http_delete: deleteTodo,

        inputs: {
            titleInput: signal(""),
            descInput: signal(""),
            isDoneInput: signal(false),
            inBacklogInput: signal(false)
        },

        userState: userState
    }
    return todos
}
export default createTodosState