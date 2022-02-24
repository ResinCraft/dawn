select = document.getElementsByClassName("select__select")[0];
optionText = "Select this..."
select.add(new Option(optionText, optionText,defaultSelected),select[0]);
select.dispatchEvent(new Event("change"));