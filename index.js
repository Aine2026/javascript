const readline = require("readline");

// Create an interface for receiving user input in Node.js
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Shop and customer information
const shopName = "SMART SHOP";
const customerName = "Alex";
const receiptDate = new Date().toLocaleDateString();

// Shopping items (array of objects)
const items = [
    { name: "Rice", quantity: 2, unitPrice: 3000 },
    { name: "Sugar", quantity: 1, unitPrice: 2500 },
    { name: "Cooking Oil", quantity: 2, unitPrice: 5000 }
];

// Discount and VAT rates
const discountRate = 0.10; // 10% discount
const vatRate = 0.18;      // 18% VAT

// Calculate the total for each item and the subtotal
let subtotal = 0;

items.forEach(function(item) {
    item.total = item.quantity * item.unitPrice;
    subtotal += item.total;
});

// Calculate discount, VAT, and final amount
let discountAmount = subtotal * discountRate;
let taxableAmount = subtotal - discountAmount;
let vatAmount = taxableAmount * vatRate;
let finalAmount = taxableAmount + vatAmount;

// Display the receipt
console.log("\n==============================================");
console.log("               " + shopName);
console.log("==============================================");
console.log("Customer: " + customerName);
console.log("Date: " + receiptDate);
console.log("----------------------------------------------");
console.log("Item          Qty    Price      Total");
console.log("----------------------------------------------");

items.forEach(function(item) {
    console.log(
        item.name.padEnd(14) +
        String(item.quantity).padEnd(7) +
        item.unitPrice.toFixed(2).padEnd(11) +
        item.total.toFixed(2)
    );
});

console.log("----------------------------------------------");
console.log("Subtotal:           " + subtotal.toFixed(2));
console.log("Discount (10%):    -" + discountAmount.toFixed(2));
console.log("Taxable amount:     " + taxableAmount.toFixed(2));
console.log("VAT (18%):          " + vatAmount.toFixed(2));
console.log("----------------------------------------------");
console.log("FINAL AMOUNT:       " + finalAmount.toFixed(2));
console.log("==============================================");

// Ask for customer payment
rl.question("Enter amount paid: ", function(input) {

    // Convert input string into a number
    let amountPaid = Number(input);

    // Validate the payment
    if (input.trim() === "" || !Number.isFinite(amountPaid)
        || amountPaid < 0) {
        console.log("Error: Please enter a valid payment amount.");
    } else if (amountPaid < finalAmount) {
        console.log("Insufficient payment.");
        console.log(
            "Amount still needed: " +
            (finalAmount - amountPaid).toFixed(2)
        );
    } else {
        // Calculate customer change
        let change = amountPaid - finalAmount;

        console.log("Amount paid:       " + amountPaid.toFixed(2));
        console.log("Customer change:   " + change.toFixed(2));
        console.log("==============================================");
        console.log("Thank you for shopping with us!");
        console.log("Please come again.");
    }

    rl.close();
});
