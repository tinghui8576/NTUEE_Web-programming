
import path from 'path'
import express from 'express' 
import cors from 'cors'
import routes from './routes/index';
import db from './db';
db.connect();

const app = express();
const port = process.env.PORT || 4000;

// app.get('/', (req, res) => {
//     console.log('get')
//     res.send('Hello, World!');
// });

// if (process.env.NODE_ENV === "deployment"){
//     app.use(cors());
// }


if (process.env.NODE_ENV === "production"){
    const __dirname = path.resolve();

    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.use(express.json());
    app.use('/', routes);
    app.get("/*", function( req, res){     
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
    })
    
}
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
//     });
// app.listen(port, () =>
//     console.log(`Example app listening on port ${port}!`),
// );
    
// app.use(cors());
// app.use(express.json());
// app.use('/', routes);
    
// import db from './db';
// db.connect();
    