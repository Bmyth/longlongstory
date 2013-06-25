Lls.Views.StudioOpt = Backbone.View.extend({

    blockEditView : new Lls.Views.StudioBlockEdit(),

	initialize : function(){
        global_block_edit_view = this.blockEditView;
	},

	create : function(){
        $(".templates .opt-block").clone().appendTo($(".g-middle .studio")).css({height:"318px"});
        this.bind_opt();
	},

    show : function(){
        $('.studio  .opt-block').show();
    },

    hide : function(){
        $('.studio  .opt-block').hide();
    },

	bind_opt : function(){
		$(".opt-block .sub.add").click(this.edit_block);
		$(".opt-block .sub.empty").click(this.empty_block);
		$(".opt-block .sub.back").click(this.back);
	},

	edit_block : function(){
        global_block_edit_view.create();
	},

    empty_block : function(){
        global_blocks.delete_block_at(focused_block_coorX, focused_block_coorY, function(){
            global_grid_view.empty_block_at(focused_block_coorX, focused_block_coorY);
            global_studio_opt_view.back();
        });
    },

    back :function(){
        global_studio_view.delete();
        global_side_view.show_navigation();
    }

});
