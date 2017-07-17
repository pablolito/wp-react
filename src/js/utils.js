let utils = {
    htmlEntitiesDecode: (content) => {
        let parser = new DOMParser();
        let parsedHtml = parser.parseFromString(content, 'text/html').body.innerText;
        return parsedHtml;
    }
}

export default utils;