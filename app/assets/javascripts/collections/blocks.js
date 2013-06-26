Lls.Collections.Blocks = Backbone.Collection.extend({
    url: '/api/blocks',
    model: Lls.Models.Block,

    getNew: function (b) {
        this.fetch({success: b});
    },

    get_block_data_at: function (x, y) {
        var result = 0;
        global_blocks.each(function (block) {
            if (block.get('coorX') == x && block.get('coorY') == y) {
                result = block;
                return false;
            }
        })
        return result;
    },

    update_block_content_at: function (x, y, b) {
        var block = this.get_block_data_at(x, y);
        var content = $(".editor-form .ke-edit-iframe").contents().find("body").html();
        if (block === 0) {
            this.add({'coorX': x, 'coorY': y, 'body': content}, {success: b});
        } else {
            block.save({body:content},{success:b});
        }
    },

    delete_block_at: function (x, y, b) {
        this.forEach(function (block) {
            if (block.get("coorX") === x && block.get("coorY") === y) {
                block.destroy({success: b});
                return false;
            }
        })
    }
});
