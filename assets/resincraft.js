alert('test0');
class UpdateVariantInfo extends HTMLElement {
    constructor() {
      alert('test1');
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
      alert('test3');
      const stockDiv = document.querySelector('stock-level');
      stockDiv.innerHTML = '1';
    }
}