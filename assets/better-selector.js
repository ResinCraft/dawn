//check if there is a variant in the url (i.e. ?variant=123), also validate it
const urlParams = new URLSearchParams(window.location.search);
const urlVariantId = (urlParams.has('variant') && (window.productJSON.variants.filter((item)=>item["id"] == urlParams.get('variant')).length > 0)) ? urlParams.get('variant') : false;
const seletedVariant = (urlVariantId) ? window.productJSON.variants.filter((item)=>item["id"] == urlVariantId)[0] : false;

const selectDivContainers = document.getElementsByClassName("product-form__input product-form__input--dropdown");
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

window.productJSON.options.forEach(function(productOption, selectPos) {
    console.log(urlParams);
    const select = selects[selectPos];
    select.optionIndex = selectPos;
    select.productOption = productOption;
	console.log(select.optionIndex+' < '+(window.productJSON.options.length - 1));
    if(select.optionIndex < (window.productJSON.options.length - 1)){
      	select.addEventListener('change', function(){
          updateChildSelect(selects[optionIndex+1],select);
        });
    }
  	if(select.optionIndex == 0) setDefaultOption(select, seletedVariant);
});