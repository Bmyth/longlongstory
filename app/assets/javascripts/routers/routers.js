Lls.Routers.Main = Backbone.Router.extend({

	routes : {
		"/" : "index"
	},

    initialize : function(){
        this.view = new Lls.Views.Main();
    },

    index: function(){
        this.view.render();
    }
});
