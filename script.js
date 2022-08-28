"use strict";

// Simply Bank App

const account1 = {
  userName: "Cecil Ireland",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-10-09T07:43:59.331Z",
    "2021-10-11T15:21:20.814Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  userName: "Amani Salt",
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "UAH",
  locale: "uk-UA",
};

const account3 = {
  userName: "Corey Martinez",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "RUB",
  locale: "ru-RU",
};

const account4 = {
  userName: "Kamile Searle",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  // currency: 'CAD',
  currency: "EUR",
  locale: "fr-CA",
};

const account5 = {
  userName: "Oliver Avila",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".total__value--in");
const labelSumOut = document.querySelector(".total__value--out");
const labelSumInterest = document.querySelector(".total__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseNickname = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatTransactionDate = function (date, locale) {
  const getDaysBetween2Dates = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = getDaysBetween2Dates(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Сегодня";
  if (daysPassed === 1) return "Вчера";
  if (daysPassed <= 5) return `${daysPassed} дня назад`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = "";

  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? "deposit" : "withdrawal";

    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransactionDate(date, account.locale);

    const formattedTrans = formatCurrency(
      trans,
      account.locale,
      account.currency
    );

    const transactionRow = `
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transType}">
        ${index + 1} ${transType}
      </div>
      <div class="transactions__date">${transDate}</div>
      <div class="transactions__value">${formattedTrans}</div>
    </div>
    `;
    containerTransactions.insertAdjacentHTML("afterbegin", transactionRow); //самая свежая транзакция отобр вверху
  });
};

// console.log(containerTransactions.innerHTML);

//создаем логин для каждого из 5ти аккаунтов. пример: const username = 'Oliver Avila'; nickname = 'oa'
const createNicknames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

createNicknames(accounts);
// console.log(accounts);

const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;

  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};

const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter((trans) => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = formatCurrency(
    depositesTotal,
    account.locale,
    account.currency
  );

  const withdrawalsTotal = account.transactions
    .filter((trans) => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = formatCurrency(
    withdrawalsTotal,
    account.locale,
    account.currency
  );

  //за каждый депозит банк нам начисляет  процент

  const interestTotal = account.transactions
    .filter((trans) => trans > 0)
    .map((depos) => (depos * account.interest) / 100)
    .filter((interest, index, arr) => {
      // console.log(arr);
      return interest >= 5;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
};

const updateUi = function (account) {
  // Display transactions
  displayTransactions(account);

  // Display balance
  displayBalance(account);

  // Display total
  displayTotal(account);
};

let currentAccount, currentLogOutTimer;

// чтобы быть залогининным с определ аккаунта и не заходить снова
// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 100;

const startLogoutTimer = function () {
  const logOutTimerCallback = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    // В каждом вызове показывать оставшееся время в UI
    labelTimer.textContent = `${minutes}:${seconds}`;

    // После истечения времени остановить таймер и выйти из приложения
    if (time === 0) {
      clearInterval(logOutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = "Войдите в свой аккаунт";
    }

    time--;
  };

  // Установить время выхода через 5 минут
  let time = 300;

  // Вызов таймера каждую секунду
  logOutTimerCallback();
  const logOutTimer = setInterval(logOutTimerCallback, 1000);

  return logOutTimer;
};

// Event Handlers

//отображаем транзакции и приветствие когда введеные пинкод и логин при входе совпадают с данными фейкового пользователя
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (account) => account.nickname === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Рады, что вы снова с нами, ${
      currentAccount.userName.split(" ")[0]
    }!`;

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // labelDate.textContent = `${day}/${month}/${year}`;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear inputs
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    // Check if the timer exists
    if (currentLogOutTimer) clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();

    updateUi(currentAccount);
  }
});
//денежный перевод
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    (account) => account.nickname === recipientNickname
  );
  inputTransferTo.value = "";
  inputTransferAmount.value = "";
  //при переводе денег баланс того кто переводит должен быть больше или равен сумме перевода. а так же сумма перевода долна быть >0
  //мы так же не можем переводить деньги со своего счета на свой
  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount &&
    currentAccount.nickname !== recipientAccount.nickname
  ) {
    // Add transaction
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);

    // Add transaction date
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());

    updateUi(currentAccount);

    // Reset the timer
    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
  }
});
//хотим закрыть счет - удалить аккаунт из массива accounts. чтобы удалить опред аккаунт из массива нужно знать его индекс для этого испол метод findIndex()
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  //можем закрыть счет только тогда когда вводим тот логин и пароль под которыми зашли в наше приложение
  //то есть если залогинины под ником oa то метод ищет первый аккаут с таким ником и возвр его индекс
  if (
    inputCloseNickname.value === currentAccount.nickname &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex(
      (account) => account.nickname === currentAccount.nickname
    );

    accounts.splice(currentAccountIndex, 1);

    containerApp.style.opacity = 0; //удаляем аккаунт из базы и интерфейс исчезает
    labelWelcome.textContent = "Войдите в свой аккаунт";
  }

  inputCloseNickname.value = ""; // когда вышли из одного аккау и зашли в другой то инпут в закрытии счета был чистым
  inputClosePin.value = "";
});

//запросить займ
//любая транзация должна быть больше или равна 10% от суммы которую запрашивает у банка (если просим 50000 то хотя бы один депозит в аккаунте должен быть не менее 5000)
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value); //округлили то есть если запрашиваем сумму с копейками или центами то сумма округл

  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(
      (trans) => trans >= (loanAmount * 10) / 100
    )
  ) {
    setTimeout(function () {
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUi(currentAccount);
    }, 5000);
  }
  inputLoanAmount.value = "";

  // Reset the timer
  clearInterval(currentLogOutTimer);
  currentLogOutTimer = startLogoutTimer();
});

let transactionsSorted = false;

//сортируем транзакции по значению по нажатии на кнопку сортировать (вверху самая крупная транзация)

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted; // таким образом меняем при кликанье состояния : отсортировано по значению и неотсортировано
});
