let App = document.getElementById('app');
var onClick =document.getElementById('text_and_btn');

let newtext = document.createElement('textarea');
var filename ="Button_and_Box.json";
var left, Top, width, height, color, N;


let newbtn = document.createElement('button');
var left, Top, width, height, color;

function isEmpty(str){
         
    if(typeof str == "undefined" || str == null || str == ""){
        return true;
    }

    else
        return false ;
}

onClick.addEventListener('click',function(){
    $.getJSON(filename, function (data) {
        left =data.Posting[0].options.textBox[0].layout.left;
        Top =data.Posting[0].options.textBox[0].layout.top;
        height =data.Posting[0].options.textBox[0].layout.height;
        width =data.Posting[0].options.textBox[0].layout.width;
        color =data.Posting[0].options.textBox[0].layout.color;
        placeholder =data.Posting[0].options.textBox[0].placeholder;
        N =data.Posting[0].options.textBox[0].id;
        newtext.id = "text"+N;
        let str_Text = "position: absolute; left: "+left+"px; top: "+Top+"px; background-color:#"+color+"; width: "+width+"px; height: "+height+"px; resize:none;";
        newtext.style = str_Text;
        newtext.type ='textarea';
        newtext.id = 'text'+N;
        console.log("textarea style: "+ "left:"+left,"Top:"+Top, "height:"+height, "width:"+width,
         "color:"+color)

        btn_height =data.Posting[0].options.button[0].layout.height;
        btn_width =data.Posting[0].options.button[0].layout.width;
        color =data.Posting[0].options.button[0].layout.color;
        N =data.Posting[0].options.button[0].id;
        newbtn.id = "button"+N;
        btn_left = parseInt(left)+ parseInt(width)+10
        btn_top =  parseInt(Top,10) + parseInt(height,10) + 10
        console.log("button style: "+"left:"+btn_left, "height:"+btn_height,"top"+btn_top, "width"+btn_width, "color:"+color)
        let str_text = "position: absolute; left: "+btn_left+"px; top: "+btn_top+"px; background-color:#"+color+"; width: "+btn_width+"px; height: "+btn_height+"px;";
        newbtn.style = str_text;
        newbtn.type ='button';
        newbtn.id = 'text_button'+N;
        newbtn.addEventListener('click',function(){
            var postText = $('#text1').val();
            console.log(postText)
            var postingname = "osj"
            $.ajax({
                url: '/api/text',
                dataType: 'json',
                type: 'POST',
                data: { 'name': postingname, 'text': postText},
                success: function (result) {
                    console.log(result)
                }
              })
        });
        App.appendChild(newtext);
        App.appendChild(newbtn);
    });
})

