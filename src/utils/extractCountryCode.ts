import { countryCodes } from '../components/UI/PhoneInput';

export function extractCountryCode(phoneNumber:string) {

  const cleanedPhoneNumber = phoneNumber.replace(/\s+/g, '').replace(/[^+\d]/g, '');


  const match = cleanedPhoneNumber.match(/^(\+\d{1,3})/); // Код страны с + и 1-3 цифрами



  if (match) {
    const code = match[0];


    const country = countryCodes.find(item => item.code === code);

    if (country) {

      const cleanedNumber = cleanedPhoneNumber.replace(new RegExp(`^${code}`), '').trim();


      return {
        countryCode: '+380',
        // countryCode: code,
        fullPhoneNumber: '994523233',
        // fullPhoneNumber: phoneNumber,
        cleanedNumber,
        icon: country.icon,
      };
    } else {
      console.error(`Код страны "${code}" не найден в массиве countryCodes.`);
    }
  } else {
    console.error('Не удалось найти код страны в номере телефона.');
  }

  // Если код не найден, вернуть null
  return null;
}
