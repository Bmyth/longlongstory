Lls.Views.Nav = Backbone.View.extend({

    initialize : function(){
        this.bind_navigation();
    },

    show : function() {

    },

    create : function(){

    },

    bind_navigation : function(){
        $(".nav-btn.up").click(global_blocks_view.moveUp);
        $(".nav-btn.down").click(global_blocks_view.moveDown);
        $(".nav-btn.left").click(global_blocks_view.moveLeft);
        $(".nav-btn.right").click(global_blocks_view.moveRight);
    }
});