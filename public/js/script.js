//On page load, fire jQuery
$(document).ready(function(){
  //Set up listener to react to user setting a menu item.
  $("#movie-select").change(async function () {
      try {
        //send form data over POST and collect the `type` field from response.
        const processedData = await $.post('/api/processPage', $('#question-form' ).serialize());
        const type = processedData.type;

        //send type and text fields to our secnd API endpoint.
        const messsageData = await $.post('/api/messages', {type: type, text: $('#text').val()});

        //Set message alert to visible and add our response data
        $('#message').text(messsageData.message);
        $('#message').slideDown();
      } catch (err) {
          //If AJAX fails, inform the user with a text alert.
          alert('Error: ' + err.status +  ' ' + err.statusText + '.  For more information, check the console.');
          console.log(err);
      }
    });
});
