class VariantSelectsResinCraft extends VariantSelects {
  alert('test1');
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange1);
  }

  onVariantChange1() {
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