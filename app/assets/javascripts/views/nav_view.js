Lls.Views.Nav = Backbone.View.extend({

    initialize : function(){
        this.bind_navigation();
    },

    show : function() {

    },

    create : function(){

    },

    bind_navigation : function(){
        this.bind_mouse_nav($(".nav-btn.up"),global_blocks_view.moveUp);
        this.bind_mouse_nav($(".nav-btn.down"),global_blocks_view.moveDown);
        this.bind_mouse_nav($(".nav-btn.left"),global_blocks_view.moveLeft);
        this.bind_mouse_nav($(".nav-btn.right"),global_blocks_view.moveRight);
        $(".nav-btn.zoom-in").click(global_blocks_view.zoom_in);
        $(".nav-btn.zoom-out").click(global_blocks_view.zoom_out);
    },

    bind_mouse_nav : function(element, event){
        $(element).mousedown(function(){
            event();
            var intervalTime = 150;
            var intervalId = window.setInterval(event, intervalTime);
            $(this).mouseup(function(){
                window.clearInterval(intervalId);
            })
        });
    }
});