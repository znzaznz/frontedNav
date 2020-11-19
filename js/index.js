// let hashArr = window.localStorage.key(1)
$(document).ready(function (){
    let hashMap;
    if (localStorage.getItem("hashMap")){
       hashMap = localStorage.getItem("hashMap");
       hashMap = hashMap.split(",")
    }else{
        hashMap = ["https://www.acfun.cn/","https://www.bilibili.com/"]
        localStorage.setItem("hashMap",hashMap);
    }
    hashMap.forEach(
        (value)=>{
            let valueUrl = resolutionOfDomain(value)
            $(`<li>
                <a href="${value}">
                    <div class="iconSite">${valueUrl[0]}</div>
                    <div class="iconTags">${valueUrl}</div>
                </a>
            </li>`).insertBefore(".iconAdd")
            console.log("输入完成");
        }
        )
    $(".iconAdd").on("click",()=>{
        let url = window.prompt("请输入您要加入的网址");
        if (url.indexOf("http") === -1 ){
            url = "https://"+url
        }
        const urlValue = resolutionOfDomain(url);
        $(`<li>
                <a href="${url}">
                    <div class="iconSite">${urlValue[0]}</div>
                    <div class="iconTags">${urlValue}</div>
                </a>
            </li>`).insertBefore(".iconAdd");
        hashMap.push(url)
        localStorage.setItem("hashMap",hashMap)
    })
})

function resolutionOfDomain(url){
    if (url.search("www") !== -1){
        console.log(url.split("."))
       return  url.split(".")[1]
    }else if (url.search("http") !== -1){
        return url.split("//")[1]
    }
}
