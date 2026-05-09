const form = document.querySelector('form');

const tasks =  JSON.parse(localStorage.getItem('tasks')) || [];
const display = document.querySelector('.display-tasks');
displayTask();

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
    console.log("Pushed to local");
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
        div.dataset.Id = `${index}`;
        div.innerHTML = `
            <p>${element.task}</p>
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
    }
}


