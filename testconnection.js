const { MongoClient } = require('mongodb');

// Replace <username>, <password> and <cluster-url> with your MongoDB Atlas credentials
const uri = "mongodb+srv://safasoudagar:raies1477@cluster0.gh6eh3e.mongodb.net/test?retryWrites=true&w=majority";

async function testConnection() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ Connected to MongoDB Atlas!");
        const result = await client.db("test").command({ ping: 1 });
        console.log("Ping result:", result);
    } catch (err) {
        console.error("❌ Connection failed:", err);
    } finally {
        await client.close();
    }
}

testConnection();
