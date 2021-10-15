import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid'
import { compareAsc, format } from 'date-fns'

class Task {
    constructor(title, description, dueDate, priority, status) {
        this.id = uuidv4()
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
    sort(field, reversed=false) {
        if (this.tasks.length === 0) return this.tasks
        if (this.tasks[0][field] === undefined) return this.tasks
        ordered = this.tasks.sort((a, b) => a[field] > b[field] ? 1 : -1)
        if (reversed) return ordered.reverse()
        return ordered
    }
}

class Storage {
    getProjects() {
        // Verify `projects` key exists in local storage
        // Retrieve content (project names) from `projects` key
    }
    getProject(key) {
        // Verify `name` key exists in local storage
        // Retrieve content (tasks) from `name` key
    }
    storeProject(project) {
        // Add project name to `projects` key
        // Write tasks to `project.name` key
    }
    deleteProject(key)
}

// Test
let task = new Task("laundry", "do the laundry", "tomorrow", "high", false)
task.edit("title", "new title")
task.edit("blag", "new title")
let project = new Project("default")
project.add(task)
console.log(project.tasks)
console.log(task.title)
