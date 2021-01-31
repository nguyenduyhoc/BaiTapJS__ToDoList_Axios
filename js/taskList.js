function TaskList() {
    this.arr = [];

    this.addTask = function(task) {
        this.arr.push(task);
    }

    this.deleteTask = function(maID) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].id === maID) {
                this.arr.splice(i, 1)
                break;
            }
        }
    }

    this.updateTask = function(maID) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].id === maID) {
                this.arr[i].status = !this.arr[i].status;
                break;
            }
        }
    }

}