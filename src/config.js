// src/config.js

// jeśli build (= produkcja) -> API pod /api
// jeśli dev (yarn start) -> lokalny json-server
export const API_URL =
  process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:3131/api';