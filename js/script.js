
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
    
    let ENTRY_LIST=[];
    let Balance=0,Income=0,Expenses=0;
    const Delete="delete" ,Edit="edit";

        AddIncome.addEventListener('click',function(){
        if(!IncomeTxt.value|| !IncomeAmt.value) return;

    let income={
        type:"Income",
        title:IncomeTxt.value,
        amount:parseFloat(IncomeAmt.value),
    };
        ENTRY_LIST.push(income);       
        updateUI();
        ClearInput([IncomeTxt,IncomeAmt]);
    });   
    
    AddExpense.addEventListener('click',function(){

        if(!ExpenseTxt.value || !ExpenseAmt.value)return;

         let expense={
             type:"Expense",
             title:ExpenseTxt.value,
             amount:parseFloat(ExpenseAmt.value),
            };

         ENTRY_LIST.push(expense);
         updateUI();
         ClearInput([ExpenseTxt,ExpenseAmt]);      
        
    });

    function ClearInput(inputsArray){
         inputsArray.forEach(Input=>{Input.value=""});
    }
    
    
    function calculateTotal(type, ENTRY_LIST){
        let sum = 0;
        ENTRY_LIST.forEach(entry=>{
            if(entry.type==type){
                sum=entry.amount
            }    
            return sum; 
        });
    }

    function calculateTotalBalance(profit,loss){
        return Income-Expenses ;
        
         
    }
      
   function showEntry(list,type,title,amount,id){
       const  entry = `<li id="${id}" class="${type}">
                        <div class="entry">${title}$${amount}</div>
                        <div class="edit"></div>
                        <div class="delete"></div>
                        </li>`;
        list.insertAdjacentHTML("afterbegin",entry); 
   }
        
   function updateUI(){

    Income=calculateTotal('Income',ENTRY_LIST);
    Expenses=calculateTotal('Expense',ENTRY_LIST);   
    Balance=Math.abs(calculateTotalBalance(Income-Expenses));
   
    //let sign = (profit>loss)?"$":"-$";

    BalanceEl.innerHTML=`<small>$</small>${Balance}`;
    Income_TotalEl.innerHTML=`<small>$</small>${Income}`;
    Expenses_TotalEl.innerHTML=`<small>$</small>${Expenses}`;
    
    ClearInput([Income-List,ExpenseList,AllList]);

    ENTRY_LIST.forEach((entry,index)=>{
    if(entry.type=='Income'){
        showEntry(IncomeList,entry.type,entry.title,entry.amount,index);
    }else(entry.type=='Expense');{
        showEntry(ExpenseList,entry.type,entry.title,entry.amount,index);
    }  
        showEntry(AllList,entry.type,entry.title,entry.amount,index);

     });
     //updateChart(income,expense);
    }
    