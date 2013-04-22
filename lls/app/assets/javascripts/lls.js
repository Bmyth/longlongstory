// matrix position: 
// top + coorYoffset = -2
// bottom + coorYoffset = 3
// left + coorXoffset = -2
// right + coorXoffset = 5

$(function(){
  init_coordonate();
  bind_navigation();
  render_blocks();
});

var coorXoffset = -1;
var coorYoffset = -1;
var Lblock = 160;

var init_coordonate = function(){
  $(".block").each(function(){
    var coorX = parseInt($(this).attr('coor-x')) + coorXoffset;
    $(this).attr('coor-x', coorX);
    var coorY = parseInt($(this).attr('coor-y')) + coorYoffset;
    $(this).attr('coor-y', coorY);
  })
}

var bind_navigation = function(){
  bind_nav_hover();
  $(".g-top .nav-img").click(moveUp);
  $(".g-bottom .nav-img").click(moveDown);
  $(".g-left .nav-img").click(moveLeft);
  $(".g-right .nav-img").click(moveRight);
}

var moveUp = function(){
  coorYoffset -= 1;
  $(".block-world").animate({top: '-320px'},"fast",function(){
    $(".block-world .block").each(function(){
      if(parseInt($(this).attr('coor-y')) + coorYoffset == -3){
        $(this).addClass("toBeRemoved");
      }
    })
    $(".block-world").find(".toBeRemoved").remove();
    var bottom = 3 - coorYoffset;
    for(var i = -2 - coorXoffset; i <= 5 - coorXoffset; i ++){
      insertBlock(i, bottom, 2);
    }
    $(".block-world").css('top','-160px');
  });
}

var moveDown = function(){
  coorYoffset += 1;
  $(".block-world").animate({top: '0px'},"fast",function(){
    $(".block-world .block").each(function(){
      if(parseInt($(this).attr('coor-y')) + coorYoffset == 4){
        $(this).addClass("toBeRemoved");
      }
    })
    $(".block-world").find(".toBeRemoved").remove();
    var top = -2 - coorYoffset;
    for(var i = 5 - coorXoffset; i >= -2 - coorXoffset; i --){
      insertBlock(i, top, 0);
    }
    $(".block-world").css('top','-160px');
  });
}

var moveLeft = function(){
  coorXoffset -= 1;
  $(".block-world").animate({left: '-320px'},"fast",function(){
    $(".block-world .block").each(function(){
      if(parseInt($(this).attr('coor-x')) + coorXoffset == -3){
        $(this).addClass("toBeRemoved");
      }
    })
    $(".block-world").find(".toBeRemoved").remove();
    var left = 5 - coorXoffset;
    for(var i = -2 - coorYoffset; i <= 3 - coorYoffset; i ++){
      insertBlock(left, i, 1);
    }
    $(".block-world").css('left','-160px');
  });  
}

var moveRight = function(){
  coorXoffset += 1;
  $(".block-world").animate({left: '0px'},"fast",function(){
    $(".block-world .block").each(function(){
      if(parseInt($(this).attr('coor-x')) + coorXoffset == 6){
        $(this).addClass("toBeRemoved");
      }
    })
    $(".block-world").find(".toBeRemoved").remove();
    var left = -2 - coorXoffset;
    for(var i = -2 - coorYoffset; i <= 3 - coorYoffset; i ++){
      insertBlock(left, i, 3);
    }
    $(".block-world").css('left','-160px');
  });  
}

var block_template = "<div class='block' coor-x='' coor-y='' status='blank'></div>";

// d: 0-top 1-right 2-bottom 3-left
var insertBlock =function(x, y, d){
  var item = $(block_template).attr('coor-x', x).attr('coor-y', y);
  if(d == 0){
    item.insertBefore($(".block:first"));
  }
  if(d == 1){
    var selectString = ".block[coor-x='" + (x-1) + "'][coor-y='" + y + "']";
    item.insertAfter($(selectString));    
  }
  if(d == 2){
    item.insertAfter($(".block:last"));
  }
  if(d == 3){
    var selectString = ".block[coor-x='" + (x+1) + "'][coor-y='" + y + "']";
    item.insertBefore($(selectString));
  }
  render_single_block(x,y);
}

var bind_nav_hover = function(){
  $(".g-func").each(function(){
    var that = this;
    $(this).hover(function(){
      $(that).addClass("func-active");
    },function(){
      $(that).removeClass("func-active");
    })
  })
}

var render_blocks = function(){
  if($("block-buffer li").size() == 0){
    set_origin_block();
  }else{
    
  }
}

var block_title_template = "<p class='block-title'></p>";

var block_img_template = "<img class='block-img'>";

var render_single_block = function(x, y){
  var selectString = ".block-buffer .block-item[coorX='" + x + "'][coorY='" + y + "']";
  if($(selectString).size() == 1){
    var title = $(block_title_template).text($(selectString).children(".title").text());
    var img = $(block_img_template).attr('src','assets/' + $(selectString).children(".img").text());
    var selectString2 = ".block[coor-x='" + x + "'][coor-y='" + y + "']";
    if($(selectString2).attr('status') == 'blank'){
      title.appendTo($(selectString2));
      img.appendTo($(selectString2));
      $(selectString2).attr('status','writen');    
    }else if($(selectString2).attr('status') == 'writen'){
      clear_block(x,y);
      title.appendTo($(selectString2));
      img.appendTo($(selectString2));
      $(selectString2).attr('status','writen'); 
    }
  } 
}

var clear_block = function(x, y){
  var selectString = ".block[coor-x='" + x + "'][coor-y='" + y + "']";
  $(selectString).find(".block-title").remove();
  $(selectString).find(".block-img").remove();
}

var block_buffer_template = "<li class='block-item' bid='' coorX='' coorY='' status='blank'><p class='title'></p><p class='img'></p></li>";

var set_origin_block = function(){
  var blockBuffer = $(block_buffer_template).attr({'bid':'0','coorX':'0','coorY':'0'});
  blockBuffer.children(".title").text("origin point");
  blockBuffer.children(".img").text("origin.jpg");
  blockBuffer.appendTo($("ul.block-buffer"));
  render_single_block(0,0);
}