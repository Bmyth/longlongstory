Lls.Views.StudioBlockEdit = Backbone.View.extend({

    initialize : function(){

    },

    create : function(){
        global_studio_nav_view.hide();
        global_studio_opt_view.hide();
        $('.templates .block-add-form').clone().appendTo($('.studio'));
        $('.opt-block .block-add-form input.coorx').val(focused_block_coorX);
        $('.opt-block .block-add-form input.coory').val(focused_block_coorY);
        this.bind_opt();
    },

    delete : function(){
        $(".studio .block-add-form").remove();
    },

    show : function() {

    },

    bind_opt : function(){
        $(".block-add-form .add-opt.title").hover(this.in_title_edit, this.out_title_edit);
        $(".block-add-form .add-opt.back").click(this.back);
    },

    in_title_edit : function(){
        $("input#block_title").focus();
        global_studio_dis_view.show_title();
    },

    out_title_edit : function(){
        $("input#block_title").blur();
        global_studio_dis_view.hide_title();
    },

    back : function(){
        global_block_edit_view.delete();
        global_studio_nav_view.show();
        global_studio_opt_view.show();
    },

    bind_add_submit : function(){
        var block = new Lls.Models.Block();
        var title = $(".opt-add-block .title").val();
        var img = $(".opt-add-block .img").val();
    }
});