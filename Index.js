// Get references to the roll button, input fields, and output element
const rollBtn = document.getElementById("roll");
const minInput = document.getElementById("minimum");
const maxInput = document.getElementById("maximum");
const output = document.getElementById("output");
const rolls = document.getElementById("rolls");
const explode = document.getElementById("explode");

// Get references to the dice buttons
const diceButtons = [
    { button: document.getElementById("d2"), value: 2 },
    { button: document.getElementById("d4"), value: 4 },
    { button: document.getElementById("d6"), value: 6 },
    { button: document.getElementById("d8"), value: 8 },
    { button: document.getElementById("d10"), value: 10 },
    { button: document.getElementById("d12"), value: 12 },
    { button: document.getElementById("d20"), value: 20 },
    { button: document.getElementById("d100"), value: 100}
]

// Set default values
d6.style.backgroundColor = "lightgreen";
output.textContent = "Roll";
minInput.value = 1;
maxInput.value = 6;
rolls.value = 1;

let min;
let max;


rollBtn.onclick = () => {
    min = Math.abs(Math.floor(Number(minInput.value)));
    max = Math.abs(Math.floor(Number(maxInput.value)));

    rollBtn.style.backgroundColor = "lightgreen";
    setTimeout(() => {
        rollBtn.style.backgroundColor = "";
    }, 200); 

    if (max < min) {
        let temp = min;
        min = max;
        max = temp;  
    }

    displayResult();

    output.style.color = "lightgreen";
    setTimeout(() => {
        output.style.color = "green";
    }, 200); 

   
};


diceButtons.forEach((dice) => {
    dice.button.onclick = () => {
        if (dice.button.style.backgroundColor === "lightgreen") {
            rolls.value++;
            return;
        }
        rolls.value = 1;
        minInput.value = 1;
        maxInput.value = dice.value;
        resetDice();
        dice.button.style.backgroundColor = "lightgreen";
    };
});

function resetDice(){
    diceButtons.forEach((dice) => {
        dice.button.style.backgroundColor = "";
    });
}

minInput.onchange = maxInput.onchange = checkDice;

function checkDice() {
    resetDice();
    if (Math.abs(Number(minInput.value)) === 1) {
        const dice = diceButtons.find((dice) => dice.value === Number(maxInput.value));
        if (dice) {
            dice.button.style.backgroundColor = "lightgreen";
        }
    }
};

function displayResult() {
    output.style.fontSize = "50px";
    const rollCount = Math.abs(Math.floor(Number(rolls.value)));
    const results = Array.from({length: rollCount} , () => Math.floor(Math.random() * (max - min + 1) + min)); 
    
    let resultString = "";
    let sum = 0;

    for (let i = 0; i < results.length; i++) {
        const roll = results[i];
        if (roll === max && explode.checked) {
            resultString += roll + "*";
            results.splice(i + 1, 0, Math.floor(Math.random() * (max - min + 1) + min));
        } else {
            resultString += roll;
        }

        if (i < results.length - 1) {
            resultString += " + ";
        }

        sum += roll;
    }

    const fontSize = results.length > 50 ? 30 : 50 - Math.floor(rollCount / 3);
    output.style.fontSize = `${fontSize}px`;

    output.textContent = results.length === 1 ? resultString : `${resultString} = ${sum}`;
}
