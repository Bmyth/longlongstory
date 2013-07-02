Lls.Views.SidePanel = Backbone.View.extend({
    initialize : function(){

    },

    is_open : function(){
        if($(".editor-form").css('display') === 'none'){
            return false;
        }
        return true;
    },

    show_edit_panel_at : function(x, y){
        $(".editor-form").show();
        var leftOffSet = 200 * global_blocks_view.zoom_rate() + 'px';
        $(".block-container").css('left',leftOffSet);

        global_side_panel_view.fill_block_form_at(x, y);
        global_side_panel_view.bind_opt_event();
    },

    fill_block_form_at : function(x, y){
        $(".editor-form .cx").val(x);
        $(".editor-form .cy").val(y);

        var block = global_blocks.get_block_data_at(x, y);
        if(block !== 0){
            $(".editor-form .id").val(block.get('id'));
            if(block.get('body')){
                $(".editor-form .ke-edit-iframe").contents().find("body").html(block.get('body'));
            }
        }else{
            $(".editor-form .ke-edit-iframe").contents().find("body").html('');
        }
    },

    bind_opt_event : function(){
        $(".editor-form .submit").click(global_side_panel_view.submit);
        $(".editor-form .clear").click(global_side_panel_view.clear);
        $(".editor-form .back").click(global_side_panel_view.back);
    },

    submit : function(){
        global_blocks.update_block_content_at(focused_block_coorX, focused_block_coorY, global_side_panel_view.back);
    },

    clear : function(){
        global_blocks.delete_block_at(focused_block_coorX, focused_block_coorY, global_side_panel_view.back);
    },

    back : function(){
        global_blocks_view.render_block_at(focused_block_coorX, focused_block_coorY);
        global_blocks_view.clear_mark();
        $(".editor-form .ke-edit-iframe").contents().find("html").html('');
        $(".editor-form").hide();
        $(".block-container").css('left','0');
    }
});