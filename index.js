const guestInput = document.getElementById('guest');
const form = document.querySelector('form');
const displayer = document.getElementById('displayer');

let guests = JSON.parse(localStorage.getItem('guests')) || [];

renderGuest();

form.addEventListener('submit',(e) => {
    e.preventDefault()
  
    const guestText = guestInput.value.trim();

    if(guestText === ''){
    alert('Please enter a todo');
    return;
    }

    if(guests.length === 10){
        alert("Guests are above Maximum Requirement")
        return;
    }

    guests.push({
    id: Date.now(),
    guest: guestText,
    attending: false
    });

    localStorage.setItem('guests', JSON.stringify(guests));
    guestInput.value = '';
    renderGuest();


});

function editButton(id) {
    const guest = guests.find(guest => guest.id === id)

    if (!guest)return;
    const newGuestName = prompt("Enter new Guest Name;", guest.guest)
    if (newGuestName && newGuestName.trim() !== '') {
        guest.guest = newGuestName.trim()
        localStorage.setItem('guests', JSON.stringify(guests));
        renderGuest()
    }
}

function deleteGuest(id) {
guests = guests.filter(guest => guest.id !== id);
localStorage.setItem('guests', JSON.stringify(guests));
renderGuest();
}

function toggleRSVP(id) {
    const guest = guests.find(guest => guest.id === id);
    if (!guest) return;

    guest.attending = !guest.attending

    localStorage.setItem('guests', JSON.stringify(guests))
    renderGuest()
}

function renderGuest() {
displayer.innerHTML = '';

if(guests.length === 0) {
displayer.innerHTML = '<div class="empty-message">No guests yet. Add your first Guest!</div>';
return;
}

guests.forEach((guest) => {
const guestElement = document.createElement('div');
guestElement.className = 'guest-list';
guestElement.innerHTML = `
    <span id="guestName">${guest.guest}</span>
    <div class="buttons">
    <button class="toggle-rsvp-btn" data-id="${guest.id}">Status:${guest.attending ? 'attending' : 'not Attending'}</button>
    <button class="delete-btn" data-id="${guest.id}">Delete</button>
    <button class="edit-btn" id="edit-btn" data-id="${guest.id}">Edit</button>
    </div>
`;
displayer.appendChild(guestElement);

});

  document.querySelectorAll('.toggle-rsvp-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = Number(e.target.getAttribute('data-id'));
      toggleRSVP(id);
    });
  });
document.querySelectorAll('.edit-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
        const id = Number(e.target.getAttribute('data-id'))
        editButton(id);
    })
})

document.querySelectorAll('.delete-btn').forEach((button) => {
button.addEventListener('click', (e) => {
    const id = Number(e.target.getAttribute('data-id'));
    deleteGuest(id);
});
});
}