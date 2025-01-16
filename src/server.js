// Khai báo express
const express = require('express');
const app = express()
// Khai báo morgan
const morgan = require('morgan');
// Khai báo db
const db = require('./config/dbindex')
// Triển khai morgan
app.use(morgan('combined'));
// Kết nốt db
db.connect();
// Triển khai express
app.listen(3001);