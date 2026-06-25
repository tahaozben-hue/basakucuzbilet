document.getElementById("flightForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").value;

  // Şimdilik sahte sonuç gösteriyoruz
  const results = document.getElementById("results");
  results.innerHTML = `
    <h3>Arama Sonuçları</h3>
    <p>${from} → ${to} için ${date} tarihinde uçuşlar burada listelenecek.</p>
  `;
});
