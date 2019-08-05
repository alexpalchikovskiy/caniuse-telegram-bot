
const Handler = require( './handler' );

class Answer {

    constructor( value ){
        this._input = value;

        let key = value.toLowerCase().replace(/[^\w\s-]/gi, '').replace(/ /g, '-');
        this._h = new Handler( key );
    }

    badAnswer(){
        return `Sorry, but I don't know about <strong>${this._input}</strong> 🤷‍`;
    }

    goodAnswer(){
        let title = `<strong>${this._h.title}</strong>`;
        let description = `${this._h.description}`;
        let supported = `Supported <b>${this._h.percent}%</b>` + ( this._h.percent>90 ? ` 💪` : `` );
        let status = this._h.status.key !== 'other' ? `<i>${this._h.status.text}</i>` : ``;
        let br = `\r\n\r\n`;

        return `${title}${br}${description}${br}${supported}${br}${status}`;
    }

    badKeyboard(){
        return [
            [{
                text: `Try google it 🤔`,
                url: `https://google.com/search?q=${this._input}`
            }]
        ];
    }

    goodKeyboard(){
        return this._h.links.concat( this._h.buttons );
    }

    get message(){
        return this._h.hasAnswer ? this.goodAnswer() : this.badAnswer();
    }

    get options(){
        return {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: this._h.hasAnswer ? this.goodKeyboard() : this.badKeyboard()
            }
        }
    }

}

module.exports = Answer;
