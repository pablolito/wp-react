import axios from 'axios';

export class Api{
    constructor(hostUrl){
        this.hostUrl = hostUrl;
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

    get(url){
        return axios.get(this.hostUrl+url);
    }
}

