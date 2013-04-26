
Lls.Views.Blocks = Backbone.View.extend({
	blocks : new Lls.Collections.Blocks(),
	initialized : false,

	initialize : function(){
		var that = this;
		global_blocl_view = this;
		coorXoffset = -1;
		coorYoffset = -1;
		Lblock = 160;
		this.init_coordonate();
		this.bind_navigation();

		this.blocks.fetch({success : function(){
			initialized = true;
			that.render();
		}})
	},

	bind_reset : function (){
		this.blocks.on('reset', this.render, this);
	},

	bind_navigation : function(){
	  this.bind_nav_hover();
		$(".g-top .nav-img").click(this.moveUp);
	  $(".g-bottom .nav-img").click(this.moveDown);
	  $(".g-left .nav-img").click(this.moveLeft);
	  $(".g-right .nav-img").click(this.moveRight);
	},

	bind_nav_hover : function(){
	  $(".g-func").each(function(){
	    var that = this;
	    $(this).hover(function(){
	      $(that).addClass("func-active");
	    },function(){
	      $(that).removeClass("func-active");
	    })
	  })
	},

	render : function() {
		var that = this;
		if(!initialized){
			return false;
		}

		this.blocks.each(function(block){
			that.render_block(block);
		});
	},

	render_block : function(block_data){
		var block_title_template = "<p class='block-title'></p>";
		var block_img_template = "<img class='block-img'>";

		var x = block_data.get('coorX');
		var y = block_data.get('coorY');

    var title = $(block_title_template).text(block_data.get('title'));
    var img = $(block_img_template).attr('src','assets/' + block_data.get('img'));
    var block = this.get_block_by_coordinates(x, y);
    if(block.attr('status') == 'blank'){
      title.appendTo(block);
      img.appendTo(block);
      block.attr('status','writen');    
    }else if(block.attr('status') == 'writen'){
      clear_block(x,y);
      title.appendTo(block);
      img.appendTo(block);
      block.attr('status','writen'); 
    }		
	},

	render_single_block : function(x, y){
		var block = this.get_block_data_by_coordinates(x,y);
		if(block != 0){
			this.render_block(block);
		}
	},

	get_block_by_coordinates : function(x, y){
	  var selectString = ".block[coor-x='" + x + "'][coor-y='" + y + "']";
	  return $(selectString);
	},

	get_block_data_by_coordinates : function(x, y){
		var result = 0;
		this.blocks.each(function(block){
			if(block.get('coorX') == x && block.get('coorY') == y){
				result = block;
				return false;
			}
		})
		return result;
	},

	init_coordonate : function(){
  	$(".block").each(function(){
    	var coorX = parseInt($(this).attr('coor-x')) + coorXoffset;
    	$(this).attr('coor-x', coorX);
    	var coorY = parseInt($(this).attr('coor-y')) + coorYoffset;
    	$(this).attr('coor-y', coorY);
  	})
	},

	moveUp : function(){
	  coorYoffset -= 1;
	  $(".block-world").animate({top: '-320px'},"fast",function(){
	    $(".block-world .block").each(function(){
	      if(parseInt($(this).attr('coor-y')) + coorYoffset == -3){
	        $(this).addClass("toBeRemoved");
	      }
	    })
	    $(".block-world").find(".toBeRemoved").remove();
	    var bottom = 3 - coorYoffset;
	    for(var i = -2 - coorXoffset; i <= 5 - coorXoffset; i++){
	      global_blocl_view.insertBlock(i, bottom, 2);
	    }
	    $(".block-world").css('top','-160px');
	  });
	},

	moveDown : function(){
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
	      global_blocl_view.insertBlock(i, top, 0);
	    }
	    $(".block-world").css('top','-160px');
	  });
	},

	moveLeft : function(){
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
	      global_blocl_view.insertBlock(left, i, 1);
	    }
	    $(".block-world").css('left','-160px');
	  });  
	},

	moveRight : function(){
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
	      global_blocl_view.insertBlock(left, i, 3);
	    }
	    $(".block-world").css('left','-160px');
	  });  
	},

	// d: 0-top 1-right 2-bottom 3-left
	insertBlock : function(x, y, d){
		var block_template = "<div class='block' coor-x='' coor-y='' status='blank'></div>";
	  var item = $(block_template).attr('coor-x', x).attr('coor-y', y);
	  if(d == 0){
	    item.insertBefore($(".block:first"));
	  }
	  if(d == 1){
	    item.insertAfter(this.get_block_by_coordinates(x-1, y));    
	  }
	  if(d == 2){
	    item.insertAfter($(".block:last"));
	  }
	  if(d == 3){
	    item.insertBefore(this.get_block_by_coordinates(x+1, y));
	  }
	  this.render_single_block(x,y);
	}
});
