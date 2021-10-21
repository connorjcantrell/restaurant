import _, { values } from 'lodash';
import Storage from './modules/Storage'
import Task from './modules/Task'
import Project from './modules/Project';

let p = new Project('default')
p.addTask(new Task('groceries', 'do them', 'now', 'high', false))
p.addTask(new Task('laundry', 'do them', 'tomorrow', 'low', false))
p.editDescription('Default tasks go here')
let t1 = new Task('dishes', 'this should not be visible', 'never', 'low', false)
p.addTask(t1)
Storage.post(p)

let p2 = new Project('Home Improvement')

p2.addTask(new Task('groceries', 'do them', 'now', 'high', false))
p2.addTask(new Task('laundry', 'do them', 'tomorrow', 'low', false))
p2.editDescription('To get a nice house')
Storage.post(p2)

Storage.deleteProject(p2)
// Storage.deleteTask(p, t1)