/* Dynamic Selectors */
this.fieldsets = document.querySelectorAll('fieldset[class*="product-form__input"]');
const scriptJsonElements = document.querySelectorAll('script[type="application/json"]');
this.productJson = JSON.parse(scriptJsonElements[1].textContent);

// If a variant isn't found in the URL, unselect the default variant and hide options 2 and 3 if they exist
if (window.location.href.indexOf("variant") == -1){
  this.uncheckInputs(this.fieldsets[0]);
  this.hideFieldset(this.fieldsets[1]);
  this.toggleAddButton(true, window.variantStrings.unavailable);
  this.setUnavailable();
}