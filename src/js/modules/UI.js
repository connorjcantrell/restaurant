import Project from "./Project"
import Task from "./Task"
import Storage from "./Storage"



class UI {
    // Clear Content
    static clearContent() {
        const rootEl = document.querySelector('#root')
        rootEl.innerHTML = ''
    }
    // Display Header
    static displayHomeNav() {
        const rootEl = document.querySelector('#root')
        const navDiv = document.createElement('nav')
        navDiv.innerHTML = `
        <div class="bg-indigo-600 px-4 py-5 border-b border-gray-200 sm:px-6">
            <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
                <div class="ml-4 mt-4">
                    <h3 class="text-lg leading-6 font-medium text-gray-100">
                        Projects
                    </h3>
                    <p class="mt-1 text-sm text-gray-100">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.
                    </p>
                </div>
                <div class="ml-4 mt-4 flex-shrink-0">
                    <button type="button" class="btn">
                        Create new project
                    </button>
                </div>
            </div>
        </div>` 
        rootEl.appendChild(navDiv)
    }

    // Display Projects
    static displayProjects() {
        const rootEl = document.querySelector('#root')
        const ulEl = document.createElement('ul')
        const projects = Storage.getProjects()
        projects.forEach(p => {
            let projectDiv = document.createElement('div')
            projectDiv.innerHTML = `
            <li>
              <div class="px-4 py-4 sm:px-6 hover:bg-gray-100 duration-75">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-grey-700 truncate">
                    ${p.name}
                  </p>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <p class="flex items-center text-sm text-gray-500">
                      ${p.tasks.length} active tasks
                    </p>
                  </div>
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  </div>
                </div>
              </div>
            </a>
          </li>`
          ulEl.appendChild(projectDiv)
        })
        rootEl.appendChild(ulEl)
    }

    // Create Project

    // Load Project
    
    // Delete Project

    // Create Task to Project
    
    // Edit Task
    
    // Project Event Listeners

    // Task Event Listeners
}

export default UI