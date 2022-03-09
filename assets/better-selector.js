const selectContainer = document.getElementsByClassName("product-form__input product-form__input--dropdown");
const selects = document.getElementsByClassName("select__select");

//adds the default option i.e. "Select Type..."
function setDefaultOption(select,selected = false) {
    optionText = "Select " + select.productOption + "...";
    select.add(new Option(optionText), select[0]);
    if(selected == false || !seletedVariant){
      select.selectedIndex = 0;
    }
}

function removeUrlVariant() {
  	window.history.replaceState('object', document.title, location.href.replace(location.search, ''));
}

//removes all the options of a select so it can be rebuilt
function removeOptions(select) {
    var i, L = select.options.length - 1;
    for(i = L; i >= 0; i--) {
      select.remove(i);
    }
}

//generates valid options based on the parent selector
function validOptions(select,parent) {
  	if(parent.selectedIndex == 0) {
		select.selectedIndex = 0;
        selectContainer[select.optionIndex].style.display = 'none';
    } else {
      removeOptions(select);
      setDefaultOption(select);
      var optionText = "option"+select.optionIndex;
      var childOptionText = "option"+(select.optionIndex + 1);
      //(filter)get a list of valid variants, (map)create a new array from the option propery, (set)get a set of unique elements
      var filteredVariants = new Set(window.productJSON.variants.filter((item)=>item[optionText] === parent.value).map(a => a[childOptionText]));
      filteredVariants.forEach(function(variant) {
        var selectOption = new Option(variant,variant);
        selectOption.selected = (variant == seletedVariant[childOptionText]);
        select.add(selectOption);
      });
    }
  	select.dispatchEvent(new Event("change", { bubbles: true }));
}

function updateChildSelect(select,parentSelect) {
  	//console.log('selectContainer['+select.optionIndex+']: '+selectContainer[select.optionIndex]);
    if(parentSelect.selectedIndex == 0) {
        select.selectedIndex = 0;
        selectContainer[select.optionIndex].style.display = 'none';
    } else {
      	validOptions(select,parentSelect);
     	selectContainer[select.optionIndex].style.display = ''; 
    }
  	select.dispatchEvent(new Event("change", { bubbles: true }));
}


window.productJSON.options.forEach(function(productOption, selectPos) {
  console.log('page refreshed');
    const select = selects[selectPos];
    select.optionIndex = selectPos;
    select.productOption = productOption;
    (select.optionIndex == 0) ? setDefaultOption(select, seletedVariant) : validOptions(select,selects[select.optionIndex-1]);
    if(select.optionIndex < (window.productJSON.options.length - 1)){
        select.addEventListener('change', function(){
          updateChildSelect(selects[select.optionIndex+1],select);
        });
    }
    select.addEventListener('change', function(){ removeUrlVariant() });
});

window.onpageshow = function() {
  	if(selects[0].selectedIndex != 0 && !seletedVariant){
      selects[0].selectedIndex = 0;
      selects[0].dispatchEvent(new Event("change", { bubbles: true }));
    }
  	selects[0].dispatchEvent(new Event("change", { bubbles: true }));
};
