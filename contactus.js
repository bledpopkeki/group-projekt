function validate(){
    var first_name = document.getElementById('first-name');
    var last_name = document.getElementById('last-name');
    var email = document.getElementById('email');
    var message = document.getElementById('message')

    var name_test = /^[A-Za-z]+$/;
    var last_name = /^[A-Za-z]+$/;
    var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if(!name_test.test(first_name)){
        alert("Please enter a valid name");
        return false;
    }

    if(!name_test.test(last_name)){
        alert("Please enter a valid last");
        return false;
    }

    if(!name_test.test(email)){
        alert("Please enter a valid email");
        return false;
    }
    




}