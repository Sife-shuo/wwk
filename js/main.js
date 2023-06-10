const cheerio = require('cheerio');


headers={
    "sec-ch-ua-mobile": "?0",
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36",
    "accept-encoding": "gzip, deflate, br",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "upgrade-insecure-requests": "1",
    "accept-language": "en-US,en;0.9",
    "sec-fetch-site": "same-site",
    "sec-fetch-mode": "navigate",
    "sec-fetch-user": "?1",
    "sec-fetch-dest": "document"
  };


class Wwk{
    constructor(){
        this.html=false;
        this.querySelector=this.selector=this.select=this.$=function(dom){
            if(!this.html){
                return this.res.text().then(html=>{
                    this.html=cheerio.load(html);
                    return {html:this.html(dom).prop('outerHTML'),attr:a=>this.html(dom).attr(a)};
                })
            }
            return new Promise(()=>this.html(dom).prop('outerHTML'));
        }
        return this;
    }
    create(url,method){
        return fetch(url,{method:method,headers:headers}).then(r=>{this.res=r;return this})
    }
    json(){
        return this.res.json()
    }
}
async function Wwker(urllist,fn){
    var result=[];
    var tool=new Wwk();
    for(var i=0;i<urllist.length;i++){
        var url=urllist[i];
        result.push(await tool.create(url["url"]||url[0],url["method"]||url[1]).then(p=>fn(p)))
    }
    return result;
}
module.exports=Wwk;
module.exports=Wwker;