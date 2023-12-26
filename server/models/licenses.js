const createLicensesTable = async (pool) => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS licenses (
        license_id SERIAL PRIMARY KEY,
        license_number VARCHAR(255) UNIQUE NOT NULL,
        patient_id INT,
        issue_date DATE NOT NULL,
        expiration_date DATE NOT NULL,
        FOREIGN KEY (patient_id) REFERENCES patients (patient_id)
      );
    `);
    console.log("Licenses table created successfully");
  } catch (error) {
    console.error("Error creating licenses table", error);
  } finally {
    client.release();
  }
};

module.exports = { createLicensesTable };
