Lls.Collections.Blocks = Backbone.Collection.extend({
  url : '/api/blocks',
  model : Lls.Models.Block,

    getNew : function(b){
        this.fetch({success:b});
    },

    get_block_data_at : function(x, y){
        var result = 0;
        global_blocks.each(function(block){
            if(block.get('coorX') == x && block.get('coorY') == y){
                result = block;
                return false;
            }
        })
        return result;
    },

    delete_block_at : function(x, y, b){
        var that = this;
        this.forEach(function(block){
           if(block.get("coorX") == x && block.get("coorY") == y){
             block.destroy({success:b});
             return false;
           }
    })
  }
});
