Lls.Models.Block = Backbone.Model.extend({
	
	title : "",
	body : "",
	img : "",
    coorX : "",
    coorY : "",
	
	initialize : function() {
		
	}
});

Lls.Models.GridWorld = Backbone.Model.extend({

  coorX : "",
  coorY : "",
  Lblock : "",
  focused_block_coorX : "",
  focused_block_coorY : "",
  
  initialize : function() {
    
  }
});
