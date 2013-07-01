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
            var text = block.get('title');
            $(".studio .add-opt.title span").text(text);
            $(".studio .add-opt.title input").val(text);
        }
        $(".ghost-form .block-img-form form input#block_coorX").val(focused_block_coorX);
        $(".ghost-form .block-img-form form input#block_coorY").val(focused_block_coorY);
    },

    bind_opt : function(){
        $(".block-add-form .add-opt.title").hover(this.in_title_edit, this.out_title_edit);
        $(".block-add-form .add-opt.title input").change(this.title_change);
        $(".ghost-form .block-img-form input#block_img").change(this.upload_image);
        $(".block-add-form .add-opt.title").click(this.edit_title);
        $(".block-add-form .add-opt.img").click(this.edit_image);
        $(".block-add-form .add-opt.back").click(this.back);
    },

    in_title_edit :function(){
        global_studio_dis_view.show_title();
    },

    out_title_edit : function(){
        var text = $(".block-add-form .add-opt.title input").val();
        var block = global_blocks.get_block_data_at(focused_block_coorX, focused_block_coorY);
        if(block == 0 && text != ""){
            global_blocks.update_block_title_at(focused_block_coorX, focused_block_coorY, text, global_block_edit_view.out_of_title_with_update);
        }
        else if(block != 0 && block.get('title') != $(".block-add-form .add-opt.title input").val()){
            global_blocks.update_block_title_at(focused_block_coorX, focused_block_coorY, text, global_block_edit_view.out_of_title_with_update);
        }
        else{
            global_block_edit_view.out_of_title();
        }
    },

    out_of_title :function(){
        $(".block-add-form .add-opt.title span").show();
        $(".block-add-form .add-opt.title input").hide();
        global_studio_dis_view.hide_title();
    },

    out_of_title_with_update : function(){
        var text = $(".studio .add-opt.title input").val();
        $(".studio .add-opt.title span").text(text);
        global_studio_dis_view.update_title();
        $(".studio .add-opt.title span").show();
        $(".studio .add-opt.title input").hide();
        global_studio_dis_view.hide_title();
    },

    in_image_edit : function(){
        if(global_blocks.block_has_image_at(focused_block_coorX, focused_block_coorY)){

        }
        else{

        }
    },

    out_image_edit : function(){

    },

    edit_title : function(){
        $(".studio .add-opt.title span").hide();
        $(".studio .add-opt.title input").show();
        $(".studio .add-opt.title input").focus();
    },

    title_change : function(){
        var text = $(".block-add-form .add-opt.title input").val();
        global_blocks.update_block_title_at(focused_block_coorX, focused_block_coorY, text, global_block_edit_view.title_update_callback);
    },

    title_update_callback : function(){
        var text = $(".block-add-form .add-opt.title input").val();
        $(".studio .add-opt.title span").text(text);
        $(".studio .add-opt.title span").show();
        $(".studio .add-opt.title input").hide();
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