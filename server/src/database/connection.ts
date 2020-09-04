import knex from 'knex';
import path from 'path';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'proffy.sqlite')
    },
    useNullAsDefault: true,
});

export default db;