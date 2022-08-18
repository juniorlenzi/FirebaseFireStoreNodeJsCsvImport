const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const readCsvFile = () => {
    return new Promise((resolve, reject) => {        
        const filePath = path.join(__dirname, '../data/world-cities.csv');
        const stream = fs.createReadStream(filePath);
        const csvStream = csv.parse({ headers: true });
        
        const dataSet = [];

        const jsonStream = csvStream
            .on('data', (data) => {
                dataSet.push(data);
            }).on('end', () => {
                resolve(dataSet);            
            })
        stream.pipe(jsonStream);
    })
}

const startImport = async () => {
    const rawFile = await readCsvFile();

    console.log(111, rawFile, 111)
}

startImport()