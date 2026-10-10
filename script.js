const list = document.getElementById("starred");
const status = document.getElementById("status");

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to fetch events: ${response.status}`);
    }

    return response.json();
  })
  .then((events) => {
    if (!Array.isArray(events)) {
      throw new Error("Events data must be an array");
    }

    events.forEach((event) => {
      if (
        !event ||
        typeof event.name !== "string" ||
        typeof event.starred !== "string"
      ) {
        throw new Error("Events data contains an invalid entry");
      }

      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
    });

    status.textContent = "";
  })
  .catch((error) => {
    console.error(error);
    status.textContent = "Unable to load starred repositories.";
  });
