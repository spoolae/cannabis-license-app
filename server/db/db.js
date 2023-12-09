const { Pool } = require("pg");
const postgresConfig = require("../config/postgresConfig");

const pool = new Pool(postgresConfig);

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      -- Создание таблицы пользователей
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        role VARCHAR(20) NOT NULL CHECK (role IN ('medic', 'patient')),
        full_name VARCHAR(100) NOT NULL,
        gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
        phone_number VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE
      );

      -- Создание таблицы медработников
      CREATE TABLE IF NOT EXISTS medics (
        medic_id SERIAL PRIMARY KEY,
        user_id INT UNIQUE,
        position VARCHAR(50) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );

      -- Создание таблицы пациентов
      CREATE TABLE IF NOT EXISTS patients (
        patient_id SERIAL PRIMARY KEY,
        user_id INT UNIQUE,
        license_number VARCHAR(20) NOT NULL,
        health_description TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );

      -- Создание таблицы лицензий
      CREATE TABLE IF NOT EXISTS licenses (
        license_id SERIAL PRIMARY KEY,
        patient_id INT,
        expiration_date DATE NOT NULL,
        FOREIGN KEY (patient_id) REFERENCES patients (patient_id)
      );

      -- Создание таблицы препаратов
      CREATE TABLE IF NOT EXISTS medications (
        medication_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        article_number VARCHAR(50) NOT NULL
      );
    `);
    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables", error);
  } finally {
    client.release();
  }
};

module.exports = { pool, createTables };
