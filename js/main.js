const cheerio = require('cheerio');
const f = require("./fetch");

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
        this.type=false;
        this.querySelector=this.selector=this.select=this.$=function(dom){
            this.type="html";
            if(!this.html){
                this.html=cheerio.load(this.res);
                //console.log(this.html("p")["110"].children)
                return {html:this.html(dom).prop('outerHTML'),text:this.html(dom).html(),attr:a=>this.html(dom).attr(a)};
            }
            return this.html(dom).prop('outerHTML');
        }
        this.create=async function(url,method,type="html"){
            var o=await f(url,{method:method,headers:headers})
            if(type=="html"){
                this.res=await o.text()
            }else if(type=="json"){
                this.res=await o.json()
            }else{throw("Type Error")}
            this.type=type;
            return this;
        }
        this.json=async function(){
            return this.res;
        }
        return this;
    }
}
async function Wwker(urllist,fn){
    var result=[];
    for(var i=0;i<urllist.length;i++){
        var url=urllist[i];
        result.push(await new Wwk().create(url["url"]||url[0],url["method"]||url[1]).then(p=>fn(p)))
    }
    return result;
}
module.exports={Wwk,Wwker};