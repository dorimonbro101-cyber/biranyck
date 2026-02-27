// শুরুতে ডাটা লোড করি
function loadData() {
    const saved = localStorage.getItem('biriyaniData');
    if (saved) {
        return JSON.parse(saved);
    } else {
        // প্রথমবার কিছু ডাটা দিয়ে শুরু করি
        return [
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
    }
}

// আমাদের ডাটা
let mosqueData = loadData();

// কার্ড দেখানোর ফাংশন
function displayMosques() {
    console.log('ডিসপ্লে করা হচ্ছে:', mosqueData); // ডিবাগ করার জন্য
    
    const list = document.getElementById('mosqueList');
    if (!list) return;
    
    list.innerHTML = '';
    
    if (mosqueData.length === 0) {
        list.innerHTML = '<p style="color: white; text-align: center;">কোনো তথ্য নেই। নতুন তথ্য যোগ করুন।</p>';
        return;
    }
    
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

// ফর্ম সাবমিট
const form = document.getElementById('mosqueForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newMosque = {
            id: Date.now(), // ইউনিক আইডি
            name: document.getElementById('name').value,
            area: document.getElementById('area').value,
            food: document.getElementById('foodType').value,
            time: document.getElementById('time').value,
            location: document.getElementById('location').value || 'https://maps.google.com'
        };
        
        // ডাটা যোগ করি
        mosqueData.push(newMosque);
        
        // localStorage-এ সেভ করি
        localStorage.setItem('biriyaniData', JSON.stringify(mosqueData));
        
        // এই ট্যাবে আপডেট করি
        displayMosques();
        
        // মডাল বন্ধ করি
        modal.style.display = "none";
        form.reset();
        
        alert('✅ তথ্য যোগ হয়েছে!');
    });
}

// স্টোরেজ ইভেন্ট লিসেন (অন্য ট্যাবের জন্য)
window.addEventListener('storage', function(e) {
    if (e.key === 'biriyaniData') {
        // অন্য ট্যাব থেকে আপডেট এলে
        mosqueData = JSON.parse(e.newValue) || [];
        displayMosques();
    }
});

// প্রথমবার লোড
displayMosques();