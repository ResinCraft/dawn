  const VariantSelectsClass = new VariantSelects();
    var productOptionNames = [];
    var productOptionValues = [];
    {% for product_option in product.options_with_values %}
        productOptionNames.push("{{ product_option.name | replace: '"', '\\"' }}");
    {% endfor %}

    var variants = [];
    {% for variant in product.variants %}
		variants.push({id: {{variant.id}}, "{{ product.options_with_values[0].name | replace: '"', '\\"' }}": "{{variant.option1 | replace: '"', '\\"'}}", "{{ product.options_with_values[1].name | replace: '"', '\\"' }}": "{{variant.option2 | replace: '"', '\\"'}}", "{{ product.options_with_values[2].name | replace: '"', '\\"' }}": "{{variant.option3 | replace: '"', '\\"'}}"});
    {% endfor %}

    function removeParams(sParam) {
          var url = window.location.href.split('?')[0]+'?';
          var sPageURL = decodeURIComponent(window.location.search.substring(1)),
              sURLVariables = sPageURL.split('&'),
              sParameterName,
              i;

          for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] != sParam) {
              url = url + sParameterName[0] + '=' + sParameterName[1] + '&'
            }
		}
		return url.substring(0,url.length-1);
	}
                                
    function setDefaultOption(select)
    {
        selectName = select.name;
        optionText = "Select " + selectName.match(/\[(.*?)\]/)[1] + "..."
		//select.deselectAll();
        //build the option that is going to be inserted into the drop down box
        var option = document.createElement("option");
        option.text = optionText;
      	option.value = optionText;
		option.selected = true;
        //add the option to the selector at the top
        select.add(option, select[0]);
      	select.value = optionText;
      	
      
        //only trigger this option if there is no pre-selected variant. i.e. the url doesn't have a "?variant=1234" value.
        const urlParams = new URLSearchParams(window.location.search);
        if(!urlParams.has('variant')) {
          select.dispatchEvent(new Event("change", { bubbles: true }));
          //this.toggleAddButton(disable = true, 'Nope.');
        }
      	//select.prop("selected", false);
    }


    function removeOptions(selectElement) {
         var i, L = selectElement.options.length - 1;
         for(i = L; i >= 0; i--) {
         	selectElement.remove(i);
         }
    }

  	function findSelectIndex(select){
        selectName = select.name;
        optionText = selectName.match(/\[(.*?)\]/)[1];
        selectorIndex = productOptionNames.indexOf(optionText);
    }
  
    function buildOptions(select,parentSelect)
    {
      	var urlParams = new URLSearchParams(window.location.search);
        var parentOptionText = parentSelect.name.match(/\[(.*?)\]/)[1];
      	var selectOptionText = select.name.match(/\[(.*?)\]/)[1];
        var filteredVariants = variants.filter((item)=>item[parentOptionText] === parentSelect.value);

      	Array.prototype.forEach.call(filteredVariants, function(variant) {
            var option = document.createElement("option");
            option.text = variant[selectOptionText];
            if(urlParams.has('variant') && variant['id'] == urlParams.get('variant')){
				option.selected = true;
            }
            select.add(option);
        });
    }
  
    function modifySelect(select,parentSelect)
    {
      	/*console.log(select.selectedIndex);
      	if(select.selectedIndex == 0) {
          	var newUrl = removeParams('variant');
          	console.log(newUrl);
          	window.history.pushState('object', document.title, newUrl);
      	}*/
      	const selectIndex = findSelectIndex(select);
      	const selectContainers = document.getElementsByClassName("product-form__input product-form__input--dropdown");
        if(selects[selectorIndex - 1].selectedIndex == 0){
          selectContainers[selectorIndex].style.display = 'none';
        } else {
          removeOptions(select);
          setDefaultOption(select);
          buildOptions(select,parentSelect);
          selectContainers[selectorIndex].style.display = '';
		}
    }

    const selects = document.getElementsByClassName("select__select");
  	setDefaultOption(selects[0]);
  	selects[0].dispatchEvent(new Event('change'));
    switch (selects.length) {
      	case 1:    	
        break;
      	case 2:
        	modifySelect(selects[1],selects[0]);
        	selects[0].addEventListener('change', function() {modifySelect(selects[1],selects[0])});
        break;
      	case 3:
        	modifySelect(selects[1],selects[0]);
        	modifySelect(selects[2],selects[1]);
            selects[0].addEventListener('change', function() {modifySelect(selects[1])});
        	selects[1].addEventListener('change', function() {modifySelect(selects[2])});
        break;
    }