Lls.Views.Side = Backbone.View.extend({

    initialize : function(){
        this.bind_navigation();
    },

    show : function() {

    },

    create : function(){

    },

    hide_navigation : function(){
        $(".top-sec.go-left").text("").unbind('click');
        $(".top-sec.go-right").text("").unbind('click');
        $(".left-sec.go-up").text("").unbind('click');
        $(".left-sec.go-down").text("").unbind('click');
    },

    show_navigation :function(){
        $(".top-sec.go-left").text("<");
        $(".top-sec.go-right").text(">");
        $(".left-sec.go-up").text('/\\');
        $(".left-sec.go-down").text("\\/");
        this.bind_navigation();
    },

    bind_navigation : function(){
        $(".g-left .go-up").click(global_grid_view.moveUp);
        $(".g-left .go-down").click(global_grid_view.moveDown);
        $(".g-top .go-left").click(global_grid_view.moveLeft);
        $(".g-top .go-right").click(global_grid_view.moveRight);
    }
});