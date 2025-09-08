# 📝 Todolist API (Express.js)

โปรเจกต์ To-Do List API เขียนด้วย Node.js + Express.js  
ข้อมูลเก็บในไฟล์ JSON (ไม่ใช้ Database)

---

## 🚀 วิธีใช้งาน

### 1. Clone โปรเจกต์จาก GitHub
```bash
git clone https://github.com/purachetc/Todolist.git
cd Todolist

## 📌 API Endpoints

### ✅ To-do Routes

- **GET** – ดึงรายการ todos ทั้งหมด  
GET http://localhost:3000/todos

- **GET** – ดึง todo ตาม ID  
GET http://localhost:3000/todos/:id

- **POST** – เพิ่ม todo ใหม่ 
POST http://localhost:3000/todos

Body (JSON):
{
"title": "ซื้อของที่ซูเปอร์"
}

- **PATCH** – อัปเดตข้อมูลบางส่วน (title หรือ completed)  
PATCH http://localhost:3000/todos/:id

Body (JSON):
{
"completed": true
}

- **PUT** – แทนที่ todo ทั้ง object  
PUT http://localhost:3000/todos/:id

Body (JSON):
{
"title": "ไปธนาคาร",
"completed": true
}

- **DELETE** – ลบ todo  
DELETE http://localhost:3000/todos/:id