// Containers
let divSize;

let newGridPanels;

let color = "#000000";

// Elements
const gridSizer = document.querySelector('#grid-size')

const gridPanel = document.querySelector('.grid-panel')

const gridLabel = document.querySelectorAll('.grid-size-label .range-value')

const buttonToggleGrid = document.querySelector('#btn-toggle-grid')

const buttonClear = document.querySelector('#btn-clear')

const buttonClickFill = document.querySelector('#btn-click-and-fill')

const buttonHoldFill = document.querySelector('#btn-hold-and-fill')

const allButtons = document.querySelectorAll('button')

const penColor = document.querySelector('#pen-color')

const sketchScreen = document.querySelector('#sketch-screen')


// Event Listeners 
gridSizer.addEventListener('change', captureValue)

buttonToggleGrid.addEventListener('click', toggleGrid)

buttonClear.addEventListener('click', clearSketch)

buttonClickFill.addEventListener('click', clickAndFill)

buttonHoldFill.addEventListener('click', holdAndFill)

penColor.addEventListener('change', getColor)


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
        return
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
        return
    }
}


function getColor() {
    color = this.value
}

function addColor() {
    this.setAttribute('style', `background-color: ${color}`)
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