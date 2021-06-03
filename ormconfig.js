module.exports = {
	"type": "postgres",
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
		"migrationsDir": [
			"src/database/migrations/"
		],
		"entitiesDir": "src/models/"
	},
}
