export const ONE_CAPITAL_LETTER = /[A-Z]+/;

export const FIRST_CAPITAL_LETTER = /^[A-ZА-Я]+.*$/;

export const ONLY_LETTERS_AND_DASH = /^[A-ZА-Яa-zа-я-]+$/;

export const ONLY_LATIN_LETTERS = /^[A-Za-z0-9]+$/;

export const ONE_DIGIT = /[0-9]+/;

export const ALL_DIGITS = /\D+/;

export const ONE_SPACE_SYMBOL = /^\S*$/;

export const NO_SPACE_SYMBOL = /\s+/;

export const SPECIAL_CHARACTERS = /[^\d\sА-Яа-яёЁ]+/;

export const EMAIL_CHARACTERS = /^\S+@\S+\.([A-Za-z]{2,4})$/;

export const NO_DIGITS = /[a-zA-Z]/;

export const NUMBER_OF_DIGITS = /(\d+)/;

export const PHONE_SYMBOLS =
  /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;
