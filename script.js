// Containers
let divSize;


// Elements
const gridSizer = document.querySelector('#grid-size')

const gridPanel = document.querySelector('.grid-panel')

const gridPanelDiv = document.querySelectorAll('.grid-panel div')


// Event Listeners 
gridSizer.addEventListener('change', captureValue)

gridPanelDiv.forEach(div => div.addEventListener('click', testEvent))

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
    
}