import { id } from "date-fns/locale"

// Data storage and access using in localStorage
class LocalStorage {
    constructor() {
        const arr = JSON.parse(localStorage.getItem('projects'))
        if (arr === null) {
            localStorage.setItem('projects', JSON.stringify([]))
        }
    }

    static get() {
        const projects = JSON.parse(localStorage.getItem('projects'))
        if (projects === null) return {}
        return projects
    }
    static post(name, value, description='') {
        let projects = LocalStorage.get()
        if (projects[name] === undefined) projects[name] = {}
        projects[name]['name'] = name
        projects[name]['description'] = description
        projects[name]['tasks'] = value
        localStorage.setItem('projects', JSON.stringify(projects))
    }
    static deleteProject(name) {
        let projects = LocalStorage.get()
        delete projects[name]
        localStorage.clear('projects')
        localStorage.setItem('projects', JSON.stringify(projects))
    }
    static deleteTask(key, id) {
        let projects = LocalStorage.get()
        projects[key]['tasks'] = projects[key]['tasks'].filter(t => id !== t.id)
        localStorage.clear('projects')
        localStorage.setItem('projects', JSON.stringify(projects))
    }
}

export default LocalStorage