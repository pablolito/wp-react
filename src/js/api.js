import axios from 'axios';

export class Api{
    constructor(hostUrl, flickrKey){
        this.hostUrl = hostUrl;
        this.flickrKey = (flickrKey ? flickrKey : null);
    }
    getAllPostsHome(){
        return this.get("/wp-json/wp/v2/posts?categories=16,15");
    }
    getAllPosts(){
        return this.get("/wp-json/wp/v2/posts?categories=15");
    }
    getPost(id){
        return this.get("/wp-json/wp/v2/posts/"+id);
    }
    getPostsByTags(id){
        return this.get("/wp-json/wp/v2/posts?tags="+id);
    }
    getTagsList(idList){
        return this.get("/wp-json/wp/v2/tags?include="+idList);
    }
    getDirectorPost(){
        return this.get("/wp-json/wp/v2/posts/269");
    }
    getAlbumsList(){
        return this.get(`/services/rest/?api_key=${this.flickrKey}&nojsoncallback=1&format=json&method=flickr.photosets.getList&user_id=154586672@N07&`);
    }
    getPhotosList(id){
        return this.get(`/services/rest/?api_key=${this.flickrKey}&nojsoncallback=1&photoset_id=${id}&format=json&method=flickr.photosets.getPhotos&user_id=154586672@N07&`);
    }
    getAlbumInfos(id){
        return this.get(`/services/rest/?api_key=${this.flickrKey}&nojsoncallback=1&photoset_id=${id}&format=json&method=flickr.photosets.getInfo&user_id=154586672@N07&`);
    }

    get(url){
        return axios.get(this.hostUrl+url);
    }
}

