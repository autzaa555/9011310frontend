## Getting Started

1. Run Database

```bash
docker compose up -d
```

2. Run Backend

```bash
cd backend
go mod tidy
goose -dir ./migrations postgres postgres://devpool:123456789@localhost:5432/mydb up
go run cmd/app/main.go
```

3. Run Frontend

```bash
cd frontend
npm i
npm run dev 
```

# Project tree
```bash
.
├── README.md
├── compose.yml
├── .gitignore
├── .env
├── backend
│   ├── cmd
│   ├── go.mod
│   ├── go.sum
│   ├── internal
│   └── migrations
└── frontend
    ├── README.md
    ├── app
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── tailwind.config.ts
    └── tsconfig.json
```"# 9011310frontend" 
