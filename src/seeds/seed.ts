import db from "../utils/db";
import bcrypt from 'bcrypt';

async function hashPw() {
    return await bcrypt.hash("password123", 10);
}

async function seed() {
    const hashedPassword = await hashPw();

    try {
        await db.user.create({
            data: {
                name: "Admin",
                username: "admin",
                password: hashedPassword
            }
        });
        console.log("User seeded successfully.");
    } catch (error) {
        console.error("Error seeding user:", error);
    }
}

seed();
