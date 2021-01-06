(function() {
  'use strict';

  //Total Balance
  const BalanceEl= document.querySelector(".balance-value");
  //Balance Values
  const Income_TotalEl= document.querySelector(".income-value");
  const Expenses_TotalEl= document.querySelector(".expenses-value");
  //Tab Buttons
  const ExpenseBtn = document.querySelector(".Expense-Button");
  const IncomeBtn = document.querySelector(".Income-Button");
  const AllBtn = document.querySelector(".All-Button");
  //Chart Board
  const ChartBoard = document.querySelector('.Chart');
  //Elements in Ledger
  const ExpenseEl = document.querySelector('#Expenses');
  const IncomeEl = document.querySelector('#Income');
  const AllEl = document.querySelector('#All');
  //List of transactions
  const ExpenseList = document.querySelector('.Expense-List');
  const IncomeList = document.querySelector('.Income-List');
  const AllList = document.querySelector('.All-List');
  //Entery Commands
  const AddIncome = document.querySelector('.Income-Input');
  const IncomeAmt = document.querySelector('#Income-Value-Amount');
  const IncomeTxt = document.querySelector('#Income-Title-Input');

  const AddExpense = document.querySelector('.Expense-Input');
  const ExpenseAmt = document.querySelector('#Expense-Value-Amount');
  const ExpenseTxt = document.querySelector('#Expense-Title-Input');

  /*
  (Style Transition between each Toggle button)
  */
      //Activating and Deactivating Toggle Btns**

      //incomeBtn(**Transitions**)
      IncomeBtn.addEventListener('click',function(){

          active(IncomeBtn);
          inactive( [ExpenseBtn,AllBtn]);
          show(IncomeEl);
          hide( [ExpenseEl,AllEl] );

      });

      //ExpenseBtn(**Transitions**)
      ExpenseBtn.addEventListener('click',function(){

          active(ExpenseBtn);
          inactive( [IncomeBtn, AllBtn]);
          show(ExpenseEl);
          hide( [IncomeEl, AllEl] );

      });

      //AllBtn(**Transitions**)
          AllBtn.addEventListener('click',function(){

          active(AllBtn);
          inactive([ExpenseBtn,IncomeBtn]);
          show(IncomeEl);
          hide( [ExpenseEl ,IncomeEl]);


      });
       //Functions For:
      // Display option

          function active(element){
          element.classList.add('active');
          element.classList.remove('inactive');
          }

          function show(element){
          element.classList.remove('hide');
          }

          function hide(elements){
          elements.forEach(element => {
              element.classList.add('hide');
           });
          }

          function inactive(elements) {
          elements.forEach(element => {
              element.classList.remove('active');
              element.classList.add('inactive');
          });
          }

  //Adding New Entries

      //AddIncome

      const ENTRY_LIST={
        incomes: [],
        expenses: []
      };
      let Balance=0, Income=0, Expenses=0;
      const Delete="delete", Edit="edit";

      AddIncome.addEventListener('click', function(){
          if(!IncomeTxt.value|| !IncomeAmt.value) return;

      let income={
          id: 1,
          type:"Income",
          title:IncomeTxt.value,
          amount:parseFloat(IncomeAmt.value),
      };
          ENTRY_LIST.incomes.push(income);
          updateUI(ENTRY_LIST);
          ClearInput([IncomeTxt,IncomeAmt]);
      });

      AddExpense.addEventListener('click',function(){

          if(!ExpenseTxt.value || !ExpenseAmt.value) return;

           let expense={
               id: 1,
               type:"Expense",
               title:ExpenseTxt.value,
               amount:parseFloat(ExpenseAmt.value),
              };

           ENTRY_LIST.expenses.push(expense);
           updateUI(ENTRY_LIST);
           ClearInput([ExpenseTxt, ExpenseAmt]);
      });

      function ClearInput(inputsArray){
           inputsArray.forEach(Input=>{Input.value=""});
      }

     // NOTE: refactored the function to take two arguements
     //        the list to add the dom element to and
     //        the income/ expense object.
      function showEntry(list, element){
          const  entry = `<li id="${element.id}" class="${element.type}">
                           <div class="entry">${element.title}$${element.amount}</div>
                           <div class="edit"></div>
                           <div class="delete"></div>
                           </li>`;
           list.insertAdjacentHTML("afterbegin", entry);
      }

     // NOTE: refactored this function to work with the ENTRY_LIST object
     function updateUI(entryList){
        const { incomes, expenses } = entryList;

        let totalExpenses = expenses.reduce((acc, entry) => {
          return acc + entry.amount;
        }, 0);

        let totalIncomes = incomes.reduce((acc, entry) => {
          return acc + entry.amount
        }, 0);

        let balance = parseFloat(totalIncomes) - parseFloat(totalExpenses);

        BalanceEl.innerHTML=`<small>$</small>${balance}`;
        Income_TotalEl.innerHTML=`<small>$</small>${totalIncomes}`;
        Expenses_TotalEl.innerHTML=`<small>$</small>${totalExpenses}`;

        // NOTE: updating the table
        expenses.forEach(item => {
          showEntry(ExpenseList, item);
          showEntry(AllList, item)
        });
        incomes.forEach(item => {
          showEntry(IncomeList, item);
          showEntry(AllList, item);
        });

        return;
      }
}());
