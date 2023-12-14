const createPatientsTable = async (pool) => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS patients (
        patient_id SERIAL PRIMARY KEY,
        user_id INT UNIQUE,
        license_number VARCHAR(20),  
        health_description TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );
    `);
    console.log("Patients table created successfully");
  } catch (error) {
    console.error("Error creating patients table", error);
  } finally {
    client.release();
  }
};

module.exports = { createPatientsTable };
