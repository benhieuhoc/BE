// Khai báo express
const express = require('express');
const app = express()
// Khai báo cors
const cors = require('cors');
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
// cài đặt cors
const allowedOrigins = [
    'https://khambenh.webkhactu.top/',
    'http://localhost:3000', // Local development
    'https://frontend-react-kham-benh.vercel.app', // Production
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.options('*', cors());
// Kết nốt db
db.connect();
// Triển khai Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Triển khai router
router(app);
// Triển khai express
app.listen(3001);