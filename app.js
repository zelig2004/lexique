async function chercherMot() {
  const mot = document.getElementById("mot").value.trim();
  if (!mot) return;

  const url = `https://api-definition.fgainza.fr/?word=${encodeURIComponent(mot)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.definitions || data.definitions.length === 0) {
      alert("Mot non trouvé dans le Wiktionnaire");
      return;
    }

    const definition = data.definitions[0].definition;

    sauvegarderMot(mot, definition);
    afficherMot(mot, definition);
    afficherLexique();

  } catch (e) {
    alert("Erreur de connexion");
  }
}

function sauvegarderMot(mot, definition) {
  const lexique = JSON.parse(localStorage.getItem("lexique")) || [];
  lexique.push({ mot, definition });
  localStorage.setItem("lexique", JSON.stringify(lexique));
}

function afficherMot(mot, definition) {
  document.getElementById("resultat").innerHTML = `
    <h3>${mot}</h3>
    <p>${definition}</p>
    <p style="font-size:12px;color:#666">
      Source : Wiktionnaire (CC BY-SA)
    </p>
  `;
}

function afficherLexique() {
  const lexique = JSON.parse(localStorage.getItem("lexique")) || [];
  const ul = document.getElementById("lexique");
  ul.innerHTML = "";

  lexique.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.mot}</strong><br>${item.definition}`;
    ul.appendChild(li);
  });
}

afficherLexique();
