const canvas = document.querySelector("#drawing-canvas");
canvas.width = 800;
canvas.height = 600;
canvas.style.backgroundColor = "#ffe4c4";
const ctx = canvas.getContext("2d");

const mouse = {
    mousedown: false,
    x: 0,
    y: 0,
    strokeColor: "#000",
    strokeWeight: 5,
}

let heading = document.querySelector("#title");
heading.className = "title heading";
heading.innerHTML = "Testing canvas";

let colorDiv = document.querySelector("#colorDiv");
colorDiv.className = "container text-container";

let colorText = document.createElement("input");
colorText.id = "colorText";
colorText.type = "text";
colorText.placeholder = mouse.strokeColor;

let colorButton = document.createElement("button");
colorButton.id = "color";
colorButton.className = "button";
colorButton.innerHTML = "Change";

let strokeSize = document.createElement("select");
strokeSize.id = "strokeSize";
strokeSize.name = "strokeSize";
let strokeOptions = [1, 2, 5, 10, 20];
strokeOptions.forEach((weight) => {
    let option = document.createElement("option");
    option.value = weight;
    option.innerHTML = weight;
    strokeSize.appendChild(option);
});
strokeSize.selectedIndex = strokeOptions.indexOf(mouse.strokeWeight);

let strokeSizeLabel = document.createElement("label");
strokeSizeLabel.className = "label";
strokeSizeLabel.setAttribute("for", "strokeSize");
strokeSizeLabel.innerHTML = "Stroke\nWeight";

colorDiv.appendChild(strokeSizeLabel);
colorDiv.appendChild(strokeSize);
colorDiv.appendChild(colorText);
colorDiv.appendChild(colorButton);

let buttonDiv = document.querySelector("#buttonDiv");
buttonDiv.className = "container button-container";

let circleButton = document.createElement("button");
circleButton.id = "circle";
circleButton.className = "button";
circleButton.innerHTML = "Circle";

let squareButton = document.createElement("button");
squareButton.id = "square";
squareButton.className = "button";
squareButton.innerHTML = "Square";

buttonDiv.appendChild(circleButton);
buttonDiv.appendChild(squareButton);

let clearButton = document.createElement("button");
clearButton.id = "clear";
clearButton.className = "button";
clearButton.innerHTML = "Clear Canvas";

let clearDiv = document.querySelector("#clearDiv");
clearDiv.className = "container clear-container";

clearDiv.appendChild(clearButton);

const mainDiv = document.querySelector("#main");
[heading, canvas, colorDiv, buttonDiv, clearDiv].forEach((element) => {
    mainDiv.appendChild(element);
});

strokeSize.addEventListener("click", (e) => {
    let newStrokeSize = document.querySelector("#strokeSize");
    mouse.strokeWeight = newStrokeSize.value;
})

colorButton.addEventListener("click", (e) => {
    const newColor = document.querySelector("#colorText");
    mouse.strokeColor = newColor.value;
    newColor.placeholder = newColor.value;
    newColor.value = "";
})

canvas.addEventListener("mousedown", (e) => {
    mouse.mousedown = true;
    ctx.beginPath();
});

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if (mouse.mousedown) {
        ctx.strokeStyle = mouse.strokeColor;
        ctx.lineWidth = mouse.strokeWeight;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    ctx.moveTo(x, y);
});

let mouseUp = () => {
    mouse.mousedown = false;
    ctx.closePath();
}

const mouseEventsUp = ["mouseup", "mouseleave"];
mouseEventsUp.forEach((event) => {
    canvas.addEventListener(event, mouseUp)
});

canvas.addEventListener("mouseenter", (e) => {
    if (e.buttons === 1) {
        mouse.mousedown = true;
    }
    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    ctx.moveTo(x, y);
})

function drawRect() {
    console.log("square");
    ctx.beginPath()
    ctx.fillStyle = "green";
    ctx.strokeStyle = "";
    ctx.fillRect(400, 300, 100, 100);
    ctx.closePath();
}

function drawCircle() {
    console.log("circle");
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "rgba(1, 1, 1, 0)";
    ctx.ellipse(100, 100, 100, 100, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function clearScreen() {
    console.log("clearing");
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    console.log(mouseEventsUp)
}

squareButton.addEventListener("click", drawRect);
circleButton.addEventListener("click", drawCircle);
clearButton.addEventListener("click", clearScreen);