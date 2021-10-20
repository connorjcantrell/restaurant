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

export default Project