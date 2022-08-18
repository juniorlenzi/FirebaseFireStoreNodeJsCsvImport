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

const filterList = async (rawList) => {
    const newDataSet = []

    await Promise.all(
        rawList.map(item => {            
            const checkIfExists = newDataSet.find(item2 => item2.country === item.country)
            
            if(!checkIfExists) {
                newDataSet.push({
                    country: item.country,
                    cities: [item.name]
                })
            } else {
                newDataSet.find(item2 => item2.country === item.country).cities.push(item.name)
            }
        })
    )


    return newDataSet
}

module.exports = {
    readCsvFile, filterList
}