module.exports = {
  HOST: "localhost",
  USER: "spgt_admin",
  PASSWORD: "Khk@2024",
  DB: "spgtdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
