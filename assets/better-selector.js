function removeUrlVariant() {
  window.history.pushState('object', document.title, location.href.replace(location.search, ''));
}

function setDefaultOption(select,selected = false) {
    optionText = "Select " + select.productOption + "...";
    select.add(new Option(optionText), select[0]);
}

function removeOptions(select) {
  var i, L = select.options.length - 1;
  for(i = L; i >= 0; i--) {
    select.remove(i);
  }
}