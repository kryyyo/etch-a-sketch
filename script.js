// Containers
let divSize;

let newGridPanels;

let color = "#000000";

let hue = 0;

// Elements
const gridSizer = document.querySelector('#grid-size')

const gridPanel = document.querySelector('.grid-panel')

const gridLabel = document.querySelectorAll('.grid-size-label .range-value')

const buttonToggleGrid = document.querySelector('#btn-toggle-grid')

const buttonClear = document.querySelector('#btn-clear')

const buttonClickFill = document.querySelector('#btn-click-and-fill')

const buttonHoldFill = document.querySelector('#btn-hold-and-fill')

const buttonEraser = document.querySelector('#btn-eraser')

const buttonColorGrabber = document.querySelector('#btn-color-grabber')

const buttonRainbow = document.querySelector('#btn-rainbow')

const allButtons = document.querySelectorAll('button')

const penColor = document.querySelector('#pen-color')

const sketchScreen = document.querySelector('#sketch-screen')

const extraButtons = document.querySelectorAll('.extra-features')


// Event Listeners 
gridSizer.addEventListener('change', captureValue)

buttonToggleGrid.addEventListener('click', toggleGrid)

buttonClear.addEventListener('click', clearSketch)

buttonClickFill.addEventListener('click', clickAndFill)

buttonHoldFill.addEventListener('click', holdAndFill)

penColor.addEventListener('change', getColor)

buttonEraser.addEventListener('click', eraser)

buttonRainbow.addEventListener('click', rainbow)

buttonColorGrabber.addEventListener('click', grabColor) 

// Functions
function testEvent(e) {
    console.log(e)
}

function testTarget() {
    console.log(this)
    
}

function captureValue() {
    while (gridPanel.firstChild) {
        gridPanel.removeChild(gridPanel.firstChild)
    }

    let gridInputValue = this.value
    let gridInputSuffix = this.dataset.sizing
    let size = gridInputValue * gridInputValue

    for(i = 0; i < size; i++) {
        const div = document.createElement('div')
        gridPanel.appendChild(div)
    }

    divSize = (100/gridInputValue) + gridInputSuffix
    document.styleSheets[0].cssRules[1].style.setProperty('--divsize', divSize)

    gridLabel.forEach(label => label.textContent = gridInputValue)

    const gridPanelDiv = document.querySelectorAll('.grid-panel div')

    newGridPanels = gridPanelDiv;

    if (buttonHoldFill.classList.value === 'btn on') {
        buttonHoldFill.classList.remove('on')
    }

    if (buttonClickFill.classList.value === 'btn on') {
        buttonClickFill.classList.remove('on')
    }

    allButtons.forEach(button => button.removeAttribute('disabled'))
}

function toggleGrid() {

    gridPanelDivStyle = document.styleSheets[0].cssRules[22].style
    borderBottom = gridPanelDivStyle.getPropertyValue('border-bottom')
    borderRight = gridPanelDivStyle.getPropertyValue('border-right')

    if (borderBottom && borderRight) {
        gridPanelDivStyle.removeProperty('border-bottom')
        gridPanelDivStyle.removeProperty('border-right')
    } else {
       gridPanelDivStyle.setProperty('border-bottom', '1px solid gray')
       gridPanelDivStyle.setProperty('border-right', '1px solid gray')
    }
    
}


function fillMethod() {
    if (buttonClickFill.classList.value === 'btn on') {
        newGridPanels.forEach(div => div.addEventListener('click', addColor))
        newGridPanels.forEach(div => div.removeEventListener('mousedown', holdDown))
    } else if (buttonHoldFill.classList.value === 'btn on') {
        newGridPanels.forEach(div => div.addEventListener('mousedown', holdDown))
        newGridPanels.forEach(div => div.removeEventListener('click', addColor))
    } else {
        newGridPanels.forEach(div => div.removeEventListener('click', addColor))
        newGridPanels.forEach(div => div.removeEventListener('mousedown', holdDown))
    }
}


function clickAndFill() {

    if (buttonHoldFill.classList.value === 'btn on') {
        this.classList.toggle('on')
        buttonHoldFill.classList.toggle('on')
        fillMethod()
    } else if (buttonHoldFill.classList.value === 'btn' || this.classList.value === 'btn') {
        this.classList.toggle('on')
        fillMethod()
    } else {
        this.classList.remove('on')
    }
}

function holdAndFill() {

    if (buttonClickFill.classList.value === 'btn on') {
        this.classList.toggle('on')
        buttonClickFill.classList.toggle('on')
        fillMethod()
    } else if (buttonClickFill.classList.value === 'btn' || this.classList.value === 'btn') {
        this.classList.toggle('on')
        fillMethod()
    } else {
        this.classList.remove('on')
    }
}

function eraser(){
    this.classList.toggle('on')
    buttonRainbow.classList.remove('on')
}

function rainbow() {
    this.classList.toggle('on')
    buttonEraser.classList.remove('on')
}

function getColor() {
    color = this.value
}

function addColor() {

    color = penColor.value

    hue++
    if (hue >= 360) {
        hue = 0;
    }

    if (buttonEraser.classList.value === 'btn on'){
        this.removeAttribute('style', `background-color: ${color}`)
    } else if (buttonRainbow.classList.value === 'btn on') {
        this.setAttribute('style', `background-color: hsl(${hue}, 100%, 50%)`)
    } else {
        this.setAttribute('style', `background-color: ${color}`)
        
    }
}

function holdDown(e) {
    e.preventDefault()
    newGridPanels.forEach(div => div.addEventListener('mouseenter', addColor))
    newGridPanels.forEach(div => div.addEventListener('mouseup', exitHold))
    sketchScreen.addEventListener('mouseleave', exitHold)
}

function exitHold() {
    newGridPanels.forEach(div => div.removeEventListener('mouseenter', addColor))
}

function clearSketch() {
    newGridPanels.forEach(div => div.removeAttribute('style', `background-color: ${color}`))
}

//Refactor this shit
function grabColor() {
    
    offButtons()
    buttonClickFill.setAttribute('disabled', "")
    buttonHoldFill.setAttribute('disabled', "")
    fillMethod()
    buttonColorGrabber.classList.add('on')

    newGridPanels.forEach(div => div.addEventListener('click', whatColor))
}

function whatColor() {

    const bgcolor = this.getAttribute('style')

    if (bgcolor === null) {
        buttonColorGrabber.classList.remove('on')
        newGridPanels.forEach(div => div.removeEventListener('click', whatColor))
    } else {
        penColor.value = `${bgcolor.slice(18)}`
        buttonColorGrabber.classList.remove('on')
        newGridPanels.forEach(div => div.removeEventListener('click', whatColor))
    }

    buttonClickFill.removeAttribute('disabled', "")
    buttonHoldFill.removeAttribute('disabled', "")

}

function offButtons() {
    allButtons.forEach(button => button.classList.remove('on'))
}