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

// কার্ড দেখানোর ফাংশন
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
    
    // ডাটা যোগ করি
    mosqueData.push(newMosque);
    
    // localStorage-এ সেভ করি
    localStorage.setItem('mosqueData', JSON.stringify(mosqueData));
    
    // ⭐ গুরুত্বপূর্ণ: নিজে নিজে আপডেট হওয়ার জন্য
    displayMosques(); // এই ট্যাবেই আপডেট হবে
    
    // অন্য ট্যাবগুলোর জন্য ইভেন্ট
    window.dispatchEvent(new Event('storage'));
    
    modal.style.display = "none";
    this.reset();
    alert('তথ্য যোগ হয়েছে!');
});

// অন্য ট্যাব থেকে আপডেট এলে
window.addEventListener('storage', function(e) {
    if (e.key === 'mosqueData') {
        // localStorage থেকে নতুন ডাটা লোড করি
        mosqueData = JSON.parse(localStorage.getItem('mosqueData')) || [];
        displayMosques(); // এই ট্যাবেও আপডেট হবে
    }
});

// প্রথমবার দেখাই
displayMosques();
