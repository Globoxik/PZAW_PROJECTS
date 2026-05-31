# Project04
Ulepszona wersja [Project03](../Project03/README.md), Pozwalająca założyć konta użytkowników.

Strona tworzy również konto administratora, które potrafi edytować i usuwać dane innych użytkowników.

Przy pierwszym uruchomieniu strony tworzone jest konto administratora (login i hasło są podane przy pierwszym uruchomieniu w terminalu) jak i baza danych do przechowywania informacji o użytkowniakch i dodanych przez nich kartach.

Strona wyszukuje karty poprzez korzystanie z [YGOPRODeck API](https://ygoprodeck.com/api-guide/).

Karty można wyszukać na stronie [YGOPRODeck](https://ygoprodeck.com).

## Uruchamianie
Po pobraniu projektu, aby uruchomić stronę,(jeśli sie tego nie zrobiło w terminalu calego repozytorium) należy użyć komendy ``` npm install ``` aby pobrać wszystkie potrzebne zależności do projektu. Następnie należy przejść do folderu z projektem i użyć komendy ```npm run start``` w terminalu.

## Dodatkowe funkcje
Strona posiada dodatkowe funkcje, których można użyć po utworzeniu konta użytkownika (konto admina sie nie liczy):

```bash
npm run populate 
```
Wypełnia tabele cards losowymi kartami dla losowych użytkowników.

```bash
npm run clear cards
```
Usuwa wszystkie karty z tabeli cards.

```bash
npm run clear users
```
Usuwa wszystkich użytkowników (poza administratorem) z tabeli fc_users.

```bash
npm run clear all
```
Usuwa wszystkie karty jak i użytkowników z bazy danych (administratora również).