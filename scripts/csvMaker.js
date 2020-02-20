const fs = require ('file-system');
const faker = require ('faker');
const capitalize = (word) => {
    return word[0].toUpperCase()+word.slice(1);
}


let columnNames = 'id,product_id,feature,value\n';

let csvPath = 'newFeatures.csv';

fs.appendFileSync(csvPath, columnNames, 'utf-8');

for (let i = 2218659;i<12218659;i++){
    if (i%100000===0){
        console.log("Still rolling! Wrote entry "+i);
    }
    let product = Math.floor(Math.random() * 1000010)+1;
    let newData = `${i},${product},"${capitalize(faker.lorem.word())}","${capitalize(faker.lorem.word())}"\n`;

    fs.appendFileSync(csvPath,newData, 'utf-8');
}