'use strict';

function searchByName(){
    // Grabbing the values from our nameForm form and inputs.
    let firstNameInput = document.forms['nameForm']['fname'].value;
    let lastNameInput = document.forms['nameForm']['lname'].value;

    // "people" is coming from the data.js file. We have access to it within this JavaScript file.
    let filteredPeople = people.filter(function (person) {
        if(person.firstName === firstNameInput && person.lastName === lastNameInput){
            return true;
        }
        return false;
    });
    
    // Rather than console logging, you need to append the filteredPeople to a table.
    if(filteredPeople.length > 0){
        console.log(filteredPeople);
    }else{
        console.log('Sorry, looks like there is no one with that name.');
    }
}
function tableOut(arr){
    //this function will output an array of objects as a table via dom manipulation
    let result = document.getElementById("output")
    let validate = arr.length
    console.log(arr);
    console.log(result);
    result.innerHTML += "<table border=1>\
    <tr>\
    <td>First Name</td><td>Last Name</td><td>ID Number</td>\
    </tr>\
    <tr>\
    <td>"+arr[0].firstName+"</td><td>"+arr[0].lastName+"</td><td>"+arr[0].id+"</td>\
    </tr>\
    </table>"
    if (validate>1){
        arr.shift();
        tableOut(arr);
    }
}