<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A guard shift assignment system built with NestJS – modular, scalable, and secure.</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

---

## Description

GuardPoint is a backend API for managing shifts and assignments for soldiers and commanders. It is built using NestJS and provides secure authentication, role-based access, and modular architecture. This project currently uses in-memory storage and is prepared for future integration with a real database.

---

## Features

- JWT-based authentication
- Role-based authorization (commander/soldier)
- Password hashing with bcrypt
- Modular services (users, shifts, assignments)
- Guard-based access restrictions
- Temporary data storage using local arrays
- DTO-based data transfer (class-validator planned)
- Prepared for PostgreSQL/MongoDB integration

---

## Folder Structure

```
guardpoint/
├── src/
│   ├── assignments/
│   │   ├── assignments.controller.ts
│   │   ├── assignments.module.ts
│   │   ├── assignments.service.ts
│   │   └── dto/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   └── guards/
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   ├── shifts/
│   │   ├── shifts.controller.ts
│   │   ├── shifts.module.ts
│   │   ├── shifts.service.ts
│   │   └── dto/
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the application:**
   ```bash
   npm run start:dev
   ```

3. **API is available at:** `http://localhost:3000`

---

## Usage

- Register and login as a soldier or commander.
- Commanders can create shifts and assign soldiers.
- Soldiers can view their assigned shifts.
- All endpoints are protected by JWT authentication and role-based guards.

---

## Planned Improvements

- Integrate with PostgreSQL or MongoDB for persistent storage.
- Add validation with `class-validator`.
- Expand test coverage.

---

## License

This project is licensed under the MIT License.
