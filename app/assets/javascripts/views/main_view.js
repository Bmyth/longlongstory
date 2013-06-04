Lls.Views.Main = Backbone.View.extend({

	initialized : false,

	initialize : function(){
		var that = this;
		global_main_view = this;
        global_blocks = new Lls.Collections.Blocks();
        global_studio_view = new Lls.Views.Studio();
        global_grid_view = new Lls.Views.Grid();
        global_side_view = new Lls.Views.Side();

        global_blocks.fetch({success:function(){
			initialized = true;
			that.render();
		}})

        this.bind_block();
	},

    render : function() {
        if(!initialized)
            return false;

        global_grid_view.render();
    },

    //should go to grid view
    bind_block : function(){
        $(".block").each(function(){
            $(this).click(global_studio_view.show);
        })
    }
});
