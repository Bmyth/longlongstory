Lls.Views.StudioBlockEdit = Backbone.View.extend({

    initialize : function(){
        $(".ghost-form .block-img-form form").ajaxForm();
    },

    create : function(){
        global_studio_nav_view.hide();
        global_studio_opt_view.hide();
        $('.templates .block-add-form').clone().appendTo($('.studio'));
        this.fill_each_value();
        $('.opt-block .block-add-form input.coorx').val(focused_block_coorX);
        $('.opt-block .block-add-form input.coory').val(focused_block_coorY);
        this.bind_opt();
    },

    delete : function(){
        $(".studio .block-add-form").remove();
    },

    show : function() {

    },

    fill_each_value : function(){
        var block = global_blocks.get_block_data_at(focused_block_coorX, focused_block_coorY);
        if(block != 0){
            $("input#block_title").val(block.get('title'));
        }
        $(".ghost-form .block-img-form form input#block_coorX").val(focused_block_coorX);
        $(".ghost-form .block-img-form form input#block_coorY").val(focused_block_coorY);
    },

    bind_opt : function(){
        $(".block-add-form .add-opt.title").hover(this.in_title_edit, this.out_title_edit);
        $(".ghost-form .block-img-form input#block_title").change(this.title_change);
        $(".ghost-form .block-img-form input#block_img").change(this.upload_image);
        $(".block-add-form .add-opt.img").click(this.edit_image);
        $(".block-add-form .add-opt.back").click(this.back);
    },

    in_title_edit : function(){
        global_studio_dis_view.show_title();
    },

    out_title_edit : function(){
        global_studio_dis_view.hide_title();
    },

    title_change : function(){
//        var text = $(".studio input#block_title").val();
        global_blocks.update_block_title_at(focused_block_coorX, focused_block_coorY, "text");
        global_studio_dis_view.update_title();
    },

    upload_image : function(){
        global_blocks.update_block_image_at(focused_block_coorX, focused_block_coorY, global_studio_dis_view.update_image);
    },

    edit_image : function(){
       $(".ghost-form .block-img-form input#block_img").click();
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