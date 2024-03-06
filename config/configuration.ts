
export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    db: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 27017,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dbNames: {
        auth: process.env.DB_AUTH,
        core: process.env.DB_CORE,
        conf: process.env.DB_CONF
      },
      confCollection: process.env.CONF_COLLECTION
    }
  });
  