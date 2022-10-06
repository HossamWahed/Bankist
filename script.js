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

// function
/////////////////////////////////////
const displaysummary = function(acc) {
     const incomes =acc.movements.filter(mov => mov > 0 )
        .reduce((acc ,mov) => acc + mov ,0 )
        labelSumIn.textContent =`${incomes} $`

    const outcomes =acc.movements.filter(mov => mov < 0 )
      .reduce((acc ,mov) => acc + mov ,0 )
      labelSumOut.textContent =`${Math.abs (outcomes)} $`
  
    const interest =acc.movements.filter(mov => mov > 0 )
      .map(deposite => deposite *acc.interestRate/100)
      .filter(mov=> mov >= 1)
      .reduce((acc ,mov) => acc + mov ,0 )
      labelSumInterest.textContent =`${ (interest)} $`
  }
  
  const displayMovements = function(movements ,sort = false){
    containerMovements.innerHTML = '';

    const movs = sort? movements.slice().sort((a,b) => a- b) : movements ;
   
     movs.forEach(function(value , i){
       const type = value > 0 ? 'deposit' : 'withdrawal'
       const html = `
         <div class="movements__row">
             <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
             <div class="movements__value">${value}€</div>
         </div>
     `
     containerMovements.insertAdjacentHTML('afterbegin' , html)
    })
   }
 
   const  createdisplaybalnce =function(acc){
    acc.balance = acc.movements.reduce((add,cur) => add + cur, 0)
    labelBalance.textContent = `${acc.balance} EUR`
  };


const createusername = function(accs){
  accs.forEach(function(acc){
    acc.username =acc.owner.toLowerCase()
      .split(' ').map(name => name[0])
      .join('')
  })
}
createusername(accounts);

const updateui =function (acc) {
  displaysummary(acc);
  displayMovements(acc.movements)
  createdisplaybalnce(acc)

  }


///////////////////////////////////////
// Event handlers
let currentAccount ;
currentAccount=account1
updateui(currentAccount)
containerApp.style.opacity = 100 ; 

btnLogin.addEventListener('click' , function(e){
  e.preventDefault()

 currentAccount = accounts.find(acc => acc.username === inputLoginUsername
  .value )

  if (currentAccount?.pin === Number(inputLoginPin.value)){
    labelWelcome.textContent=`welcom back, ${currentAccount.owner.split(' ')[0]}`
  };

  containerApp.style.opacity = 100 ; 

  inputLoginUsername.value = inputLoginPin.value ='';
  inputLoginPin.blur()
  
 updateui(currentAccount)
})

btnTransfer.addEventListener('click', function(e){
  e.preventDefault()

  const amount = Number(inputTransferAmount.value) ;
  const recviceacc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value ='';

  if ( amount > 0 && recviceacc &&
      currentAccount.balance >= amount &&
      recviceacc?.username !== currentAccount.username) {

        currentAccount.movements.push(-amount)
        recviceacc.movements.push(amount)
        updateui(currentAccount)

      }

})

btnClose.addEventListener('click' , function(e){
  e.preventDefault();

    if (inputCloseUsername.value === currentAccount.username &&
      Number(inputClosePin.value) === currentAccount.pin){

        const index = accounts.findIndex(
          acc => acc.username === currentAccount.username
        );

           // Delete account
        accounts.splice(index ,1)

        // Hide UI
        containerApp.style.opacity = 0 ; 

      }

      inputCloseUsername.value = inputClosePin.value ='';

})

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value )

  if(amount >0 && currentAccount.movements .some (
     mov => mov >= amount *.1  )){

      currentAccount.movements.push(amount)

      updateui(currentAccount)
     }
     inputLoanAmount.value = ''
     
  })

  let sorted = false ;
  btnSort.addEventListener('click', function(e){
    e.preventDefault()
   displayMovements(currentAccount.movements , !sorted )
    sorted = !sorted
    
  })


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];
// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);


// SPLICE
console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
console.log(arr.splice(1, 2))
console.log(arr);

// // REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));
// at methid
const arr = [23 , 50 , 64 ]
console.log(arr[0]);
console.log(arr.at(0));

console.log(arr[arr.length -1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('hossam'.at(0));

// for each
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]
for (const [i , value] of movements.entries()){
  if (value > 0 ){
    console.log(`movment${i+1} : you deposited ${value} $`);
  }else{
    console.log(`movment${i+1} : you withdraw${Math.abs (value)} $`);
  }
}

console.log('-------for each---------');
movements.forEach(function(value,i ,arr){
  if (value > 0 ){
    console.log(`movment${i+1} : you deposited ${value} $`);
  }else{
    console.log(`movment${i+1} : you withdraw${Math.abs (value)} $`);
  }
})

const currentAccount = new Map([
  ['usd' ,'united states dollers'],
  ['eur' ,'euro'],
  ['Gbp' ,'pound sterling']
]);
currentAccount.forEach(function(value , key , map){
  console.log(`${key} : ${value}`);
})

const currencies =new Set (['usd' ,'eur' , 'usd','eur'])
currencies.forEach(function(value ,key ,map){
  console.log(`${key} : ${value}`);
})

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};
const containerMovements = document.querySelector('.movements');


// ----------------------#ch1--------------------

const checkdogs = function(dogsJulia,dogsKate) {

  const Juliacorrect = dogsJulia.slice()
  Juliacorrect.splice(0,1)
  Juliacorrect.splice(-2)
  // Juliacorrect.splice(1 , 3)
console.log(Juliacorrect);
  const dogs = Juliacorrect.concat(dogsKate)
  dogs.forEach(function(age , i ){
    if (age => 3 ){
      console.log( `Dog number ${i+1} is an adult, and is ${age} years old`);
    }else {
      console.log( `Dog number ${i + 1} is still a puppy 🐶`);
    }
  })
}
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
 checkdogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

 // ------------------------------------------------------


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd =1.1

const movementsUSD = movements.map(function(mov) {
  return mov * eurToUsd
})
console.log(movementsUSD);
const movementsUSDfor =[]
for (const m of movements){ 
  movementsUSDfor .push (m * eurToUsd)
}
console.log(movementsUSDfor);

// const movementsUSD = movements.map ( mov => mov * eurToUsd ) 
// console.log(movementsUSD);

 const movementsDescriptions = movements.map((value,i ) =>{
  
    return `movment${i+1} : you ${value > 0 ? 'deposite' : 'withdraw'} ${Math.abs (value)} $`
 
})
console.log(movementsDescriptions);
 


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

  const withdraw = movements.filter(mov => mov < 0)
  console.log(withdraw);

  // const add = movements.reduce(function(add , mov ,i  ){
  //   console.log(` movment ${i} : ${add}`);
  //   return add + mov
  // }, 0)
  // console.log(add);
 

 let add2 = 0 
      for (const mov of movements) add2+=mov;
 
  


const maxvalue = movements.reduce(function(max ,cur ) {
if ( cur > max) return cur 
else return max 
} ,movements[0] )
 console.log(maxvalue);

// --------------------#ch2 ---------------

const calcAverageHumanAge = function(ages ) {
const humanAge = ages.map(age => age <= 2 ? age * 2 :age * 4 +16)
const adulat = humanAge.filter(agedual => agedual >=18)
const adulatavg = adulat.reduce((acc ,c )=> acc +c ,0)

console.log(humanAge);
console.log(adulat);
  return adulatavg / adulat.length
}
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]))


// --------------------#ch3 ---------------

const calcAverageHumanAge = ages => 
   ages
     .map(age => (age <= 2 ? 2 *age :16 + age * 4))
     .filter((age => age >= 18))
     .reduce((acc ,age, i ,arr )=>acc + age / arr.length,0)

  console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]))

   // -----------------------------------
  
   const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

 const fristwithdraw = movements.find(mov => mov < 0 ) // return the frist value == condition 
 console.log(fristwithdraw); 
