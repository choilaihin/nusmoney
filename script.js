// (c) Anuflora Systems 
const balance = document.getElementById('balance');
// const money_plus = document.getElementById('deposit');
// const money_minus = document.getElementById('loan');
const list = document.getElementById('list');
const form = document.getElementById('form');
const custname = document.getElementById('custname');
const password = document.getElementById('password');
const reco = document.getElementById('reco');
const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');

const TransactionDataAll = [
   { id: 1, customername: 'Flora', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 2, customername: 'Flora', bank: 'OCBC', deposit: 4000, loan: 2000 },
   { id: 3, customername: 'Mikhil', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 4, customername: 'Sashil', bank: 'UOB', deposit: 6000, loan: 1000 },
   { id: 5, customername: 'Jack', bank: 'UOB', deposit: 6000, loan: 8000 },
   { id: 6, customername: 'Jill', bank: 'UOB', deposit: 7000, loan: 4000 }

  ];

 var TransactionData = null;

function addTransactionDOM(transaction) {
  const bank_balance_item = document.createElement('li');
  const bank_balance = transaction.deposit - transaction.loan;
  if(bank_balance>0)
  {
    bank_balance_item.classList.add('plus');
    bank_balance_item.innerHTML = `${transaction.customername}-${transaction.bank}  
    <span> $ ${Math.abs(bank_balance)}</span>`;
  }
  else if(bank_balance<0)
  {
    bank_balance_item.classList.add('minus');
    bank_balance_item.innerHTML = `${transaction.customername}-${transaction.bank}  
    <span> -$ ${Math.abs(bank_balance)}</span>`;
  }
  else
  {
    bank_balance_item.classList.add('zero');
    bank_balance_item.innerHTML = `${transaction.customername}-${transaction.bank}  
    <span> $ ${Math.abs(bank_balance)}</span>`;   
  }
  
  list.appendChild(bank_balance_item);
}

// Update the balance, deposit and loan
function updateValues() {
  const deposits = TransactionData.map(transaction => transaction.deposit);
  const loans = TransactionData.map(transaction => transaction.loan);
  const total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const bal = total_deposit - total_loan;
  balance.innerText = `$${bal}`;
  // money_plus.innerText = `$${total_deposit}`;
  // money_minus.innerText = `$${total_loan}`;
  reco.innerText = (bal >= 0)? "You Have Sound Financial Health": "Your Financial Health is Weak";

  d3.select("svg").remove();

  var svg = d3
    .select(".bar-chart")
    .append("svg")
    .attr("width", 350)
    .attr("height", 50);

  svg
    .append("rect")
    .attr("transform", function (d) {
      return "translate(" + 70 + "," +0+ ")";
    })
    .attr("fill", "blue")
    .attr("height", 20)
    .attr("width", total_deposit/100);

  svg
    .append("rect")
    .attr("transform", function (d) {
      return "translate(" + 70 + "," +25+ ")";
    })
    .attr("fill", "red")
    .attr("height", 20)
    .attr("width", total_loan/100);

  svg
    .append("text")
    .attr("transform", function (d) {
      return "translate(0," + Number(15) + ")";
    })
    .attr("fill", "blue")
    .text("DEPOSIT");   

  svg
    .append("text")
    .attr("transform", function (d) {
      return "translate("+Number(75+total_deposit/100)+"," + Number(15) + ")";
    })
    .attr("fill", "black")
    .text(`$${total_deposit}`);   

  svg
    .append("text")
    .attr("transform", function (d) {
      return "translate(22," + Number(40) + ")";
    })
    .attr("fill", "red")
    .text("LOAN");   

  svg
    .append("text")
    .attr("transform", function (d) {
      return "translate("+Number(75+total_loan/100)+"," + Number(40) + ")";
    })
    .attr("fill", "black")
    .text(`$${total_loan}`); 

}

// function init() {
//   list.innerHTML = '';
//   reco.innerHTML = '';
//   TransactionData = [...TransactionDataAll];
//   TransactionData.forEach(addTransactionDOM);
//   updateValues();
// }

function reset() {
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = [];
  TransactionData.forEach(addTransactionDOM);
  updateValues();
}

function filterTransaction(e) {
  e.preventDefault();  
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = TransactionDataAll.filter(tran => tran.customername.toLowerCase() == custname.value.toLowerCase());  
  TransactionData.forEach(addTransactionDOM);
  updateValues(); 
}

form.addEventListener('submit', filterTransaction);
b2.addEventListener('click',reset);