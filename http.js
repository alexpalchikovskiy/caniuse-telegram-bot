
const config = require( './config' );
const request = require( 'request' );
const fs = require( 'jsonfile' );

try {
    fs.readFileSync( config.dbName );
} catch (error) {
    fs.writeFileSync( config.dbName, {} );
}

const sendRequest = () => {

    request( config.dbUrl, ( error, response, body ) => {
        
        if( !error && response.statusCode === 200 ){

            fs.writeFile( config.dbName, JSON.parse( body ) );

        }else{

            //error handler

        }        

    } );
}

sendRequest();

let inervalId = setInterval( () => sendRequest(), config.dbUpdateInterval );

module.exports = inervalId;
