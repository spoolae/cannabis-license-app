const createMedicationsTable = async (pool) => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS medications (
        medication_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        vendor_code VARCHAR(50) NOT NULL
      );
    `);
    console.log("Medications table created successfully");
  } catch (error) {
    console.error("Error creating medications table", error);
  } finally {
    client.release();
  }
};

module.exports = { createMedicationsTable };
