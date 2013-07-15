define(['require','collections/blocks', 'views/blocksView'],function(require, Blocks){
    var initialize = function(){
        bind_opt_event();
    };

    var is_open = function(){
        if($(".editor-form").css('display') === 'none'){
            return false;
        }
        return true;
    };

    var show = function(x, y){
        if($(".editor-form").css('display') === 'none'){
            $(".editor-form").show();
            var zoomRate = require('views/blocksView').zoomRate();
            var leftOffSet = 200 * zoomRate + 'px';
            $(".block-container").css('left',leftOffSet);
        }
        fill_block_form_at(x, y);
    };

    var fill_block_form_at = function(x, y){
        $(".editor-form .cx").val(x);
        $(".editor-form .cy").val(y);

        var block = Blocks.get_block_data_at(x, y);
        $(".editor-form .ke-edit-iframe").contents().find("body").html('');
        if(block !== 0){
            $(".editor-form .id").val(block.get('id'));
            if(block.get('body')){
                $(".editor-form .ke-edit-iframe").contents().find("body").html(block.get('body'));
            }
        }
    };

    var bind_opt_event = function(){
        $(".editor-form .submit").click(submit);
        $(".editor-form .clear").click(clear);
        $(".editor-form .back").click(back);
    };

    var submit = function(){
        Blocks.update_block_content_at(require('views/blocksView').focused_block_coorX(), require('views/blocksView').focused_block_coorY(), back);
    };

    var clear = function(){
        Blocks.delete_block_at(require('views/blocksView').focused_block_coorX(), require('views/blocksView').focused_block_coorY(), back);
    };

    var back = function(){
        require('views/blocksView').render_block_at(require('views/blocksView').focused_block_coorX(), require('views/blocksView').focused_block_coorY());
        require('views/blocksView').clear_mark();
        $(".editor-form .ke-edit-iframe").contents().find("html").html('');
        $(".editor-form").hide();
        $(".block-container").css('left','0');
    };

    return {
        initialize : initialize,
        show : show
    };
})