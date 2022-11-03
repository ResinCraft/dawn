class UpdateVariantInfo extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('change', this.onVariantChange);
    }

    onVariantChange() {
      alert('test');
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
      alert('test');
      const stockDiv = document.querySelector('stock-level');
      stockDiv.innerHTML = '1';
    }
}