import { range } from 'lodash/fp'

export * from './reducerUtility';

export const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {        
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response; 
               
        throw error;
    }
}

export const createRequest = (url = '', config, token = '') => {

    const validMethods = ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'PATCH'];
    const defaultconfig = {
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
    }
    const defaultHeaders = new Headers();

    if (typeof config.method !== 'string') {
        throw new TypeError("config method property must be a string.");
    }
    if (validMethods.indexOf(config.method.toUpperCase()) === -1) {
        throw Error("config method property value most be one of ['GET','POST','HEAD','PUT','DELETE']");
    }

    config.headers = config.headers || defaultHeaders;

    if (config.headers && !config.headers instanceof Headers) {
        throw new TypeError("config headers property must be of type Headers.");
    }

    const requestConfig = {
        ...defaultconfig,
        ...config
    };
    return new Request(url, requestConfig);

}

export const createPager = ({ totalCount: totalItems, pageSize }, currentPage) => {
    if (!totalItems) {
        return false;
    }
    const totalPages = Math.ceil(totalItems / pageSize)
    let startPage, endPage;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }
    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}

export const removeTrailingSlash = str => {
    return str.split('')[str.length - 1] === '/' ?
        str.split('').slice(0, str.length - 1).join('')
        :
        str;
}

export const capitalizeFirstLetter = stringx => {
    let string = stringx.toLowerCase();
    string = string.split(' ');

    for (var i = 0; i < string.length; i++) {
       string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
    }

    return string.join(' ');
}

export function numberWithCommas(x) {
    if(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } 
    return 0;
}

export const isEmptyObject = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
 }