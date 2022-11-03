class UpdateVariantInfo extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('change', this.onVariantChange);
    }

    onVariantChange() {
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
    
    updatePickupAvailability() {
      const pickUpAvailability = document.querySelector('pickup-availability');
      if (!pickUpAvailability) return;

      if (this.currentVariant && this.currentVariant.available) {
          pickUpAvailability.fetchAvailability(this.currentVariant.id);
      } else {
          pickUpAvailability.removeAttribute('available');
          pickUpAvailability.innerHTML = '';
      }
    }
}