const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Untuk mengakses file HTML

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'blajarunba@gmail.com', // Ganti dengan email Anda
        pass: 'anwarpadilah' // Ganti dengan password Anda
    }
});

// Endpoint untuk mengirim email
app.post('/send-email', (req, res) => {
    const { name, email, product, amount } = req.body;

    const mailOptions = {
        from: 'dilzvvip@gmail.com', // Ganti dengan email Anda
        to: 'blajarunba@gmail.com', // Ganti dengan email Anda
        subject: 'Notifikasi Pembelian',
        text: `Nama: ${name}\nEmail: ${email}\nProduk: ${product}\nJumlah: ${amount}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).