selects = document.getElementsByClassName("select__select");
const url = location.href.replace(location.search, '');
const urlParams = new URLSearchParams(window.location.search);
const selectDivContainers = document.getElementsByClassName("product-form__input product-form__input--dropdown");

//check if there is a variant in the url (i.e. ?variant=123), also validate it
urlVariant = (urlParams.has('variant') && (window.productJSON.variants.filter((item)=>item["id"] == urlParams.get('variant')).length > 0)) ? urlParams.get('variant') : false;

//removes ?variant=1234 from URL if you have an invalid variant
function removeUrlVariant(select) {
  	window.history.pushState('object', document.title, location.href.replace(location.search, ''));
}

//adds the default option i.e. "Select Type..."
function setDefaultOption(select,selected = false) {
    optionText = "Select " + select.productOption + "...";
    select.add(new Option(optionText), select[0]);
    if(selected == false){
      select.selectedIndex = 0;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
}

//removes all the options of a select so it can be rebuilt
function removeOptions(select) {
    var i, L = select.options.length - 1;
    for(i = L; i >= 0; i--) {
      select.remove(i);
    }
}

//generates valid options based on the parent selector
function validOptions(select,parentValue) {
    removeOptions(select);
    setDefaultOption(select);
  console.log(filteredVariants);
  	var filteredVariants = new Set(window.productJSON.variants.filter((item)=>item["option"+select.optionIndex] === parentValue).map(a => a[select.optionName]));
    console.log(filteredVariants);
  	//connst uniqueYears = new Set(years)
    filteredVariants.forEach(function(variant) {
      var selectOption = new Option(variant["option"+(select.optionIndex+1)],variant["option"+(select.optionIndex+1)]);
      var selected = (urlVariant == variant['id']) ? true : false;
      selectOption.selected = selected;
      select.add(selectOption);
    });
  	select.dispatchEvent(new Event("change", { bubbles: true }));
}

//initiate the selector, hide/show it based on the parent selectors choice
function initSelect(select,parentSelect) {
    if(parentSelect.selectedIndex != 0) {
      validOptions(select,parentSelect.value);
      selectDivContainers[select.optionIndex].style.display = '';
    } else {
      selectDivContainers[select.optionIndex].style.display = 'none';
    }
}

//update the selector *************** DOUBLE UP WITH ABOVE
function updateChildSelect(select,parentSelect) {
  	removeUrlVariant();
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
  	select.optionName = "option"+selectPos;
    select.productOption = productOption;
    switch(select.optionIndex) {
      case 0:
        setDefaultOption(select, urlVariant);
        if(select.optionIndex < (window.productJSON["options"].length - 1)){
          select.addEventListener('change', function() {updateChildSelect(selects[1],select)});
        }
        break;
      case 1:
        initSelect(select,selects[0]);
        break;
      case 2:
        initSelect(select,selects[1]);
        break;
    }
	if(select.optionIndex < window.productJSON["options"].length - 1){
		select.addEventListener('change', function() {updateChildSelect(selects[2],select)});
	}
	select.addEventListener('change', function() { if(select.selectedIndex == 0) removeUrlVariant(select); });
});