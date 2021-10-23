import _, { values } from 'lodash';
import Storage from './modules/Storage'
import Task from './modules/Task'
import Project from './modules/Project';
import UI from "./modules/UI"

let p1 = new Project('Default')
p1.addTask(new Task('groceries', 'do them', 'now', 'high', false))
p1.addTask(new Task('laundry', 'do them', 'tomorrow', 'low', false))
p1.editDescription('Default tasks go here')
let t1 = new Task('dishes', 'this should not be visible', 'never', 'low', false)
p1.addTask(t1)
Storage.post(p1)

let p2 = new Project('Home Improvement YO')

p2.addTask(new Task('groceries', 'do them', 'now', 'high', false))
p2.addTask(new Task('laundry', 'do them', 'tomorrow', 'low', false))
p2.editDescription('To get a nice house')
Storage.post(p2)

UI.displayHeader()
UI.displayProjects()
// UI.clearContent()