console.log(accounts.find(acc=> acc.owner==='Jessica Davis'));

// The find Method
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);


///////////////////////////////////////
// some and every
console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// flat 
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc,mov) => acc + mov ,0)
  console.log(overalBalance);

  // flatMap
const overalBalance2 = accounts
.flatMap(acc => acc.movements)
.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Asecending
// movements.sort ((a,b) => {
//   if (a > b) return 1
//   if (a < b) return -1
//   })
//   console.log(movements);
  movements.sort((a,b) => a- b)
  console.log(movements);

// Desecending
// movements.sort ((a,b) => {
//   if (a > b) return -1
//   if (a < b) return 1
//   })
movements.sort((a,b) => a- b)
  console.log(movements);

///////////////////////////////////////////////////////
// More Ways of Creating and Filling Arrays
  const arr = [1,2,3,4,5,6,7]
  const x=new Array(1,2,3,4,5,6,7);
  console.log(x);

// Emprty arrays + fill method
  x.fill(1)
  console.log(x);

  x.fill(2 , 1,5)
  console.log(x);

  // Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const a = Array.from({ length: 100}, () => Math.trunc(Math.random() *100) +1);
console.log(a);

labelBalance.addEventListener('click' , function (){
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number (el.textContent.replace('€' ,''))
  )
    console.log(movementsUI);
    const movementsUI2 = [...document.querySelectorAll('.movements__value')].map( el => Number (el.textContent.replace('€' ,'')));
    console.log(movementsUI2);
})

///////////////////////////////////////
//  Array Methods Practice

// 1. 
const bankdepositesum = accounts
.flatMap(acc => acc.movements)
.filter(mov => mov > 0)
.reduce((acc,mov)=> acc + mov ,0)

console.log(bankdepositesum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// Prefixed ++ oeprator
let a = 10;
console.log(++a);
console.log(a);

// 3. 
// const sums = accounts
const {deposite ,withdrawal} = accounts
  .flatMap(acc => acc.movements)
  .reduce((sums,cur) => {
    // cur > 0 ? sums.deposite += cur :  sums.withdrawal += cur
    sums [cur >0 ? 'deposite' :'withdrawal'] +=cur ;
    return sums 
    },
      {deposite:0 , withdrawal:0}) ;

console.log(deposite ,withdrawal);

// 4. 
const convertTitleCase = function (title) {

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const capitzalize =str => str[0].toUpperCase() + str.slice(1)

  const titleCase = title
    .toLowerCase().split(' ') 
    .map(word => exceptions.includes(word)? word : 
    capitzalize (word) )   
    .join(' ')
                      
                      
  return capitzalize(titleCase)
        
}  

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

///////////////////////////////////////
// Coding Challenge #4 
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
]
// 1. 
dogs.forEach(dog => dog.recFood = dog.weight ** 0.75 * 28 )
console.log(dogs);

// 2. 
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah') )
  console.log(dogSarah);
  console.log( `Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood? 
    'much' :'little'}`);

// 3. 
  const ownersEatTooMuch = dogs
    .filter(dog => dog.curFood > dog.recFood)
    .flatMap(dog => dog.owners )

  console.log(ownersEatTooMuch);

  const ownersEatTooLittle = dogs
    .filter(dog => dog.curFood < dog.recFood)
    .flatMap(dog => dog.owners )

  console.log(ownersEatTooLittle);

  // 4. 
     console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!  ` );
     console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!  ` );
     
  // 5. 
  console.log(dogs.some(dog => dog.curFood === dog.recFood));

  // 6. 
    const checkokey = dog=> dog.curFood >= (dog.recFood * .9) && dog.curFood <= (dog.recFood *1.1 ) 
      console.log(dogs.some(checkokey));

  // 7. 
      const dogseatokay = dogs
        .filter(checkokey)
      console.log(dogseatokay);

  // 8. 
    const shallow = dogs.slice()
      .sort((a,b) => a.recFood-b.recFood)
    console.log(shallow);
   */

    
 
