// jQuery that will "listen" to the index.html
$(document).ready(function(){

    console.log("waiting");

    $('#surveyForm').on('submit', function(){
      //event.preventDefault(); // Prevent the default form submission.
         //const item = $('form input');
         //console.log(item.serializeArray());
  
        $.ajax({
          type: 'POST',
          url: '/',
          data: $(this).serializeArray(),
          success: function(response) {
            // Handle success.
            console.log('Form submitted successfully.');
            alert('Thanks for your submission!');
        },
        error: function(xhr, status, error) {
            // Handle error. 
            console.error('Form submission failed:', error);
        }
        });
      
       // return false;
    });
  });
  