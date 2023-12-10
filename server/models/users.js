const createUsersTable = async (pool) => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        role VARCHAR(20) NOT NULL CHECK (role IN ('medic', 'patient')),
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        father_name VARCHAR(50) NOT NULL,
        gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
        phone_number VARCHAR(20) NOT NULL,
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
