import 'xxsw.css';
import getData from 'api/getData.js';
import render from './xxsw.art';
const news=document.querySelector('.new');
// {{include './components/xin_xian_shuai_wei/xxsw.art'}}
const url='https://www.imooc.com/api/mall-PC/index/seckill'
getData(url).then(data=>{
    news.innerHTML=render({
        items:data
    })
});