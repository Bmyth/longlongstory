Lls.Views.Studio = Backbone.View.extend({

    initialize : function(){
        this.optView = new Lls.Views.StudioOpt();
        this.navView = new Lls.Views.StudioNav();
        this.disView = new Lls.Views.StudioDis();
    },

    show : function() {
        focused_block_coorX = parseInt($(this).attr('coor-x'));
        focused_block_coorY = parseInt($(this).attr('coor-y'));

        global_studio_view.create();
        global_studio_view.optView.create();
        global_studio_view.navView.create();
        global_studio_view.disView.create();
        global_side_view.hide_navigation();
    },

    create : function(){
        var studio_template = "<div class='studio'></div>"
        $(studio_template).appendTo($('.g-middle'));
    }
});
