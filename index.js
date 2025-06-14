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

    guests.push({
    id: Date.now(),
    guest: guestText
    });

    localStorage.setItem('guests', JSON.stringify(guests));
    guestInput.value = '';
    renderGuest();


});

guestInput.addEventListener('keypress', function(e) {
if (e.key === 'Enter') {
addGuest();
}
});

function editButton(id) {
    const guest = guests.find(guest => guest.id === id)

    if (!guest)return;
    const newGuestName = prompt("Enter new Guest Name;", guest.guest)
    if (newGuestName && newGuestName.trim() !== '') {
        guest.guest = newGuestName
        localStorage.setItem('guests', JSON.stringify(guest))
        renderGuest()
    }
}

function deleteGuest(id) {
guests = guests.filter(guest => guest.id !== id);
localStorage.setItem('guests', JSON.stringify(guests));
renderGuest();
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
    <button class="delete-btn" data-id="${guest.id}">Delete</button>
    <button class="edit-btn" id="edit-btn">Edit</button>
    </div>
`;
displayer.appendChild(guestElement);

});

document.querySelectorAll('.edit-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
        const id = Number(e.target.getAttribute('data-id'))
        editGuest(id);
    })
})

document.querySelectorAll('.delete-btn').forEach((button) => {
button.addEventListener('click', (e) => {
    const id = Number(e.target.getAttribute('data-id'));
    deleteGuest(id);
});
});
}