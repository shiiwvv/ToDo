const form = document.querySelector('form');

const saveButton = document.createElement('button');
saveButton.classList.add('read-buttons' , 'save-edit');
saveButton.innerText = "Save";

const tasks =  JSON.parse(localStorage.getItem('tasks')) || [];
const display = document.querySelector('.display-tasks');
const windoww = document.querySelector('.show-task');
const main = document.querySelector('.main-container');
const clearTask = document.querySelector('.Clear-Tasks');
displayTask();

clearTask.addEventListener('click' , () => {
    console.log("Local Storage Cleared.");
    localStorage.clear();
});

display.addEventListener('click' , deleteTask);
display.addEventListener('click' , readMore)

form.addEventListener('submit' , ()=>{
    event.preventDefault();
    let input = document.querySelector('.input-field');
    const inputData = input.value;
    if(inputData == ""){
        alert("Please Enter a Task To Add");
    }
    else{
        input.value = "";
        addToLocal(inputData);
    }
})

function addToLocal(input){
    const task = createTaskObject(input);
    tasks.push(task);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
    displayTask();
}

function createTaskObject(input){
    const date = new Date();
    const task = {
        "task" : input, 
        "date" : date.toLocaleDateString(),
        "time" : date.toLocaleTimeString(),
        "state": false, 
    }
    return task;
}

function displayTask(){
    display.innerHTML = "";
    tasks.forEach((element , index) => {
        const div = document.createElement('div');
        div.classList.add('task');
        setBorder(element , div);
        const taskStatement = element.task.substring(0 , 200);
        div.dataset.Id = `${index}`;
        div.innerHTML = `
            <div class = "task-text-container">
                <p>${taskStatement}</p>
            </div>
            <div class="buttons">
                <button class="open-task butt">Read</button>
                <button class="Del-task butt">Delete</button>
            </div>
        `
        display.appendChild(div);
    });
}


function deleteTask(event){
    event.preventDefault();
    console.log("Display Event Called");
    
    if(event.target.classList.contains('Del-task')){
        console.log("Delete segment");
        
        const task = event.target.closest('.task');
        const index = task.dataset.Id;
        tasks.splice(index , 1); 
        displayTask();
        localStorage.setItem('tasks' , JSON.stringify(tasks));
    }
    
}

function readMore(event){
    event.preventDefault();
    if(event.target.classList.contains('open-task')){
        console.log("Open segment");
        
        const task = event.target.closest('.task');
        const taskId = Number(task.dataset.Id);
        const taskObj = tasks[taskId];
        console.log(typeof taskId);

        // windoww.style.display = "flex";
        windoww.classList.add('open');
        main.classList.add("opac");
        setBorder(taskObj , windoww);

        windoww.innerHTML = `
            <div class = "Inside-Open" data-Id = "${taskId}">
                <div class = "window-head">
                    <div class = "display-time-and-date">
                        <h2>Task ${taskId + 1}</h2>
                        <div class = "display-Date">
                            <p>${taskObj.date}</p>
                            <p>${taskObj.time}</p>
                        </div>
                    </div>
                    <span class="Close">Close</span>
                </div>

                <div class = "window-content" contenteditable="true">
                        <p class="text-para">${taskObj.task}</p>
                </div>
                <div class = "edit-buttons">
                    <button class = "checked read-buttons">Not Completed</button>
                </div>
            </div>
        `;
    }
}

function setBorder(element , div){
        if(element.state == false){
            div.style.border = `1px solid red`;
        }
        else{
            div.style.border = `1px solid green`;
        }
}

windoww.addEventListener('click' , (event) => {
    event.preventDefault();

    const targetEvent = event.target;
    const closest = targetEvent.closest(".Inside-Open");
    const targetId = Number(closest.dataset.id);
    

    //CLosing the Window
    if(targetEvent.classList.contains('Close')){
        windoww.classList.remove('open');
        main.classList.remove("opac");
    }

    //Allowing Edit
    if(targetEvent.classList.contains('text-para') || targetEvent.classList.contains('window-content')){
        const addButton = document.querySelector('.edit-buttons');
        addButton.appendChild(saveButton);
    }

    //Saving Edit
    if(targetEvent.classList.contains('save-edit') ){
        const input = document.querySelector('.text-para').textContent;

        const taskObj = JSON.parse(localStorage.getItem('tasks'));
        
        taskObj[targetId].task = input;

        localStorage.setItem('tasks' , JSON.stringify(taskObj));

        displayTask();
    }
    
    if(targetEvent.classList.contains('checked')){
        const taskObj = JSON.parse(localStorage.getItem('tasks'));
        
        const checkButton = document.querySelector('.checked');

        if(checkButton.innerText == "Not Completed"){
            checkButton.innerText = "Completed";
            checkButton.style.background = "green";
            taskObj[targetId].state = true;
            setBorder(taskObj[targetId] , windoww); 
        }else{
            checkButton.innerText = "Not Completed";
            checkButton.style.background = "red";
            taskObj[targetId].state = false;
            setBorder(taskObj[targetId] , windoww); 
        }
    
        localStorage.setItem('tasks' , JSON.stringify(taskObj));
    }
})




