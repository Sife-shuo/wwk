const Wwker=require("./main");
/*
var a=new Wwk();
(async function(){
    await a.create("https://sife.ml","GET","html")
    var o=a.$("img").attr("src");
    console.log(o)
})()*/
//a.create("https://sife.ml","GET").then(l=>l.$("img")).then(j=>console.log(j.attr("src")))
(async function(){
    var f=await Wwker([["https://csdnnews.blog.csdn.net/article/details/131098678","GET"],["https://csdnnews.blog.csdn.net/article/details/131098681","GET"]],a=>{
        return a.$("img").html
    })
    console.log(f)
})()
//a.$("img").then(i=>console.log(i))
//a.json().then(i=>console.log(i))