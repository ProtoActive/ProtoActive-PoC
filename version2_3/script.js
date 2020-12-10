$(document).ready(function(){
  $(".upperbar").hover(function(){
      $(".navbar").slideToggle();
  });
});

var ID= makeid();
class Shape {
  //Constructor
  constructor (id, width, height, x, y, radius, bgcolor, drg) {
      this.id = id + "_" + ID;
      this.width = width + "px";
      this.height = height + "px";
      this.left = x + "px";
      this.top = y + "px";
      this.borderRadius = radius+ "%";
      this.fill = bgcolor;
      this.create(width, height, x, y, radius, bgcolor, drg);
  }
  // Create Function
  create (width, height, x, y, radius, bgcolor, drag) {
        // Defining Styles
        var style = "width : "  + width + "px; " +
                    "height : " + height + "px; " +
                    "left : "   + x + "px; " +
                    "top : "    + y + "px; " +
                    "background-color : " + bgcolor + "; " +
                    "border-radius:" + radius + "%;";

      var html;
      if(drag == "drag") {
        html = '<div class="shape hasmenu drag-shape" data-bgcolor="'+ bgcolor +
               '" data-drag="' + drag +
               '" id="' + this.id +
               '" style="' + style + '">'
      } else {
        html = '<div class="shape hasmenu" data-bgcolor="'+ bgcolor +
               '" data-drag="' + drag +
               '" id="' + this.id +
               '" style="' + style + '" />'
      }
      //Creating Element
      $(html).appendTo("#wrapper");
      //jscolor.init();
      ID = makeid();

  }

  // Animate Shape Function
  animateShape (width, height, x, y) {
    $("#" + this.id).animate({
      'width'  : width,
      'height' : height,
      'left'   : x,
      'top'    : y,
    }, 500);
  }
}

$('#inputRadius').on('input', function() {
    $('#inputRadiusHidden').val($(this).val());
});

$('#btnDrawShape').on('click', function() {
  var id = $('#inputName').val(),
      w = $('#inputWidth').val(),
      h = $('#inputHeight').val(),
      t = $('#inputTop').val(),
      l = $('#inputLeft').val(),
      r = $('#inputRadiusHidden').val(),
      c = "#" + $('#inputColor').val(),
      d = $('input[name=draggable]:checked').val();
  console.log(d);

  if (
      id != "" &&
      w != "" &&
      h != "" &&
      t != "" &&
      l != "" &&
      r != "" &&
      c != "" &&
      (d != "" && d != null && d != "null" && d != undefined && d != "undefined")
    ) {
        new Shape(
            id,         // id
            w,          // width          (in px)
            h,          // height         (in px)
            l,          // left_poistion  (in px)
            t,          // top_position   (in px)
            r,          // border_radius  (in %)
            c,          // fill_color     (color name or hex color code with # sign)
            d           // drag or static
        );
      MakeItDraggable();
      clearForm();
    } else {
      $('.form-control').each(function(){
        if($(this).val().length < 1) {
          $(this).addClass('error');
        } else if ($(this).val().length > 0) {
          $(this).removeClass('error');
        }
      });

      if($('input[name=draggable]:checked').val() == "undefined"
         || $('input[name=draggable]:checked').val() == undefined
         || $('input[name=draggable]:checked').val() == null
         || $('input[name=draggable]:checked').val() == "null"
         || $('input[name=draggable]:checked').val() == ""
        ) {
        $("#rdo_draggable").addClass('error');
      } else {
        $("#rdo_draggable").removeClass('error');
      }
      alert('Please fill all the required fields.');
    }
});

function MakeItDraggable() {
    $('.drag-shape').draggable().resizable();
      $(document).contextmenu({
        delegate: ".hasmenu",
        autoFocus: true,
        preventContextMenuForPopup: true,
        preventSelect: true,
        taphold: true,
        menu: [
          {title: "Duplicate", cmd: "duplicate", uiIcon: "ui-icon-copy"},
          {title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash"}
        ],
        // Handle menu selection to implement a fake-clipboard
        select: function(event, ui) {
            var $target = ui.target;
            switch(ui.cmd){
              case "delete":
                ui.target[0].remove();
              break;
              case "duplicate":
                var currElm = ui.target[0],
                    clnElm = currElm.cloneNode(true),
                    clnElmId = clnElm.id.split('_')[0];
                    debugger;
                clnElm.id = clnElmId;
                new Shape(
                  clnElm.id,                                    // id
                  clnElm.style.width.replace('px',''),          // width (in px)
                  clnElm.style.height.replace('px',''),         // height (in px)
                  clnElm.style.left.replace('px',''),          // left_poistion  (in px)
                  clnElm.style.top.replace('px',''),           // top_position   (in px)
                  clnElm.style.borderRadius.replace('%',''),   // border_radius  (in %)
                  clnElm.dataset.bgcolor,                // fill_color     (color name or hex color code with # sign)
                  clnElm.dataset.drag                          // drag or static
              );
                MakeItDraggable();
              break;
          }
        }
    });
}

function clearForm(){
    $('#inputName').val(''),
    $('#inputWidth').val(''),
    $('#inputHeight').val(''),
    $('#inputTop').val(''),
    $('#inputLeft').val(''),
    $('#inputRadius').val('0'),
    $('#inputRadiusHidden').val('0'),
    $('#inputColor').val("FFFFFF"),
    $('#inputColor').removeAttr("style"),
    $('input[name=draggable]').prop('checked', false);
    $("#rdo_draggable, .form-control").removeClass('error');
}

function makeid() {
  var text = "",
      char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    text += char.charAt(Math.floor(Math.random() * char.length));
  return text;
}

function update(jscolor, elm) {
    // 'jscolor' instance can be used as a string
    document.getElementById(elm).style.backgroundColor = '#' + jscolor
}

/*
$("#" + circle.id).on('mouseenter', function(){
  circle.animateShape(200, 50, 200, 140); // width, height, left, top,
});

$("#" + circle.id).on('mouseleave', function(){
  circle.animateShape(50, 50, 10, 140); // width, height, left, top,
});
*/
