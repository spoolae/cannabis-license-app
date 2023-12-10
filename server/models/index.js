const { Pool } = require("pg");
const postgresConfig = require("../config/postgresConfig");
const { createUsersTable } = require("./users");
const { createMedicsTable } = require("./medics");
const { createPatientsTable } = require("./patients");
const { createLicensesTable } = require("./licenses");
const { createMedicationsTable } = require("./medications");

const pool = new Pool(postgresConfig);

const createTables = async () => {
  await createUsersTable(pool);
  await createMedicsTable(pool);
  await createPatientsTable(pool);
  await createLicensesTable(pool);
  await createMedicationsTable(pool);
};

module.exports = { pool, createTables };
