Lls.Views.Nav = Backbone.View.extend({

    initialize : function(){
        this.set_position();
//        this.bind_navigation();
    },

    set_position : function(){
        var horizon_size =  (global_blocks_view.blockRowNumber - 2) * global_blocks_view.blockLength;
        var vertical_size = (global_blocks_view.blockColumnNumber - 2) * global_blocks_view.blockLength;
        $('.up-nav').css('width', horizon_size + 'px');
        $('.right-nav').css('height', vertical_size + 'px');
        $('.down-nav').css('width', horizon_size + 'px');
        $('.left-nav').css('height', vertical_size + 'px');
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