// let hashArr = window.localStorage.key(1)
$(document).ready(function (){
    // 从当地的地址中取到url,并渲染
    let hashMap = getUrl();
    render(hashMap);

    // 给每个li绑定点击事件
    $(".iconAdd").on("click",()=>{
        let url = window.prompt("请输入您要加入的网址");
        hashMap.push(resolveUrl(url))
        render(hashMap);
    })
    //添加删除按钮，当手机长按的时候出现

    let timeOutEvent=0;//定时器
    $(function(){
        $(".siteGroup").find("li:not(.iconAdd)").find("a").on({
            //手指开始按时设置定时器，超过500毫秒就执行longPress()
            touchstart: function(e){
                timeOutEvent = setTimeout(()=>{
                    timeOutEvent = 0;
                    //执行长按事件的行为
                    if(window.confirm("确定要删除这个导航吗")){
                        const  index = hashMap.indexOf(e.currentTarget.getAttribute("href"));
                        if (index >= 0){
                            hashMap.splice(index,1);
                        }
                        render(hashMap);
                    }
                },500);
                e.preventDefault();
            },
            //如果手指滑动只是说明用户不想长按只想滑动，所以要取消定时器,并还原，
            //如果不还原的话，返回的定时器的值都会是不同的
            touchmove: function(){
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
            },
            //长按没有超过500毫秒，手指离开，执行点击事件，取消定时器
            touchend: function(e){
                clearTimeout(timeOutEvent);
                if(timeOutEvent !== 0){
                    window.open(e.currentTarget.href)
                }
                return false;
            }
        })
    });
    window.onbeforeunload = ()=>{
        localStorage.setItem("hashMap",JSON.stringify(hashMap));
    }
})
// 从当地的localStorage中取出数组并做好处理
function getUrl(){
    let hashMap = localStorage.getItem("hashMap");
    if (hashMap && hashMap.length !== 2){
        hashMap = JSON.parse(hashMap)
        return  hashMap;
    }else{
        hashMap = ["https://www.acfun.cn","https://www.bilibili.com"]
        return hashMap
    }
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
    $(".siteGroup").find("li:not(.iconAdd)").remove()
    arr.forEach((url)=>{
        let valueUrl =  resolutionOfDomain(url);
        $(`<li>
                <a href="${url}">
                    <div class="iconSite">${valueUrl[0].toUpperCase()}</div>
                    <div class="iconTags">${valueUrl}</div>
                </a>
            </li>`).insertBefore(".iconAdd")
        }
    )
}

// 处理li上的域名的显示
function resolutionOfDomain(url){
    return url.replace("https://","").replace("www.","")
}
