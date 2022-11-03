const variantRadios = document.querySelectorAll('[id^="variant-radios-"]');

function onVariantChange() {
  alert('test2');
  if (!this.currentVariant) {
      this.setStockUnavailable();
  } else {
    this.setStock();
  }
}

function updateVariantStatuses() {
  const stockDiv = document.querySelector('stock-level');
  stockDiv.innerHTML = '';
}

function setStock() {
  alert('tes3t');
  const stockDiv = document.querySelector('stock-level');
  stockDiv.innerHTML = '1';
}

variantRadios.addEventListener('change', onVariantChange());