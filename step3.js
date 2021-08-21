const fs = require('fs');
const process = require('process')
const axios = require('axios')

function write(filename, data){
    fs.writeFile(filename, data, 'utf8', (err)=> {
        if (err){
            console.log(`Couldn't write ${filename}: ${err}`)
            process.exit(1)
        }
    })
}

function cat(path){
    fs.readFile(path, 'utf8', (err,data)=>{
        if (err){
            console.log(`Error reading ${path}: ${err}`)
            process.exit(1)
        }
        console.log(data)
    })
}

function catWrite(path, filename){
     fs.readFile(path, 'utf8', (err,data)=>{
        if (err){
            console.log(`Error reading ${path}: ${err}`)
            process.exit(1)
        }
        write(filename, data)
    })

}


async function webCatWrite(url, filename){
    try{
        const {data} = await axios.get(url)
        write(filename, data)
    } catch(err){
        console.log(`Error fetching ${url}: ${err}`)
    }
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

if(arg === '--out'){
    const filename = process.argv[3]
    const path = process.argv[4]
    if (path.slice(0,4) === 'http'){ 
        webCatWrite(path, filename)
    } else {
        catWrite(path, filename )
    }
}
else if (arg.slice(0,4) === 'http'){
    webCat(arg)
} else {
    cat(arg)
}