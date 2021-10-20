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

export default ProjectStorage