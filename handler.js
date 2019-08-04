
const Data = require( './data' );

class Handler {

    constructor( value ){
        const data = new Data( value );
        
        this.current = data.current;
        this.statuses = data.statuses;
    }

    get hasAnswer(){
        return this.current ? true : false;
    }

    get percent(){
        return Math.round( this.current.usage_perc_a + this.current.usage_perc_y, 2 )
    }

    get status(){
        return {
            key: this.current.status,
            text: this.statuses[ this.current.status ]
        }
    }

    get links(){
        return this.current.links.map( l => [ {text: l.title, url: l.url} ] )
    }

    get buttons(){
        return this.current.same.map( i => { return [ { text: i, callback_data: i } ] } )
    }

    get title(){
        return this.current.title
    }

    get description(){
        return this.current.description
    }

}

module.exports = Handler;
