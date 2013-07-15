define(['require','backbone', 'models/block', 'views/mainView'], function(require, Backbone, Block, MainView){
    var BlocksCollection = Backbone.Collection.extend({
        url: '/api/blocks',
        model: Block
    });

    var Blocks = new BlocksCollection;

    var initialize = function(){
        Blocks.fetch({success : function(){
            require('views/mainView').dataReady();
        }});
    };

    var get_block_data_at = function (x, y) {
        var result = 0;
        Blocks.each(function (block) {
            if (block.get('coorX') == x && block.get('coorY') == y) {
                result = block;
                return false;
            }
        })
        return result;
    };

    var update_block_content_at = function (x, y, b) {
        var block = get_block_data_at(x, y);
        var content = $(".editor-form .ke-edit-iframe").contents().find("body").html();
        if (block === 0) {
            Blocks.add({'coorX': x, 'coorY': y, 'body': content}, {success: b});
        } else {
            block.save({body:content},{success:b});
        }
    };

    var delete_block_at = function (x, y, b) {
        Blocks.forEach(function (block) {
            if (block.get("coorX") === x && block.get("coorY") === y) {
                block.destroy({success: b});
                return false;
            }
        })
    };


    var block_number_at_column = function(n){
        var sum = 0
        Blocks.forEach(function (block) {
            if (block.get("coorX") === n) {
                sum ++;
            }
        })
        return sum;
    };

    var block_number_at_row = function(n){
        var sum = 0
        Blocks.forEach(function (block) {
            if (block.get("coorY") === n) {
                sum ++;
            }
        })
        return sum;
    };

    return {
        initialize : initialize,
        data : Blocks,
        get_block_data_at : get_block_data_at,
        update_block_content_at : update_block_content_at,
        delete_block_at : delete_block_at
    };
});
