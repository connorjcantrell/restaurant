import { v4 as uuidv4 } from 'uuid'

class Task {
    constructor(title, description, dueDate, priority, status, id=undefined) {
        this.id = (id === undefined) ? uuidv4() : id
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.status = status
    }
    edit(field, value) {
        if (this[field] === undefined) return
        this[field] = value 
    }
}

export default Task