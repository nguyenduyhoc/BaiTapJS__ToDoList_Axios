function TaskService() {

    this.getListTaskService = function() {
        return axios({
            url: 'https://6006ddfd3698a80017de21d9.mockapi.io/api/Tasks',
            method: 'GET'
        })
    }

    this.deleteTaskService = function(id) {
        return axios({
            // Nối chuỗi +id
            url: `https://6006ddfd3698a80017de21d9.mockapi.io/api/Tasks/${id}`,
            method: 'DELETE',
        });
    };

    this.addTaskService = function(task) {
        return axios({
            url: "https://6006ddfd3698a80017de21d9.mockapi.io/api/Tasks",
            method: "POST",
            data: task,
        });
    };
    this.updateTaskService = function(id) {
        return axios({
            url: `https://6006ddfd3698a80017de21d9.mockapi.io/api/Tasks/${id}`,
            method: 'PUT',
        })
    };
}