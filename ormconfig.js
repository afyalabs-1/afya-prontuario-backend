module.exports = {
	"type": "postgres",
<<<<<<< HEAD
	"host": process.env.DB_HOST,
	"port": +process.env.DB_PORT,
	"username": process.env.DB_USERNAME,
	"password": process.env.DB_PASSWORD,
	"database": process.env.DB_NAME,
	"migrations": [process.env.MIGRATIONS],
	"entities": [process.env.ENTITIES],
	"cli":{
=======
	"url": process.env.DATABASE_URL,
	"migrations": [process.env.MIGRATIONS],
	"entities": [process.env.ENTITIES],
	"ssl": true,
	"extra": {
		"ssl": {
			"rejectUnauthorized": false
		}
	},
	"cli": {
>>>>>>> feature/adding-specialist-entity
		"migrationsDir": [
			"src/database/migrations/"
		],
		"entitiesDir": "src/models/"
	},
}
