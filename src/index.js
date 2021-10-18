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
    // TODO: Pass in a function instead of field
    sort(field, reversed=false) {
        if (this.tasks.length === 0) return this.tasks
        if (this.tasks[0][field] === undefined) return this.tasks
        ordered = this.tasks.sort((a, b) => a[field] > b[field] ? 1 : -1)
        if (reversed) return ordered.reverse()
        return ordered
    }
}

// Data storage and access using in localStorage
class JSONStorage {
    static get(key) {
        const arr = JSON.parse(localStorage.getItem(key))
        if (arr === null) return []
        return arr
    }
    static post(key, value) {
        // Add 'key' to '__projects', if not already
        JSONStorage.projectListManager(key)
        localStorage.setItem(key, JSON.stringify(value))
    }
    static delete(key) {
        // Remove key from '__projects'
        let projects = JSONStorage.get('__projects')
        localStorage.setItem('__projects', JSON.stringify(projects.filter(t => t !== key)))
        // Remove key from localStorage
        localStorage.removeItem(key)
    }
    // Adds name to __projects key if it doesn't already exist 
    static projectListManager(name) {
        if (name !== '__projects') {
            let projects = JSONStorage.get('__projects')
            if (!projects.includes(name)) {
                projects.push(name)
                console.log(projects)
                localStorage.setItem('__projects', JSON.stringify(projects))
            }
            return true
        }
        return false
    }
}
// Project to Storage Interfacer
class ProjectStorage {
    static getProjectNames() {
        return JSONStorage.get('__projects')
    }
    static getProject(name) {
        const json = JSONStorage.get(name)
        let tasks = json.map(t => {
            return new Task(t['title'], t['description'], t['dueDate'], t['priority'], t['status'], t['id'])
        })
        return new Project(name, tasks)
    }
    static post(project) {
        JSONStorage.post(project.name, project.tasks)
    }
    static delete(project) {
        JSONStorage.delete(project.name)
    }
}

class UI {
    constructor() {
        this.projectNames = ProjectStorage.getProjectNames()
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

