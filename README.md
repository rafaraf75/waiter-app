# Waiter App 🍕 – panel kelnera

Aplikacja React służąca do zarządzania stolikami w pizzerii.
Pozwala kelnerowi:

- zobaczyć listę wszystkich stolików i ich status,
- przejść na stronę szczegółów wybranego stolika,
- zmieniać status stolika,
- ustawiać liczbę gości oraz maksymalną liczbę miejsc,
- ustawiać kwotę rachunku (dla stolików w trakcie obsługi),
- synchronizować zmiany z serwerem API (JSON-server + Redux Thunk).

Projekt jest podsumowaniem modułów z Reacta, Reduxa i React Routera.

---

## 🧰 Technologie

- **React** (Create React App)
- **React Router v6**
- **Redux** + **React-Redux**
- **Redux Thunk**
- **React Bootstrap** + **Bootstrap**
- **JSON-server** – prosty backend / API
- **npm-run-all** – uruchamianie wielu skryptów równolegle

---

## 🗂 Struktura aplikacji

Główne elementy:

- `/` – lista wszystkich stolików
  Wyświetla:
  - `Table X`
  - `Status: ...`
  - przycisk **Show more** do przejścia na stronę szczegółów.

- `/table/:id` – szczegóły wybranego stolika
  Formularz pozwala na edycję:
  - **Status**: `Free`, `Reserved`, `Busy`, `Cleaning`
  - **People** – ilość osób aktualnie przy stoliku
  - **Max people amount** – maksymalna liczba miejsc
  - **Bill** – widoczny tylko gdy status = `Busy`

Dodatkowo:

- **Header** – nawigacja z logo `Waiter.app` i linkiem `Home`
- **Footer** – prosty copyright na dole strony

---

## 🧠 Logika biznesowa

Zgodnie z założeniami zadania:

1. Użytkownik może edytować: `status`, `peopleAmount`, `maxPeopleAmount`, `bill`.
2. Statusy: `Free`, `Reserved`, `Busy`, `Cleaning`.
3. Pole **Bill**:
   - widoczne tylko, gdy status = `Busy`,
   - startuje od `0`,
   - można je edytować.
4. Gdy status = `Free` lub `Cleaning`:
   - `peopleAmount` automatycznie resetuje się do `0`,
   - `bill` również resetuje się do `0`.
5. Walidacja osób:
   - `peopleAmount` i `maxPeopleAmount` są w przedziale `0–10`,
   - `peopleAmount` nie może być większe niż `maxPeopleAmount`,
   - jeśli użytkownik zmieni `maxPeopleAmount` na wartość < `peopleAmount`,
     to `peopleAmount` automatycznie zostaje obcięte do nowej wartości `maxPeopleAmount`.
6. Zmiana danych następuje **dopiero po kliknięciu** przycisku `Update`:
   - najpierw wysyłany jest request do API (PATCH),
   - po sukcesie aktualizowany jest stan w Reduxie.
7. Po udanym zapisie użytkownik jest przekierowywany na stronę główną (`/`).
8. Jeśli `id` stolika w adresie jest niepoprawne (brak takiego stolika):
   - następuje przekierowanie na `/`.

---

## 🌐 API i konfiguracja

Adres API jest konfigurowany w pliku:

```js
// src/config.js
export const API_URL =
  process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:3131/api';
```
w trybie development (yarn start) – aplikacja korzysta z http://localhost:3131/api,

w trybie production (yarn build + node server.mjs) – API_URL ma wartość /api
(frontend i backend działają na jednym serwerze).

Backend oparty jest na JSON-server i pliku z danymi:

```json
// public/db/app.json
{
  "tables": [
    {
      "id": "1",
      "status": "Free",
      "peopleAmount": 0,
      "maxPeopleAmount": 4,
      "bill": 0
    }
    // ...
  ]
}
```
🚀 Uruchamianie projektu
1. Instalacja zależności
```bash
yarn
```
(albo npm install, jeśli ktoś woli npm).

2. Tryb developerski (zalecany do pracy lokalnej)
Aplikacja React + JSON-server uruchamiane równolegle:

```bash
yarn start
```
React: http://localhost:3000

API (JSON-server): http://localhost:3131/api/tables

W tym trybie aplikacja korzysta z API_URL = http://localhost:3131/api.

3. Tryb produkcyjny (build + jeden serwer)
Najpierw zbuduj aplikację:

```bash
yarn build
```
Następnie uruchom serwer produkcyjny:

```bash
node server.mjs
```
Serwer:

serwuje build Reacta z folderu build,

udostępnia API na podstawie build/db/app.json pod adresem /api.

Domyślny port: 3131

aplikacja: http://localhost:3131/

API: http://localhost:3131/api/tables

🧪 Skrypty z package.json (najważniejsze)
yarn start – tryb dev (React + JSON-server równolegle)

yarn build – budowanie wersji produkcyjnej

node server.mjs – uruchomienie serwera produkcyjnego (build + API)

☁️ Publikacja
Projekt jest przygotowany tak, aby można go było:

uruchomić lokalnie w trybie production (node server.mjs),

łatwo przenieść na platformę typu Replit:

import repozytorium z GitHub,

ustawienie komendy startowej na node server.mjs,

backend (json-server) i frontend (React build) obsługiwane przez jeden serwer.
