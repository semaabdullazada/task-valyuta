let btn = document.querySelector('button') 
const buttons = document.querySelectorAll(".value"); 
const buttons1 = document.querySelectorAll(".value1"); 
const pText = document.querySelector(".currencyConversion");
const pTextSecond = document.querySelector(".currencyConversionR");
const convertedValueL = document.querySelector(".input-value-left");
const convertedValueR = document.querySelector(".input-value-right");
const blogText = document.querySelector(".blog-text");
const blogText1 = document.querySelectorAll(".colorGray");
const blogText2 = document.querySelectorAll(".colorBlack");  
const header = document.querySelector("header");
const leftButton = document.querySelector(".end");
const errorText = document.querySelector(".error");
const errorImg = document.querySelector(".errorimg");
const inputt = document.querySelector("input");
const heaaderText = document.querySelector(".header-text");
const selectedValue = document.querySelector(".selected");
const errorContain = document.querySelector(".error-container");
access_key = "45d6c17efed6bc6424e3eda1eeba27be";
let selectedLeft="RUB"; 


buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedLeft = button.textContent;        
        valyutaLeft();
        valyutaRight();
    });
});  
let forHamburger = document.querySelector(".hamburger-icon");
let isMenuVisible = false;

forHamburger.addEventListener("click", () => {
    if (isMenuVisible) {
        header.style.display = "block";
        blogText.style.display = "none";
        // leftButton.style.marginLeft = "500px";
        forHamburger.style.display = "block"; 
        isMenuVisible = false; 
    } else {
        header.style.display = "block";
        blogText.style.display = "block";
        forHamburger.style.display = "block";
        isMenuVisible = true; 
    }
});


    let selectedRight="USD";
buttons1.forEach(button => {
    button.addEventListener("click", () => {
        buttons1.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedRight=button.textContent;
        valyutaLeft();
        valyutaRight();
    });
});     


convertedValueL.addEventListener('input', function() {
    valyutaLeft();
});
convertedValueR.value = "";

convertedValueR.addEventListener('input', function() {
    valyutaRight();
});
function valyutaLeft() {
    if (selectedLeft && selectedRight) {
        let fromCurrency = selectedLeft;
        let toCurrency = selectedRight;

        fetch(`https://api.exchangerate.host/convert?access_key=${access_key}&from=${fromCurrency}&to=${toCurrency}&amount=1`)      
            .then(response => response.json())
            .then(data => {
                if (data.result !== undefined && data.result !== null) {
                    pText.textContent = `1 ${fromCurrency} = ${data.result} ${toCurrency}`;

                    let convertedAmount = (data.result * parseFloat(convertedValueL.value)).toFixed(5);
                    if (!isNaN(convertedAmount)) {
                        convertedValueR.value = convertedAmount;
                        console.log("Hesablanmış sağ dəyər:", convertedValueR.value);
                    } else {
                        convertedValueR.value = "";
                        console.log("NaN dəyəri qaytarıldı.");
                    }
                } else {
                    console.log("API düzgün nəticə qaytarmadı.");
                }
                errorText.style.display = "none";
                errorImg.style.display = "none";
                errorContain.classList.add("dis-none");
            })
            .catch(err => console.log("Xəta:", err));
            // errorText.style.display = "block";
            // errorImg.style.display = "block";
            
            heaaderText.style.paddingTop = "20px";
            heaaderText.style.paddingTop = "20px";

            if (selectedLeft.textContent === selectedRight.textContent) {
                convertedValueR.value = convertedValueL.value;
            } 
            else {
                convertedValueR.value = "";
            }
    } else {
        console.log("Hər iki valyuta seçilməlidir.");
    }
}

function valyutaRight() {
     if (selectedLeft && selectedRight) {
        let fromCurrency = selectedLeft;
        let toCurrency = selectedRight; 
        fetch(`https://api.exchangerate.host/convert?access_key=${access_key}&from=${toCurrency}&to=${fromCurrency}&amount=1`)      
        .then(response => response.json())
            .then(data => { 
                console.log(data); 
                
                if (data.result !== undefined && data.result !== null) {
                      pTextSecond.textContent = `1 ${toCurrency} = ${data.result} ${fromCurrency}`;
    
                        let convertedAmount = (data.result * parseFloat(convertedValueR.value)).toFixed(5);
    
                        if (!isNaN(convertedAmount)) {
                            convertedValueL.value = convertedAmount;
                            console.log("Hesablanmış sağ dəyər:", convertedValueL.value);
                        } else {
                            convertedValueL.value = "";
                            console.log("NaN dəyəri qaytarıldı.");
                        }
                    } else {
                        console.log("API düzgün nəticə qaytarmadı.");
                    }
                    errorImg.style.display = "none";
                    errorText.style.display = "none";
 
                }) 

            .catch(err => console.log("Xəta:", err));
            // errorText.style.display = "block";
            // errorImg.style.display = "block";
            
            heaaderText.style.paddingTop = "20px";
            heaaderText.style.paddingTop = "20px";
            errorContain.classList.remove("dis-none");
            if (selectedRight.textContent === selectedLeft.textContent) {
                convertedValueL.value = convertedValueR.value;
            } 
            else {
                convertedValueL.value = "";
            }
            // console.error("Xəta baş verdi:", error);
    } else {
        console.log("Hər iki valyuta seçilməlidir.");
    }
}
document.querySelectorAll(".input-value-left").forEach((input) => {
    input.addEventListener("input", (event) => {
        let inputValue = event.target.value;
    
        inputValue = inputValue.replace(/,/g, ".");
    
        const parts = inputValue.split(".");
        if (parts.length > 2) {
        inputValue = parts[0] + "." + parts[1];
        }
    
        const validCharacters =/^[0-9]*\.?[0-9]{0,5}$/;
        if (!validCharacters.test(inputValue)) {
        inputValue = inputValue.slice(0, -1);
        } 
        event.target.value = inputValue;
    });
});
convertedValueL.value = "5000";

document.querySelectorAll(".input-value-right").forEach((input) => {
    input.addEventListener("input", (event) => {
        let inputValue = event.target.value;
    
        inputValue = inputValue.replace(/,/g, ".");
    
        const parts = inputValue.split(".");
        if (parts.length > 2) {
        inputValue = parts[0] + "." + parts[1];
        }
    
        const validCharacters =/^[0-9]*\.?[0-9]{0,5}$/;
        if (!validCharacters.test(inputValue)) {
        inputValue = inputValue.slice(0, -1);
        } 
        event.target.value = inputValue;
    });
});
valyutaLeft();
valyutaRight();