# PZAW_PROJECTS
public repo for projects during PZAW lessons
# Jak korzystać z plików
Project 01:

Project 02:Program obsługuje 3 kombinacje (scieżka + metoda)
1. GET /
2. GET /nazwa obiektu(jesli nazwa ma spacje nalezy dodać znak "_")
3. POST /new(który służy do dodania nowych obiektów)
Po włączeniu programu użytkownik zaczyna na 1 obslugiwanej kombinacji.
Może użyć linku bądź wpisac w adres URL nazwe obiektu aby skorzystać z 2
Wypełnić formularz dodania nowego obiektu aby skorzystać z 3

Project 03:Program posiada 2 główne funkcje: wyszukiwarke kart Yu-Gi-Oh(korzystającą z API - poprawne nazwy kart mozna znaleźć na stronie 
https://www.yugiohmeta.com) oraz baze danych, która przechowuje posiadane karty oraz ich ilość. Dostępne są również zakomentowane funkcje ze strony doświadczenia deweloperskiego na wypełnienie bazy dancyh testowymi danymi bądź usunięcie wszsytkich danych.Aby projekt działał poprawnie, należy uruchomić go w środowisku nodejs i npm oraz zainstalować pakiety przy uzyciu komendy npm install w folderze Project03. Gdy jesteśmy gotowi uruchomić program należy użyć komendy node index.js w tym samym folderze. 

Project 04:
Rozwinięcie projektu 3. aby program działał poprawnie należy mieć pobrane cookie-parser, ejs, express, node, sqlite oraz argon2
kroki uruchomienia:
1. Po pobraniu wszystkich wymaganych plików należy wpisać w terminalu komende node index.js, jeśli ono nie istnieje, zostanie utworzone konto administratora (hasło oraz login zostaną pokazane tylko przy pierwszym uruchomieniu w terminalu. przy pierwszym uruchomienu również powstaną bazy danych users.db oraz cards.db)
2. do korzystania ze wszystkich funkcji należy utworzyć konto. jak zostało utworzone inne konto poza kontem admina, mozna tymczasowo wyłączyć strone przy pomocy CTRL+C i użyć komendy npm run populate aby wypełnić bazę danych kart losowymi kartami albo npm run clear cards, aby usunąć karty, npm clear users.aby usunąć użytkowników(poza adminem) lub lub npm clear all aby usunąć oba. po czym nastepnie włączyć stronę przy użyciu npm run start
