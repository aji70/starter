'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movement, sort = false){
  containerMovements.innerHTML = '';
  const movs = sort ? movement.slice().sort((a, b) => a - b) : movement
  movs.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  
}

const createUser = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(name =>name[0]).join('');
  })
}

createUser(accounts)



const calcPrintBalance = function(bal){
  bal.balance = bal.movements.reduce( (acc, c) => acc + c)
  labelBalance.textContent = `${bal.balance}EUR`
}
const update = function(ca){
  calcPrintBalance(ca)
  displayMovements(ca.movements)
  displayIncomeSummary(ca) 
}

// labelBalance.innerHTML = 
const displayIncomeSummary = function(income){
  const bal = income.movements.filter(bal => bal > 0).reduce((acc, c) => acc + c);
  
  labelSumIn.textContent = `${bal}EUR`

  const bal1 = income.movements.filter(bal => bal < 0).reduce((acc, c) => acc + c);
  
  labelSumOut.textContent = `${Math.abs(bal1)}EUR`

  const intrest = income.movements.filter(bal => bal > 0).map(val => val * income.interestRate/100).filter(ba => ba >= 1 ).reduce((acc, c) => acc + c);
  
  labelSumInterest.textContent = `${intrest}EUR`

  

}




let currentAccount;
btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100; 
    update(currentAccount);
    inputLoginPin.value = inputLoginUsername.value = ''
    inputLoginPin.blur();
  }else{
    console.log('Incorrect pin')
  }

  
})

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(acc => acc.username === (inputTransferTo.value));

  if(amount > 0 && receiver && currentAccount.balance >= amount && receiver?.username !== currentAccount.username){
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);
    update(currentAccount);
    

  }
  inputTransferAmount.value = inputTransferTo.value = '';
})

btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value)
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    currentAccount.movements.push(amount);
    inputLoanAmount.value = '';
    update(currentAccount);
  }
})
const overAllBalance = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0)
console.log(overAllBalance)

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex( acc => (acc.username === currentAccount.username))
    accounts.splice(index, 1);
    containerApp.style.opacity = 0
  }
  inputClosePin.value = inputCloseUsername.value = '';
})
let sorted = false
btnSort.addEventListener('click', function(e){
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
    sorted = !sorted
  
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES





/////////////////////////////////////////////////
// const arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));
// console.log(arr);
// console.log(arr.splice(-1));
// console.log(arr);


// const julietDogs = [3, 5, 2, 12, 7];
// const julietDogs1 = [9, 16, 6, 8, 3];
// const kateDogs = [4, 1, 15, 8, 3];
// const kateDogs1 = [10, 5, 6, 1, 4];

// const checkDogs = function(jdogs, kdogs){
//  const juletdogs = jdogs;
//   const update = juletdogs.slice(1, -2);
//   const juletdogss = update.concat(kdogs);
  
//   juletdogss.forEach(function(dogs, i){
//   const age = dogs < 3 ? 'puppy' : 'adult';
//   if(age === "adult"){
//   console.log(`Dog number ${i + 1} is an ${age} and is ${dogs} years old`);  
// }
//   else {
//     console.log(`Dog number ${i + 1} is  ${dogs} years old and still a ${age}`);  
//   }
//   }
//   )
// }
// checkDogs(julietDogs, kateDogs);
// console.log('===TEST RESULT 2===');
// checkDogs(julietDogs1, kateDogs1);


// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());

// const letters = arr.concat(arr2);
// const leti = letters.join('-');
// console.log(leti.split('-'))

// const arr = [23, 11, 64]

// console.log(arr.at(-1))

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements.entries()){
//   if(movement < 0){
//     console.log(`${i + 1}: you withdrew $${Math.abs(movement)}`)
//   }
//   else{
//     console.log(`${i + 1}: You deposited $${movement}`)
//   }
// }

// console.log('===FOREACH====');
// movements.forEach(function(movement, i, arr){
//   if(movement < 0){
//     console.log(`${i + 1}: you withdrew $${Math.abs(movement)}`)
//   }
//   else{
//     console.log(`${i + 1}: You deposited $${movement}`)
//   }
// })

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(value, key, map){
//   console.log(`${key}: ${value}`)
// })



// const euroToUSD = 1.1;

// const movementUSD = movements.map(mov =>  mov * euroToUSD)
// // console.log(movements);
// // console.log(movementUSD);

// const displayMOvements =movements.map((movement, i) => `${i + 1}: you ${movement < 0? 'withdrew' : 'deposited'} $${Math.abs(movement)}`)


// console.log(movements)
// const deposit = movements.filter(move => move > 0)
// console.log(deposit)
// const withdrawal = movements.filter(move => move < 0)
// console.log(withdrawal)

// const sum = movements.reduce((acc, c) => acc + c, 0)

// console.log(sum)
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov){
//      return acc} 
//      else {return mov}
//     })
// console.log(max)

// const agess = [5, 2, 4, 1, 15, 8, 3];
// const ages1 = [16, 6, 10, 5, 6, 1, 4];


// const calculateAverageAge = function(ages){const humanAge = ages.map(function(curr){
//   if(curr <= 2){
//     const humanage = curr * 2   
//     return humanage 
//   }
//   else{
//    const humanage = 16 + curr * 4
   
//     return humanage
//   }
// })
// const x = function(c){
//   if(c > 18) return c;
// }
// const updated = humanAge.filter(x);
// console.log(updated)

// const sum  = updated.reduce(function(acc, c){
//   return (acc + c);
// }, 0)
// const average = sum / updated.length;

// return average;
// }
// console.log(calculateAverageAge(agess))
// console.log(calculateAverageAge(ages1))

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const totalDepositInUSd = movements.filter(mov => mov > 0).map(mov => mov * 1.1).reduce((acc,c) => acc + c)
//   console.log(totalDepositInUSd);
//   const sortedMovements = movements.sort((a, b) => a - b)

//   console.log(sortedMovements)
// const z = Array.from({length: 7}, (_, i) => i + 1);
// console.log(z);