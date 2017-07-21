let utils = {
    htmlEntitiesDecode: (content) => {
        let parser = new DOMParser();
        let parsedHtml = parser.parseFromString(content, 'text/html').body.innerText;
        return parsedHtml;
    },
    isSmallScreen: () => {
        if (window.matchMedia("(min-width: 750px").matches){
            return false;
        }else{
            return true;
        }
    }
}

export default utils;