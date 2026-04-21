# Church Finance System

Church Finance System is a monorepo for a simple church finance web application.
The MVP replaces manual spreadsheets with a web app for recording contributions
(income) and expenses, then showing monthly totals and simple chart data.

## MVP Scope

Version 1 focuses on:

- Admin login with JWT authentication
- Contributions CRUD
- Expenses CRUD
- Monthly dashboard summary

This MVP does not include:

- Bank account balance tracking
- Reconciliation
- Member management
- Public self-report contribution forms
- Third-party integrations

## Core Rules

The application tracks:

- Income totals from contributions
- Expense totals
- Monthly net = income - expenses

It does not track actual bank balances.

## Tech Stack

### Backend

- Java 17
- Spring Boot
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- Flyway

### Frontend

- React
- TypeScript
- Vite
- TailwindCSS

## Repository Structure

```text
church-finance/
  backend/   Spring Boot REST API
  frontend/  React + TypeScript client
```

## MVP Features

### 1. Admin Auth

- `POST /api/auth/login`
- Admin-only JWT-based authentication
- Protected API routes

### 2. Contributions

Fields:

- `id`
- `type`: `TITHE | OFFERING | DONATION | OTHER`
- `amount`
- `date`
- `paymentMethod`: `CASH | ZELLE | CHECK | CARD | OTHER`
- `memberName` (optional)
- `note` (optional)
- `createdAt`
- `updatedAt`

Expected endpoints:

- `GET /api/contributions?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `POST /api/contributions`
- `PUT /api/contributions/{id}`
- `DELETE /api/contributions/{id}`

### 3. Expenses

Fields:

- `id`
- `category`: `RENT | UTILITIES | FOOD | OUTREACH | EQUIPMENT | OTHER`
- `amount`
- `date`
- `paymentMethod`: `CASH | ZELLE | CHECK | CARD | OTHER`
- `description` or `note` (optional)
- `createdAt`
- `updatedAt`

Expected endpoints:

- `GET /api/expenses?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `POST /api/expenses`
- `PUT /api/expenses/{id}`
- `DELETE /api/expenses/{id}`

### 4. Dashboard

Monthly summary endpoint:

- `GET /api/dashboard/monthly?month=YYYY-MM`

Returned summary should include:

- `totalIncome`
- `totalExpenses`
- `net`
- `incomeByType`
- `expensesByCategory`

## Frontend Pages

- `/login`
- `/dashboard`
- `/contributions`
- `/expenses`

## Architecture Direction

Keep the backend structure small and explicit:

- `controller`
- `service`
- `repository`
- `dto`
- `entity`
- `config`

Keep the frontend structure small and practical:

- pages
- components
- API layer
- auth handling

## Current Status

The repository currently contains:

- `backend/`
- `frontend/`

The backend is still early and should be built incrementally with small, correct
steps.

## Development Notes

- Prefer small changes over broad refactors
- Keep the MVP scope strict
- Do not add non-MVP modules until core CRUD, auth, and dashboard are stable

