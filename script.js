let bpEntries = [];

function addBPEntry() {
    console.log('Add BP Entry called');
    
    const systolic = document.getElementById('systolic').value;
    const diastolic = document.getElementById('diastolic').value;
    const heartRate = document.getElementById('heartRate').value;
    
    console.log('Values:', { systolic, diastolic, heartRate });
    
    if (!systolic || !diastolic || !heartRate) {
        alert('Please fill in all fields!');
        return;
    }
    
    const systolicNum = parseInt(systolic);
    const diastolicNum = parseInt(diastolic);
    const heartRateNum = parseInt(heartRate);
    
    if (systolicNum < 70 || systolicNum > 250 || diastolicNum < 40 || diastolicNum > 150 || heartRateNum < 40 || heartRateNum > 200) {
        alert('Please enter valid values within the normal range!');
        return;
    }
    
    const entry = {
        id: Date.now(),
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        systolic: systolicNum,
        diastolic: diastolicNum,
        heartRate: heartRateNum
    };
    
    console.log('Adding entry:', entry);
    
    bpEntries.push(entry);
    
    document.getElementById('systolic').value = '';
    document.getElementById('diastolic').value = '';
    document.getElementById('heartRate').value = '';
    
    renderEntries();
    saveToLocalStorage();
    
    console.log('Entry added, total entries:', bpEntries.length);
}

function deleteEntry(entryId) {
    bpEntries = bpEntries.filter(entry => entry.id !== entryId);
    renderEntries();
    saveToLocalStorage();
}

function renderEntries() {
    const entriesBody = document.getElementById('entriesBody');
    entriesBody.innerHTML = '';
    
    const sortedEntries = bpEntries.sort((a, b) => b.id - a.id);
    
    sortedEntries.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.systolic}</td>
            <td>${entry.diastolic}</td>
            <td>${entry.heartRate}</td>
            <td><button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete</button></td>
        `;
        entriesBody.appendChild(row);
    });
}

function saveToLocalStorage() {
    localStorage.setItem('bloprData', JSON.stringify({
        bpEntries: bpEntries
    }));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('bloprData');
    if (saved) {
        const data = JSON.parse(saved);
        bpEntries = data.bpEntries || [];
        renderEntries();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
});


console.log('Blopr Blood Pressure Tracker loaded successfully!');