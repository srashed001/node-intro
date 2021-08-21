const fs = require('fs');
const process = require('process')
const axios = require('axios')

function cat(path){
    fs.readFile(path, 'utf8', (err,data)=>{
        if (err){
            console.log(`Error reading ${path}: ${err}`)
            process.exit(1)
        }
        console.log(data)
    })
}


async function webCat(url){
    try{
        const {data} = await axios.get(url)
        console.log(data)
    } catch(err){
        console.log(`Error fetching ${url}: ${err}`)
    }

}

let arg = process.argv[2]

if (arg.slice(0,4) === 'http'){
    webCat(arg)
} else {
    cat(arg)
}