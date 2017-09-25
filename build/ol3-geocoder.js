/*!
 * ol3-geocoder - v2.5.0
 * A geocoder extension for OpenLayers.
 * https://github.com/jonataswalker/ol3-geocoder
 * Built: Mon Sep 25 2017 14:35:49 GMT+0100 (BST)
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Geocoder=t()}(this,function(){"use strict";var e={namespace:"ol-geocoder",spin:"gcd-pseudo-rotate",hidden:"gcd-hidden",country:"gcd-country",city:"gcd-city",road:"gcd-road",olControl:"ol-control",glass:{container:"gcd-gl-container",control:"gcd-gl-control",button:"gcd-gl-btn",input:"gcd-gl-input",expanded:"gcd-gl-expanded",reset:"gcd-gl-reset",result:"gcd-gl-result"},inputText:{container:"gcd-txt-container",control:"gcd-txt-control",input:"gcd-txt-input",reset:"gcd-txt-reset",icon:"gcd-txt-glass",result:"gcd-txt-result"}},t={inputQueryId:"gcd-input-query",inputResetId:"gcd-input-reset",cssClasses:e},s=Object.freeze({inputQueryId:"gcd-input-query",inputResetId:"gcd-input-reset",cssClasses:e,default:t}),n={ADDRESSCHOSEN:"addresschosen"},r={NOMINATIM:"nominatim",REVERSE:"reverse"},a={GLASS:"glass-button",INPUT:"text-input"},o=s,i=[new ol.style.Style({image:new ol.style.Icon({anchor:[.5,1],scale:.7,src:"//cdn.rawgit.com/jonataswalker/map-utils/master/images/marker.png"})})],l={OSM:"osm",MAPQUEST:"mapquest",GOOGLE:"google",PHOTON:"photon",BING:"bing",PELIAS:"pelias"},c={provider:l.OSM,placeholder:"Search for an address",featureStyle:i,targetType:a.GLASS,lang:"en-US",limit:5,keepOpen:!1,preventDefault:!1,autoComplete:!1,autoCompleteMinLength:2,debug:!1},u={toQueryString:function(e){var t=this;return Object.keys(e).reduce(function(s,n){return s.push("object"==typeof e[n]?t.toQueryString(e[n]):encodeURIComponent(n)+"="+encodeURIComponent(e[n])),s},[]).join("&")},encodeUrlXhr:function(e,t){if(t&&"object"==typeof t){var s=this.toQueryString(t);e+=(/\?/.test(e)?"&":"?")+s}return e},json:function(e,t){var s=new XMLHttpRequest,n="",r="",a={},o=function(){200===s.status&&a.ready.call(void 0,JSON.parse(s.response))},i=function(){console.error("Cannot XHR "+JSON.stringify(e))};return"object"==typeof e?(n=e.url,t=e.data,r=e.data_type||"json"):n=e,n=this.encodeUrlXhr(n,t),"jsonp"===r?this.jsonp(n,e.callbackName,function(e){a.ready.call(void 0,e)}):(s.open("GET",n,!0),s.setRequestHeader("Accept","application/json"),s.onload=o,s.onerror=i,s.send(null)),{when:function(e){a.ready=e.ready}}},jsonp:function(e,t,s){var n=document.head,r=document.createElement("script"),a="f"+Math.round(Math.random()*Date.now());r.setAttribute("src",e+(e.indexOf("?")>0?"&":"?")+t+"="+a),window[a]=function(e){window[a]=void 0,setTimeout(function(){n.removeChild(r)},0),s(e)},n.appendChild(r)},now:function(){if("performance"in window==!1&&(window.performance={}),Date.now=Date.now||function(){return(new Date).getTime()},"now"in window.performance==!1){var e=Date.now();performance.timing&&performance.timing.navigationStart&&(e=performance.timing.navigationStart),window.performance.now=function(){return Date.now()-e}}return window.performance.now()},flyTo:function(e,t,s,n){n=n||2.388657133911758,s=s||500,e.getView().animate({duration:s,resolution:n},{duration:s,center:t})},randomId:function(e){var t=this.now().toString(36);return e?e+t:t},isNumeric:function(e){return/^\d+$/.test(e)},classRegex:function(e){return new RegExp("(^|\\s+) "+e+" (\\s+|$)")},addClass:function(e,t,s){var n=this;if(Array.isArray(e))return void e.forEach(function(e){n.addClass(e,t)});for(var r=Array.isArray(t)?t:t.split(/\s+/),a=r.length;a--;)n.hasClass(e,r[a])||n._addClass(e,r[a],s)},_addClass:function(e,t,s){var n=this;e.classList?e.classList.add(t):e.className=(e.className+" "+t).trim(),s&&this.isNumeric(s)&&window.setTimeout(function(){n._removeClass(e,t)},s)},removeClass:function(e,t,s){var n=this;if(Array.isArray(e))return void e.forEach(function(e){n.removeClass(e,t,s)});for(var r=Array.isArray(t)?t:t.split(/\s+/),a=r.length;a--;)n.hasClass(e,r[a])&&n._removeClass(e,r[a],s)},_removeClass:function(e,t,s){var n=this;e.classList?e.classList.remove(t):e.className=e.className.replace(this.classRegex(t)," ").trim(),s&&this.isNumeric(s)&&window.setTimeout(function(){n._addClass(e,t)},s)},hasClass:function(e,t){return e.classList?e.classList.contains(t):this.classRegex(t).test(e.className)},toggleClass:function(e,t){var s=this;if(Array.isArray(e))return void e.forEach(function(e){s.toggleClass(e,t)});e.classList?e.classList.toggle(t):this.hasClass(e,t)?this._removeClass(e,t):this._addClass(e,t)},find:function(e,t,s){void 0===t&&(t=window.document);var n=/^(#?[\w-]+|\.[\w-.]+)$/,r=/\./g,a=Array.prototype.slice,o=[];if(n.test(e))switch(e[0]){case"#":o=[this.$(e.substr(1))];break;case".":o=a.call(t.getElementsByClassName(e.substr(1).replace(r," ")));break;default:o=a.call(t.getElementsByTagName(e))}else o=a.call(t.querySelectorAll(e));return s?o:o[0]},$:function(e){return e="#"===e[0]?e.substr(1,e.length):e,document.getElementById(e)},isElement:function(e){return"HTMLElement"in window?!!e&&e instanceof HTMLElement:!!e&&"object"==typeof e&&1===e.nodeType&&!!e.nodeName},getAllChildren:function(e,t){return[].slice.call(e.getElementsByTagName(t))},isEmpty:function(e){return!e||0===e.length},emptyArray:function(e){for(;e.length;)e.pop()},anyMatchInArray:function(e,t){return e.some(function(e){return t.indexOf(e)>=0})},everyMatchInArray:function(e,t){return t.every(function(t){return e.indexOf(t)>=0})},anyItemHasValue:function(e,t){var s=this;return void 0===t&&(t=!1),Object.keys(e).forEach(function(n){s.isEmpty(e[n])||(t=!0)}),t},removeAllChildren:function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},removeAll:function(e){for(var t;t=e[0];)t.parentNode.removeChild(t)},getChildren:function(e,t){return[].filter.call(e.childNodes,function(e){return t?1===e.nodeType&&e.tagName.toLowerCase()===t:1===e.nodeType})},template:function(e,t){var s=this;return e.replace(/\{ *([\w_-]+) *\}/g,function(e,n){var r=void 0===t[n]?"":t[n];return s.htmlEscape(r)})},htmlEscape:function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},mergeOptions:function(e,t){var s={};for(var n in e)s[n]=e[n];for(var r in t)s[r]=t[r];return s},createElement:function(e,t){var s;if(Array.isArray(e)){if(s=document.createElement(e[0]),e[1].id&&(s.id=e[1].id),e[1].classname&&(s.className=e[1].classname),e[1].attr){var n=e[1].attr;if(Array.isArray(n))for(var r=-1;++r<n.length;)s.setAttribute(n[r].name,n[r].value);else s.setAttribute(n.name,n.value)}}else s=document.createElement(e);s.innerHTML=t;for(var a=document.createDocumentFragment();s.childNodes[0];)a.appendChild(s.childNodes[0]);return s.appendChild(a),s},assert:function(e,t){if(void 0===t&&(t="Assertion failed"),!e){if("undefined"!=typeof Error)throw new Error(t);throw t}}},d=o.cssClasses,p=function(e){this.options=e.options,this.els=this.createControl()};p.prototype.createControl=function(){var e,t,s;return this.options.targetType===a.INPUT?(t=d.namespace+" "+d.inputText.container,e=u.createElement(["div",{classname:t}],p.input),s={container:e,control:u.find("."+d.inputText.control,e),input:u.find("."+d.inputText.input,e),reset:u.find("."+d.inputText.reset,e),result:u.find("."+d.inputText.result,e)}):(t=d.namespace+" "+d.glass.container,e=u.createElement(["div",{classname:t}],p.glass),s={container:e,control:u.find("."+d.glass.control,e),button:u.find("."+d.glass.button,e),input:u.find("."+d.glass.input,e),reset:u.find("."+d.glass.reset,e),result:u.find("."+d.glass.result,e)}),s.input.placeholder=this.options.placeholder,s},p.glass=['<div class="',d.glass.control," ",d.olControl,'">','<button type="button" class="',d.glass.button,'"></button>','<input type="text"',' id="',o.inputQueryId,'"',' class="',d.glass.input,'"',' autocomplete="off" placeholder="Search ...">',"<a",' id="',o.inputResetId,'"',' class="',d.glass.reset," ",d.hidden,'"',"></a>","</div>",'<ul class="',d.glass.result,'"></ul>'].join(""),p.input=['<div class="',d.inputText.control,'">','<input type="text"',' id="',o.inputQueryId,'"',' class="',d.inputText.input,'"',' autocomplete="off" placeholder="Search ...">','<span class="',d.inputText.icon,'"></span>','<button type="button"',' id="',o.inputResetId,'"',' class="',d.inputText.reset," ",d.hidden,'"',"></button>","</div>",'<ul class="',d.inputText.result,'"></ul>'].join("");var h=function(){this.settings={url:"//photon.komoot.de/api/",params:{q:"",limit:10,lang:"en"},langs:["de","it","fr","en"]}};h.prototype.getParameters=function(e){return e.lang=e.lang.toLowerCase(),{url:this.settings.url,params:{q:e.query,limit:e.limit||this.settings.params.limit,lang:this.settings.langs.indexOf(e.lang)>-1?e.lang:this.settings.params.lang}}},h.prototype.handleResponse=function(e){return e.map(function(e){return{lon:e.geometry.coordinates[0],lat:e.geometry.coordinates[1],address:{name:e.properties.name,postcode:e.properties.postcode,city:e.properties.city,state:e.properties.state,country:e.properties.country},original:{formatted:e.properties.name,details:e.properties}}})};var m=function(){this.settings={url:"//nominatim.openstreetmap.org/search/",params:{q:"",format:"json",addressdetails:1,limit:10,countrycodes:"","accept-language":"en-US"}}};m.prototype.getParameters=function(e){return{url:this.settings.url,params:{q:e.query,format:"json",addressdetails:1,limit:e.limit||this.settings.params.limit,countrycodes:e.countrycodes||this.settings.params.countrycodes,"accept-language":e.lang||this.settings.params["accept-language"]}}},m.prototype.handleResponse=function(e){return e.map(function(e){return{lon:e.lon,lat:e.lat,address:{name:e.address.neighbourhood||"",road:e.address.road||"",postcode:e.address.postcode,city:e.address.city||e.address.town,state:e.address.state,country:e.address.country},original:{formatted:e.display_name,details:e.address}}})};var g=function(){this.settings={url:"//open.mapquestapi.com/nominatim/v1/search.php",params:{q:"",key:"",format:"json",addressdetails:1,limit:10,countrycodes:"","accept-language":"en-US"}}};g.prototype.getParameters=function(e){return{url:this.settings.url,params:{q:e.query,key:e.key,format:"json",addressdetails:1,limit:e.limit||this.settings.params.limit,countrycodes:e.countrycodes||this.settings.params.countrycodes,"accept-language":e.lang||this.settings.params["accept-language"]}}},g.prototype.handleResponse=function(e){return e.map(function(e){return{lon:e.lon,lat:e.lat,address:{name:e.address.neighbourhood||"",road:e.address.road||"",postcode:e.address.postcode,city:e.address.city||e.address.town,state:e.address.state,country:e.address.country},original:{formatted:e.display_name,details:e.address}}})};var y=function(){this.settings={url:"//search.mapzen.com/v1/search",params:{text:"",key:"",size:10}}};y.prototype.getParameters=function(e){return{url:this.settings.url,params:{text:e.query,key:e.key,size:e.limit||this.settings.params.size}}},y.prototype.handleResponse=function(e){return e.map(function(e){return{lon:e.geometry.coordinates[0],lat:e.geometry.coordinates[1],address:{name:e.properties.name,house_number:e.properties.housenumber,postcode:e.properties.postalcode,road:e.properties.street,city:e.properties.city,state:e.properties.region,country:e.properties.country},original:{formatted:e.properties.label,details:e.properties}}})};var f=function(){this.settings={url:"//maps.googleapis.com/maps/api/geocode/json",params:{address:"",key:"",language:"en-US"}}};f.prototype.getParameters=function(e){return{url:this.settings.url,params:{address:e.query,key:e.key,language:e.lang||this.settings.params.language}}},f.prototype.handleResponse=function(e){var t=["point_of_interest","establishment","natural_feature","airport"],s=["street_address","route","sublocality_level_5","intersection"],n=["postal_code"],r=["locality"],a=["administrative_area_level_1"],o=["country"],i=function(e){var i={name:"",road:"",postcode:"",city:"",state:"",country:""};return e.forEach(function(e){u.anyMatchInArray(e.types,t)?i.name=e.long_name:u.anyMatchInArray(e.types,s)?i.road=e.long_name:u.anyMatchInArray(e.types,n)?i.postcode=e.long_name:u.anyMatchInArray(e.types,r)?i.city=e.long_name:u.anyMatchInArray(e.types,a)?i.state=e.long_name:u.anyMatchInArray(e.types,o)&&(i.country=e.long_name)}),i},l=[];return e.forEach(function(e){var t=i(e.address_components);u.anyItemHasValue(t)&&l.push({lon:e.geometry.location.lng,lat:e.geometry.location.lat,address:{name:t.name,postcode:t.postcode,road:t.road,city:t.city,state:t.state,country:t.country},original:{formatted:e.formatted_address,details:e.address_components}})}),l};var v=function(){this.settings={url:"//dev.virtualearth.net/REST/v1/Locations",callbackName:"jsonp",params:{query:"",key:"",includeNeighborhood:0,maxResults:10}}};v.prototype.getParameters=function(e){return{url:this.settings.url,callbackName:this.settings.callbackName,params:{query:e.query,key:e.key,includeNeighborhood:e.includeNeighborhood||this.settings.params.includeNeighborhood,maxResults:e.maxResults||this.settings.params.maxResults}}},v.prototype.handleResponse=function(e){return e.map(function(e){return{lon:e.point.coordinates[1],lat:e.point.coordinates[0],address:{name:e.name},original:{formatted:e.address.formattedAddress,details:e.address}}})};var w=o.cssClasses,C=function(e,t){this.Base=e,this.layerName=u.randomId("geocoder-layer-"),this.layer=new ol.layer.Vector({name:this.layerName,source:new ol.source.Vector}),this.options=e.options,this.options.provider="string"==typeof this.options.provider?this.options.provider.toLowerCase():this.options.provider,this.els=t,this.lastQuery="",this.container=this.els.container,this.registeredListeners={mapClick:!1},this.setListeners(),this.Photon=new h,this.OpenStreet=new m,this.MapQuest=new g,this.Pelias=new y,this.Google=new f,this.Bing=new v};return C.prototype.setListeners=function(){var e,t,s=this,n=function(){u.hasClass(s.els.control,w.glass.expanded)?s.collapse():s.expand()},r=function(e){var t=e.target.value.trim();(e.key?"Enter"===e.key:e.which?13===e.which:!!e.keyCode&&13===e.keyCode)&&(e.preventDefault(),s.query(t))},o=function(e){s.els.input.focus(),s.els.input.value="",s.lastQuery="",u.addClass(s.els.reset,w.hidden),s.clearResults()},i=function(n){var r=n.target.value.trim();r.length?u.removeClass(s.els.reset,w.hidden):u.addClass(s.els.reset,w.hidden),s.options.autoComplete&&r!==t&&(t=r,e&&clearTimeout(e),e=setTimeout(function(){r.length>=s.options.autoCompleteMinLength&&s.query(r)},200))};this.els.input.addEventListener("keypress",r,!1),this.els.input.addEventListener("input",i,!1),this.els.reset.addEventListener("click",o,!1),this.options.targetType===a.GLASS&&this.els.button.addEventListener("click",n,!1)},C.prototype.query=function(e){var t=this,s={},n=this.options,r=this.getProvider({query:e,provider:n.provider,key:n.key,lang:n.lang,countrycodes:n.countrycodes,limit:n.limit});this.lastQuery===e&&this.els.result.firstChild||(this.lastQuery=e,this.clearResults(),u.addClass(this.els.reset,w.spin),s.url=document.location.protocol+r.url,s.data=r.params,r.callbackName&&(s.data_type="jsonp",s.callbackName=r.callbackName),u.json(s).when({ready:function(e){n.debug&&console.info(e),u.removeClass(t.els.reset,w.spin);var s;switch(n.provider){case l.OSM:s=e.length?t.OpenStreet.handleResponse(e):void 0;break;case l.MAPQUEST:s=e.length?t.MapQuest.handleResponse(e):void 0;break;case l.PELIAS:s=e.features.length?t.Pelias.handleResponse(e.features):void 0;break;case l.PHOTON:s=e.features.length?t.Photon.handleResponse(e.features):void 0;break;case l.GOOGLE:s=e.results.length?t.Google.handleResponse(e.results):void 0;break;case l.BING:s=e.resourceSets[0].resources.length?t.Bing.handleResponse(e.resourceSets[0].resources):void 0;break;default:s=n.provider.handleResponse(e)}s&&(t.createList(s),t.listenMapClick())},error:function(){u.removeClass(t.els.reset,w.spin);var e=u.createElement("li","<h5>Error! No internet connection?</h5>");t.els.result.appendChild(e)}}))},C.prototype.createList=function(e){var t=this,s=this.els.result;e.forEach(function(e){var n=t.addressTemplate(e.address),r=['<a href="#">',n,"</a>"].join(""),a=u.createElement("li",r);a.addEventListener("click",function(s){s.preventDefault(),t.chosen(e,n,e.address,e.original)},!1),s.appendChild(a)})},C.prototype.chosen=function(e,t,s,r){var a=this.Base.getMap(),o=[parseFloat(e.lon),parseFloat(e.lat)],i=a.getView().getProjection(),l=ol.proj.transform(o,"EPSG:4326",i),c={formatted:t,details:s,original:r};if(!1===this.options.keepOpen&&this.clearResults(!0),!0===this.options.preventDefault)this.Base.dispatchEvent({type:n.ADDRESSCHOSEN,address:c,coordinate:l});else{u.flyTo(a,l);var d=this.createFeature(l,c);this.Base.dispatchEvent({type:n.ADDRESSCHOSEN,address:c,feature:d,coordinate:l})}},C.prototype.createFeature=function(e){var t=new ol.Feature(new ol.geom.Point(e));return this.addLayer(),t.setStyle(this.options.featureStyle),t.setId(u.randomId("geocoder-ft-")),this.getSource().addFeature(t),t},C.prototype.addressTemplate=function(e){var t=[];return e.name&&t.push(['<span class="',w.road,'">{name}</span>'].join("")),(e.road||e.building||e.house_number)&&t.push(['<span class="',w.road,'">{building} {road} {house_number}</span>'].join("")),(e.city||e.town||e.village)&&t.push(['<span class="',w.city,'">{postcode} {city} {town} {village}</span>'].join("")),(e.state||e.country)&&t.push(['<span class="',w.country,'">{state} {country}</span>'].join("")),u.template(t.join("<br>"),e)},C.prototype.getProvider=function(e){var t;switch(e.provider){case l.OSM:t=this.OpenStreet.getParameters(e);break;case l.MAPQUEST:t=this.MapQuest.getParameters(e);break;case l.PHOTON:t=this.Photon.getParameters(e);break;case l.GOOGLE:t=this.Google.getParameters(e);break;case l.PELIAS:t=this.Pelias.getParameters(e);break;case l.BING:t=this.Bing.getParameters(e);break;default:t=e.provider.getParameters(e)}return t},C.prototype.expand=function(){var e=this;u.removeClass(this.els.input,w.spin),u.addClass(this.els.control,w.glass.expanded),window.setTimeout(function(){return e.els.input.focus()},100),this.listenMapClick()},C.prototype.collapse=function(){this.els.input.value="",this.els.input.blur(),u.addClass(this.els.reset,w.hidden),u.removeClass(this.els.control,w.glass.expanded),this.clearResults()},C.prototype.listenMapClick=function(){if(!this.registeredListeners.mapClick){var e=this,t=this.Base.getMap().getTargetElement();this.registeredListeners.mapClick=!0,t.addEventListener("click",{handleEvent:function(s){e.clearResults(!0),t.removeEventListener(s.type,this,!1),e.registeredListeners.mapClick=!1}},!1)}},C.prototype.clearResults=function(e){e&&this.options.targetType===a.GLASS?this.collapse():u.removeAllChildren(this.els.result)},C.prototype.getSource=function(){return this.layer.getSource()},C.prototype.addLayer=function(){var e=this,t=!1,s=this.Base.getMap();s.getLayers().forEach(function(s){s===e.layer&&(t=!0)}),t||s.addLayer(this.layer)},function(e){function t(s,n){if(void 0===s&&(s=r.NOMINATIM),void 0===n&&(n={}),!(this instanceof t))return new t;u.assert("string"==typeof s,"@param `type` should be string!"),u.assert(s===r.NOMINATIM||s===r.REVERSE,"@param 'type' should be '"+r.NOMINATIM+"' or \n        '"+r.REVERSE+"'!"),u.assert("object"==typeof n,"@param `options` should be object!"),this.options=u.mergeOptions(c,n),this.container=void 0;var a,o=new p(this);s===r.NOMINATIM?(this.container=o.els.container,a=new C(this,o.els),this.layer=a.layer):r.REVERSE,e.call(this,{element:this.container})}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.getLayer=function(){return this.layer},t.prototype.getSource=function(){return this.getLayer().getSource()},t}(ol.control.Control)});
//# sourceMappingURL=ol3-geocoder.js.map