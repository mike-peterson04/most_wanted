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
    arr[0].spouse = marriageCheck(arr[0]);
    result.innerHTML += "<table border=1>\
    <tr>\
    <b><td><b>First Name</b></td><td><b>Last Name</b></td><td><b>ID Number</b></td><td><b>Gender</b></td>\
    </tr>\
    <tr>\
    <td>"+arr[0].firstName+"</td><td>"+arr[0].lastName+"</td><td>"+arr[0].id+"</td><td>"+arr[0].gender+"</td>\
    </tr>\
    <tr><td><b>Birthday</b></td><td><b>Height</b></td><td><b>Weight</b></td><td><b>Eye Color</b></td></tr>\
    <tr><td>"+arr[0].dob+"</td><td>"+arr[0].height+"</td><td>"+arr[0].weight+"</td><td>"+arr[0].eyeColor+"</td></tr>\
    <tr><td>"+"<b>Occupation</b>"+"</td><td>"+"<b>Parents</b>"+"</td><td>"+"<b>Spouse</b>"+"</td><td>"+'<button id="printKids" onclick="">Show Posterity</button>'+"</td></tr>\
    <tr><td>"+arr[0].occupation+"</td><td>"+arr[0].parents+"</td><td>"+arr[0].spouse+"</td><td>"+'<button id="printFam" onclick="">Show Family</button>'+"</td></tr>\
    </table><br><br>"
    //checking to see if we are at the end of the array and if not, remove the first object in the array and recall function
    if (validate>1){
        arr.shift();
        tableOut(arr);
    }
}
function marriageCheck(person){
    if (person.spouse == undefined){
        return "Single";
    }
    return person.spouse;
}