const createMedicsTable = async (pool) => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS medics (
        medic_id SERIAL PRIMARY KEY,
        user_id INT UNIQUE,
        position VARCHAR(50) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );
    `);
    console.log("Medics table created successfully");
  } catch (error) {
    console.error("Error creating medics table", error);
  } finally {
    client.release();
  }
};

module.exports = { createMedicsTable };
