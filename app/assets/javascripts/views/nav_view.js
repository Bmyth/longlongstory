Lls.Views.NavView = Backbone.View.extend({
	initialize : function(){
		global_nav_view = this;
	},

	create : function(){
	    $(".templates .nav-block").clone().appendTo($(".g-middle .single-block-frame")).css({height:"318px"});
	},

	hide : function(){
	    $(".g-middle .nav-block").hide();
	},

    show : function(){
        $(".g-middle .nav-block").show();
    }
});
