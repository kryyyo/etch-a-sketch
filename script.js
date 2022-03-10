// Containers
let divSize;


// Elements
const gridSizer = document.querySelector('#grid-size')

const gridPanel = document.querySelector('.grid-panel')

const gridPanelDiv = document.querySelectorAll('.grid-panel div')

const gridLabel = document.querySelectorAll('.grid-size-label .range-value')

const buttonToggleGrid = document.querySelector('#btn-toggle-grid')


// Event Listeners 
gridSizer.addEventListener('change', captureValue)

gridPanelDiv.forEach(div => div.addEventListener('click', testEvent))

buttonToggleGrid.addEventListener('click', toggleGrid)


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

    gridPanelDivStyle = document.styleSheets[0].cssRules[21].style
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