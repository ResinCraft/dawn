const variantRadios = document.querySelectorAll('[id^="variant-radios-"]');

function setStockUnavailable() {
  const stockDiv = document.querySelector('stock-level');
  stockDiv.innerHTML = '';
}

function setStock() {
  alert('tes3t');
  const stockDiv = document.querySelector('stock-level');
  stockDiv.innerHTML = '1';
}

function onVariantChange() {
  alert(this.currentVariant);
  if (!this.currentVariant) {
      this.setStockUnavailable();
  } else {
    this.setStock();
  }
}

variantRadios.addEventListener('change', onVariantChange());