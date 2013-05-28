Lls.Views.StudioOpt = Backbone.View.extend({

	initialize : function(){

	},

	create : function(){
        $(".templates .opt-block").clone().appendTo($(".g-middle .studio")).css({height:"318px"});
        this.bind_opt();
	},

	bind_opt : function(){
		$(".opt-block .block-add").click(this.show_block_edit);
		$(".opt-block .block-empty").click(this.empty_block);
		$(".opt-block .block-back").click(this.back_to_grid_view);
	},

	show_block_edit : function(){
        global_nav_view.hide();
        $('.single-block-frame .opt-block').css({top:'0px', height:'640px'});
        $('.templates .block-add-form').clone().appendTo($('.studio .opt-block'));
        $('.opt-block .block-add-form input.coorx').val(focused_block_coorX);
        $('.opt-block .block-add-form input.coory').val(focused_block_coorY);
        global_opt_view.bind_edit_opt();
	},

	bind_edit_opt : function(){
        $(".add-opt.title").hover(this.focus_title_edit, this.blur_title_edit);
		$(".add-opt.back").click(this.back_to_basic_opt);
	},	

    focus_title_edit : function(){
        $("input#block_title").focus();
        var t = $("input#block_title").val();
        $(".title-board").text(t).animate({top:'0px'});
    },

    blur_title_edit : function(){
        $("input#block_title").blur();
        $(".title-board").animate({top:'-160px'});
    },

    back_to_basic_opt : function(){
        $(".single-block-frame .opt-block").find(".block-add-form").remove();
        global_nav_view.show();
        $('.single-block-frame .opt-block').css({top:'320px', height:'320px'});
    },

    empty_block : function(){
        global_blocks.delete_block_at(focused_block_coorX, focused_block_coorY, function(){
            global_main_view.empty_block_at(focused_block_coorX, focused_block_coorY);
            global_opt_view.back_to_grid_view();
        });
    },

	bind_add_submit : function(){
		var block = new Lls.Models.Block();
		var title = $(".opt-add-block .title").val();
		var img = $(".opt-add-block .img").val();
	},

    back_to_grid_view : function(){
        $(".g-middle").find(".studio").remove();
        global_side_view.show_navigation();
    }

});
