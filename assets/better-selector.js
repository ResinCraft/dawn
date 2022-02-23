function setDefaultOption(productOption,select)
{
  optionText = "Select " + productOption + "...";
  select.add(new Option(optionText, optionText), select[0]); //add the option to the selector at the top

  //only select this option if there is no pre-selected variant. i.e. the url doesn't have a "?variant=1234" value.
  urlParams = new URLSearchParams(window.location.search);
  if(!urlParams.has('variant')) {
    select.selectedIndex = 0;
    select.dispatchEvent(new Event("change")); //tell global.js that the dropdown has been changed
  }
}

function removeOptions(selectElement) {
  var i, L = selectElement.options.length - 1;
  for(i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
}

function buildOptions(select,parentSelect)
{
	removeOptions(select);

    var urlParams = new URLSearchParams(window.location.search);
    //var parentOptionText = parentSelect.name.match(/\[(.*?)\]/)[1];
    //var selectOptionText = select.name.match(/\[(.*?)\]/)[1];
    var filteredVariants = window.productJSON.variants.filter((item)=>item["option1"] === parentSelect.value);
    Array.prototype.forEach.call(filteredVariants, function(variant) {
      var option = document.createElement("option");
      option.text = variant["option2"];
      if(urlParams.has('variant') && variant['id'] == urlParams.get('variant')){
        option.selected = true;
      }
      select.add(option);
    });
}
  
function updateSelect(select)
{
  console.log(select.pos);  
  const selectDivContainers = document.getElementsByClassName("product-form__input product-form__input--dropdown");
    var SelectLength = window.productJSON["options"].length;
    if(select.selectedIndex == 0) window.history.pushState('object', document.title, location.href.replace(location.search, ''));
    if((select.optionIndex < SelectLength - 1)){ //check if it's a parent of another selector
      if(select.selectedIndex == 0) {
        selects[select.optionIndex+1].selectedIndex = 0;
        selectDivContainers[selectPos+1].style.display = 'none';
      } else {
        buildOptions(selects[select.optionIndex+1],select);
        selectDivContainers[select.optionIndex+1].style.display = '';
      }
    }
}


var selects = document.getElementsByClassName("select__select");
window.productJSON["options"].forEach(function(productOption, selectPos) {
    const select = document.getElementsByName('options['+productOption+']')[0];
	select.optionIndex = selectPos;
  	select.productOption = productOption
    select.addEventListener('change', function() {updateSelect(select)});
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