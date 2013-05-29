Lls.Views.StudioDis = Backbone.View.extend({
    initialize : function(){

    },

    create : function(){
        $(".templates .dis-block").clone().appendTo($(".g-middle .studio"));
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
    }
});
