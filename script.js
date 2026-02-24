// ডাটা লোড করি
let mosqueData = JSON.parse(localStorage.getItem('mosqueData')) || [
    {
        id: 1,
        name: "বায়তুল মোকাররম জাতীয় মসজিদ",
        area: "পল্টন, ঢাকা",
        food: "বিরিয়ানি",
        time: "৬:৪৫ টা",
        location: "https://maps.google.com/?q=Baitul+Mokarram"
    },
    {
        id: 2,
        name: "চকবাজার শাহী মসজিদ",
        area: "চকবাজার, ঢাকা",
        food: "তেহারি",
        time: "৬:৩০ টা",
        location: "https://maps.google.com/?q=Chawkbazar+Shahi+Mosque"
    }
];

// কার্ড দেখাই
function displayMosques() {
    const list = document.getElementById('mosqueList');
    list.innerHTML = '';
    
    mosqueData.forEach(mosque => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${mosque.name}</h3>
            <div class="area">📍 ${mosque.area}</div>
            <div class="food">🍛 ${mosque.food}</div>
            <div class="time">⏰ ${mosque.time}</div>
            <a href="${mosque.location}" target="_blank" class="location-btn">🗺️ গুগল ম্যাপ</a>
        `;
        list.appendChild(card);
    });
}

// পপআপ খোলা
const modal = document.getElementById('myModal');
const addBtn = document.getElementById('addBtn');
const closeBtn = document.getElementsByClassName('close')[0];

addBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ফর্ম সাবমিট
document.getElementById('mosqueForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newMosque = {
        id: mosqueData.length + 1,
        name: document.getElementById('name').value,
        area: document.getElementById('area').value,
        food: document.getElementById('foodType').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value || 'https://maps.google.com'
    };
    
    mosqueData.push(newMosque);
    localStorage.setItem('mosqueData', JSON.stringify(mosqueData));
    displayMosques();
    modal.style.display = "none";
    this.reset();
    alert('তথ্য যোগ হয়েছে!');
});

// প্রথমবার দেখাই
displayMosques();