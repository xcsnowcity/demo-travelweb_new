import 'nav4.css';
import getData from 'api/getData.js';
import render from './nav4.art';
import render2 from './menu-2.art';
const menu=document.getElementById('menu-layout');

// {{include './components/menu/nav4.art'}} 
const url='https://www.imooc.com/api/mall-PC/index/menu'
getData(url).then(data=>{
    menu.innerHTML=render({
        items:data
    });
    var nav4Ul = document.getElementById('nav4-ul');
    var lis = nav4Ul.querySelectorAll('li');
    var nav4 = document.getElementById('nav4');
    var rightTabs = nav4.querySelectorAll('.right');
    //mouseenter 、mouseleave不会冒泡（bubble），也就是说当指针从它的子层物理空间移到它的物理空间上，或反过来，都不会触发
    //而mouseover、mouseout 冒泡，只要有进入和离开就会出触发,无论是从父元素到子元素还是子元素到父元素，或者是只对父元素进行操作（换句话说，会触发mouseenter和mouseleave的时候一定会触发mouseover和mouseout）
    //所以事件委托需要用mouseover而不是mouseenter
    nav4Ul.onmouseover = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {
            // var name = e.target.getAttribute('data-li');
            let name = e.target.getAttribute('data-li');
            let item=e.target;
            const menu2=document.getElementById(`${name}`);
            for (var i = 0; i < rightTabs.length; i++) {
                var rightTabsLi=rightTabs[i].getAttribute('data-li');
                if (rightTabsLi== name) {
                    rightTabs[i].className = 'right'+(i+1)+' right current';
                } else {
                    rightTabs[i].className ='right'+(i+1)+' right';
                }
            }
            if(!e.target.dataset.done){
                let html2=`https://www.imooc.com/api/mall-PC/index/menu/${name}`
                getData(html2).then(data=>{
                    item.dataset.done='done';
                    console.log(data);
                    menu2.innerHTML=render2({
                        items:data
                    })
                })
            }
            
            
        }
    }

    nav4.onmouseleave=function(){
        for (var i = 0; i < rightTabs.length; i++) {
            rightTabs[i].className ='right'+(i+1)+' right';
        }
    }
    var ul = document.getElementById('carousel');
    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var cloneNode = ul.firstElementChild.cloneNode(true);
    ul.appendChild(cloneNode);
    var idx = 0;
    var dots = document.getElementById('dots')
    var liss = dots.getElementsByTagName('li');
    var lock=true;
    var imageBanner=document.getElementById('imageBanner');
    function curdot() {
        for (var i = 0; i < 5; i++) {
            // 排他操作用遍历
            if(i==(-idx)%5){
                liss[i].className='cur';
            }else{
                liss[i].className='';
            }
        }
    }
    
    function rightClickHandler() {
        if(!lock) return;
        lock=false;
        ul.style.transition = 'transform .6s ease 0s';
        idx--;
        if (idx == -5) {
            setTimeout(function () {
                ul.style.transition = 'none';
                ul.style.transform = 'none';
                idx = 0;
            }, 600)
        }
        ul.style.transform = 'translateX(' + idx * 1355 + 'px)';
        curdot();
        setTimeout(function(){
            lock = true;
        },600)
    }

    right.onclick = rightClickHandler;

    left.onclick = function () {
        if(!lock) return;//事件监听的时候注意函数节流，避免过量触发
        lock=false;
        if (idx == 0) {
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + (-5) * 1355 + 'px)';
            idx = -4;
            setTimeout(function () {
                ul.style.transition = 'transform .6s ease 0s';
                ul.style.transform = 'translateX(' + (-4) * 1355 + 'px)';
            }, 0)
        } else {
            idx++;
            ul.style.transition = 'transform .6s ease 0s';
            ul.style.transform = 'translateX(' + idx * 1355 + 'px)';
        }
        curdot();
        setTimeout(function(){
            lock=true;
        },600)
    }

    dots.onclick=function(e){
        //事件委托/代理的时候，一定要监听会冒泡的事件，这样触发子元素后，经过冒泡，父元素才能捕获到事件的发生
        if(e.target.tagName.toLowerCase()=='li'){
            var dotsN=e.target.getAttribute('data-n');
            idx=(-dotsN);
            curdot();
            ul.style.transition = 'transform .6s ease 0s';
            ul.style.transform = 'translateX(' + idx * 1355 + 'px)';

        }
    }

    var timer = setInterval(rightClickHandler,1500);

    ul.onmouseenter=function(){
        //mouseenter 、mouseleave不会冒泡（bubble），也就是说当指针从它的子层物理空间移到它的物理空间上，或反过来，都不会触发
        //而mouseover、mouseout 冒泡，只要有进入和离开就会出触发,无论是从父元素到子元素还是子元素到父元素，或者是只对父元素进行操作（换句话说，会触发mouseenter和mouseleave的时候一定会触发mouseover和mouseout）
        clearInterval(timer);
    }

    ul.onmouseleave=function(){
        clearInterval(timer);
        timer = setInterval(rightClickHandler,1500);
    }
}).then();

