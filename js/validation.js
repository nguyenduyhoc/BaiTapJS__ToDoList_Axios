function Validation() {
    this.kiemTraRong = function(input) {
        if (input === "") {
            alert("Task Empty")
            return false
        }
        return true
    }

    this.kiemTraTrungTen = function(input, mess, arr) {
        var status = true;
        for (var i = 0; i < arr.length; i++) {
            if (input === arr[i].task) {
                status = false;
                break;
            }
        }
        if (status) {
            alert("Add Success")
            getEle("notiInput").innerHTML = ""
            return true

        } else {
            // alert("Trùng Task")
            getEle("notiInput").style.display = "block"
            getEle("notiInput").innerHTML = mess
            return false
        }
    }

}