import _, { values } from 'lodash';
import { v4 as uuidv4 } from 'uuid'
import { compareAsc, format } from 'date-fns'

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

// Project containing related tasks
class Project {
    constructor(name, tasks=[]) {
        this.name = name
        this.tasks = tasks
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

// Data storage and access using in localStorage
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
            if (!projects.includes(key)) {
                projects.push(key)
                console.log(projects)
                localStorage.setItem('projects', JSON.stringify(projects))
            }
        }
        localStorage.setItem(key, JSON.stringify(value))
    }
    static delete(key) {
        // Remove key from 'projects'
        let projects = Storage.get('projects')
        localStorage.setItem('projects', JSON.stringify(projects.filter(t => t !== key)))
        // Remove key from localStorage
        localStorage.removeItem(key)
    }
}

// Project to Storage Interfacer
class ProjectStorage {
    static get(name) {
        const json = Storage.get(name)
        let tasks = json.map(t => {
            return new Task(t['title'], t['description'], t['dueDate'], t['priority'], t['status'], t['id'])
        })
        return new Project(name, tasks)
    }
    static post(project) {
        Storage.post(project.name, project.tasks)
    }
    static delete(project) {
        Storage.delete(project.name)
    }
}

// Test
let task = new Task('dishes', 'do the laundry', 'tomorrow', 'high', false)
let task2 = new Task('vacuum', 'do the trash', 'tomorrow', 'high', false)
let d = new Project('default')
let chores = new Project('chores')
chores.add(task)
chores.add(task2)
d.add(task)
d.add(task2)
ProjectStorage.post(d)
ProjectStorage.post(chores)
ProjectStorage.get('default')
