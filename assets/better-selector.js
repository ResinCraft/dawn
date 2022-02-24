function setDefaultOption(select)
{
    optionText = "Select " + select.productOption + "...";
    select.add(new Option(optionText), select[0]);
}

function removeOptions(select) {
  var i, L = select.options.length - 1;
  for(i = L; i >= 0; i--) {
    select.remove(i);
  }
  //window.history.pushState('object', document.title, location.href.replace(location.search, ''));
}

function rebuildSelect(select,parent = false) {
  	if(!parent) { parent = selects[(select.optionIndex-1)]; }
  	if(parent.selectedIndex == 0){
      	selectDivContainers[select.optionIndex].style.display = 'none';
      	window.history.pushState('object', document.title, location.href.replace(location.search, ''));
    }else{
        removeOptions(select);
        setDefaultOption(select);
        var filteredVariants = window.productJSON.variants.filter((item)=>item["option"+select.optionIndex] === parent.value);
        filteredVariants.forEach(function(variant) {
          var selectOption = new Option(variant["option"+(select.optionIndex+1)],variant["option"+(select.optionIndex+1)]);
          var selected = (urlVariant == variant['id']) ? true : false;
          selectOption.selected = true;
          select.add(selectOption);
        });
      	if(!urlVariant) select.selectedIndex = 0;
      	selectDivContainers[select.optionIndex].style.display = '';
	}
}

selects = document.getElementsByClassName("select__select");
var url = location.href.replace(location.search, '');
var urlParams = new URLSearchParams(window.location.search);
const selectDivContainers = document.getElementsByClassName("product-form__input product-form__input--dropdown");

//check if there is a variant in the url (i.e. ?variant=123), also validate it
urlVariant = false;
if(urlParams.has('variant') && (window.productJSON.variants.filter((item)=>item["id"] == urlParams.get('variant')).length > 0)){
  	urlVariant = urlParams.get('variant');
}

window.productJSON["options"].forEach(function(productOption, selectPos) {
    const select = selects[selectPos];
    select.optionIndex = selectPos;
    select.productOption = productOption;
  	if(select.optionIndex == 0) {
      	setDefaultOption(select);
      	if(!urlVariant) select.selectedIndex = 0;
      	//select.dispatchEvent(new Event("change", { bubbles: true }));
      	select.addEventListener('change', function() {rebuildSelect(selects[1],select)});
    } else {
   		rebuildSelect(select,selects[(select.optionIndex-1)]);
		if(select.optionIndex < window.productJSON["options"].length){
      		select.addEventListener('change', function() {rebuildSelect(selects[select.optionIndex+1],selects[select.optionIndex])});
        } else {
          	select.addEventListener('change', function() {window.history.pushState('object', document.title, location.href.replace(location.search, ''))});
        }
    }
});


/**************************** if(select.selectedIndex == 0) window.history.pushState('object', document.title, location.href.replace(location.search, ''));


  	//if(urlParams.has('variant') && window.productJSON.variants.filter((item)=>item["id" === urlParams.get('variant'))
	/*rebuildSelect(select,parentSelect);
      if(urlVariant) {
          select.selectedIndex = 0;
          select.dispatchEvent(new Event("change", { bubbles: true })); //tell global.js that the dropdown has been changed
      }

  
  //(selectPos == 0) ? setDefaultOption(select) : "rebuildSelect(select)";
  //select.dispatchEvent(new Event("change"));
  //select.addEventListener('change', function() {rebuildSelect(select)});

// initial run turns off childred if parent not selected
/*
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
  const selectDivContainers = document.getElementsByClassName("product-form__input product-form__input--dropdown");
    var SelectLength = window.productJSON["options"].length;
    
  	if(select.selectedIndex == 0) window.history.pushState('object', document.title, location.href.replace(location.search, ''));
    
  	if((select.optionIndex < SelectLength - 1)){ //check if it's a parent of another selector
      if(select.selectedIndex == 0) {
        selects[select.optionIndex+1].selectedIndex = 0;
        selectDivContainers[select.optionIndex+1].style.display = 'none';
      } else {
        buildOptions(selects[select.optionIndex+1],select);
        selectDivContainers[select.optionIndex+1].style.display = '';
      }
    }
}

window.addEventListener('DOMContentLoaded', function() {
selects = document.getElementsByClassName("select__select");
window.productJSON["options"].forEach(function(productOption, selectPos) {
    const select = document.getElementsByName('options['+productOption+']')[0];
	select.optionIndex = selectPos;
  	select.productOption = productOption
    select.addEventListener('change', function() {updateSelect(select)});
    setDefaultOption(productOption,select);
});
});
*/