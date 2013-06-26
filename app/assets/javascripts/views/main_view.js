Lls.Views.Main = Backbone.View.extend({

	initialized : false,

	initialize : function(){
		var that = this;
		global_main_view = this;
        global_window_view = new Lls.Views.Window();
        global_blocks = new Lls.Collections.Blocks();
        global_block_edit_view = new Lls.Views.BlockEdit();
        global_blocks_view = new Lls.Views.Blocks();
        global_nav_view = new Lls.Views.Nav();

        global_blocks.fetch({success:function(){
			initialized = true;
			that.render();
		}})
	},

    render : function() {
        if(!initialized)
            return false;

        global_blocks_view.render();
    }
});
