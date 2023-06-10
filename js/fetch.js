async function f(){
    const f=await fetch.apply(null,arguments);
    return f
}
module.exports=f;