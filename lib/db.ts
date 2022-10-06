import knex from 'knex'

const {DB_USERNAME, DB_PASSWORD, DB_NAME} = process.env
const connString = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@db:5432/${DB_NAME}`

const db = knex({
    client: "pg",
    connection: connString
})

export default db