// Global:
var taskList = new TaskList();
var validation = new Validation();
var service = new TaskService();

function getEle(id) {
    return document.getElementById(id);
}


// Nội dung trong task
function contentFromTask() {
    var _task = getEle("newTask").value;
    var isValid = true;

    isValid &= validation.kiemTraRong(_task) && validation.kiemTraTrungTen(_task, "(*) Đã có Task trùng", taskList.arr)

    if (isValid) {
        var task = new Task(
            _task,
        );
        return task
    }
    return null


}





// Tạo bảng 
function createTable(arr) {
    var tableToDo = "";
    var tableCompleted = "";
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].status == false) {
            tableToDo +=
                `
            <li> <span> ${arr[i].task} </span>
                <div class="buttons">
                <button class="remove" onclick="deleteTask(${arr[i].id})"><i class="fas fa-trash-alt"></i></button> 
                <button class="complete" onclick="changeTask(${arr[i].id})" ><i class="far fa-check-circle"></i></button>
                </div>
            `;

        } else {
            tableCompleted +=
                `
                <li> <span id="txtCompleted"> ${arr[i].task} </span>
                <div class="buttons">               
                <button class="remove" onclick="deleteTask(${arr[i].id})"><i class="fas fa-trash-alt"></i></button> 
                <button class="complete" onclick="changeTask(${arr[i].id})" ><i class="fas fa-check-circle"></i></button>
                </div>
            `;
        }
    }
    getEle("completed").innerHTML = tableCompleted
    getEle("todo").innerHTML = tableToDo
}
// Lay danh sach task
function getTaskService() {
    service
        .getListTaskService()
        .then(function(result) {
            console.log(result.data);
            createTable(result.data)
        })
        .catch(function(err) {
            console.log(err);
        });
}

getTaskService()



// Thêm task
function addTask() {
    var content = contentFromTask()
    if (content !== null) {
        service.addTaskService(content)
            .then(function(result) {
                taskList.addTask(result.data);
                createTable(result.data)
                getTaskService()

            })
            .catch(function(err) {
                console.log(err)
            })
    }

}

// Chuyển Task
function changeTask(id) {
    alert("Change Status Success!")
    service.updateTaskService(id)
        .then(function(result) {
            taskList.updateTask(result.data.id)
            createTable(result.data.task);
            console.log(result.data.status)
        })
        .catch(function(err) {
            console.log(err)
        })
    getTaskService()
}

// Xóa Task
function deleteTask(id) {
    alert("Delete Status Success!")

    service.deleteTaskService(id)
        .then(function(result) {
            createTable(result.data);
            getTaskService()
        })
        .catch(function(err) {
            console.log(err);
        });

}


// Set local
function setLocalStorage() {
    var arrString = JSON.stringify(taskList.arr)
    localStorage.setItem("TASK", arrString)
}

// Get local
function getLocalStorage() {
    if (JSON.parse(localStorage.getItem("TASK"))) {
        taskList.arr = JSON.parse(localStorage.getItem("TASK"));
        createTable(taskList.arr);
    }
}