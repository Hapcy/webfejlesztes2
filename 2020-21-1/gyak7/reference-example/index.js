const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const elkuldendoAdat = {
    nev: formData.get('nev'),
    titok: 'titok',
  };

  // file protocol miatt ez eddig érdekes
  const resp = await fetch('', {
    method: 'POST',
    body: JSON.stringify(elkuldendoAdat),
  });
  const result = await resp.text(); // await resp.json();
  console.log(result);
}
