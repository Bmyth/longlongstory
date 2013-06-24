Lls.Views.BlockEdit = Backbone.View.extend({
    initialize : function(){
//        $(".editor-form form").ajaxForm();
    },

    show_edit_panel : function(){
        focused_block_coorX = parseInt($(this).attr('coor-x'));
        focused_block_coorY = parseInt($(this).attr('coor-y'));

        $(".editor-form").show();
        $(".editor-form .cx").val(focused_block_coorX);
        $(".editor-form .cy").val(focused_block_coorY);
        $(".editor-form .submit").click(global_block_edit_view.submit);

        $(".block-container").css('left','200px');
    },

    submit : function(){
        global_blocks.update_block_content_at(focused_block_coorX, focused_block_coorY, global_block_edit_view.quit_edit_panel);
    },

    quit_edit_panel : function(){
        $(".editor-form").hide();
        global_blocks_view.render_block_at(focused_block_coorX, focused_block_coorY);
    }
});