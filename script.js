// Containers
let divSize;

let fillMethod = 0; //0 - pen up, 1 - click&fill, 2 - hold&fill


// Elements
const gridSizer = document.querySelector('#grid-size')

const gridPanel = document.querySelector('.grid-panel')

const gridPanelDiv = document.querySelectorAll('.grid-panel div')

const gridLabel = document.querySelectorAll('.grid-size-label .range-value')

const buttonToggleGrid = document.querySelector('#btn-toggle-grid')

const buttonClear = document.querySelector('#btn-clear')

const buttonClickFill = document.querySelector('#btn-click-and-fill')

const buttonHoldFill = document.querySelector('#btn-hold-and-fill')


// Event Listeners 
gridSizer.addEventListener('change', captureValue)

gridPanelDiv.forEach(div => div.addEventListener('click', testEvent))

buttonToggleGrid.addEventListener('click', toggleGrid)

buttonClear.addEventListener('click', testEvent)

buttonClickFill.addEventListener('click', clickAndFill)

buttonHoldFill.addEventListener('click', holdAndFill)


// Functions
function testEvent() {
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


function clickAndFill() {

    if (buttonHoldFill.classList.value === 'btn on') {
        this.classList.toggle('on')
        buttonHoldFill.classList.toggle('on')
        fillMethod = true
    } else if (buttonHoldFill.classList.value === 'btn' || this.classList.value === 'btn') {
        this.classList.toggle('on')
        fillMethod = true
    } else {
        return
    }

    if (this.classList.value === 'btn on') {
        fillMethod = 1
    } else if (buttonHoldFill.classList.value === 'btn on') {
        fillMethod = 2
    } else {
        fillMethod = 0 
    }
    
}

function holdAndFill() {

    if (buttonClickFill.classList.value === 'btn on') {
        this.classList.toggle('on')
        buttonClickFill.classList.toggle('on')
    } else if (buttonClickFill.classList.value === 'btn' || this.classList.value === 'btn') {
        this.classList.toggle('on')
    } else {
        return
    }

    if (this.classList.value === 'btn on') {
        fillMethod = 2
    } else if (buttonClickFill.classList.value === 'btn on') {
        fillMethod = 1
    } else {
        fillMethod = 0 
    }
    
}