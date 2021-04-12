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
    let searchArray = ['firstName', document.forms['inputForm']['fname'].value,
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
            if (searchArray[i-1]=="height"||searchArray[i-1]=="weight"){
                try{
                    searchArray[i] = parseInt(searchArray[i]);
                    if (isNaN(searchArray[i])){
                        throw 'please enter numbers in height/weight';
                    }

                }
                catch(e){
                    alert("please enter a number for height and weight");
                    console.error(e);
                    break;
                }    
            }
            result.push(searchArray[i-1]);
            result.push(searchArray[i]);
        }
    }
    return result;
    //let parentIdIn = document.forms['inputForm']['parentId'].value; Challenge for when we get everything else working
}
function clearTable (location="output"){
    let clear = document.getElementById(location);
    clear.innerHTML = "";

}
function masterSearch(array){
    let result = [];
    while (array.length>=1){
        result=attributeSearch(array.shift(),array.shift(),result);
    }
    tableOut(result);
}

function attributeSearch (name,value, result=[]){
    if(result[0]==undefined){
        result=[];
        result = result.concat(people.filter(function (person){
        if (person[name]===value||person[name].toLowerCase()===value.toLowerCase()){
        return true;
        }   
        return false;
        }));
    }
    else{
        result = result.filter(function (person){
        if (person[name]===value||person[name].toLowerCase()===value.toLowerCase()){
        return true;
        }   
        return false;
        });
    }
    if (result[0]==undefined){
        alert("Search returned no results please confirm your input");
    }
    else{   
    return result;
    }
}

function tableOut(arr, location='output'){
    //this function will output an array of objects as a table via dom manipulation
    let result = document.getElementById(location);
    let validate = arr.length;
    let imgName = '"images/'+arr[0].firstName.toLowerCase()+arr[0].lastName+".png"+'"';
    //if .spouse value is undefined replacing with the value " " to avoid printing undefined
    arr[0].currentSpouse = marriageCheck(arr[0]);
    //Printing the person at index 0 of the array into a table
    result.innerHTML += "<table border=1>\
    <tr><td colspan=4><img src="+imgName+" width=400></td>\
    </tr><tr>\
    <b><td><b>First Name</b></td><td><b>Last Name</b></td><td><b>ID Number</b></td><td><b>Gender</b></td>\
    </tr>\
    <tr>\
    <td>"+arr[0].firstName+"</td><td>"+arr[0].lastName+"</td><td id='"+arr[0].id+"'>"+arr[0].id+"</td><td>"+arr[0].gender+"</td>\
    </tr>\
    <tr><td><b>Birthday</b></td><td><b>Height</b></td><td><b>Weight</b></td><td><b>Eye Color</b></td></tr>\
    <tr><td>"+arr[0].dob+"</td><td>"+arr[0].height+"</td><td>"+arr[0].weight+"</td><td>"+arr[0].eyeColor+"</td></tr>\
    <tr><td>"+"<b>Occupation</b>"+"</td><td>"+"<b>Parents</b>"+"</td><td>"+"<b>Spouse</b>"+"</td><td>"+'<button id="printKids'+arr.length+'" onclick=getDescendantsButton('+arr[0].id+')>Show Posterity</button>'+"</td></tr>\
    <tr><td>"+arr[0].occupation+"</td><td>"+arr[0].parents+"</td><td>"+arr[0].currentSpouse+"</td><td>"+'<button id="printFam'+arr.length+'" onclick=getImmediateFamily('+arr[0].id+')>Show Family</button>'+"</td></tr>\
    </table><br><br>"
    //checking to see if we are at the end of the array and if not, remove the first object in the array and recall function using the modified array
    if (validate>1){
        arr.shift();
        tableOut(arr, location);
    }
}
function marriageCheck(person){
    if (person.currentSpouse === null){
        return "";
    }
    return person.currentSpouse;
}

// This function will take the ID value from the table to find parents, spouse, and siblings
// TO DO, possibly break this out into more single use functions(ie getSpouse, getParents) similar to getSibling, it is currently doing a lot.
function getImmediateFamily(id){
    let result = document.getElementById("output");
    result.innerHTML = '';
    let individual= people.filter(function (person){
        if(person.id === id){
            return true;
        }
        return false;
    })
    individual = individual[0];
    let spouse = individual.currentSpouse;
    let parents = individual.parents;
    let siblings;
    if (1<=parents.length) {
        siblings = getSiblings(parents[0].id,id);
    }
    let array = ["id",id];
    if (spouse != null&& spouse != ""){
        array.push("id");
        array.push(spouse);
    }
    for (let i=0;i<parents.length;i++){
        array.push("id");
        array.push(parents[i]);
    }
    for (let i=0;i<siblings.length;i++){
        array.push("id");
        array.push(siblings[i]);
    }
    masterSearch(array);
}

// This function will filter the dataset by the parentId to return anyone with matching parents. Will return an array of person objects.
function getSiblings(parentId,mainId){
    let siblings = people.filter(function (person) {
        if(person.parents.includes(parentId)&&person.id!=mainId){
            return true;
        }
        return false;    
    })
    return siblings;
}

// This function will check the for a parent Id matching the mainId of the person. 
// Then it will recall itself with each descendant Id to find grandchildren
function getDescendants(mainId){
    let descendants = people.filter(function (person) {
        if(person.parents.includes(mainId)){
            return true;
        }
        return false;    
    })
    if(descendants.length > 0){
        let allGrandchildren = [];
        for(let i = 0; i < descendants.length; i++){
            let grandchildren = getDescendants(descendants[i].id);
            console.log(grandchildren);
            if (grandchildren !== undefined && grandchildren.length != 0){
                while(grandchildren.length > 0){
                    descendants.push(grandchildren.shift());
                }
            }
        }
        console.log(allGrandchildren);
    }
    return descendants;
}

function getDescendantsButton(mainId){
    let result = getDescendants(mainId);
    tableOut(result, "famOut");
}

// Get the input field
var input = document.getElementById("inputForm");

// Makes the enter key activate the submit button on click
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});