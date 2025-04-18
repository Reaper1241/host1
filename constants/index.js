/* Api URL для фетчей */

export const apiNew = "https://api.host-auto.ru/api/site/";

export const apiForm = " https://car-application.ru/api/send/new/auto_manage";
/* Api URL для фетчей */


/* Маска для телефона */
const firstNumber = { pattern: /[7-7]/ };
const secondNumber = { pattern: /[9-9]/ };
export const options = {
    mask: "+7 (S##) ###-##-##",
    ager: true,
    tokens: {
        F: firstNumber,
        S: secondNumber
    },
};
/* Маска для телефона */

/* Маска для имени */
const letter = { pattern: /[а-яА-Я\s]|[a-zA-Z\s]|[\-]|[\.]|[0-9]/ };
export const name = {
    mask: "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL", // Длина поля Имя 50 символов
    ager: true,
    tokens: {
        L: letter,
    },
};
/* Маска для имени */

export const errors = {
    phone: "Заполните номер телефона",
}


export function dataSale() {
    let date = new Date(),
      targetDay = 1,
      targetDate = new Date(),
      delta = targetDay - date.getDay();
    if (delta > 0) {
      targetDate.setDate(date.getDate() + delta);
    } else {
      targetDate.setDate(date.getDate() + 7 + delta);
    }
    let targetNumber = targetDate.getDate();
    let targetMonth = targetDate.getMonth();
    let targetYear = targetDate.getFullYear();
    switch (targetMonth) {
      case 0:
        targetMonth = "января";
        break;
      case 1:
        targetMonth = "февраля";
        break;
      case 2:
        targetMonth = "марта";
        break;
      case 3:
        targetMonth = "апреля";
        break;
      case 4:
        targetMonth = "мая";
        break;
      case 5:
        targetMonth = "июня";
        break;
      case 6:
        targetMonth = "июля";
        break;
      case 7:
        targetMonth = "августа";
        break;
      case 8:
        targetMonth = "сентября";
        break;
      case 9:
        targetMonth = "октября";
        break;
      case 10:
        targetMonth = "ноября";
        break;
      case 11:
        targetMonth = "декабря";
        break;
    }
    return targetNumber + " " + targetMonth + " " + targetYear;
  }

  const number = { pattern: /[0-9]/ };
  export const numberMask = {
      mask: "0000", // Длина поля Номер 4 символа
      ager: true,
      eager: true,
      tokens: {
          0: number,
      },
  };

export const birthDateMask = {
  mask: "00.00.0000",
  eager: true,
  tokens: {
    0: number,
  },
};
  

export const blackList = ['7963609','79653905','79654160','79653904']
