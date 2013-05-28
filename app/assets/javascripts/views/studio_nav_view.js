Lls.Views.StudioNav = Backbone.View.extend({
	initialize : function(){

	},

	create : function(){
	    $(".templates .nav-block").clone().appendTo($(".g-middle .studio")).css({height:"318px"});
	},

	hide : function(){
	    $(".g-middle .nav-block").hide();
	},

    show : function(){
        $(".g-middle .nav-block").show();
    }
});
