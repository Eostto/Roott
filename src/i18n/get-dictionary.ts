import type { Locale } from "./config";
import ro from "./dictionaries/ro";
import ru from "./dictionaries/ru";

const dictionaries = { ro, ru };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type Dictionary = typeof ro;
