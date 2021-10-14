import _ from 'lodash';

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }
}

class Project {
    constructor(name) {
        this.name = name
        this.tasks = []
    }
    createTask(task) {
        task.id = 0 // UUID?
        this.tasks.push(task)
    }
    deleteTask(id) {
       this.tasks = this.tasks.filter(t => t.id !== id)
    }
    updateTask(task) {
        this.tasks = this.tasks.map(t => {
            if (t.id === task.id) {
                return task
            }
            return t
        }) 
    }
}
