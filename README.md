<div dir="rtl">

# אפליקציית ניהול משימות

אפליקציית full-stack לניהול משימות.

- צד לקוח: Angular 21
- צד שרת: NestJS 11
- מסד נתונים: קובץ JSON מקומי

---

## דרישות מקדימות

- Node.js גרסה 18 ומעלה
- npm

---

## התקנה

### צד שרת

```bash
cd server
npm install
```

### צד לקוח

```bash
cd client
npm install
```

---

## הרצה

### צד שרת

```bash
cd server
npm run start:dev
```

השרת יעלה על פורט 3000.

### צד לקוח

```bash
cd client
npm start
```

האפליקציה תעלה על פורט 4200.

---

## מבנה הפרויקט

```
task-managment-app/
├── client/    # Angular - צד לקוח
└── server/    # NestJS - צד שרת
```

---

## הערות

- יש להריץ את השרת לפני הלקוח.
- השרת רץ על `http://localhost:3000` והלקוח על `http://localhost:4200`.

</div>
