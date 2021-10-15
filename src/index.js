import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

class Task {
    constructor(title, description, dueDate, priority) {
        this.id = uuidv4()
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

let task = new Task("laundry", "do the laundry", "tomorrow", "high")
let project = new Project("default")
project.createTask(task)
console.log(project.tasks)
