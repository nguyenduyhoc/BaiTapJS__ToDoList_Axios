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
                createTable(result.data)
                getTaskService()

            })
            .catch(function(err) {
                console.log(err)
            })
    }
}


// change Task
function changeTask(id) {
    alert("Change Status Success!")
    service.updateTaskService(id)
        .then(function(result) {
            if (result.data.id == id) {
                result.data.status = !result.data.status
                console.log(result.data)
                createTable(result.data.task)
                getTaskService()
            }
        })
        .catch(function(err) {
            console.log(err)
        })
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