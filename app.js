const { MongoClient } = require("mongodb")

connection_uri = "mongodb://localhost:27017/";

const client = new MongoClient(connection_uri);

async function createDB() {
    try {
        await client.connect();
        console.log("Succesfully created db");


        const moviesCollection = await client.db("peliculasDB").collection("peliculas");
        const movies = [
            { "name": "Pelicula1", "actor": "Actor1", "release": 1997 },
            { "name": "Pelicula2", "actor": "Actor1", "release": 1998 },
            { "name": "Pelicula3", "actor": "Actor2", "release": 1997 },
            { "name": "Pelicula4", "actor": "Actor3", "release": 1995 },
            { "name": "Pelicula5", "actor": "Actor4", "release": 1997 },
            { "name": "Pelicula6", "actor": "Actor4", "release": 1993 },
        ];
        await moviesCollection.insertMany(movies);
        console.log("Succesfully created new movies")


        await moviesCollection.updateMany({}, { $set: { boxoffice: 0, } });
        console.log("Succesfully updated all movies");


        await moviesCollection.replaceOne({ "name": "Pelicula6" }, { "name": "Pelicula7", "actor": "Actor5", "release": 1992 });
        console.log("Succesfully replaced Pelicula6");

        const query = await moviesCollection.find({ "release": { $lt: 1997 } });
        await query.forEach(console.dir);
        console.log("Succesfully retrieved peliculas with release before 1997");

        await moviesCollection.updateOne({ "name": "Pelicula1" }, { $unset: { boxoffice: "" } });
        console.log("Succesfully removed boxoffice from Pelicula1");
    } catch (e) {
        console.log(e)
    } finally {
        client.close();
    }
}

createDB();