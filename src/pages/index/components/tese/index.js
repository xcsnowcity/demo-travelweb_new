import './tese.css';
import getData from 'api/getData.js';
import render from './items.art';
const tese=document.querySelector('.nav9>ul');
const url='https://www.imooc.com/api/mall-PC/index/local_exp'
getData(url).then(data=>{
    // console.log(data);
    tese.innerHTML=render({
        items:data
    })
});