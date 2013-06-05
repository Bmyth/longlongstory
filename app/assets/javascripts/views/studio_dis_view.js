Lls.Views.StudioDis = Backbone.View.extend({
    initialize : function(){

    },

    create : function(){
        $(".templates .dis-block").clone().appendTo($(".g-middle .studio"));
        this.render_each_board();
    },

    render_each_board : function(){
        this.render_image_board();
    },

    render_image_board : function(){
        var block_data = global_blocks.get_block_data_at(focused_block_coorX, focused_block_coorY);
        if(block_data != 0){
            if(block_data.get('img').url)
                $('.dis-block .image-board img').attr('src', block_data.get('img').url);
        }
    },

    show_title : function(){
        var t = $("input#block_title").val();
        $(".studio .title-board").text(t).animate({top:'0px'});
    },

    update_title : function(){
        var t = $("input#block_title").val();
        $(".studio .title-board").text(t);
    },

    hide_title : function(){
        $(".studio .title-board").animate({top:'-160px'});
    },

    update_image :function(){
        global_studio_dis_view.render_image_board();
        global_grid_view.render_block_at(focused_block_coorX, focused_block_coorY);
    }
});
