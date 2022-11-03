document.addEventListener(
  "change",
  function (event) {
    onVariantChange();
  },
  false
);


function onVariantChange() {
  if (!this.currentVariant) {
      this.setStockUnavailable();
  } else {
    this.setStock();
  }
}

function setStockUnavailable() {
  const stockDiv = document.getElementById('stock-level');
  stockDiv.innerHTML = '';
}

function setStock() {
  const stockDiv = document.getElementById('stock-level');
  stockDiv.innerHTML = '1';
}