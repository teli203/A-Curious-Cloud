// SERVER SIDE LOGIC //

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const mongoose = require('mongoose');
const validator = require('validator');
const fs = require('fs');

const jwtSecret = process.env.JWT_SECRET;  //Accessing the .env file //
const app = express();
const PORT = process.env.PORT || 5500;

// FAVICON //

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Connect to MongoDB //

const connectDB = async () => {
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });
    } catch (error) {}
};

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});

// MongoDB Models //

const Post = mongoose.model(
    'Post',
    new mongoose.Schema({
        title: String,
        content: String,
        imageUrl: String,
        author: String,
        timestamp: String,
    })
);

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: String,
        password: String,
        imageUrl: String,
        role: String,
        })
);

// Middleware //

