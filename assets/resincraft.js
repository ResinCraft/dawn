alert('test0');
class VariantSelectsResinCraft extends VariantSelects {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    alert('test2');
    if (!this.currentVariant) {
        this.setStockUnavailable();
    } else {
      this.setStock();
    }
  }

  setStockUnavailable() {
    const stockDiv = document.querySelector('stock-level');
    stockDiv.innerHTML = '';
  }
  
  setStock() {
    alert('tes3t');
    const stockDiv = document.querySelector('stock-level');
    stockDiv.innerHTML = '1';
  }
}