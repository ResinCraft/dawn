alert('test0');
document.addEventListener(
  "change",
  function (event) {
    onVariantChange();
  },
  false
);


function onVariantChange() {
  alert('test2');
  if (!this.currentVariant) {
      this.setStockUnavailable();
  } else {
    this.setStock();
  }
}

function setStockUnavailable() {
  const stockDiv = document.querySelector('stock-level');
  stockDiv.innerHTML = '';
}

function setStock() {
  alert('tes3t');
  const stockDiv = document.querySelector('stock-level');
  stockDiv.innerHTML = '1';
}