import $ from 'jquery';

export class Api{
    constructor(){

    }
    get(url){
        return new Promise ((resolve, reject) =>
        $.ajax({
            type: 'get',
            url: url,
            dataType: "json",
            cache: true
        }).then(resolve, reject));
    }
}

