Lls.Views.BlockEdit = Backbone.View.extend({
    initialize : function(){
    },

    show_edit_panel : function(){
        focused_block_coorX = parseInt($(this).attr('coor-x'));
        focused_block_coorY = parseInt($(this).attr('coor-y'));
        $(this).addClass('edited');

        $(".editor-form").show();
        $(".block-container").css('left','200px');

        global_block_edit_view.fill_block_form();
        global_block_edit_view.bind_opt_event();
    },

    fill_block_form : function(){
        $(".editor-form .cx").val(focused_block_coorX);
        $(".editor-form .cy").val(focused_block_coorY);

        var block = global_blocks.get_block_data_at(focused_block_coorX, focused_block_coorY);
        if(block !== 0){
            $(".editor-form .id").val(block.get('id'));
            $(".editor-form .ke-edit-iframe").contents().find("html").html(block.get('body'));
        }
    },

    bind_opt_event : function(){
        $(".editor-form .submit").click(global_block_edit_view.submit);
        $(".editor-form .clear").click(global_block_edit_view.clear);
        $(".editor-form .back").click(global_block_edit_view.back);
    },

    submit : function(){
        global_blocks.update_block_content_at(focused_block_coorX, focused_block_coorY, global_block_edit_view.back);
    },

    clear : function(){
        global_blocks.delete_block_at(focused_block_coorX, focused_block_coorY, global_block_edit_view.back);
    },

    back : function(){
        global_blocks_view.render_block_at(focused_block_coorX, focused_block_coorY);
        global_blocks_view.get_block_at(focused_block_coorX, focused_block_coorY).removeClass('edited');
        $(".editor-form .ke-edit-iframe").contents().find("html").html('');
        $(".editor-form").hide();
        $(".block-container").css('left','0');
    }
});