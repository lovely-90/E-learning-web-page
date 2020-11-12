// Fetch slots from GET request
$(document).ready(function () {
  const get_url =
    'https://script.google.com/macros/s/AKfycbzJ8Nn2ytbGO8QOkGU1kfU9q50RjDHje4Ysphyesyh-osS76wep/exec';

  var data;

  async function getapi(url) {
    const response = await fetch(url);

    data = await response.json();
    console.log(data);
  }

  getapi(get_url);

  // Set Dates
  $('#courseName').change(function () {
    var course = this.value;
    var dates = [];
    var ts = new Date().getTime();
    var startSlot = ts + 4 * 60 * 60 * 1000;
    var endSlot = ts + 7 * 24 * 60 * 60 * 1000;

    if (course != '') {
      for (var i = 0; i < data.length; i++) {
        if (course.localeCompare(data[i].course_name) == 0) {
          for (var j = 0; j < data[i].slots.length; j++) {
            // set range;
            if (
              parseInt(data[i].slots[j].slot) >= startSlot &&
              parseInt(data[i].slots[j].slot) <= endSlot
            ) {
              var s = new Date(
                parseInt(data[i].slots[j].slot)
              ).toLocaleDateString('en-US');
              dates.push(s);
            }
          }
        }
      }

      // Remove duplicate dates
      var uniqueDates = [];
      $.each(dates, function (i, item) {
        if ($.inArray(item, uniqueDates) === -1) uniqueDates.push(item);
      });

      // Fill dates
      if (uniqueDates.length != 0) {
        // console.log(dates);
        $.each(uniqueDates, function (key, value) {
          $('#selectedDate').append(
            $('<option></option>').attr('value', value).text(value)
          );
        });
      } else {
        console.log('No slots available');
      }
    } else {
      console.log(err);
    }
  });

  // Set Time
  $('#selectedDate').change(function () {
    var course = $('#courseName').children('option:selected').val();
    var day = $(this).children('option:selected').val();
    var slots = [];
    var ts = new Date().getTime();
    var startSlot = ts + 4 * 60 * 60 * 1000;
    var endSlot = ts + 7 * 24 * 60 * 60 * 1000;

    if (course != '') {
      for (var i = 0; i < data.length; i++) {
        if (course.localeCompare(data[i].course_name) == 0) {
          for (var j = 0; j < data[i].slots.length; j++) {
            var d = new Date(
              parseInt(data[i].slots[j].slot)
            ).toLocaleDateString('en-US');

            if (day != '') {
              if (d.localeCompare(day) == 0) {
                // set range
                if (
                  parseInt(data[i].slots[j].slot) >= startSlot &&
                  parseInt(data[i].slots[j].slot) <= endSlot
                ) {
                  var t = new Date(
                    parseInt(data[i].slots[j].slot)
                  ).toLocaleTimeString('en-US');
                  slots.push(t);
                }
              }
            } else {
              console.log(err);
            }
          }
        }
      }

      // Fill slots
      if (slots.length != 0) {
        $.each(slots, function (key, value) {
          $('#selectedTime').append(
            $('<option></option>').attr('value', value).text(value)
          );
        });
      } else {
        console.log('Slot not available on this day');
      }
    } else {
      console.log(err);
    }
  });

  // reset input fields of form on Submit
  // $('#submitbtn').click(function () {
  //   $('#failure').removeClass('collapse');
  //   $('#myform').reset();
  // });
});
