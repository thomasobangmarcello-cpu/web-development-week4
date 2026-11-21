// =====================================
// 1. SPENDWISE DASHBOARD
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("SpendWise Dashboard is running!");

    // Initial financial information
    let monthlyIncome = 120000;

    let expenses = [
        { name: "Food Shopping", category: "Food", amount: 8000 },
        { name: "Transport", category: "Transport", amount: 4500 },
        { name: "House Rent", category: "Rent", amount: 15000 },
        { name: "Entertainment", category: "Entertainment", amount: 2500 },
        { name: "Savings", category: "Savings", amount: 3000 },
        { name: "Utilities", category: "Utilities", amount: 2000 }
    ];

    // =====================================
    // 2. SELECT HTML ELEMENTS
    // =====================================

    const totalBalanceElement =
        document.getElementById("totalBalance");

    const monthlyIncomeElement =
        document.getElementById("monthlyIncome");

    const totalExpensesElement =
        document.getElementById("totalExpenses");

    const transactionList =
        document.getElementById("transactionList");

    const expenseForm =
        document.getElementById("expenseForm");

    const formMessage =
        document.getElementById("formMessage");


    // =====================================
    // 3. FORMAT KENYAN CURRENCY
    // =====================================

    function formatCurrency(amount) {
        return "KSh " + amount.toLocaleString("en-KE");
    }


    // =====================================
    // 4. CALCULATE TOTAL EXPENSES
    // =====================================

    function calculateExpenses() {

        return expenses.reduce(function (total, expense) {
            return total + expense.amount;
        }, 0);

    }


    // =====================================
    // 5. UPDATE FINANCIAL SUMMARY
    // =====================================

    function updateDashboard() {

        const totalExpenses = calculateExpenses();

        const balance = monthlyIncome - totalExpenses;

        totalBalanceElement.textContent =
            formatCurrency(balance);

        monthlyIncomeElement.textContent =
            formatCurrency(monthlyIncome);

        totalExpensesElement.textContent =
            formatCurrency(totalExpenses);

    }


    // =====================================
    // 6. DISPLAY TRANSACTIONS
    // =====================================

    function displayTransactions() {

        transactionList.innerHTML = "";

        expenses.slice().reverse().forEach(function (expense) {

            const transaction = document.createElement("div");

            transaction.className = "transaction";

            const info = document.createElement("div");
            info.className = "transaction-info";

            const icon = document.createElement("span");
            icon.textContent = getCategoryIcon(expense.category);

            const details = document.createElement("div");

            const name = document.createElement("strong");
            name.textContent = expense.name;

            const date = document.createElement("small");
            date.textContent = "Recently added";

            details.appendChild(name);
            details.appendChild(date);

            info.appendChild(icon);
            info.appendChild(details);

            const amount = document.createElement("strong");
            amount.className = "expense";
            amount.textContent = "- " + formatCurrency(expense.amount);

            transaction.appendChild(info);
            transaction.appendChild(amount);

            transactionList.appendChild(transaction);

        });

    }


    // =====================================
    // 7. CATEGORY ICONS
    // =====================================

    function getCategoryIcon(category) {

        const icons = {
            Food: "🍔",
            Transport: "🚗",
            Rent: "🏠",
            Entertainment: "🎬",
            Savings: "💰",
            Utilities: "💡"
        };

        return icons[category] || "💳";

    }


    // =====================================
    // 8. ADD NEW EXPENSE
    // =====================================

    expenseForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const expenseName =
            document.getElementById("expenseName").value.trim();

        const expenseAmount =
            Number(document.getElementById("expenseAmount").value);

        const expenseCategory =
            document.getElementById("expenseCategory").value;

        if (!expenseName || !expenseCategory ||
            !Number.isFinite(expenseAmount) || expenseAmount <= 0) {

            formMessage.textContent =
                "Please enter valid expense details.";

            return;
        }

        if (expenseAmount > monthlyIncome) {

            formMessage.textContent =
                "The expense cannot exceed your monthly income.";

            return;
        }

        if (calculateExpenses() + expenseAmount > monthlyIncome) {

            formMessage.textContent =
                "This expense exceeds your remaining balance.";

            return;
        }

        // Save the new expense
        expenses.push({
            name: expenseName,
            category: expenseCategory,
            amount: expenseAmount
        });

        // Refresh dashboard information
        updateDashboard();
        displayTransactions();

        formMessage.textContent =
            "Expense added successfully!";

        // Clear form
        expenseForm.reset();

    });


    // =====================================
    // 9. DARK MODE TOGGLE
    // =====================================

    const themeToggle =
        document.getElementById("themeToggle");

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const darkMode =
            document.body.classList.contains("dark-mode");

        themeToggle.textContent = darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";

    });


    // =====================================
    // 10. CATEGORY CARD INTERACTION
    // =====================================

    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {

        card.addEventListener("click", function () {

            const category =
                card.querySelector(".category-label").textContent;

            const matchingExpenses = expenses.filter(function (expense) {
                return expense.category === category;
            });

            const total = matchingExpenses.reduce(function (sum, expense) {
                return sum + expense.amount;
            }, 0);

            alert(
                category + " total: " + formatCurrency(total)
            );

        });

    });


    // =====================================
    // 11. SIDEBAR NAVIGATION
    // =====================================

    const navigationLinks =
        document.querySelectorAll(".nav-link");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navigationLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });


    // =====================================
    // 12. DISPLAY CURRENT DATE
    // =====================================

    console.log(
        "Today's Date: " + new Date().toDateString()
    );


    // =====================================
    // 13. INITIALIZE DASHBOARD
    // =====================================

    updateDashboard();

    displayTransactions();

});
