'use strict';

function validateInput(){
    let searchArray = ['firstName', document.forms['inputForm']['fname'].value,
    'lastName', document.forms['inputForm']['lname'].value,
    'id', document.forms['inputForm']['idNumber'].value, 
    'gender',document.forms['inputForm']['gender'].value,
    'dob',document.forms['inputForm']['dob'].value,
    'height',document.forms['inputForm']['height'].value, 
    'weight',document.forms['inputForm']['weight'].value,
    'eyeColor',document.forms['inputForm']['eyeColor'].value,
    'occupation',document.forms['inputForm']['occupation'].value,
    'currentSpouse',document.forms['inputForm']['spouse'].value,
    'parents',document.forms['inputForm']['parentId'].value];
    let result = [];
    for(let i=1;i<searchArray.length;i+=2){
        if (searchArray[i]!=""&&searchArray[i]!="mm/dd/yyyy"){
            //form is providing date in a different format than we are expecting so this routine drops leading 0's and puts m/d/y in correct order
            if (searchArray[i-1] == 'dob'){
                let temp = searchArray[i].split('-');
                let tempInt = parseInt(temp[1])
                let tempArray =[];
                tempArray.push(tempInt+"");
                tempInt= parseInt(temp[2]);
                tempArray.push(tempInt+"");
                tempArray.push(temp[0]);
                searchArray[i] = tempArray.join('/');
            }
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

}
function clearTable (location="output"){
    let clear = document.getElementById(location);
    clear.innerHTML = "";
}

function masterSearch(array){
    let result = searchRoutine(array);
    if(result[0] != "error"){
        tableOut(result);
    }
}
function searchRoutine(array){
    let result = [];
    while (array.length>1){
        result=attributeSearch(array.shift(),array.shift(),result);
        if(result[0] === "error"){
            array = result;
        }
    }
    return result;
}

function attributeSearch (name,value, result=[]){
    if(result[0]==undefined){
        result=[];
        result = result.concat(people.filter(function (person){
            if (name == 'parents'){
                if (person.parents.includes(parseInt(value))){
                    return true;
                }
            }
            else if (isNaN(person[name])===false){
                if (person[name]===parseInt(value)){
                    return true;
                }
            }
            else if (person[name].toLowerCase()===value.toLowerCase()){
            return true;
            }
               
        return false;
        }));
    }
    else{
        result = result.filter(function (person){
            if (isNaN(person[name])===false){
                if (person[name]===value){
        
                    return true;
                }
            }
            else if (person[name].toLowerCase()===value.toLowerCase()){
        
                return true;
            }   
            return false;
        });
    }
    try{
        if (result[0]==undefined){
            result[0] = "error";
            throw "Search returned no results please confirm your input";
        }  
    }
    catch(e){
        console.error(e);
        alert(e);
    }
    return result;


}

function writeHeading(heading = "Search Results", location="output"){
    document.getElementById(location).innerHTML += `<h2 align="center">${heading} <br><hr></hr></h2>`;
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
    <tr><td>"+arr[0].occupation+"</td><td>"+arr[0].parents+"</td><td>"+arr[0].currentSpouse+"</td><td>"+'<button id="printFam'+arr.length+'" onclick=getImmediateFamilyButton('+arr[0].id+')>Show Family</button>'+"</td></tr>\
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
function getImmediateFamilyButton(mainId){
    let result = getImmediateFamily(mainId);
    let person;
    people.forEach(match => {
        if(match.id === mainId){
            person = match;
        }
    });
    clearTable("output");
    clearTable("famOut");
    tableOut([person]);
    writeHeading(`${person.firstName} ${person.lastName}'s Immediate Family`, "famOut")
    tableOut(result, "famOut");
}

function getImmediateFamily(id){
    //
    let individual= people.filter(function (person){
        if(person.id === id){
            return true;
        }
        return false;
    })
    individual = individual[0];
    let spouse = individual.currentSpouse;
    let parents = individual.parents;
    let person = [];
    
    if (1<=parents.length) {
        person = getSiblings(parents[0].id,id);
    }
    if (spouse != null&& spouse != ""){
        people.forEach(match => {
            if( match.id === spouse){
                person[person.length] = match;
            }
        });
    }
    for (let i=0;i<parents.length;i++){
        people.forEach(match => {
            if( match.id === parents[i]){
                person[person.length] = match;
            }
        });
    }
    return person;
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
    //finding all users who have the person specified in the mainId attribute in their parents field
    let descendants = people.filter(function (person) {
        if(person.parents.includes(mainId)){
            return true;
        }
        return false;    
    })
    if(descendants.length > 0){
        for(let i = 0; i < descendants.length; i++){
            //calls this function recurisvely to identify any descendants of descendants
            let grandchildren = getDescendants(descendants[i].id);
            if (grandchildren !== undefined && grandchildren.length != 0){
                while(grandchildren.length > 0){
                    //merges any located grandchildren with the existing descendants
                    descendants.push(grandchildren.shift());
                }
            }
        }
    }
    return descendants;
}

function getDescendantsButton(mainId){
    /*This function takes care of selecting the correct user and then calls the getDescendants 
    function to get their Descendants and prints the returned value*/
    let result = getDescendants(mainId);
    let person;
    //iterates through people array to identify the specific person
    people.forEach(match => {
        if(match.id === mainId){
            person = match;
        }
    });
    //clearing existing results for to prevent endlessly appending results to the bottom of a list
    clearTable("output");
    clearTable("famOut");
    //writing new results based off returned values
    tableOut([person]);
    writeHeading(`${person.firstName} ${person.lastName}'s Descendants`, "famOut")
    tableOut(result, "famOut");
}
function enterListner(){
// Get the input field
    let input = document.getElementById("inputForm");

// Makes the enter key activate the submit button on click
    input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
        if (event.key === 'Enter') {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("submit").click();
        }
    });
}
//calling the keyboard listner to start on page load
enterListner();