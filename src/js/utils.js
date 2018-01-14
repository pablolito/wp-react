import $ from 'jquery';

let utils = {
    apiRoute: "http://axelfalguier.com",
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
    },
    isMediumScreen: () => {
        if (window.matchMedia("(min-width: 990px").matches){
            return false;
        }else{
            return true;
        }
    },
    footerFixed: () => {
        let windowHeight = window.innerHeight,
        isHome = $("body").hasClass("home"),
        containerElement = document.querySelector(".global-container"),
        footerElement = document.querySelector("footer"),
        footerHeight;
        windowHeight = (isHome ? windowHeight: windowHeight-89);
        if(containerElement && footerElement){
            footerHeight = footerElement.clientHeight;
            containerElement.style.minHeight = windowHeight+"px";
            containerElement.style.paddingBottom = footerHeight+"px";
        }
    }
}

export default utils;