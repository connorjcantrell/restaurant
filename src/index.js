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
    static get(key) {
        const result = JSON.parse(localStorage.getItem(key))
        if (result === null) return []
        return result
    }
    static post(key, value) {
        // Add 'key' to 'projects', if not already
        if (key !== 'projects') {
            let projects = Storage.get('projects')
            console.log(projects)
            if (!projects.includes(key)) {
                projects.push(key)
                console.log(projects)
                localStorage.setItem('projects', JSON.stringify(projects))
            }
        }
        localStorage.setItem(key, JSON.stringify(value))
    }
    static delete(key) {
        // Remove key from "projects"
        let projects = Storage.get('projects')
        localStorage.setItem('projects', JSON.stringify(projects.filter(t => t !== key)))
        // Remove key from localStorage
        localStorage.removeItem(key)
    }
}

// Test
let task = new Task("laundry", "do the laundry", "tomorrow", "high", false)
task.edit("title", "new title")
task.edit("blag", "new title")
let d = new Project("default")
d.add(task)
Storage.post(d.name, d.tasks)
Storage.delete(d.name)
