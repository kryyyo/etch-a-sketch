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


// Event Listeners 
gridSizer.addEventListener('change', captureValue)

buttonToggleGrid.addEventListener('click', toggleGrid)

buttonClear.addEventListener('click', testEvent)

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
        newGridPanels.forEach(div => div.removeEventListener('mouseenter', testEvent))
    } else if (buttonHoldFill.classList.value === 'btn on') {
        newGridPanels.forEach(div => div.addEventListener('mouseenter', testEvent))
        newGridPanels.forEach(div => div.removeEventListener('click', addColor))
    } else {
        newGridPanels.forEach(div => div.removeEventListener('click', addColor))
        newGridPanels.forEach(div => div.removeEventListener('mouseenter', testEvent))
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


//REFACTOR THIS PLEASE
function addColor() {
    document.styleSheets[0].cssRules[1].style.setProperty('--base', color)
    this.setAttribute('style', 'background-color: var(--base)')
}