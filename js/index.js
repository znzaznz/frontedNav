// let hashArr = window.localStorage.key(1)
$(document).ready(function (){
    // 从当地的地址中取到url,并渲染
    let hashMap = getUrl();
    render(hashMap);

    // 给每个li绑定事件
    $(".iconAdd").on("click",()=>{
        let url = window.prompt("请输入您要加入的网址");
        hashMap.push(resolveUrl(url))
        render(hashMap);
        localStorage.setItem("hashMap",JSON.stringify(hashMap))
    })
})

// 从当地的localStorage中取出数组并做好处理
function getUrl(){
    let hashMap = localStorage.getItem("hashMap");
    if (hashMap){
        hashMap = JSON.parse(localStorage.getItem("hashMap"));
    }else{
        hashMap = ["https://www.acfun.cn/","https://www.bilibili.com/"]
        localStorage.setItem("hashMap",JSON.stringify(hashMap));
    }

    console.log(hashMap)
    return hashMap
}

// 将用户传入的url作一个处理,如果符合条件返回一个合适的网址
function resolveUrl(url){
    if (url.indexOf("http") === -1 ){
        url = "https://"+url
    }
    return url
}
//渲染数组
function render(arr){
    console.log($(".siteGroup").find("li:not(.iconAdd)").remove());
    debugger
    arr.forEach((url)=>{
        let valueUrl =  resolutionOfDomain(url);
        $(`<li>
                <a href="${url}">
                    <div class="iconSite">${valueUrl[0]}</div>
                    <div class="iconTags">${valueUrl}</div>
                </a>
            </li>`).insertBefore(".iconAdd")
        }
    )
}
// 处理li上的域名的显示
function resolutionOfDomain(url){
    if (url.search("www") !== -1){
       return  url.split(".")[1]
    }
    if (url.search("http") !== -1){
        return url.split("//")[1]
    }
}
