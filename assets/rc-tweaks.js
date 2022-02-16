var stock = [];
{% for variant in product.variants %}
stock[{{ variant.id }}] = {{ variant.inventory_quantity }};
{% endfor %}

const queryString = window.location.search;
 const urlParams = new URLSearchParams(queryString);
 if(urlParams.has('variant')) {
   onVariantChange()
 }

 this.addEventListener('change', this.onVariantChange);

 function onVariantChange() {
   const newQueryString = window.location.search;
   const newUrlParams = new URLSearchParams(newQueryString);
   const newVariant = newUrlParams.get('variant');

   var msg = msgText(stock[newVariant]);

   var element = document.getElementById('stock-level');
   console.log(msg);
   element.innerHTML = msg;
 }

 function msgText(stockLevel) {
   var text = "Sold out!";
   if(stockLevel > 10){
     text = "More than 10 available";
   } else {
     text = "Only " + stockLevel + " left!";
   }
   return text;
 }