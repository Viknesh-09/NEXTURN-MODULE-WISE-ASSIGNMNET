document.addEventListener('DOMContentLoaded', loadExpenses);
document.getElementById('expense-form').addEventListener('submit', addExpense);

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => displayExpense(expense));
    updateSummary();
    drawChart();
}

function addExpense(e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const expense = { amount, description, category };
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    displayExpense(expense);
    updateSummary();
    drawChart();
}

function displayExpense(expense) {
    const expenseList = document.getElementById('expense-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${expense.amount}</td>
        <td>${expense.description}</td>
        <td>${expense.category}</td>
        <td><button class="btn btn-danger btn-sm delete">Delete</button></td>
    `;
    expenseList.appendChild(row);

    row.querySelector('.delete').addEventListener('click', function() {
        deleteExpense(expense);
        expenseList.removeChild(row);
        updateSummary();
        drawChart();
    });
}

function deleteExpense(expenseToDelete) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense !== expenseToDelete);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function updateSummary() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const summary = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) acc[expense.category] = 0;
        acc[expense.category] += parseFloat(expense.amount);
        return acc;
    }, {});

    const summaryList = document.getElementById('expense-summary');
    summaryList.innerHTML = '';
    for (let category in summary) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `${category}: $${summary[category].toFixed(2)}`;
        summaryList.appendChild(listItem);
    }
}

function drawChart() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const summary = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) acc[expense.category] = 0;
        acc[expense.category] += parseFloat(expense.amount);
        return acc;
    }, {});

    const ctx = document.getElementById('expense-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(summary),
            datasets: [{
                data: Object.values(summary),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
