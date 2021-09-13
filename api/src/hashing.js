import CryptoJS from "crypto-js";

const encodeImgName = (name) => {
    let ciphertext = CryptoJS.AES.encrypt(name, 'jebacpis').toString(); // szyfrowanie nazwy przy pomocy algorytmu AES z biblioteki crypto-js
    ciphertext = encodeURIComponent(ciphertext); // zamiana niedozwolonych znakow na hexy
    return ciphertext;
  }

  const decodeImgName = (ciphertext) => {
    ciphertext = decodeURIComponent(ciphertext) // zamiana wcześniej zmienionych hexów na "niedozwolone znaki"
    let bytes  = CryptoJS.AES.decrypt(ciphertext, 'jebacpis'); // rozszyfrowanie nazwy przy pomocy algorytmu AES z biblioteki crypto-js
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

  export { encodeImgName, decodeImgName }