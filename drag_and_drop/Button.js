let App = document.getElementById('app');
var onClick =document.getElementById('btn');
let newbtn = document.createElement('button');
var filename ="buttons.json";
var left, Top, width, height,color,N,link,page ;
function isEmpty(str){
         
    if(typeof str == "undefined" || str == null || str == ""){
        console.log("True");
        return true;
    }

    else
        return false ;
}

onClick.addEventListener('click',function(){
    $.getJSON(filename, function (data) {
        left =data.firebase_Y.LikeBtn[0].layout.left;
        Top =data.firebase_Y.LikeBtn[0].layout.top;
        height =data.firebase_Y.LikeBtn[0].layout.height;
        width =data.firebase_Y.LikeBtn[0].layout.width;
        color =data.firebase_Y.LikeBtn[0].layout.color;
        N =data.firebase_Y.LikeBtn[0].id;
        link =data.firebase_N.LinkBtn[0].layout.link;
        page =data.firebase_N.PageTabBtn[0].layout.page;        
newbtn.id = "button"+N;
let str = "position: absolute; left: "+left+"px; top: "+Top+"px; background-color:#"+color+"; width: "+width+"px; height: "+height+"px;";

newbtn.style = str;
newbtn.type ='button';
if(!isEmpty(link)){    
    newbtn.addEventListener('click',function(){
        window.open(link)
    });
}
else if(!isEmpty(page)){

    newbtn.addEventListener('click',function(){
        location.href = page;
    });
}
App.appendChild(newbtn);
    });
})

