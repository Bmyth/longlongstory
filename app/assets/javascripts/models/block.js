define(['backbone'], function(Backbone){
    var Block = Backbone.Model.extend({
        title : "",
        body : "",
        img : "",
        coorX : "",
        coorY : "",
        id: "",

        initialize : function() {

        }
    });

    return Block;
})
