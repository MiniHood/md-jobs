window.addEventListener('message', function(event) {
    // Example: Listen for messages from Lua scripts
    if (event.data && event.data.type === 'updateMessage') {
        document.getElementById('message').textContent = event.data.text;
    }
});

// Example: Hide UI with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        fetch('https://md-jobs/close', { method: 'POST' });
    }
});

const toggleJobRanks = document.getElementById('toggleJobRanks');
const jobRanksSection = document.getElementById('jobRanksSection');
const closeJobRanks = document.getElementById('closeJobRanks');
const gradesList = document.getElementById('gradesList');
const addGradeBtn = document.getElementById('addGradeBtn');

let grades = [];

toggleJobRanks.addEventListener('change', function() {
    jobRanksSection.style.display = this.checked ? 'block' : 'none';
});
closeJobRanks.addEventListener('click', function() {
    jobRanksSection.style.display = 'none';
    toggleJobRanks.checked = false;
});

addGradeBtn.addEventListener('click', function() {
    const level = document.getElementById('gradeLevel').value;
    const name = document.getElementById('gradeName').value;
    const payment = document.getElementById('gradePayment').value;
    const isBoss = document.getElementById('gradeIsBoss').value;

    if (level === "" || name === "" || payment === "") return;

    const grade = { level, name, payment, isBoss };
    grades.push(grade);
    renderGrades();
    document.getElementById('gradeLevel').value = "";
    document.getElementById('gradeName').value = "";
    document.getElementById('gradePayment').value = "";
    document.getElementById('gradeIsBoss').value = "false";
});

function renderGrades() {
    gradesList.innerHTML = "";
    grades.forEach((g, i) => {
        const div = document.createElement('div');
        div.className = 'grade-item';
        div.innerHTML = `<span>Level: ${g.level}</span><span>Name: ${g.name}</span><span>Payment: ${g.payment}</span><span>Is Boss: ${g.isBoss}</span><button class="remove-grade" data-index="${i}">Remove</button>`;
        gradesList.appendChild(div);
    });
    document.querySelectorAll('.remove-grade').forEach(btn => {
        btn.addEventListener('click', function() {
            grades.splice(this.dataset.index, 1);
            renderGrades();
        });
    });
}