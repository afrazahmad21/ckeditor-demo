(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(t,e,a){t.exports=a(68)},28:function(t,e,a){},68:function(t,e,a){"use strict";a.r(e);var n=a(0),o=a.n(n),r=a(13),i=a.n(r),c=(a(28),a(14)),l=a(15),s=a(20),d=a(16),u=a(21),h=a(17),m=a.n(h),p=a(18),v=a.n(p),g=a(19),w=a.n(g),E="".concat("http://localhost:3010","/save"),f=function(t){function e(){var t,a;Object(c.a)(this,e);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(s.a)(this,(t=Object(d.a)(e)).call.apply(t,[this].concat(o)))).state={dataCK:"<p>Edit Here</p>"},a.onChange=function(t,e){var n=e.getData();console.log({event:t,editor:e,data:n}),a.setState({dataCK:n})},a.onSubmit=function(t){var e=a.state.dataCK;w.a.post(E,{data:e},{auth:{username:"ckeditor",password:"pakistan123"}}).then(function(t){var e=t.data.message;alert(e)}).catch(function(t){var e=t.data.message;alert(e)})},a}return Object(u.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this.state.dataCK;return t=t.split("\\n").join("\n"),o.a.createElement("div",{className:"App"},o.a.createElement("h2",null," CKEditor 5 "),o.a.createElement(m.a,{editor:v.a,data:"<p>Edit here</p>",onInit:function(t){console.log("Editor is ready to use!",t)},onChange:this.onChange}),o.a.createElement("div",{style:{marginTop:"20px",fontWeight:"bold"}},o.a.createElement("label",null,"Code")),o.a.createElement("div",{style:{marginTop:"10px"}},o.a.createElement("textarea",{rows:7,cols:100,value:t})),o.a.createElement("div",null,o.a.createElement("button",{type:"button",onClick:this.onSubmit},"Save HTML")))}}]),e}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[22,1,2]]]);
//# sourceMappingURL=main.2cd4565e.chunk.js.map