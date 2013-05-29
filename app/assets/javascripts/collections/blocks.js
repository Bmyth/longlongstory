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

    update_block_title_at : function(x, y, t){
        var block = this.get_block_data_at(x, y);
        if(block == 0){
            this.create({'title':t, 'coorX':x, 'coorY':y});
        }else{
            block.set({'title':t});
            block.save();
        }
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
