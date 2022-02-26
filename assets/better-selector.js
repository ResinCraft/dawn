//check if there is a variant in the url (i.e. ?variant=123), also validate it
const urlParams = new URLSearchParams(window.location.search);
const urlVariantId = (urlParams.has('variant') && (window.productJSON.variants.filter((item)=>item["id"] == urlParams.get('variant')).length > 0)) ? urlParams.get('variant') : false;
const seletedVariant = (urlVariantId) ? window.productJSON.variants.filter((item)=>item["id"] == urlVariantId)[0] : false;

const selectContainer = document.getElementsByClassName("product-form__input product-form__input--dropdown");
const selects = document.getElementsByClassName("select__select");

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
  console.log(parentValue.style);
    removeOptions(select);
    setDefaultOption(select);
  	var optionText = "option"+select.optionIndex;
  	var childOptionText = "option"+(select.optionIndex + 1);
  	//(filter)get a list of valid variants, (map)create a new array from the option propery, (set)get a set of unique elements
  	var filteredVariants = new Set(window.productJSON.variants.filter((item)=>item[optionText] === parentValue).map(a => a[childOptionText]));

    filteredVariants.forEach(function(variant) {
      var selectOption = new Option(variant,variant);
      var selected = (variant == seletedVariant[childOptionText]) ? true : false;
      selectOption.selected = selected;
      select.add(selectOption);
    });
  	//select.dispatchEvent(new Event("change", { bubbles: true }));
}

function updateChildSelect(select,parentSelect) {
    if(parentSelect.selectedIndex == 0) {
        select.selectedIndex = 0;
        selectContainer[select.optionIndex].style.display = 'none';
    } else {
     	selectContainer[select.optionIndex].style.display = ''; 
    }
}

window.productJSON.options.forEach(function(productOption, selectPos) {
    const select = selects[selectPos];
    select.optionIndex = selectPos;
    select.productOption = productOption;
    if(select.optionIndex < (window.productJSON.options.length - 1)){
      	select.addEventListener('change', function(){
          updateChildSelect(selects[select.optionIndex+1],select);
        });
    }
  	(select.optionIndex == 0) ? setDefaultOption(select, seletedVariant) : validOptions(select,selects[select.optionIndex-1]);
});