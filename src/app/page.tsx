"use client";

import { useState, useEffect } from "react";
import {
  generatePassword,
  generateMemorablePassword,
} from "@/lib/passwordGenerator";
import { validatePassword } from "@/lib/passwordValidator";

export default function Home() {
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("random"); // 'random' or 'memorable'

  // Random password states
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // Memorable password states
  const [wordCount, setWordCount] = useState(3);
  const [separator, setSeparator] = useState("-");
  const [capitalize, setCapitalize] = useState(false);

  const [strength, setStrength] = useState(false);

  const handleGeneratePassword = () => {
    let newPassword;
    if (passwordType === "random") {
      newPassword = generatePassword(
        length,
        includeUppercase,
        includeNumbers,
        includeSymbols
      );
    } else {
      newPassword = generateMemorablePassword(
        wordCount,
        separator,
        capitalize
      );
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    setStrength(validatePassword(password));
  }, [password]);

  useEffect(() => {
    handleGeneratePassword();
  }, [passwordType, length, includeUppercase, includeNumbers, includeSymbols, wordCount, separator, capitalize]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Gerador de Senha
        </h1>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setPasswordType("random")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              passwordType === "random"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
            }`}
          >
            Aleatória
          </button>
          <button
            onClick={() => setPasswordType("memorable")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              passwordType === "memorable"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
            }`}
          >
            Memorável
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full px-4 py-2 text-gray-900 bg-gray-200 border-2 border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Copiar
          </button>
        </div>

        {passwordType === "random" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="length" className="text-gray-700 dark:text-gray-300">
                Comprimento: {length}
              </label>
              <input
                id="length"
                type="range"
                min="4"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-1/2"
              />
            </div>

            <div className="flex items-center">
              <input
                id="uppercase"
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="uppercase"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Incluir Maiúsculas
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="numbers"
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="numbers"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Incluir Números
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="symbols"
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="symbols"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Incluir Símbolos
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="wordCount"
                className="text-gray-700 dark:text-gray-300"
              >
                Número de palavras: {wordCount}
              </label>
              <input
                id="wordCount"
                type="range"
                min="2"
                max="8"
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-1/2"
              />
            </div>

            <div className="flex items-center justify-between">
              <label
                htmlFor="separator"
                className="text-gray-700 dark:text-gray-300"
              >
                Separador
              </label>
              <input
                id="separator"
                type="text"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-1/4 px-2 py-1 text-gray-900 bg-gray-200 border-2 border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
              />
            </div>

            <div className="flex items-center">
              <input
                id="capitalize"
                type="checkbox"
                checked={capitalize}
                onChange={() => setCapitalize(!capitalize)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="capitalize"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Capitalizar Palavras
              </label>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Força:</span>
          <span
            className={`px-2 py-1 text-sm font-semibold rounded-md ${
              strength ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {strength ? "Forte" : "Fraca"}
          </span>
        </div>

        <button
          onClick={handleGeneratePassword}
          className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Gerar Nova Senha
        </button>
      </div>
    </div>
  );
}
