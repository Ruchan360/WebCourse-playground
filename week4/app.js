const statusElement = document.querySelector("#status");
const eventsList = document.querySelector("#events-list");
const searchInput = document.querySelector("#search-input");
const reloadButton = document.querySelector("#reload-button");
const emptyDemoButton = document.querySelector("#empty-demo");
const errorDemoButton = document.querySelector("#error-demo");

let allEvents = [];

// Dört durum: loading, success, empty ve error.
function showStatus(state, message) {
  statusElement.hidden = false;
  statusElement.className = `status ${state}`;
  statusElement.textContent = message;
}

function clearStatus() {
  statusElement.hidden = true;
  statusElement.textContent = "";
  statusElement.className = "status";
}

function renderEvents(events) {
  eventsList.replaceChildren();

  events.forEach((event) => {
    const article = document.createElement("article");
    article.className = "event-card";

    const top = document.createElement("div");
    top.className = "event-top";

    const category = document.createElement("span");
    category.className = "event-category";
    category.textContent = event.category;

    const date = document.createElement("span");
    date.className = "event-date";
    date.textContent = event.date;

    top.append(category, date);

    const title = document.createElement("h3");
    title.textContent = event.title;

    const description = document.createElement("p");
    description.className = "event-description";
    description.textContent = event.description;

    const location = document.createElement("p");
    location.className = "event-location";
    location.textContent = `📍 ${event.location}`;

    article.append(top, title, description, location);
    eventsList.append(article);
  });
}

function showEmpty() {
  eventsList.replaceChildren();
  showStatus("empty", "Şu anda gösterilecek etkinlik bulunamadı.");
}

function showError(message = "Veriler yüklenemedi. Lütfen tekrar deneyin.") {
  eventsList.replaceChildren();
  showStatus("error", message);
}

async function loadEvents() {
  eventsList.replaceChildren();
  showStatus("loading", "Etkinlikler yükleniyor...");

  try {
    // data.json dosyasını Fetch API ile al.
    const response = await fetch("./data.json");

    // HTTP hatalarını yakala (ör. 404).
    if (!response.ok) {
      throw new Error(`Sunucu hatası: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("JSON verisi beklenen formatta değil.");
    }

    allEvents = data;

    if (allEvents.length === 0) {
      showEmpty();
      return;
    }

    clearStatus();
    renderEvents(allEvents);
    showStatus("success", `${allEvents.length} etkinlik başarıyla yüklendi.`);
  } catch (error) {
    console.error("Etkinlikler yüklenirken hata oluştu:", error);
    showError("Etkinlikler yüklenemedi. Sunucuyu ve data.json dosyasını kontrol edip tekrar deneyin.");
  }
}

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.trim().toLocaleLowerCase("tr-TR");
  const filteredEvents = allEvents.filter((event) =>
    `${event.title} ${event.category} ${event.location}`.toLocaleLowerCase("tr-TR").includes(searchText)
  );

  if (filteredEvents.length === 0) {
    showEmpty();
  } else {
    clearStatus();
    renderEvents(filteredEvents);
    showStatus("success", `${filteredEvents.length} etkinlik gösteriliyor.`);
  }
});

reloadButton.addEventListener("click", () => {
  searchInput.value = "";
  loadEvents();
});

// Bu iki buton, öğretmenin empty ve error durumlarını kolayca test edebilmesi içindir.
emptyDemoButton.addEventListener("click", showEmpty);
errorDemoButton.addEventListener("click", () => showError("Demo hata durumu: Örnek olarak hata mesajı gösteriliyor."));

loadEvents();
