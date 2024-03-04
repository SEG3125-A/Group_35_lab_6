// jQuery that will "listen" to the index.html
$(document).ready(function(){

    console.log("waiting");

    $('form').on('submit', function(){
  
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
  

  //inspired by https://stackoverflow.com/questions/6218494/using-the-html5-required-attribute-for-a-group-of-checkboxes
  function deRequire(box) {
    el = document.getElementsByClassName(box);
  
    var atLeastOneChecked = false; //at least one is checked
    for (i = 0; i < el.length; i++) {
      if (el[i].checked === true) {
        atLeastOneChecked = true;
      }
    }
  
    if (atLeastOneChecked === true) {
      for (i = 0; i < el.length; i++) {
        el[i].required = false;
      }
    } else {
      for (i = 0; i < el.length; i++) {
        el[i].required = true;
      }
    }
  }

