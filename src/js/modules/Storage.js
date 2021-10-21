import Project from "./Project"
import Task from "./Task"
import LocalStorage from "./LocalStorage"

class Storage {
    static getAll() {
        let keys = LocalStorage.get()
        return keys.map(project => this.getProject(project))

    }
    static getProject(object) {
        let tasks = object['tasks'].map(t => {
            return new Task(t['title'], t['description'], t['dueDate'], t['priority'], t['status'], t['id'])
        })
        let project = new Project(object['name'], tasks)
        project.editDescription(object['description'])
        return project
    }
    static post(project) {
        LocalStorage.post(project.name, project.tasks, project.description)
    }
    static deleteProject(project) {
        LocalStorage.deleteProject(project.name)
    }
    static deleteTask(project, task) {
        LocalStorage.deleteTask(project.name, task.id)
    }
}

export default Storage