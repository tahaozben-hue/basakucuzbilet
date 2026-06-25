document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("flightForm");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;

    const apiKey = "a0e2e74888ecf88dd0b2ebe748f38be83a0c78d1446faf2a1cac6106dbb41572";

    const url = `https://serpapi.com/search.json?engine=google_flights&departure_id=${from}&arrival_id=${to}&outbound_date=${date}&currency=TRY&api_key=${apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = document.getElementById("results");
        results.innerHTML = "<h3>Uçuş Sonuçları</h3>";

        if (data.flights && data.flights.length > 0) {
          data.flights.forEach(flight => {
            results.innerHTML += `
              <div class="flight">
                <p><strong>${flight.airline}</strong></p>
                <p>Kalkış: ${flight.departure_airport.name} (${flight.departure_airport.id})</p>
                <p>Varış: ${flight.arrival_airport.name} (${flight.arrival_airport.id})</p>
                <p>Tarih: ${flight.departure_date}</p>
                <p>Fiyat: ${flight.price}</p>
              </div>
            `;
          });
        } else {
          results.innerHTML += "<p>Uçuş bulunamadı.</p>";
        }
      })
      .catch(err => {
        console.error("Hata:", err);
        document.getElementById("results").innerHTML = "<p>Bir hata oluştu.</p>";
      });
  });
});
