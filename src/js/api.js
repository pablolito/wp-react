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
    getAlbumsList(){
        return this.getAxios('/api/getAlbumsList');
    }
    getPhotosList(id){
        return this.getAxios('/api/getPhotosList/?id='+id);
    }
    getAlbumInfos(id){
        return this.getAxios('/api/getAlbumInfos/?id='+id);
    }

    get(url){
        return axios.get(this.hostUrl+url);
    }

    getAxios(url){
        return axios.get(url);
    }
}

