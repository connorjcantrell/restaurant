import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

class Task {
    constructor(title, description, dueDate, priority, status) {
        this.id = uuidv4()
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.status = status
    }
    changeStatus() {
        this.status = !this.status
    }
    changeTitle(title) {
        this.title = title
    }
    changeDescription(description) {
        this.description = description
    }
    changeDueDate(dueDate) {
        this.dueDate = dueDate
    }
    changePriority(priority) {
        this.priority = priority
    }
}

class Project {
    constructor(name) {
        this.name = name
        this.tasks = []
    }
    add(task) {
        this.tasks.push(task)
    }
    remove(id) {
       this.tasks = this.tasks.filter(t => t.id !== id)
    }
    sortByPriority() {
    }
    sortByDueDate() {
    }
}

class Storage {
    getAll() {
        // Get all projects from local storage
    }
    getOne(project) {
        // Get one project from local storage
    }
    store() {
        // Store project to local storage
    }
}

let task = new Task("laundry", "do the laundry", "tomorrow", "high", false)
let project = new Project("default")
project.add(task)
console.log(project.tasks)
