class VariantRadiosResinCraft extends VariantRadios {
  constructor() {
    super();
  }
  
  onVariantChange1() {
    console.log('test');
  }
}

customElements.define('variant-selects-resin-craft', VariantRadiosResinCraft1);

/*
const variantRadios = document.querySelectorAll('[id^="variant-radios-"]');

function setStockUnavailable() {
  const stockDiv = document.querySelector('stock-level');
  stockDiv.innerHTML = '';
}

function setStock() {
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

variantRadios[0].addEventListener('change', onVariantChange());
*/