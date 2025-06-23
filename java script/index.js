const form = document.getElementById('guestForm');
const guestList = document.getElementById('guestList');
const guestNameInput = document.getElementById('guestName');
const categoryInput = document.getElementById('category');
const filterCategory = document.getElementById('filterCategory');
let guests = [];
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = guestNameInput.value.trim();
  const category = categoryInput.value;
  if (!name) return;
  if (guests.length >= 10) {
    alert("Guest list is full (max 10)");
    return;
  }
  const guest = {
    id: Date.now(),
    name,
    category,
    rsvp: false,
    timestamp: new Date()
  };
  guests.push(guest);
  guestNameInput.value = "";
  renderGuestList();
});
filterCategory.addEventListener('change', renderGuestList);
function renderGuestList() {
  guestList.innerHTML = '';
  const selectedCategory = filterCategory.value;
  guests
    .filter(g => selectedCategory === "All" || g.category === selectedCategory)
    .forEach(guest => {
      const li = document.createElement('li');

      const nameSpan = document.createElement('span');
      nameSpan.textContent = `${guest.name} - ${guest.rsvp ? "Attending" : "Not Attending"}`;

      const tag = document.createElement('span');
      tag.textContent = guest.category;
      tag.className = `category ${guest.category}`;

      const timestamp = document.createElement('div');
      timestamp.className = 'timestamp';
      timestamp.textContent = `Added: ${guest.timestamp.toLocaleString()}`;

      const buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'buttons';

      const toggleBtn = document.createElement('button');
      toggleBtn.textContent = 'Toggle RSVP';
      toggleBtn.onclick = () => {
        guest.rsvp = !guest.rsvp;
        renderGuestList();
      };
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => {
        const newName = prompt("Update guest name:", guest.name);
        if (newName) {
          guest.name = newName;
          renderGuestList();
        }
      };
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';
      deleteBtn.onclick = () => {
        guests = guests.filter(g => g.id !== guest.id);
        renderGuestList();
      };
      buttonsDiv.append(toggleBtn, editBtn, deleteBtn);
      li.append(nameSpan, tag, timestamp, buttonsDiv);
      guestList.appendChild(li);
    });
}
