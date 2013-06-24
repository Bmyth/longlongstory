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

    update_block_title_at : function(x, y, t, b){
        var block = this.get_block_data_at(x, y);
        if(block == 0){
            this.create({'title':t, 'coorX':x, 'coorY':y},{success:b});
        }else{
            block.save({'title':t},{success:b});
        }
    },

    update_block_content_at : function(x, y, b){
        var block = this.get_block_data_at(x, y);
        if(block == 0){
            $(".editor-form form").ajaxSubmit({success:function(){
                global_blocks.fetch({success:b});
            }});
        }else{
            $(".ghost-form .id-input input").val(block.get('id')).appendTo($(".ghost-form .block-img-form form"));
            $(".ghost-form .block-img-form form").attr("action", "/image_update");
            $(".ghost-form .block-img-form form").ajaxSubmit({success:function(r){
                global_blocks.fetch({success:b});
            }});
        }
    },

    update_block_image_at : function(x, y, b){
        var block = this.get_block_data_at(x, y);
        if(block == 0){
            $(".ghost-form .block-img-form form").ajaxSubmit({success:function(){
                global_blocks.fetch({success:b});
            }});
        }else{
            $(".ghost-form .id-input input").val(block.get('id')).appendTo($(".ghost-form .block-img-form form"));
            $(".ghost-form .block-img-form form").attr("action", "/image_update");
            $(".ghost-form .block-img-form form").ajaxSubmit({success:function(r){
                global_blocks.fetch({success:b});
            }});
        }
    },

    block_has_image_at : function(x, y){
        var block = this.get_block_data_at(x, y);
        if(block == 0)
            return false;
        return true;
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
