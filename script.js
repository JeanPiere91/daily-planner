// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
dayjs.extend(dayjs_plugin_advancedFormat);
var pEl = $('#currentDay');
var divContainerEl = $('.container-lg');

var startHour = 9;
var endHour = 17;
var currentHour = 13; //dayjs().hour();

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

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
});