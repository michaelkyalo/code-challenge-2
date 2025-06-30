document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guest-form");
  const nameInput = document.getElementById("guest-name");
  const categoryInput = document.getElementById("category");
  const guestList = document.getElementById("guest-list");
  const MAX_GUESTS = 10;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const category = categoryInput.value;

    if (!name) return;

    if (guestList.children.length >= MAX_GUESTS) {
      alert("Guest limit reached (10 max)");
      return;
    }

    const li = document.createElement("li");
    li.classList.add(category.toLowerCase());

    const nameSpan = document.createElement("span");
    nameSpan.textContent = `${name} (${category}) — Added at ${new Date().toLocaleTimeString()}`;

    const rsvpBtn = document.createElement("button");
    rsvpBtn.textContent = "Not Attending";
    rsvpBtn.addEventListener("click", () => {
      rsvpBtn.textContent = rsvpBtn.textContent === "Attending" ? "Not Attending" : "Attending";
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      const newName = prompt("Enter new name:", name);
      if (newName) {
        nameSpan.textContent = `${newName} (${category}) — Edited at ${new Date().toLocaleTimeString()}`;
      }
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => li.remove());

    li.append(nameSpan, rsvpBtn, editBtn, removeBtn);
    guestList.appendChild(li);

    nameInput.value = "";
  });
});
