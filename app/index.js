
const { readCsvFile, filterList } = require("./import")
const FirestoreClient = require("./service/firestore/firestore")

const startImport = async () => {
    const rawFile = await readCsvFile()

    if(rawFile.length > 0) {
        const filteredList = await filterList(rawFile)
        filteredList.map(async item => {
            const country = item.country
            await FirestoreClient.addCountry('countries', item.country)
            await Promise.all(
                item.cities.map(async city => {                    
                    await FirestoreClient.addCityToCountry('countries', country, 'cities', city)
                })
            )
        })        
    }
}

startImport()