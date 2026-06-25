// Formu yakala
document.getElementById("flightForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller

  // Kullanıcının girdiği şehirleri al
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  // CollectAPI isteği
  fetch(`https://api.collectapi.com/travel/planeTicket?data.to=${to}&data.from=${from}`, {
    method: "GET",
    headers: {
      "authorization": "apikey 3PmYJdKSPZZe56RZnBnG6j:2c57wsn1krM4qIKbhC8juO", // Senin tokenin
      "content-type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    const results = document.getElementById("results");
    results.innerHTML = "<h3>Sonuçlar</h3>";

    // Gelen uçuşları listele
    data.result.forEach(flight => {
      results.innerHTML += `
        <div class="flight">
          <p><strong>${flight.start}</strong> → <strong>${flight.end}</strong></p>
          <p>Tarih: ${flight.date}</p>
          <p>Kalkış: ${flight.starttime} - Varış: ${flight.arrivetime}</p>
          <p>Fiyat: ${flight.price}</p>
          <p>Havayolu: ${flight.name}</p>
        </div>
      `;
    });
  })
  .catch(error => {
    console.error("Hata:", error);
    document.getElementById("results").innerHTML = "<p>Bir hata oluştu, lütfen tekrar deneyin.</p>";
  });
});
