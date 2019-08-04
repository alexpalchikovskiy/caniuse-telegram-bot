
const config = require( './config' );
const fs = require( 'jsonfile' );

class Data {

    constructor( value ){
        this._k = value;
        this._d = fs.readFileSync( config.dbName );
    }

    get list(){
        return this._d.data || {};
    }

    get statuses(){
        return this._d.statuses || {};
    }

    get current(){
        let same = [];
        let current = false;

        for( let k in this._d.data ){
            if( k === this._k ){
                same.unshift( k );
            }
            else if( k.indexOf( this._k )+1 ){
                same.push( k );
            }
            else if( this._d.data[ k ].keywords.indexOf( this._k )+1 ){
                same.push( k );
            }
        }
        
        if( same.length ){
            current = this._d.data[ same[0] ];
            same.splice( 0, 1 );
            current.same = same;
        }
        
        return current;
    }

}

module.exports = Data;
