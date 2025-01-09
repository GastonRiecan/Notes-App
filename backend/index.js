import dotenv from "dotenv"
dotenv.config()
import app from './app.js'
import './database.js'

async function main() {
	await app.listen(app.get('port'))
	console.log('Server running on port', app.get('port'))
}


main()