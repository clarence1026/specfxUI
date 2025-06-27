"use strict";var e=require("react");exports.useOutsideClick=function(t,n){e.useEffect(function(){var e=function(e){t.current&&!t.current.contains(e.target)&&n()};return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}},[t,n])};
//# sourceMappingURL=index.js.map
