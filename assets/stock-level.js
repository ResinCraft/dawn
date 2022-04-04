//see if the user has selected a valid combination
	function validSelection() {
      	//get the option selectors
      	var selectObjects = document.getElementsByClassName('select__select');
      
      	//build a list of items that have been selected in option1, {option2} and {option3}
		var filterItems = {};
  		Array.prototype.forEach.call(selectObjects, function(selectObject, i) {
    		var itemString = "option"+(i+1);
    		filterItems[itemString] = selectObject.value;
  		});

		//some form of voodoo that matches the users selection with the list of valid variant combinations
        result = window.productJSON.filter(function(item) {
          for (var key in filterItems) {
            if (item[key] === undefined || item[key] != filterItems[key])
              return false;
          }
          return true;
        });
  
  		//if the combo exists, then say so
  		return (typeof result[0] !== 'undefined') ? true : false;
	}

  	//set up some stock level messages i.e. "Only 4 left!"
	function msgText(stockLevel) {
		var text = "";
      	var showStockLevel = 10; //change this value for maximum stock you want to show
        if(stockLevel > showStockLevel) { 
          text = "More than " + showStockLevel + " available";
        } else if(stockLevel > 0) {
          text = "Only " + stockLevel + " left!";
        }
        return text;
    }
  

  	//if you'd like to position the stock indicator in a custom place, create an element as follows: <p id="stock-level></p>
	//otherwise it will default to be just above the quantity selector
	if(document.getElementById('stock-level') !== null){
		var element = document.getElementById('stock-level');
	} else {
		elem = document.createElement('p');
  		elem.setAttribute('id', "stock-level");
		target = document.getElementsByClassName("product-form__input product-form__quantity")[0];
		target.parentNode.insertBefore(elem, target);
  		var element = document.getElementById('stock-level');
  	}
    
    
    //check to see if the user has changed the selection
    this.addEventListener('change', this.onVariantChange);
    function onVariantChange(){  		
      	//if the above filter function finds a match, then display the stock level
  		if(validSelection()){
			var msg = msgText(result[0].stock);
          	element.innerHTML = msg;
        } else {
          	element.innerHTML = '';
        }
	}
  	onVariantChange();