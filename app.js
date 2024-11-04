const express = require('express');
const cors = require('cors'); 
const { sequelize } = require('./models');
const swaggerSetup = require('./config/swagger'); 
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(cors()); 
app.use(express.json());

swaggerSetup(app);

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('La base de datos se ha sincronizado correctamente.');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});
