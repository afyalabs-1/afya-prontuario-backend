module.exports = {
	"type": "postgres",
  "url": process.env.DATABASE_URL,
	"migrations": [process.env.MIGRATIONS],
	"entities": [process.env.ENTITIES],
	"cli":{
		"migrationsDir": [
		"src/database/migrations/"
