// Khai báo express
const express = require('express');
const app = express()
// Khai báo morgan
const morgan = require('morgan');
// Khai báo db
const db = require('./config/dbindex');
// Router
const router = require('./routers/index');
// Khai báo body-parser: dùng để đọc req.body từ client
const bodyParser = require('body-parser');
// Triển khai morgan
app.use(morgan('combined'));
// Kết nốt db
db.connect();
// Triển khai Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Triển khai router
router(app);
// Triển khai express
app.listen(3001);