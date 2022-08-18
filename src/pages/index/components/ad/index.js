import 'ad.css';
import getData from 'api/getData.js';
import render from './ad.art';
const ads=document.querySelector('.ads');
// {{include './components/ad/ad.art'}}
const url='https://www.imooc.com/api/mall-PC/index/ad'
getData(url).then(data=>{
    ads.innerHTML=render({
        items:data
    })
});
