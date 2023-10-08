import utils from "."
import Url from "./urlendecode"
import CryptoJS from "crypto-js"

function getParams(route,type) {
    if (!route) {
        route = window.location.href
    }
    route = Url.decode(route)
    let data = route.split('?')
    let params = {}
    let data2
    try{
        if (data.length >= 2) {
            data2 = data[1].split('&')
        }else if (data.length==1){
            data2 = data[0].split('&')
        }
        else{
            return{}
        }
    }catch(e){
        return {}
    }
    data2.forEach(res => {
        res = res.split('=')
        if (res.length >= 2) {
            params[res[0]] = res[1]
        }
    })
    if(type==='bs64'){
        if(!params.str){
            return {}
        }
        try{
            params.str = data[0]+'?'+CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(params.str.replace(/-/g,'+').replace(/_/g,'/').replace(/::/g,'=')))
        }catch(e){
            return {}
        }
        params = getParams(params.str)
    }
    return params
}
function addParam(data,type) {
    let params = utils.deepClone(data)
    let url = '';
    let keys = Object.keys(params)
    keys.forEach(res => {
        if ((params[res] && params[res] != "") || params[res] === 0) {
            if (typeof (params[res]) != 'string' && typeof (params[res]) != 'number') {
                params[res] = 'Object'
            }
            url += "&"
            url += res.toLowerCase()
            url += "="
            url += encodeURIComponent(params[res])
        }

    })
    url = url ? url.substring(1) : ''
    if(!type){
        return url
    }
    else if(type==='bs64'){
        try{
            url = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(url)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'::')
        }catch(e){
            return ''
        }
        return url
    }
    
}

export {
    addParam,
    getParams
}