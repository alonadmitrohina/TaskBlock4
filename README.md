#Awards Service (Node.js + TypeScript + MongoDB)
##Опис

Цей сервіс реалізує REST API для роботи з об’єктами Awards, які прив’язані до сутності Song (багато-до-одного відношення).
Сервіс дозволяє:

* Створювати нагороди для пісень

* Отримувати список нагород для певної пісні з пагінацією

* Підраховувати кількість нагород для пісні за допомогою агрегованого запиту

Технології:

Node.js + TypeScript

Express.js (REST API)

MongoDB (через Mongoose)

class-validator / class-transformer (валідація та трансформація DTO)

Jest + Supertest (інтеграційні тести)

Docker (контейнеризація сервісу та бази даних)

Award:
`{
  name: string;
  nomination: string;
  date: Date;
  songId: number;
  createdAt: Date;
  updatedAt: Date;
}`


1.Створпення award:
POST /api/awards
Content-Type: application/json

`{
  "name": "Grammy",
  "nomination": "Best Song",
  "date": "2024-01-01",
  "songId": 1
}`


2. Отримання award по пісні
GET /api/awards?songId=1&from=0&size=10


Параметри:

songId (обов’язково)

from (необов’язково, за замовчуванням 0)

size (необов’язково, кількість записів, за замовчуванням 10)

Відповідь — список нагород, відсортованих по даті (останні спочатку)


3. Підрахунок кількості нагород для пісень
POST /api/awards/_counts
Content-Type: application/json

`{
  "songsIds": [1, 2, 3]
}`


Повертає об’єкт у форматі Record<number, number>:

`{
  "1": 5,
  "2": 2,
  "3": 0
}`

Інтеграційні тести покривають усі ендпоінти.

`npm install
npm test`


Використовується Jest та Supertest для тестів REST API

Тести створюють тимчасову базу даних MongoDB через Testcontainers



