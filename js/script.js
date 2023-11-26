const inputBox = document.getElementById('input-box')
// task complected feature
let totalTask = document.getElementById('totalTask');
let complectedTask = document.getElementById('complectedTask');
let totalTaskCount = 0;
let complectedTaskCount = 0;

// ------------------------------Task Seperation------------------------------
const listContainerForToday = document.getElementById('list-container-today')
const listContainerForWeek = document.getElementById('list-container-week')
const listContainerForMonth = document.getElementById('list-container-month')
let taskForWhen = document.getElementById('taskForWhen');

// ------------------------------DEAFAULT TEXTS------------------------------
let defaultTodayText = document.getElementById('defaultTodayText');
let defaultWeekText = document.getElementById('defaultWeekText');
let defaultMonthText = document.getElementById('defaultMonthText');


function addTask() {
    if (inputBox.value === '') {
        alert("You must write something")
    }
    else {
        // Seperation of task for day, week and Month
        console.log(taskForWhen.value);

        if (taskForWhen.value == 'today') {
            // -------------------FOR TODAY-------------------
            // create list of items
            let li = document.createElement("li")
            li.innerHTML = inputBox.value
            listContainerForToday.appendChild(li)

            // create X icon
            let span = document.createElement('span')
            span.innerHTML = "\u00d7"
            li.appendChild(span)

            // save in local storage - block and none 
            // if (listContainerForToday.children.length >= 1) {
            //     defaultTodayText.style.display = 'none';
            // }

        } else if (taskForWhen.value == 'thisWeek') {
            // ------------------FOR THIS WEEK------------------
            // create list of items
            let li = document.createElement("li")
            li.innerHTML = inputBox.value
            listContainerForWeek.appendChild(li)

            // create X icon
            let span = document.createElement('span')
            span.innerHTML = "\u00d7"
            li.appendChild(span)

            // console.log(listContainerForWeek.children.length);
            // if (listContainerForWeek.children.length >= 1) {
            //     defaultWeekText.style.display = 'none';
            // }

        } else if (taskForWhen.value == 'thisMonth') {
            // --------------FOR THIS MONTH--------------
            let li = document.createElement("li")
            li.innerHTML = inputBox.value
            listContainerForMonth.appendChild(li)

            // create X icon
            let span = document.createElement('span')
            span.innerHTML = "\u00d7"
            li.appendChild(span)

            // if (listContainerForMonth.children.length >= 1) {
            //     defaultMonthText.style.display = 'none';
            //     console.log("None");
            // }

        } else {
            alert("Please select the task's schedule");
        }

        // increment the total number of task when user add one by one
        totalTaskCount++;
        totalTask.innerHTML = totalTaskCount;
    }
    inputBox.value = ""
    saveData()
}

// identify entered key press and add task to task list bar
inputBox.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        addTask()
    }
})

// -----------------click function for three categories-----------------
//TODO: BELOW CODE NEEDS TO OPTIMIZED
listContainerForToday.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked')

        if (e.target.classList == 'checked') {
            // increment the total number of complected task when user complets task one by one
            complectedTaskCount++;
            complectedTask.innerHTML = complectedTaskCount;
        } else {
            // decrement the complected count of task when user wants to redo it
            complectedTaskCount--;
            complectedTask.innerHTML = complectedTaskCount;
        }

        saveData()
    }
    else if (e.target.tagName === 'SPAN') {
        totalTaskCount--;
        totalTask.innerHTML = totalTaskCount;

        if (e.target.parentElement.className) {
            complectedTaskCount--;
            complectedTask.innerHTML = complectedTaskCount;
        }
        e.target.parentElement.remove()
        saveData()
    }
}, false)

listContainerForWeek.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked')

        if (e.target.className == 'checked') {
            setTimeout(() => {
                e.target.remove()
                saveData()
            }, 2000);

            // decrement the total task one by one
            totalTaskCount--;
            totalTask.innerHTML = totalTaskCount;

        }
        saveData()
    }
    else if (e.target.tagName === 'SPAN') {
        totalTaskCount--;
        totalTask.innerHTML = totalTaskCount;

        if (e.target.parentElement.className) {
            complectedTaskCount--;
            complectedTask.innerHTML = complectedTaskCount;
        }
        e.target.parentElement.remove()
        saveData()
    }
}, false)

listContainerForMonth.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked')

        if (e.target.className == 'checked') {
            setTimeout(() => {
                e.target.remove()
                saveData()
            }, 5000);

            // decrement the total task one by one
            totalTaskCount--;
            totalTask.innerHTML = totalTaskCount;
        }
        saveData()
    }
    else if (e.target.tagName === 'SPAN') {
        totalTaskCount--;
        totalTask.innerHTML = totalTaskCount;

        if (e.target.parentElement.className) {
            complectedTaskCount--;
            complectedTask.innerHTML = complectedTaskCount;
        }
        e.target.parentElement.remove()
        saveData()
    }
}, false)


// saving the data to local Storage

function saveData() {
    localStorage.setItem('data1', listContainerForToday.innerHTML)
    localStorage.setItem('data2', listContainerForWeek.innerHTML)
    localStorage.setItem('data3', listContainerForMonth.innerHTML)
    localStorage.setItem('cTask', complectedTask.innerHTML);
    localStorage.setItem('tTask', totalTask.innerHTML);
}


// showing the saved data
function showTask() {
    listContainerForToday.innerHTML = localStorage.getItem('data1')
    listContainerForWeek.innerHTML = localStorage.getItem('data2')
    listContainerForMonth.innerHTML = localStorage.getItem('data3')
    complectedTask.innerHTML = localStorage.getItem('cTask')
    totalTask.innerHTML = localStorage.getItem('tTask')
}
showTask()

// to work the the previous count we have to set the count the value with whateve saved in localstorage
totalTaskCount = localStorage.getItem('tTask');
complectedTaskCount = localStorage.getItem('cTask');



// -------------------------------RESET BUTTON LOGIC -------------------------------
function uncheckedForNewDay() {
    // this will remove the "checked" class from the list
    for (let node of listContainerForToday.childNodes) {
        node.className = ''
    }
    // reset the total number of task complected to 0
    complectedTaskCount = 0;
    complectedTask.innerHTML = complectedTaskCount;

    saveData();
}

/*

function scheduleAt3AM() {
    let now = new Date();
    let millisTill3PM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 3, 0, 0, 0) - now;
    if (millisTill3PM < 0) {
        // If it's already past 9:14 PM, schedule for tomorrow
        millisTill3PM += 86400000; // 24 hours in milliseconds
    }
    setTimeout(uncheckedForNewDay, millisTill3PM);
}

// Start the scheduling
scheduleAt3AM();
*/

//------------------------------ DELETE EVERYTHING------------------------------
// delete everyting the from local storage - emergency reset button
function deleteEverything() {
    let userChoice = confirm("Do you want to erase everything?");

    console.log(userChoice);
    if (userChoice) {
        localStorage.clear();
        location.reload();
    }
}