// jQuery that will "listen" to the index.html
$(document).ready(function(){

    // console.log("waiting");

    $('form').on('submit', function(){
        
        // const item = $('form input');
        // console.log(item.serializeArray());
  
        $.ajax({
          type: 'POST',
          url: '/',
          data: $(this).serializeArray()
        });
        return false;
    });
  });
  