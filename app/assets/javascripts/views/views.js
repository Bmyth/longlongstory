
Lls.Views.Blocks = Backbone.View.extend({
	blocks : new Lls.Collections.Blocks(),
	optView : new Lls.Views.OptView(),
	navView : new Lls.Views.NavView(),
	initialized : false,

	initialize : function(){
		var that = this;
		global_block_view = this;
		coorXoffset = -1;
		coorYoffset = -1;
		Lblock = 160;
		focused_block_coorX = 0;
		focused_block_coorY = 0;
		this.init_coordonate();
		this.bind_navigation();
		this.bind_block_opt();
		this.blocks.fetch({success:function(){
			initialized = true;
			that.render();
		}})
	},

	bind_navigation : function(){
		$(".g-left .go-up").click(this.moveUp);
	  $(".g-left .go-down").click(this.moveDown);
	  $(".g-top .go-left").click(this.moveLeft);
	  $(".g-top .go-right").click(this.moveRight);
	},

	bind_block_opt : function(){
	  $(".block").each(function(){
	    $(this).click(global_block_view.focused_on_block);
	  })
	},

	render : function() {
		var that = this;
		if(!initialized){
			return false;
		}
    if(this.blocks != undefined){
      this.blocks.each(function(block){
        that.render_block_with(block);
      });
    }
	},

	render_block_with : function(block_data){
		var block_title_template = "<p class='block-title'></p>";
		var block_img_template = "<img class='block-img'>";

		var x = block_data.get('coorX');
		var y = block_data.get('coorY');

		var block = this.get_block_at(x, y);
    $(block_title_template).text(block_data.get('title')).appendTo(block);
    $(block_img_template).attr('src',block_data.get('img').url).appendTo(block);
	},

	render_block_at : function(x, y){
		var block = this.get_block_data_at(x,y);
		if(block != 0){
			this.render_block_with(block);
		}
	},

  empty_block_at : function(x, y){
    var b = this.get_block_at(x, y);
    b.find('.block-title').remove();
    b.find('.block-img').remove();
    b.attr('status','blank');
  },

	get_block_at : function(x, y){
	  var selectString = ".block[coor-x='" + x + "'][coor-y='" + y + "']";
	  return $(selectString);
	},

	get_block_data_at : function(x, y){
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
	      global_block_view.insertBlock(i, bottom, 2);
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
	      global_block_view.insertBlock(i, top, 0);
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
	      global_block_view.insertBlock(left, i, 1);
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
	      global_block_view.insertBlock(left, i, 3);
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
	    item.insertAfter(this.get_block_at(x-1, y));    
	  }
	  if(d == 2){
	    item.insertAfter($(".block:last"));
	  }
	  if(d == 3){
	    item.insertBefore(this.get_block_at(x+1, y));
	  }
	  this.render_block_at(x,y);
	},

	focused_on_block : function(){
		focused_block_coorX = parseInt($(this).attr('coor-x'));
		focused_block_coorY = parseInt($(this).attr('coor-y'));

		var single_frame_template = "<div class='single-block-frame'></div>"
		$(single_frame_template).appendTo($('.g-middle'));
		$("<div class='title-board'></div>").appendTo($(".single-block-frame"));
		global_block_view.optView.create();
		global_block_view.navView.create();

	  var seed_block = global_block_view.get_block_at(focused_block_coorX, focused_block_coorY).clone();
	  seed_block.css({width:'638px', height:'638px',position:'absolute', top:'0px', left:'0px', 'border-color':'#ddd', 'background-color': 'white'}).appendTo($(".single-block-frame")).removeClass("block").addClass('focused-block');
	}

});
