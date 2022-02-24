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
  	if(selected) select.selectedIndex = 0;
}

function removeOptions(select) {
    var i, L = select.options.length - 1;
    for(i = L; i >= 0; i--) {
      select.remove(i);
    }
}

window.productJSON["options"].forEach(function(productOption, selectPos) {
  	setDefaultOption(select)
});