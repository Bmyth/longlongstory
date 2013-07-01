Lls.Views.Studio = Backbone.View.extend({

    initialize : function(){
        global_studio_opt_view = new Lls.Views.StudioOpt();
        global_studio_nav_view = new Lls.Views.StudioNav();
        global_studio_dis_view = new Lls.Views.StudioDis();
    },

    show : function() {
        focused_block_coorX = parseInt($(this).attr('coor-x'));
        focused_block_coorY = parseInt($(this).attr('coor-y'));

        global_studio_view.create();
        global_studio_opt_view.create();
        global_studio_nav_view.create();
        global_studio_dis_view.create();
        global_side_view.hide_navigation();
    },

    create : function(){
        var studio_template = "<div class='studio'></div>"
        $(studio_template).appendTo($('.g-middle'));
    },

    delete :function(){
        $(".g-middle").find(".studio").remove();
    }
});
