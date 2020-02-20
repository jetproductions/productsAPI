const {Pool} = require ('pg');
const Client = require ('pg-native');
require ('dotenv').config();

const client = new Client();

const connectString = process.env.SQL_STRING

client.connectSync(connectString,(err)=>{
    if (err) console.error(err, err.stack);
    console.log('Connected to DB...')
});

const featureList = [
    ["From the future", "Definitely"],
    ["Exuberance", "Insubstantial"],
    ["Batteries","Not included"],
    ["Visible color spectrum","380nm-740nm"],
    ["Popular with 'the cool kids'","Nope!"],
    ["Coachella-approved","Yes"],
    ["Tears space-time","Badly"],
    ["Radioactive","Not anymore"],
    ["Discovery location","Roswell NM"],
    ["Sick colors","The raddest"],
    ["Beats","Phat"],
    ["Tech-Level","Spacey"],
    ["Jedi-friendly","Yes"],
    ["Keanu Reeves","...Woah"],
    ["Past record","Spotty"],
    ["Monkey","Evil"],
    ["Ships","BEFORE you order it"],
    ["Vibe","Lovecraftian"],
    ["Vigilus","Stands"],
    ["Known interactions","None"],
    ["Ninpo","Ikan"],
    ["Value","Impossible to calculate"],
    ["Password","Shibolleth"],
];

let values;

for (let i = 2218659;i<12218659;i++){
    let product = Math.floor(Math.random() * 1000010)+1;
    let feature = featureList[Math.floor(Math.random()*featureList.length)]
    let query = `INSERT INTO features(id, product_id, feature, value) VALUES ($1, $2, $3, $4)`;
    values = [i,product,feature[0],feature[1]];

    client.querySync(query, values, (err, res)=>{
        if (err) console.error(err, err.stack);
    })
    if (i%50000===0){
        console.log('still working...'+i);
    }
    if (i===12218658){
        console.log('done!');
    }
}