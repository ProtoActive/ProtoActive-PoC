
var click_btn = document.getElementById('template_selected')

var filename ='buttons.json';

click_btn.addEventListener('click', function () {
    $.getJSON(filename, function (data) {
        data.firebase_Y.LikeBtn[0].layout.font =1;
        $.ajax({
            url: '/api/update',
            dataType: 'json',
            type: 'POST',
            data: {"data":data, "filename":filename},
            success: function (result) {
                console.log(result)
            }
          })
    });
    
});

