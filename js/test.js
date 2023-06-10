const Wwker=require("./main");
//var a=new Wwk()
//a.create("https://sife.ml","GET").then(l=>l.$("img")).then(j=>console.log(j.attr("src")))
(async function(){
    var f=await Wwker([["http://httpbin.org/anything","GET"]],a=>a.json())
    console.log(f)
})()
//a.$("img").then(i=>console.log(i))
//a.json().then(i=>console.log(i))