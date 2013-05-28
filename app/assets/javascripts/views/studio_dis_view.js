Lls.Views.StudioDis = Backbone.View.extend({
    initialize : function(){

    },

    create : function(){
        $(".templates .dis-block").clone().appendTo($(".g-middle .studio"));
//        seed_block.css({width:'638px', height:'638px',position:'absolute', top:'0px', left:'0px', 'border-color':'#ddd', 'background-color': 'white'}).appendTo($(".single-block-frame"));
    }
});
