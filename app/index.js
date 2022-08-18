const { readCsvFile, filterList } = require("./import")

const startImport = async () => {
    const rawFile = await readCsvFile()

    if(rawFile.length > 0) {
        const filteredList = await filterList(rawFile)
        console.log(filteredList)
    }
}

startImport()