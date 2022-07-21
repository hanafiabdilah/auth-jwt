import { Sequelize } from 'sequelize'

const db = new Sequelize('authjwt', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})

export default db
