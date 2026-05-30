# Project04
Ulepszona wersja [Project03](../Project03/README.md), Pozwalająca założyć konta użytkowników.

Strona tworzy również konto administratora, które potrafi edytować i usuwać dane innych użytkowników.

Przy pierwszym uruchomieniu strony tworzone jest konto administratora jak i (jeśli ich nie ma) bazy danych [users.db](./users.db) do przechowywania informacji o użytkowniakch i [card.db](./cards.db), która posiada informacja o dodanych kartach przez użytkowników.

Strona wyszukuje karty poprzez korzystanie z [YGOPRODeck API](https://ygoprodeck.com/api-guide/).

Karty można wyszukać na stronie [YGOPRODeck](https://ygoprodeck.com).

## Uruchamianie
Po pobraniu projektu, aby uruchomić stronę, należy użyć komendy ```npm run start``` w terminalu.

## Dodatkowe funkcje
Strona posiada dodatkowe funkcje, których można użyć po utworzeniu konta użytkownika (konto admina sie nie liczy):

```bash
npm run populate 
```
Wypełnia bazę danych [card.db](./cards.db) losowymi kartami do losowych użytkowników.

```bash
npm run clear cards
```
Usuwa wszystkie karty z bazy danych [card.db](./cards.db).

```bash
npm run clear users
```
Usuwa wszystkich użytkowników (poza administratorem) z bazy danych [users.db](./users.db).

```bash
npm run clear all
```
Usuwa wszystkie karty jak i użytkowników (z administratorem).