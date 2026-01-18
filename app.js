async function chercherMot() {
  const mot = document.getElementById("mot").value.trim();
  if (!mot) return;

  const url = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(mot)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.extract) {
      alert("Mot non trouvé");
      return;
    }

    sauvegarderMot(mot, data.extract);
    afficherMot(mot, data.extract);
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
  document.getElementById("resultat").innerHTML =
    `<h3>${mot}</h3><p>${definition}</p>`;
}

function afficherLexique() {
  const lexique = JSON.parse(localStorage.getItem("lexique")) || [];
  const ul = document.getElementById("lexique");
  ul.innerHTML = "";

  lexique.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.mot}</strong><br>${item.definition}`;
    ul.appendChild(li);
  });
}

afficherLexique();
