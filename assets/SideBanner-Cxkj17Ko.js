import{a,b as c,d as s}from"./index-C14HsfuV.js";const u=(o,e)=>{let t;if(e==="email")t=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;else if(e==="password")t=/^[a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?`~-]{8,12}$/;else throw new Error("invalid type for validator");return t.test(o)},i=(o,e)=>{const t=o.__vccOpts||o;for(const[n,r]of e)t[n]=r;return t},l={},_={class:"side"},d=s("a",{href:"#"},[s("img",{class:"logoImg",src:"https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png",alt:""})],-1),g=s("img",{class:"d-m-n",src:"https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png",alt:"workImg"},null,-1),h=[d,g];function m(o,e){return a(),c("div",_,h)}const f=i(l,[["render",m]]);export{f as S,u as v};