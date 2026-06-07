// ডেমো হিসেবে কিছু ডেটা সংরক্ষণের অ্যারে
let farmData = [];

// ১০ জন মেম্বারের ছবি ও নাম জেনারেট করার ফাংশন
function loadMembers() {
    const container = document.getElementById('member-container');
    for (let i = 1; i <= 10; i++) {
        container.innerHTML += `
            <div class="member-card">
                <div class="img-placeholder"></div>
                <h4>Person ${i}</h4>
            </div>
        `;
    }
}

// আয়/খরচ সিলেক্ট করলে ফিল্ড চেঞ্জ হওয়ার ফাংশন
function toggleFields() {
    const entryType = document.getElementById('entry-type').value;
    const expenseCategory = document.getElementById('expense-category');
    
    if (entryType === 'expense') {
        expenseCategory.style.display = 'block';
    } else {
        expenseCategory.style.display = 'none';
    }
}

// বিস্তারিত খরচের টেবিল আপডেট করার ফাংশন 
function updateExpenseReport(data) {
    const expenseReportSection = document.getElementById('expense-report');
    const tableBody = document.getElementById('expense-table-body');
    tableBody.innerHTML = ''; 

    let hasExpense = false;

    data.forEach(item => {
        if (item.type === 'expense') {
            hasExpense = true;
            const row = `<tr>
                <td>${item.date}</td>
                <td>${item.project}</td>
                <td>${item.category}</td>
                <td>${item.details}</td>
                <td>${item.amount} ৳</td>
            </tr>`;
            tableBody.innerHTML += row;
        }
    });

    if (hasExpense) {
        expenseReportSection.style.display = 'block';
    } else {
        expenseReportSection.style.display = 'none';
    }
}

// বিস্তারিত আয়ের টেবিল আপডেট করার ফাংশন (নতুন যুক্ত করা হলো)
function updateIncomeReport(data) {
    const incomeReportSection = document.getElementById('income-report');
    const tableBody = document.getElementById('income-table-body');
    tableBody.innerHTML = ''; 

    let hasIncome = false;

    data.forEach(item => {
        if (item.type === 'income') {
            hasIncome = true;
            const row = `<tr>
                <td>${item.date}</td>
                <td>${item.project}</td>
                <td>${item.details}</td>
                <td>${item.amount} ৳</td>
            </tr>`;
            tableBody.innerHTML += row;
        }
    });

    if (hasIncome) {
        incomeReportSection.style.display = 'block';
    } else {
        incomeReportSection.style.display = 'none';
    }
}

// ডেটা সামারি আপডেট করার ফাংশন
function updateSummary(data) {
    let totalIncome = 0;
    let totalExpense = 0;

    data.forEach(item => {
        if (item.type === 'income') {
            totalIncome += item.amount;
        } else if (item.type === 'expense') {
            totalExpense += item.amount;
        }
    });

    const totalProfit = totalIncome - totalExpense;

    document.getElementById('total-income').innerText = totalIncome;
    document.getElementById('total-expense').innerText = totalExpense;
    document.getElementById('total-profit').innerText = totalProfit;

    // সামারির সাথে সাথে বিস্তারিত খরচের এবং আয়ের টেবিলও আপডেট হবে
    updateExpenseReport(data);
    updateIncomeReport(data);
}

// ফর্ম সাবমিট করার ইভেন্ট
document.getElementById('farm-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const date = document.getElementById('entry-date').value;
    const type = document.getElementById('entry-type').value;
    const project = document.getElementById('project-name').value;
    const details = document.getElementById('entry-details').value;
    const amount = parseFloat(document.getElementById('entry-amount').value);
    
    let category = 'N/A';
    if (type === 'expense') {
        category = document.getElementById('expense-type').value;
    }

    // নতুন ডেটা অ্যারেতে যুক্ত করা
    const newEntry = { date, type, project, category, details, amount };
    farmData.push(newEntry);

    alert('ডেটা সফলভাবে সেভ হয়েছে!');
    
    // সামারি আপডেট করা
    updateSummary(farmData);
    
    // ফর্ম রিসেট করা
    this.reset();
    toggleFields(); 
});

// তারিখ অনুযায়ী ফিল্টার ফাংশন
function filterData() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!startDate || !endDate) {
        alert('অনুগ্রহ করে শুরুর এবং শেষের তারিখ নির্বাচন করুন।');
        return;
    }

    const filteredData = farmData.filter(item => {
        return item.date >= startDate && item.date <= endDate;
    });

    updateSummary(filteredData);
}

// ফিল্টার রিসেট ফাংশন
function resetFilter() {
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
    updateSummary(farmData);
}

// পেজ লোড হলে মেম্বারদের লিস্ট তৈরি করা
window.onload = function() {
    loadMembers();
};