import $ from 'jquery';

export class Api{
    constructor(hostUrl){
        this.hostUrl = hostUrl;
    }
    get(url){
        return new Promise ((resolve, reject) => {
        $.ajax({
            type: 'get',
            url: this.hostUrl+url,
            dataType: "json",
            cache: true
        }).then(/*(data) => {
            if(data.code){
                throw "error";
            }else{
                resolve(data);
            }
        }*/
        resolve, reject);
        
    });
    }
}

