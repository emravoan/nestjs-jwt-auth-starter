# NestJS JWT Auth Starter

![GitHub Repo stars](https://img.shields.io/github/stars/emravoan/nestjs-jwt-auth-starter.git?style=social)
![GitHub issues](https://img.shields.io/github/issues/emravoan/nestjs-jwt-auth-starter.git?style=social)
![License](https://img.shields.io/github/license/emravoan/nestjs-jwt-auth-starter.git?style=social)

A basic NestJS starter project with JWT authentication, config support, and modular architecture.

## Features

- ✅ JWT Auth (login, register, guard)
- ✅ ConfigModule (.env support)
- ✅ Modular folder structure
- ✅ pnpm support

## Getting Started

### 1. Clone

```bash
git clone https://github.com/emravoan/nestjs-jwt-auth-starter.git
cd nestjs-jwt-auth-starter
```

### 2. Install

```bash
pnpm install
```

### 3. Setup `.env`

```env
NODE_ENV=development
APP_NAME=App
API_PREFIX=api
API_VERSION=v1
JWT_SECRET=32_char_secret_key
JWT_EXPIRED=1h
TYPEORM_HOST=127.0.0.1
TYPEORM_PORT=3306
TYPEORM_USERNAME=db_usr
TYPEORM_PASSWORD=db_pwd
TYPEORM_DATABASE=db_name
```

### 4. Run

```bash
pnpm start:dev
```

## Scripts

| Command               | Description             |
| --------------------- | ----------------------- |
| `pnpm start:dev`      | Run in watch mode       |
| `pnpm build`          | Build the project       |
| `pnpm start`          | Start built app         |
| `pnpm lint`           | Lint the code           |
| `pnpm test`           | Run unit tests          |
| `pnpm format`         | Format with Prettier    |
| `pnpm gen:jwt-secret` | Generate JWT secret key |
