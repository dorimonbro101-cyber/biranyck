// 🔥 তোমার Firebase কনফিগারেশন (এটা তুমি দিবে)
const firebaseConfig = {
    apiKey: "AIzaSyDi6pgeAajbpe8bx5vLuuCXsTLrP04Skkw",
    authDomain: "birainyck.firebaseapp.com",
    databaseURL: "https://birainyck-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "birainyck",
    storageBucket: "birainyck.firebasestorage.app",
    messagingSenderId: "13633631180",
    appId: "1:13633631180:web:0f4b97ea25453a8eb06369"
};

// Firebase চালু করো
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const mosqueRef = database.ref('biriyaniData');

// কার্ড দেখানোর ফাংশন
function displayMosques(data) {
    const list = document.getElementById('mosqueList');
    list.innerHTML = '';
    
    if (!data) {
        list.innerHTML = '<p style="color: white; text-align: center;">কোনো তথ্য নেই। নতুন তথ্য যোগ করুন।</p>';
        return;
    }
    
    const mosqueArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
    }));
    
    mosqueArray.forEach(mosque => {
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

// Firebase থেকে ডাটা পড়া
mosqueRef.on('value', (snapshot) => {
    const data = snapshot.val();
    displayMosques(data);
});

// মডাল খোলা/বন্ধ
const modal = document.getElementById('myModal');
const addBtn = document.getElementById('addBtn');
const closeBtn = document.querySelector('.close');

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
const form = document.getElementById('mosqueForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newMosque = {
        name: document.getElementById('name').value,
        area: document.getElementById('area').value,
        food: document.getElementById('foodType').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value || 'https://maps.google.com'
    };
    
    mosqueRef.push(newMosque)
        .then(() => {
            modal.style.display = "none";
            form.reset();
            alert('✅ তথ্য যোগ হয়েছে!');
        })
        .catch(() => {
            alert('❌ সমস্যা হয়েছে!');
        });
});