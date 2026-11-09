import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import users from './users.js';
import connectDatabase from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config({ path: 'config/config.env' });

connectDatabase();

const seedUsers = async () => {
    try {


        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            await User.create(user);
        }

        console.log('Users seeded successfully.');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

seedUsers().then(() => {
    console.log('Seeding process completed.');
    mongoose.connection.close();
});