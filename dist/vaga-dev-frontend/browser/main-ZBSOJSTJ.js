import{a as C}from"./chunk-4BJDB5SF.js";import{a as A}from"./chunk-LQ32WMQE.js";import{F as u,K as f,L as d,M as l,N as h,P as v,a as i,b as n,ba as g,c as p,e as m,h as r,i as a,k as s,v as c}from"./chunk-55L4PQFU.js";var M=(()=>{class t{constructor(){}isAuthenticated(){let o=!!sessionStorage.getItem("token");return i(o)}logout(){sessionStorage.removeItem("token")}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275prov=m({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var x=()=>{let t=r(M),k=r(h);return t.isAuthenticated().pipe(p(1),n(o=>o?!0:(k.navigate(["/login"]),!1)))};var I=[{path:"",pathMatch:"full",redirectTo:"home"},{path:"login",loadChildren:()=>import("./chunk-D6DXNOSS.js").then(t=>t.LoginModule)},{path:"home",loadChildren:()=>import("./chunk-UVNOP7EG.js").then(t=>t.HomeModule),canActivate:[x]}];var y={providers:[v(I),f(),s(g)]};var F=(()=>{class t{constructor(){this.title="vaga-dev-frontend"}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["app-root"]],standalone:!0,features:[u],decls:1,vars:0,template:function(e,S){e&1&&c(0,"router-outlet")},dependencies:[l,C,A]})}}return t})();d(F,y).catch(t=>console.error(t));
