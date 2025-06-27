import{useEffect as n}from"react";var t=function(t,e){n(function(){var n=function(n){t.current&&!t.current.contains(n.target)&&e()};return document.addEventListener("mousedown",n),function(){document.removeEventListener("mousedown",n)}},[t,e])};export{t as useOutsideClick};
//# sourceMappingURL=index.esm.js.map
