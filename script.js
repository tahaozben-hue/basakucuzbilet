document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("flightForm");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    fetch(`https://api.collectapi.com/travel/planeTicket?data.to=${to}&data.from=${from}`, {
      method: "GET",
      headers: {
        "authorization": "apikey 3PmYJdKSPZZe56RZnBnG6j:2c57wsn1krM4qIKbhC8juO",
        "content-type": "application/json"
      }
    })
    .then(async response => {
      const text = await response.text();
      try {
        const data = JSON.parse(text); // JSON parse etmeyi dene
        const results = document.getElementById("results");
        results.innerHTML = "<h3>Uçuş Sonuçları</h3>";

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
      } catch {
        console.error("API JSON yerine hata döndü:", text);
        document.getElementById("results").innerHTML = `<p>API hata verdi: ${text}</p>`;
      }
    })
    .catch(error => {
      console.error("Hata:", error);
      document.getElementById("results").innerHTML = "<p>Bir hata oluştu, lütfen tekrar deneyin.</p>";
    });
  });
});
