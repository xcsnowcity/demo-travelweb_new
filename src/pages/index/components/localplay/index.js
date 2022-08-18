import './localplay.css';
import getData from 'api/getData.js';
import render from './items.art';
const local=document.querySelector('.nav8 .items');
const url='https://www.imooc.com/api/mall-PC/index/local_fun'
getData(url).then(data=>{
    // console.log(data);
    local.innerHTML=render(data)
});