const modTest = false;
const adresaServer = 'http://localhost:3000/trimite-formular';

const formular = document.getElementById('formular');
const raspuns = document.getElementById('raspuns');

formular.addEventListener('submit', async function (e) {
  e.preventDefault();

  const nume = document.getElementById('nume').value;
  const email = document.getElementById('email').value;
  const telefon = document.getElementById('telefon').value || '-';
  const talent = document.getElementById('talent').value;
  const descriere = document.getElementById('mesaj').value;
  const durata = document.getElementById('durata').value;
  const tehnic = document.getElementById('tehnic').value || '-';

  const mesaj = 'Talent: ' + talent +
    '. Durata: ' + durata +
    '. Telefon: ' + telefon +
    '. Cerinte tehnice: ' + tehnic +
    '. Descriere: ' + descriere;

  if (modTest === true) {
    raspuns.textContent = 'MOD TEST: nu s-a trimis nimic la server.';
    raspuns.className = 'ok';
    return;
  }

  try {
    const rezultat = await fetch(adresaServer, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nume: nume, email: email, mesaj: mesaj })
    });

    const date = await rezultat.json();

    if (rezultat.ok) {
      raspuns.textContent = 'Te-ai înscris cu succes!';
      raspuns.className = 'ok';
      formular.reset();
    } else {
      raspuns.textContent = date.eroare;
      raspuns.className = 'eroare';
    }
  } catch (eroare) {
    raspuns.textContent = 'Nu m-am putut conecta la server.';
    raspuns.className = 'eroare';
  }
});
