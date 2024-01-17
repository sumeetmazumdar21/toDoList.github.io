
let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTaskToDOM(task){

    const li = document.createElement('li');

    li.innerHTML = `
    
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ' '} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <i class="fa fa-trash" aria-hidden="true" data-id="${task.id}"></i>
    `;

    tasksList.append(li);
}


function renderList(){

     tasksList.innerHTML = '';

     for(let i = 0; i < tasks.length; i++){

        addTaskToDOM(tasks[i]);
     }

     tasksCounter.innerHTML = tasks.length;
}

function markTaskComplete(taskId){

    const task = tasks.filter(function(task){
        return task.id === taskId
    });

    if(task.length > 0){
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task marked complete');
        return;
    }

    showNotification("Task not marked as complete");
}

function deletTask(taskId){

    const newTasks = tasks.filter(function(task){
        return task.id !== taskId
    });

    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
}

function addTask(task){

    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }

    showNotification('Task cannot be added');

}

function showNotification(text){

    alert(text);
}

function handleInputKeypress(e){

    if(e.key === 'Enter'){
        const text = e.target.value;

        if(!text){
            showNotification('Text cannot be empty');
        }  
        
        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }

        e.target.value = '';
        addTask(task);
 }

}

function handleClickEvent(e){

    const target = e.target;
    // console.log(target);


    if(target.className ==="custom-checkbox"){
        const taskId = target.id;
        markTaskComplete(taskId);
        return;
    }

    else if(target.className === "fa fa-trash"){
        const taskId = target.dataset.id;
        deletTask(taskId);
        return;
    }
}



function initializeApp(){

    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickEvent);
}

initializeApp();