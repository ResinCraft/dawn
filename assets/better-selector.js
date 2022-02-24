selects = document.getElementsByClassName("select__select");
const url = location.href.replace(location.search, '');
const urlParams = new URLSearchParams(window.location.search);
const selectDivContainers = document.getElementsByClassName("product-form__input product-form__input--dropdown");

//check if there is a variant in the url (i.e. ?variant=123), also validate it
urlVariant = (urlParams.has('variant') && (window.productJSON.variants.filter((item)=>item["id"] == urlParams.get('variant')).length > 0)) ? urlParams.get('variant') : false;

function removeUrlVariant() {
  	window.history.pushState('object', document.title, location.href.replace(location.search, ''));
}

function setDefaultOption(select,selected = false) {
    optionText = "Select " + select.productOption + "...";
    select.add(new Option(optionText), select[0]);
  	if(selected == false) select.selectedIndex = 0;
}

function removeOptions(select) {
    var i, L = select.options.length - 1;
    for(i = L; i >= 0; i--) {
      select.remove(i);
    }
}

function validOptions(select,parentValue){
    removeOptions(select);
    setDefaultOption(select);
  	var filteredVariants = window.productJSON.variants.filter((item)=>item["option"+select.optionIndex] === parentValue);
    filteredVariants.forEach(function(variant) {
      var selectOption = new Option(variant["option"+(select.optionIndex+1)],variant["option"+(select.optionIndex+1)]);
      var selected = (urlVariant == variant['id']) ? true : false;
      selectOption.selected = selected;
      select.add(selectOption);
    });
}

function initSelect(select,parentSelect){
    if(parentSelect.selectedIndex != 0) {
      validOptions(select,parentSelect.value);
      selectDivContainers[select.optionIndex].style.display = '';
    } else {
      selectDivContainers[select.optionIndex].style.display = 'none';
    }
}

window.productJSON["options"].forEach(function(productOption, selectPos) {
    const select = selects[selectPos];
    select.optionIndex = selectPos;
    select.productOption = productOption;
  	switch(select.optionIndex) {
      	case 0:
            setDefaultOption(select, urlVariant);
            select.addEventListener('change', function() {initSelect(selects[1],select)});
      	break;
      	case 1:
        	initSelect(select,selects[0]);
        break;
        case 2:
			initSelect(select,selects[1]);
        break;
    }
});