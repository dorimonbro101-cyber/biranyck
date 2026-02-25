// 🔥 তোমার Firebase কনফিগারেশন (ঠিক করে দেওয়া হলো)
const firebaseConfig = {
    apiKey: "AIzaSyDi6pgeAajbpe8bx5vLuuCXsTLrP04Skkw",
    authDomain: "birainyck.firebaseapp.com",
    databaseURL: "https://birainyck-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "birainyck",
    storageBucket: "birainyck.firebasestorage.app",
    messagingSenderId: "13633631180",
    appId: "1:13633631180:web:0f4b97ea25453a8eb06369"
};

// Firebase শুরু করো
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const mosqueRef = database.ref('biriyaniData');

// কার্ড দেখানোর ফাংশন
function displayMosques(data) {
    const list = document.getElementById('mosqueList');
    if (!list) return;
    
    list.innerHTML = '';
    
    if (!data) {
        list.innerHTML = '<p style="color: white; text-align: center;">🍽️ কোনো তথ্য নেই। নতুন তথ্য যোগ করুন।</p>';
        return;
    }
    
    // ডাটা অ্যারেতে রূপান্তর
    const mosqueArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
    }));
    
    // সাজাই (সবশেষে যোগ করা প্রথমে দেখাতে)
    mosqueArray.sort((a, b) => b.timestamp - a.timestamp);
    
    mosqueArray.forEach(mosque => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${mosque.name || 'নাম নেই'}</h3>
            <div class="area">📍 ${mosque.area || 'এলাকা নেই'}</div>
            <div class="food">🍛 ${mosque.food || 'তথ্য নেই'}</div>
            <div class="time">⏰ ${mosque.time || 'সময় নেই'}</div>
            <a href="${mosque.location || 'https://maps.google.com'}" target="_blank" class="location-btn">🗺️ গুগল ম্যাপ</a>
        `;
        list.appendChild(card);
    });
}

// Firebase থেকে রিয়েল-টাইম ডাটা পড়া
mosqueRef.on('value', (snapshot) => {
    const data = snapshot.val();
    displayMosques(data);
}, (error) => {
    console.error("ডাটা লোড করতে সমস্যা:", error);
    document.getElementById('mosqueList').innerHTML = '<p style="color: white; text-align: center;">❌ ডাটা লোড করতে সমস্যা হয়েছে</p>';
});

// মডাল খোলা/বন্ধ করার কোড
const modal = document.getElementById('myModal');
const addBtn = document.getElementById('addBtn');
const closeBtn = document.querySelector('.close');

if (addBtn) {
    addBtn.onclick = function() {
        modal.style.display = "block";
    }
}

if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ফর্ম সাবমিট (Firebase এ ডাটা লেখা)
const form = document.getElementById('mosqueForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // নতুন ডাটা তৈরি
        const newMosque = {
            name: document.getElementById('name').value,
            area: document.getElementById('area').value,
            food: document.getElementById('foodType').value,
            time: document.getElementById('time').value,
            location: document.getElementById('location').value || 'https://maps.google.com',
            timestamp: Date.now() // কখন যোগ করা হয়েছে
        };
        
        // Firebase এ ডাটা যোগ করো
        mosqueRef.push(newMosque)
            .then(() => {
                console.log("ডাটা সফলভাবে যোগ হয়েছে!");
                modal.style.display = "none";
                form.reset();
                alert('✅ তথ্য যোগ হয়েছে! সব ডিভাইসে দেখাবে।');
            })
            .catch((error) => {
                console.error("ডাটা যোগ করতে সমস্যা:", error);
                alert('❌ সমস্যা হয়েছে! আবার চেষ্টা করুন।');
            });
    });
}