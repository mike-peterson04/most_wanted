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
        tableOut(filteredPeople);
    }else{
        console.log('Sorry, looks like there is no one with that name.');
    }
}

function validateInput(){
// comment
    let searchArray = ['firstName',document.forms['inputForm']['fname'].value,
    'lastName', document.forms['inputForm']['lname'].value,
    'id', document.forms['inputForm']['idNumber'].value, 
    'gender',document.forms['inputForm']['gender'].value,
    'dob',document.forms['inputForm']['dob'].value,
    'height',document.forms['inputForm']['height'].value, 
    'weight',document.forms['inputForm']['weight'].value,
    'eyeColor',document.forms['inputForm']['eyeColor'].value,
    'occupation',document.forms['inputForm']['occupation'].value,
    'currentSpouse',document.forms['inputForm']['spouse'].value];
    let result = [];
    for(let i=1;i<searchArray.length;i+=2){
        if (searchArray[i]!=""&&searchArray[i]!="mm/dd/yyyy"){
            result.push(searchArray[i-1]);
            result.push(searchArray[i]);
        }
    }
    return result;
    //let parentIdIn = document.forms['inputForm']['parentId'].value;
}

function masterSearch(array){
    let result = [];
    let index = 0;
    if (array.includes('dob')){
        index = array.indexOf('dob')+1
        if(index > 0){
        result = people.filter(function (person){
            if (person.dob === array[index]){
                return true;
            }
            
        })
    }

    }
    /*let filteredPeople = people.filter(function (person) {
        if(person.firstName === firstNameInput && person.lastName === lastNameInput){
            return true;
        }
        return false;
    });*/
}

function firstNameSearch (name){

}
function lastNameSearch (name){
    
}

function tableOut(arr){
    //this function will output an array of objects as a table via dom manipulation
    let result = document.getElementById("output")
    let validate = arr.length
    let imgName = '"images/'+arr[0].firstName.toLowerCase()+arr[0].lastName+".png"+'"'
    //if .spouse value is undefined replacing with the value " " to avoid printing undefined
    arr[0].spouse = marriageCheck(arr[0]);
    //Printing the person at index 0 of the array into a table
    result.innerHTML += "<table border=1>\
    <tr><td colspan=4><img src="+imgName+" width=400></td>\
    </tr><tr>\
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
    //checking to see if we are at the end of the array and if not, remove the first object in the array and recall function using the modified array
    if (validate>1){
        arr.shift();
        tableOut(arr);
    }
}
function marriageCheck(person){
    if (person.spouse == undefined){
        return "";
    }
    return person.spouse;
}