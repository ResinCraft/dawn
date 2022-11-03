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
  this.updateOptions();
}

customElements.define('variant-resincraft', VariantSelectsResinCraft);