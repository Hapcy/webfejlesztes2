function handleDimensionFormSubmit(e) {
  e.preventDefault();

  console.log(e);

  generateCells();
}

function generateCells(width, height) {
  let tableString = '';
  tableString += '';
}

const dimensionForm = document.querySelector('#dimensionForm');
dimensionForm.addEventListener('submit', handleDimensionFormSubmit);


