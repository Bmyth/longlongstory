Lls.Routers.Main = Backbone.Router.extend({

	routes : {
		"/" : "index"
	},

  initialize : function(){
    this.view = new Lls.Views.Blocks();
  },

	index: function(){
    this.view.render();
	}
});
