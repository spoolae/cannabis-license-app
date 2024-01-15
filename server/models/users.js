const createUsersTable = async (pool) => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        role VARCHAR(20) DEFAULT 'medic' NOT NULL CHECK (role IN ('medic', 'patient')),
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        father_name VARCHAR(50),
        gender VARCHAR(10) DEFAULT 'male' NOT NULL CHECK (gender IN ('male', 'female')),
        phone_number VARCHAR(20),
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL
      );
    `);
    console.log("Users table created successfully");
  } catch (error) {
    console.error("Error creating users table", error);
  } finally {
    client.release();
  }
};

module.exports = { createUsersTable };
