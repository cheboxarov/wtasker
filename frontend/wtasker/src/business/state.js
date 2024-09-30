import { computed, signal } from "@preact/signals-react";
import { getTodos, addTodo } from "./http/TodosClient";
import * as Yup from "yup"

const todoValidationSchema = Yup.object().shape({
    id: Yup.number(),
    title: Yup.string().required(),
    description: Yup.string().required(),
    is_done: Yup.boolean().default(false),
    in_backlog: Yup.boolean().default(true),
})

export function createState() {
    const todos = {
        all: signal([]),
        
        allCount: computed(()=>{
            return todos.all.value.length
        }),

        serverError: signal(null),

        get(id) {
            return this.all.value.find(todo => todo.id == id)
        },

        add(todo, http = false) {
            try {
                console.log(todo)
                const valid = todoValidationSchema.validateSync(todo, {
                    abortEarly: false
                })
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
            } catch(errors) {
                const validatedError = []
                errors.errors.forEach(error => {
                    const field = error.split(" ")[0]
                    validatedError.push({
                        field: field,
                        error: error.replace(field+" ", "")
                    })
                })
                console.log(validatedError)
            }
        },

        set(_todos) {
            this.all.value = _todos
        },

        remove(id) {
            this.all.value = this.all.value.filter(el => el.id != id)
        },

        http_get: getTodos,

        http_add: addTodo
    }

    return { todos }
}