	module.exports = {
		"type": "postgres",
		"url": process.env.DATABASE_URL,
		"entities": [
			process.env.DIR+"models/**."+process.env.FILE
		],
		"migrations": [
			process.env.DIR+"database/migrations/**."+process.env.FILE
		],
		"cli": {
			"migrationsDir": [
				"./src/database/migrations"
			],
			"entitiesDir": "./src/models"
		}
	}