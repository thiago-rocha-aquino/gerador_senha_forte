import { words } from './words';

export function generatePassword(
  length: number = 12,
  includeUppercase: boolean = true,
  includeNumbers: boolean = true,
  includeSymbols: boolean = true
): string {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  let characterPool = lowercaseChars;
  if (includeUppercase) characterPool += uppercaseChars;
  if (includeNumbers) characterPool += numberChars;
  if (includeSymbols) characterPool += symbolChars;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  return password;
}

export function generateMemorablePassword(
  wordCount: number = 3,
  separator: string = '-',
  capitalize: boolean = false
): string {
  const selectedWords = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    let word = words[randomIndex];
    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    selectedWords.push(word);
  }
  return selectedWords.join(separator);
}
