var Lls = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new Lls.Routers.Main();
    Backbone.history.start({pushState : true});
  }
};

$(document).ready(function(){
    Lls.initialize();
});
