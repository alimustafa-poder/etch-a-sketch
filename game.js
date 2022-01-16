function divNumber(number) { ///generating divs and adding them to the container
    let container = document.getElementById("container");
    for (let i = 1; i <= number * number; i++) {
        let newDiv = document.createElement("div");
        container.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${number}, 1fr)`;
        container.append(newDiv);
    }
}
//slider modification, getting its value, changing backgroundColor
let sliderOutput = document.getElementsByClassName("sliderValue")[0];
const slider = document.getElementsByClassName("slider")[0];
const min = slider.min;
const max = slider.max;
const value = slider.value;
slider.style.background = `linear-gradient(to right, black 0%, black ${(value-min)/(max-min)*100}%, #DEE2E6 ${(value-min)/(max-min)*100}%, #DEE2E6 100%)`;
//getting the value of slider eachtime using the oninput
slider.oninput = function () {
    this.style.background = `linear-gradient(to right, black 0%, black ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 100%)`;
    sliderOutput.textContent = `${this.value} by ${this.value}`;
};
slider.addEventListener("input", sliderValue);
divNumber(value); //as soon the page loads the value ia added otherwise the divs aren't added to the container until the user clicks on the slider

//passing slider value and resetting the divs inside container
function sliderValue() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    divNumber(this.value);
}
//getting buttons
let buttons = document.querySelectorAll("button");
let updatingBtn = buttons[0];
let coloringBtn = buttons[1];
let eraseBtn = buttons[2];
let clearBtn = buttons[3];

document.addEventListener("click", buttonsColor);

function buttonsColor(event) {
    let buttonColor = event.target;
    if (buttonColor.tagName != "BUTTON") return;
    buttons.forEach(button => button.classList.remove("active"));
    buttonColor.classList.toggle("active");
}

let erasingEnabled = false;
let coloringEnabled = false;
let clearingEnabled = false;
let updatingEnabled = false;
//adding and removing event handlers from each button
eraseBtn.addEventListener("click", function erase() {
    erasingEnabled = !erasingEnabled;

    if (erasingEnabled) {
        erasingEnabled = false;
        coloringEnabled = false;
        erasingEnabled = false;
        updatingEnabled = false;
        document.removeEventListener("mouseover", coloring);
        document.removeEventListener("click", clearing);
        updatingBtn.removeEventListener("click", monoUpdate);
        document.addEventListener("mouseover", eraser);
    } else {
        document.removeEventListener("click", clearing);
        document.removeEventListener("mouseover", eraser);
        updatingBtn.removeEventListener("click", monoUpdate);
        document.addEventListener("mouseover", coloring);
    }
});

clearBtn.addEventListener("click", function clearColor() {
    clearingEnabled = !clearingEnabled;

    if (clearingEnabled) {
        coloringEnabled = false;
        erasingEnabled = false;
        clearingEnabled = false;
        updatingEnabled = false;
        document.removeEventListener("mouseover", eraser);
        document.removeEventListener("mouseover", coloring);
        updatingBtn.removeEventListener("click", monoUpdate);
        document.addEventListener("click", clearing);
    } else {
        document.removeEventListener("mouseover", coloring);
        document.removeEventListener("mouseover", eraser);
        updatingBtn.removeEventListener("click", monoUpdate);
        document.addEventListener("click", clearing);
    }
});

coloringBtn.addEventListener("click", function color() {
    coloringEnabled = !coloringEnabled;

    if (coloringEnabled) {
        clearingEnabled = false;
        erasingEnabled = false;
        coloringEnabled = false;
        updatingEnabled = false;
        document.removeEventListener("click", clearing);
        document.removeEventListener("mouseover", eraser);
        updatingBtn.removeEventListener("click", monoUpdate);
        document.addEventListener("mouseover", coloring);
    } else {
        document.removeEventListener("click", clearing);
        document.removeEventListener("mouseover", coloring);
        updatingBtn.removeEventListener("click", monoUpdate);
        document.addEventListener("mouseover", eraser);
    }
});

updatingBtn.addEventListener("click", function monoColor() {
    updatingEnabled = !updatingEnabled;

    if (updatingEnabled) {
        coloringEnabled = false;
        erasingEnabled = false;
        clearingEnabled = false;
        updatingEnabled = false;
        document.removeEventListener("mouseover", eraser);
        document.removeEventListener("mouseover", coloring);
        document.removeEventListener("click", clearing);
        monoUpdate();
    } else {
        document.removeEventListener("mouseover", coloring);
        document.removeEventListener("mouseover", eraser);
        document.removeEventListener("click", clearing);
        document.removeEventListener("click",monoColor);
    }
});

function clearing() {
    let divs = container.children;
    Array.from(divs).forEach(div => div.style.backgroundColor = "");
}

function eraser(event) {
    let elem = event.target.closest('div');
    if (!elem || elem.parentNode.id != "container") return;
    elem.style.backgroundColor = "";
}

function coloring(event) {
    let elem = event.target.closest('div');
    if (!elem || elem.parentNode.id != "container") return;
    let randColor1 = Math.round(Math.random() * 255);
    let randColor2 = Math.round(Math.random() * 255);
    let randColor3 = Math.round(Math.random() * 255);
    elem.style.backgroundColor = `rgb(${randColor1}, ${randColor2}, ${randColor3})`;
}
let colorInput;
function monoUpdate(event) {
    colorInput = document.getElementById('colorPicker');
    let defaultColor = colorInput.value;
    let colorValue;
    document.querySelector("label").style.backgroundColor = colorInput.value;
    colorInput.addEventListener('input', () => {
        defaultColor = colorInput.value;
        document.querySelector("label").style.backgroundColor = colorInput.value;
    });
    
    if (colorValue === defaultColor) {
        document.addEventListener("mouseover", e => {
            let elem = e.target.closest('div');
            if (!elem || elem.parentNode.id != "container") return;
            elem.style.backgroundColor = "#000000";
        });
    } else {
        document.addEventListener("mouseover", updatingColor);
    }
    
}

function updatingColor(event) {
    let elem = event.target.closest('div');
    if (!elem || elem.parentNode.id != "container") return;
    elem.style.backgroundColor = colorInput.value;
}