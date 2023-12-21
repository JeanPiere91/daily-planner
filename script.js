// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
dayjs.extend(dayjs_plugin_advancedFormat);
var pEl = $('#currentDay');
var divContainerEl = $('.container-lg');
var pMessageEl = $('#message');
var startHour = 9;
var endHour = 17;

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  
  // Reads tasks from local storage and returns array of task objects.
  // Returns an empty array ([]) if there aren't any tasks.
  function readTasksFromStorage() {
    var tasks = localStorage.getItem('tasks');
    if (tasks) {
      tasks = JSON.parse(tasks);
    } else {
      tasks = [];
    }
    return tasks;
  }

  function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Gets project data from local storage and displays it
  function printProjectData() { 
    // get projects from localStorage
    var tasks = readTasksFromStorage();
    
    // loop through each project and create a row
    for (var i = 0; i < tasks.length; i += 1) {
      $("#hour-"+ tasks[i].hour).children('textarea').val(tasks[i].description);
    }
  }

  function handleTask(event) {

    
    //get element targeted 
    var iClicked = $(event.target);
    
    /* Valid if element target is button or Icon, otherwise won't do anything */
    if(event.target.tagName.toUpperCase().trim() === "BUTTON" || event.target.tagName.toUpperCase().trim() === "I")
    {

      // get identifier to save locally (hour)
      var taskHour = iClicked.parents('div').eq(0).attr('id').split('-')[1];

      // get description
      var taskDescription = $('#hour-'+ taskHour).children('textarea').val();
      
      // add project to local storage
      var tasks = readTasksFromStorage();

      var newTask = {
        hour: taskHour,
        description: taskDescription,
      };

      /* Flag value to know if the task has been updated */
      var editedValue = false;

      /* looking if the task exists */
      for(var i = 0; i < tasks.length; i++) {

        /* if the value exist just update and mark that the value is updated  */
        if(tasks[i].hour === taskHour)
        {
          tasks[i].description = taskDescription;
          editedValue = true;
        }
      }

      /* if the value is not updated, add a new task object */
      if(!editedValue) {
        alert("Appointment Added to localStorage");
        tasks.push(newTask);
      }
      else
        alert("Appointment Updated on localStorage");

      saveTasksToStorage(tasks); 

    }
    else
      return
  }

  divContainerEl.on('click', '.time-block', handleTask);

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  var currentHour = dayjs().hour();

  for (var i = 0 ; i < (endHour - startHour) + 1; i++) {
    var hour = (i + startHour);
    
    var divEl = $('<div>');
    divEl.attr('id', 'hour-' + hour);
    divEl.addClass('row time-block');
    
    /* Added class acording to current-hour and hour-displayed */
    if(hour < currentHour)
      divEl.addClass('past');
    else if (hour === currentHour)
      divEl.addClass('present');
    else
      divEl.addClass('future');

    /* Child Div */
    var divEl1 = $('<div>');
    divEl1.addClass('col-2 col-md-1 hour text-center py-3');
    divEl1.text(hour + " " + dayjs().hour(hour).format('A'));
    
    /* Child textarea */
    var taEl = $('<textarea>');
    taEl.addClass('col-8 col-md-10 description');
    taEl.attr('rows', '3');

    /* Child button */
    var btEl = $('<button>');
    btEl.addClass('btn saveBtn col-2 col-md-1');
    btEl.attr('aria-label', 'save');

    /* button's child (i) */
    var iEl = $('<i>');
    iEl.addClass('fas fa-save');
    iEl.attr('aria-hidden', 'true');

    /* Added element i within button element */
    btEl.append(iEl);

    /* Added element div, textare, button within div element */
    divEl.append(divEl1);
    divEl.append(taEl);
    divEl.append(btEl);

    /* Added element div within div-container element */
    divContainerEl.append(divEl);
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  // TODO: Add code to display the current date in the header of the page.
  pEl.text(dayjs().format('dddd, MMMM Do'));

  printProjectData();
});