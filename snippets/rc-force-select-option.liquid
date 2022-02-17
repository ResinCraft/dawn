<script type="text/javascript">
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  //removes a particular variable from the url string i.e. removeParams("this") would change "https://test.com/?this=1&that=2" to "https://test.com/?that=2"
  function removeParams(sParam)
  {
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
  
  //returns the text for the option, i.e. "Select Size..."
  function getOptionText(selectObject)
  {
    //get the name of the current drop down box i.e. "options[TypeXYZ]"
    selectName = selectObject.name;
    
    //strip out the option name i.e. "options[TypeXYZ]" => "TypeXYZ"
    optionText = selectName.match(/\[(.*?)\]/)[1];
    
    //make it more friendly "Select Size..."
    optionText = "Select " + optionText + "..."
    return optionText;
  }
  
  //get the drop down boxes
  var selectObjects = document.getElementsByClassName('select__select');
  
  //loop through the drop down boxes
  Array.prototype.forEach.call(selectObjects, function(selectObject) {
    
    //get the text that going to be in the default option
	var optionText = getOptionText(selectObject)
    
    //build the option that is going to be inserted into the drop down box
    var option = document.createElement("option");
    option.text = optionText;
    
    //only trigger this option if there is no pre-selected variant. i.e. the url doesn't have a "?variant=1234" value.
    if(!urlParams.has('variant')) {
		option.selected = true;
    }
    
    //add the option to the selector at the top
    selectObject.add(option, selectObject[0]);
  });
  
  //check to see if the variant has been changed, run onVariantChange function
  this.addEventListener('change', this.onVariantChange);
  
  //if an invalid variant has been selected, remove the url preselector i.e. "?variant=1234"
  function onVariantChange() {
    var newQueryString = window.location.search;
    var newUrlParams = new URLSearchParams(newQueryString);
    
    var invalidOption = false;
    Array.prototype.forEach.call(selectObjects, function(selectObject) {
	  if(selectObject.value == getOptionText(selectObject))
      {
		invalidOption = true;
      }
    });

    if(invalidOption && newUrlParams.has('variant'))
    {
      var url = removeParams('variant');
      window.history.pushState("", "", url);
    }
  }
</script>