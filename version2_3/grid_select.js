
var click = document.getElementById('grid_selected')
var filename ='template.json';
click.addEventListener('click', function () {
    $.getJSON(filename, function (data) {
        data.fourbyfour.if_selected =1;
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

