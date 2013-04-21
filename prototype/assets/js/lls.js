$(function(){
  initMe();
  bindAll();
});

var dialog_add_status = "open";
var mousePos;

var bindAll = function(){
  $(".add-dialog").click(addDialog); 
  $(".submit-dialog").click(submitDialog);
}

var initMe = function(){
  $(".console").text("waiting for dialog adding...");
  $(".dialog-editor").hide();
  $(".add-dialog").show();
}

var addDialog = function(){
  startMouseCapture();
  $(".console").text("position anchoring...");
  $(".add-dialog").hide();
}

var startMouseCapture = function(){
  $(".painting-board img").css('cursor','crosshair').click(function(e){
    mousePos = mousePosition(e);
    $(".console").text("edit dialog at: " + mousePos.x + ", " + mousePos.y);
    $(".dialog-editor").show();
    $(".painting-board img").css('cursor','default');
    $(this).unbind('click');
  })
}


var submitDialog = function(){
  var dialog = $("<div class='dialog-container'><p class='dialog'></p></div>");
  dialog.children("p").text("“" + $(".dialog-text").val() + "”");
  dialog.css({
    left: mousePos.x,
    top: mousePos.y
  }).appendTo($(".painting-board"));

  initMe();
}

function mousePosition(ev)
{  
　　if(ev.pageX || ev.pageY) 
　　　　return {x:ev.pageX, y:ev.pageY};  
　　return {  
　　　　　　x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,  y:ev.clientY + 
　　　　　　document.body.scrollTop -document.body.clientTop  
　　}; 
}  
