function setDefaultOption(productOption,select)
{
  console.log('select.form[0]: '+select);
  optionText = "Select " + productOption + "...";
  select.add(new Option(optionText, optionText), select[0]); //add the option to the selector at the top

  //only select this option if there is no pre-selected variant. i.e. the url doesn't have a "?variant=1234" value.
  urlParams = new URLSearchParams(window.location.search);
  if(!urlParams.has('variant')) {
    select.selectedIndex = 0;
    select.dispatchEvent(new Event("change", { bubbles: true })); //tell global.js that the dropdown has been changed
  }
}

function updateSelect(position,productOption,select)
{
  console.log(position);
  const selectDivContainers = document.getElementsByClassName("product-form__input product-form__input--dropdown");
  var optionLength = window.productJSON["options"].length;
  if((optionPosition < optionLength)){ //check if it's a parent of another selector
    if(select.selectedIndex == 0) {
      window.history.pushState('object', document.title, location.href.replace(location.search, ''));
      selectDivContainers[optionPosition].style.display = 'none';
    } else {
      selectDivContainers[optionPosition].style.display = '';
    }
  }
}


selects = document.getElementsByClassName("select__select");
window.productJSON["options"].forEach(function(productOption, position) {
  var select = document.getElementsByName('options['+productOption+']')[0];

  select.addEventListener('change', function() {updateSelect(position,productOption,select)});
  setDefaultOption(productOption,select);
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