(this["webpackJsonpburger-app"]=this["webpackJsonpburger-app"]||[]).push([[4],{92:function(e,t,r){},96:function(e,t,r){"use strict";r.r(t);var n=r(4),a=r(5),c=r(7),i=r(6),s=r(0),o=r.n(s),u=r(13),d=(r(92),function(e){var t=[];for(var r in e.ingredients)t.push({name:r,amount:e.ingredients[r]});var n=t.map((function(e){return o.a.createElement("span",{className:"lead"},e.name,"(",e.amount,")"," ")}));return o.a.createElement("div",{className:"card bg-light text-dark mt-4"},o.a.createElement("div",{className:"card-header"},o.a.createElement("div",{className:"card-title"},"Your Order")),o.a.createElement("div",{className:"card-body"},o.a.createElement("p",null,"Ingredients: ",n),o.a.createElement("p",null,"Price: ",o.a.createElement("strong",null,"USD ",e.price.toFixed(2)))))}),l=r(18),p=r(45),m=r(15),h=r(33),f=function(e){Object(c.a)(r,e);var t=Object(i.a)(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(a.a)(r,[{key:"componentDidMount",value:function(){this.props.onFetchOrders(this.props.token,this.props.userId)}},{key:"render",value:function(){var e=o.a.createElement(h.a,null);return this.props.loading||(e=this.props.orders.map((function(e){return o.a.createElement(d,{key:e.id,ingredients:e.ingredients,price:e.price})}))),o.a.createElement("div",{className:"mt-8"},e)}}]),r}(s.Component);t.default=Object(u.b)((function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}}),(function(e){return{onFetchOrders:function(t,r){return e(m.d(t,r))}}}))(Object(p.a)(f,l.a))}}]);
//# sourceMappingURL=4.8921008c.chunk.js.map