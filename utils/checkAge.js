export function checkAge(dateString) {
    const parts = dateString.split(".");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    const ageDifMs = currentDate - birthDate;
    const ageDate = new Date(ageDifMs); // миллисекунды от 1970/01/01
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    return age < 18;
  }