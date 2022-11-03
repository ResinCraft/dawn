/*
class VariantSelectsResinCraft extends VariantSelects {  
  constructor() {
    super();
  }

  updateOptions() {
    alert('test2');
    if (!this.currentVariant) {
        this.setStockUnavailable();
    } else {
      this.setStock();
    }
  }

  updateVariantStatuses() {
    const stockDiv = document.querySelector('stock-level');
    stockDiv.innerHTML = '';
  }
  
  setStock() {
    alert('tes3t');
    const stockDiv = document.querySelector('stock-level');
    stockDiv.innerHTML = '1';
  }
}

customElements.define('variant-resincraft', VariantSelectsResinCraft);
*/

class VariantSelectsResinCraft extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    alert('test');
  }
}

customElements.define('variant-resincraft', VariantSelectsResinCraft);