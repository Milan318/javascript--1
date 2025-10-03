// ----------- V A R I A B L E - D E C L A R A T I O N -------------

const button = document.querySelectorAll(".btn");
const display = document.getElementById("display");
const backBtn = document.querySelector(".backBtn");
const operator = ['+', '-', '*', '/', '%'];

// ----------- V A R I A B L E - D E C L A R A T I O N -------------

// ----------- M A I N - L O G I C -------------

button.forEach((btn) => {

    btn.addEventListener("click", (e) => {
        let value = e.target.innerText;

        // PRINT ANSWER OF CALCULATION
        
        if(value === '='){
            display.value = eval(display.value);

        }

        // TO CLEAR THE SCREEN
        else if(value === 'AC'){
            display.value = "";

        }

        // OPERATOR LOGIC
        else if (operator.includes(value)) {

          if (operator.includes(display.value.slice(-1))) {
            display.value = display.value.slice(0, -1) + value;
            
          } else {
            display.value += value;

          }

        } else {
          display.value += value;

        }

    })
})

// ----------- M A I N - L O G I C -------------

// ----------- B A C K - B U T T O N -------------

backBtn.addEventListener("click", () => {
   display.value = display.value.slice(0, -1);

})

// ----------- B A C K - B U T T O N -------------