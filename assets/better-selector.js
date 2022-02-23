    function setDefaultOption(productOption,select)
    {
      	optionText = "Select " + productOption.name + "..."
        select.add(new Option(optionText, optionText), select[0]); //add the option to the selector at the top
      
        //only select this option if there is no pre-selected variant. i.e. the url doesn't have a "?variant=1234" value.
      	urlParams = new URLSearchParams(window.location.search);
        if(!urlParams.has('variant')) {
			select.selectedIndex = 0;
          	select.dispatchEvent(new Event("change", { bubbles: true })); //tell global.js that the dropdown has been changed
        }
    }

	function hideSelectDiv(divId) {
      	const selectContainers = document.getElementsByClassName("product-form__input product-form__input--dropdown");
      	selectContainers[divId].style.display = 'none';
    }

  	function updateSelect(productOption,select)
    {
      console.log(window.productJSON["options"].length);
        if(!window.productJSON["options"].indexOf(productOption) < window.productJSON["options"].length){ //check if it's a parent
          	if(select.selectedIndex == 0) {
				window.history.pushState('object', document.title, location.href.replace(location.search, ''));
              	var divId = window.productJSON["options"].indexOf(productOption) - 1;
              	hideSelectDiv(divId);
            }
        }
    }
	
  	//execute this code once the page has rendered (global.js is deferred, got to run after that)
  	window.addEventListener('DOMContentLoaded', function() {
      	window.productJSON["options"].forEach(function(productOption) {
        	var select = document.getElementsByName('options['+productOption.name+']')[0];
          
          	select.addEventListener('change', function() {updateSelect(productOption,select)});
          	setDefaultOption(productOption,select);
        });
	});
  
  /*
  
  	function updateSelect(productOption,select)
    {
      	//const selects = document.getElementsByClassName("select__select");
      	const selectContainers = document.getElementsByClassName("product-form__input product-form__input--dropdown");
      	switch(window.productJSON["options"].indexOf(productOption)) {
        	case 0:
            	if(select.selectedIndex == 0) {
                	window.history.pushState('object', document.title, location.href.replace(location.search, ''));
                  	//selectContainers[1].style.display = 'none';
                  	//selectContainers[2].style.display = 'none';
                } else {
                  	//populateSelect()
                 	selectContainers[1].style.display = '';
                }
            	//popChildSelect(selects[1],selects[0])
          	break;
            case 1:
                console.log('option2 changed');
            break;
            case 2:
                console.log('option3 changed');
            break;
      }
    }
    
    */