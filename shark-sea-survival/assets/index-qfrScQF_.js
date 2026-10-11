(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const La="180",Ch=0,oc=1,Ph=2,bl=1,El=2,Bn=3,ii=0,Ye=1,ve=2,ei=0,ji=1,Fr=2,ac=3,cc=4,Dh=5,xi=100,Lh=101,Ih=102,Uh=103,Nh=104,Fh=200,Oh=201,zh=202,Bh=203,Uo=204,No=205,kh=206,Hh=207,Vh=208,Gh=209,Wh=210,Xh=211,qh=212,Yh=213,Zh=214,Fo=0,Oo=1,zo=2,es=3,Bo=4,ko=5,Ho=6,Vo=7,wl=0,$h=1,Jh=2,ni=0,Kh=1,jh=2,Qh=3,Tl=4,tu=5,eu=6,nu=7,Al=300,ns=301,is=302,Go=303,Wo=304,Gr=306,ss=1e3,yi=1001,Xo=1002,sn=1003,iu=1004,Qs=1005,En=1006,$r=1007,Si=1008,An=1009,Rl=1010,Cl=1011,Us=1012,Ia=1013,wi=1014,wn=1015,Ys=1016,Ua=1017,Na=1018,Ns=1020,Pl=35902,Dl=35899,Ll=1021,Il=1022,xn=1023,Fs=1026,Os=1027,Fa=1028,Oa=1029,Ul=1030,za=1031,Ba=1033,Pr=33776,Dr=33777,Lr=33778,Ir=33779,qo=35840,Yo=35841,Zo=35842,$o=35843,Jo=36196,Ko=37492,jo=37496,Qo=37808,ta=37809,ea=37810,na=37811,ia=37812,sa=37813,ra=37814,oa=37815,aa=37816,ca=37817,la=37818,ha=37819,ua=37820,da=37821,fa=36492,pa=36494,ma=36495,ga=36283,_a=36284,va=36285,xa=36286,su=3200,ru=3201,Nl=0,ou=1,Kn="",Ue="srgb",rs="srgb-linear",Or="linear",le="srgb",Ui=7680,lc=519,au=512,cu=513,lu=514,Fl=515,hu=516,uu=517,du=518,fu=519,hc=35044,uc="300 es",Tn=2e3,zr=2001;class us{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let dc=1234567;const As=Math.PI/180,zs=180/Math.PI;function Pi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]).toLowerCase()}function jt(i,t,e){return Math.max(t,Math.min(e,i))}function ka(i,t){return(i%t+t)%t}function pu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function mu(i,t,e){return i!==t?(e-i)/(t-i):0}function Rs(i,t,e){return(1-e)*i+e*t}function gu(i,t,e,n){return Rs(i,t,1-Math.exp(-e*n))}function _u(i,t=1){return t-Math.abs(ka(i,t*2)-t)}function vu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function xu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Mu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function yu(i,t){return i+Math.random()*(t-i)}function Su(i){return i*(.5-Math.random())}function bu(i){i!==void 0&&(dc=i);let t=dc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Eu(i){return i*As}function wu(i){return i*zs}function Tu(i){return(i&i-1)===0&&i!==0}function Au(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ru(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Cu(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function $i(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function We(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Fe={DEG2RAD:As,RAD2DEG:zs,generateUUID:Pi,clamp:jt,euclideanModulo:ka,mapLinear:pu,inverseLerp:mu,lerp:Rs,damp:gu,pingpong:_u,smoothstep:vu,smootherstep:xu,randInt:Mu,randFloat:yu,randFloatSpread:Su,seededRandom:bu,degToRad:Eu,radToDeg:wu,isPowerOfTwo:Tu,ceilPowerOfTwo:Au,floorPowerOfTwo:Ru,setQuaternionFromProperEuler:Cu,normalize:We,denormalize:$i};class ft{constructor(t=0,e=0){ft.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zs{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],M=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=M;return}if(u!==M||c!==f||l!==d||h!==g){let m=1-a;const p=c*f+l*d+h*g+u*M,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const w=Math.sqrt(y),A=Math.atan2(w,p*v);m=Math.sin(m*A)/w,a=Math.sin(a*A)/w}const _=a*v;if(c=c*m+f*_,l=l*m+d*_,h=h*m+g*_,u=u*m+M*_,m===1-a){const w=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=w,l*=w,h*=w,u*=w}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(jt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(fc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(fc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Jr.copy(this).projectOnVector(t),this.sub(Jr)}reflect(t){return this.sub(Jr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jr=new P,fc=new Zs;class Jt{constructor(t,e,n,s,r,o,a,c,l){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],M=s[0],m=s[3],p=s[6],v=s[1],y=s[4],_=s[7],w=s[2],A=s[5],T=s[8];return r[0]=o*M+a*v+c*w,r[3]=o*m+a*y+c*A,r[6]=o*p+a*_+c*T,r[1]=l*M+h*v+u*w,r[4]=l*m+h*y+u*A,r[7]=l*p+h*_+u*T,r[2]=f*M+d*v+g*w,r[5]=f*m+d*y+g*A,r[8]=f*p+d*_+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return t[0]=u*M,t[1]=(s*l-h*n)*M,t[2]=(a*n-s*o)*M,t[3]=f*M,t[4]=(h*e-s*c)*M,t[5]=(s*r-a*e)*M,t[6]=d*M,t[7]=(n*c-l*e)*M,t[8]=(o*e-n*r)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Kr.makeScale(t,e)),this}rotate(t){return this.premultiply(Kr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Kr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Kr=new Jt;function Ol(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pu(){const i=Br("canvas");return i.style.display="block",i}const pc={};function Bs(i){i in pc||(pc[i]=!0,console.warn(i))}function Du(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const mc=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gc=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lu(){const i={enabled:!0,workingColorSpace:rs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===le&&(s.r=Hn(s.r),s.g=Hn(s.g),s.b=Hn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===le&&(s.r=Qi(s.r),s.g=Qi(s.g),s.b=Qi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Kn?Or:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Bs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Bs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[rs]:{primaries:t,whitePoint:n,transfer:Or,toXYZ:mc,fromXYZ:gc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:t,whitePoint:n,transfer:le,toXYZ:mc,fromXYZ:gc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}}),i}const se=Lu();function Hn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Qi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ni;class Iu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ni===void 0&&(Ni=Br("canvas")),Ni.width=t.width,Ni.height=t.height;const s=Ni.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ni}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Br("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Hn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Hn(e[n]/255)*255):e[n]=Hn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Uu=0;class Ha{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=Pi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(jr(s[o].image)):r.push(jr(s[o]))}else r=jr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function jr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Iu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Nu=0;const Qr=new P;class Ve extends us{constructor(t=Ve.DEFAULT_IMAGE,e=Ve.DEFAULT_MAPPING,n=yi,s=yi,r=En,o=Si,a=xn,c=An,l=Ve.DEFAULT_ANISOTROPY,h=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=Pi(),this.name="",this.source=new Ha(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ft(0,0),this.repeat=new ft(1,1),this.center=new ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Qr).x}get height(){return this.source.getSize(Qr).y}get depth(){return this.source.getSize(Qr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Al)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ss:t.x=t.x-Math.floor(t.x);break;case yi:t.x=t.x<0?0:1;break;case Xo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ss:t.y=t.y-Math.floor(t.y);break;case yi:t.y=t.y<0?0:1;break;case Xo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ve.DEFAULT_IMAGE=null;Ve.DEFAULT_MAPPING=Al;Ve.DEFAULT_ANISOTROPY=1;class Te{constructor(t=0,e=0,n=0,s=1){Te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],M=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+M)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,_=(d+1)/2,w=(p+1)/2,A=(h+f)/4,T=(u+M)/4,D=(g+m)/4;return y>_&&y>w?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=A/n,r=T/n):_>w?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=A/s,r=D/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=T/r,s=D/r),this.set(n,s,r,e),this}let v=Math.sqrt((m-g)*(m-g)+(u-M)*(u-M)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-M)/v,this.z=(f-h)/v,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this.w=jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this.w=jt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fu extends us{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:En,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Ve(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:En,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ha(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends Fu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class zl extends Ve{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ou extends Ve{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Di{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,fn):fn.fromBufferAttribute(r,o),fn.applyMatrix4(t.matrixWorld),this.expandByPoint(fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),tr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),tr.copy(n.boundingBox)),tr.applyMatrix4(t.matrixWorld),this.union(tr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fn),fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gs),er.subVectors(this.max,gs),Fi.subVectors(t.a,gs),Oi.subVectors(t.b,gs),zi.subVectors(t.c,gs),Gn.subVectors(Oi,Fi),Wn.subVectors(zi,Oi),ai.subVectors(Fi,zi);let e=[0,-Gn.z,Gn.y,0,-Wn.z,Wn.y,0,-ai.z,ai.y,Gn.z,0,-Gn.x,Wn.z,0,-Wn.x,ai.z,0,-ai.x,-Gn.y,Gn.x,0,-Wn.y,Wn.x,0,-ai.y,ai.x,0];return!to(e,Fi,Oi,zi,er)||(e=[1,0,0,0,1,0,0,0,1],!to(e,Fi,Oi,zi,er))?!1:(nr.crossVectors(Gn,Wn),e=[nr.x,nr.y,nr.z],to(e,Fi,Oi,zi,er))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ln=[new P,new P,new P,new P,new P,new P,new P,new P],fn=new P,tr=new Di,Fi=new P,Oi=new P,zi=new P,Gn=new P,Wn=new P,ai=new P,gs=new P,er=new P,nr=new P,ci=new P;function to(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ci.fromArray(i,r);const a=s.x*Math.abs(ci.x)+s.y*Math.abs(ci.y)+s.z*Math.abs(ci.z),c=t.dot(ci),l=e.dot(ci),h=n.dot(ci);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const zu=new Di,_s=new P,eo=new P;class Li{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):zu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;_s.subVectors(t,this.center);const e=_s.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(_s,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(eo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(_s.copy(t.center).add(eo)),this.expandByPoint(_s.copy(t.center).sub(eo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const In=new P,no=new P,ir=new P,Xn=new P,io=new P,sr=new P,so=new P;class Va{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){no.copy(t).add(e).multiplyScalar(.5),ir.copy(e).sub(t).normalize(),Xn.copy(this.origin).sub(no);const r=t.distanceTo(e)*.5,o=-this.direction.dot(ir),a=Xn.dot(this.direction),c=-Xn.dot(ir),l=Xn.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const M=1/h;u*=M,f*=M,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(no).addScaledVector(ir,f),d}intersectSphere(t,e){In.subVectors(t.center,this.origin);const n=In.dot(this.direction),s=In.dot(In)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,n,s,r){io.subVectors(e,t),sr.subVectors(n,t),so.crossVectors(io,sr);let o=this.direction.dot(so),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Xn.subVectors(this.origin,t);const c=a*this.direction.dot(sr.crossVectors(Xn,sr));if(c<0)return null;const l=a*this.direction.dot(io.cross(Xn));if(l<0||c+l>o)return null;const h=-a*Xn.dot(so);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pe{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,g,M,m){pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,M,m)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,M,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Bi.setFromMatrixColumn(t,0).length(),r=1/Bi.setFromMatrixColumn(t,1).length(),o=1/Bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,M=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-M*l,e[9]=-a*c,e[2]=M-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,g=l*h,M=l*u;e[0]=f+M*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=M+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,g=l*h,M=l*u;e[0]=f-M*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=M-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,M=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+M,e[1]=c*u,e[5]=M*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,g=a*c,M=a*l;e[0]=c*h,e[4]=M-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-M*u}else if(t.order==="XZY"){const f=o*c,d=o*l,g=a*c,M=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+M,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=M*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Bu,t,ku)}lookAt(t,e,n){const s=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),qn.crossVectors(n,Qe),qn.lengthSq()===0&&(Math.abs(n.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),qn.crossVectors(n,Qe)),qn.normalize(),rr.crossVectors(Qe,qn),s[0]=qn.x,s[4]=rr.x,s[8]=Qe.x,s[1]=qn.y,s[5]=rr.y,s[9]=Qe.y,s[2]=qn.z,s[6]=rr.z,s[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],M=n[6],m=n[10],p=n[14],v=n[3],y=n[7],_=n[11],w=n[15],A=s[0],T=s[4],D=s[8],S=s[12],x=s[1],C=s[5],U=s[9],z=s[13],Y=s[2],G=s[6],X=s[10],F=s[14],H=s[3],it=s[7],V=s[11],J=s[15];return r[0]=o*A+a*x+c*Y+l*H,r[4]=o*T+a*C+c*G+l*it,r[8]=o*D+a*U+c*X+l*V,r[12]=o*S+a*z+c*F+l*J,r[1]=h*A+u*x+f*Y+d*H,r[5]=h*T+u*C+f*G+d*it,r[9]=h*D+u*U+f*X+d*V,r[13]=h*S+u*z+f*F+d*J,r[2]=g*A+M*x+m*Y+p*H,r[6]=g*T+M*C+m*G+p*it,r[10]=g*D+M*U+m*X+p*V,r[14]=g*S+M*z+m*F+p*J,r[3]=v*A+y*x+_*Y+w*H,r[7]=v*T+y*C+_*G+w*it,r[11]=v*D+y*U+_*X+w*V,r[15]=v*S+y*z+_*F+w*J,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],M=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+M*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],M=t[13],m=t[14],p=t[15],v=u*m*l-M*f*l+M*c*d-a*m*d-u*c*p+a*f*p,y=g*f*l-h*m*l-g*c*d+o*m*d+h*c*p-o*f*p,_=h*M*l-g*u*l+g*a*d-o*M*d-h*a*p+o*u*p,w=g*u*c-h*M*c-g*a*f+o*M*f+h*a*m-o*u*m,A=e*v+n*y+s*_+r*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return t[0]=v*T,t[1]=(M*f*r-u*m*r-M*s*d+n*m*d+u*s*p-n*f*p)*T,t[2]=(a*m*r-M*c*r+M*s*l-n*m*l-a*s*p+n*c*p)*T,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*T,t[4]=y*T,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*T,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*T,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*T,t[8]=_*T,t[9]=(g*u*r-h*M*r-g*n*d+e*M*d+h*n*p-e*u*p)*T,t[10]=(o*M*r-g*a*r+g*n*l-e*M*l-o*n*p+e*a*p)*T,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*T,t[12]=w*T,t[13]=(h*M*s-g*u*s+g*n*f-e*M*f-h*n*m+e*u*m)*T,t[14]=(g*a*s-o*M*s-g*n*c+e*M*c+o*n*m-e*a*m)*T,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*T,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,M=o*h,m=o*u,p=a*u,v=c*l,y=c*h,_=c*u,w=n.x,A=n.y,T=n.z;return s[0]=(1-(M+p))*w,s[1]=(d+_)*w,s[2]=(g-y)*w,s[3]=0,s[4]=(d-_)*A,s[5]=(1-(f+p))*A,s[6]=(m+v)*A,s[7]=0,s[8]=(g+y)*T,s[9]=(m-v)*T,s[10]=(1-(f+M))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Bi.set(s[0],s[1],s[2]).length();const o=Bi.set(s[4],s[5],s[6]).length(),a=Bi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],pn.copy(this);const l=1/r,h=1/o,u=1/a;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=u,pn.elements[9]*=u,pn.elements[10]*=u,e.setFromRotationMatrix(pn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Tn,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let g,M;if(c)g=r/(o-r),M=o*r/(o-r);else if(a===Tn)g=-(o+r)/(o-r),M=-2*o*r/(o-r);else if(a===zr)g=-o/(o-r),M=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Tn,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let g,M;if(c)g=1/(o-r),M=o/(o-r);else if(a===Tn)g=-2/(o-r),M=-(o+r)/(o-r);else if(a===zr)g=-1/(o-r),M=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Bi=new P,pn=new pe,Bu=new P(0,0,0),ku=new P(1,1,1),qn=new P,rr=new P,Qe=new P,_c=new pe,vc=new Zs;class Rn{constructor(t=0,e=0,n=0,s=Rn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-jt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return _c.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_c,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return vc.setFromEuler(this),this.setFromQuaternion(vc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rn.DEFAULT_ORDER="XYZ";class Bl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Hu=0;const xc=new P,ki=new Zs,Un=new pe,or=new P,vs=new P,Vu=new P,Gu=new Zs,Mc=new P(1,0,0),yc=new P(0,1,0),Sc=new P(0,0,1),bc={type:"added"},Wu={type:"removed"},Hi={type:"childadded",child:null},ro={type:"childremoved",child:null};class Se extends us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=Pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Se.DEFAULT_UP.clone();const t=new P,e=new Rn,n=new Zs,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pe},normalMatrix:{value:new Jt}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=Se.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ki.setFromAxisAngle(t,e),this.quaternion.multiply(ki),this}rotateOnWorldAxis(t,e){return ki.setFromAxisAngle(t,e),this.quaternion.premultiply(ki),this}rotateX(t){return this.rotateOnAxis(Mc,t)}rotateY(t){return this.rotateOnAxis(yc,t)}rotateZ(t){return this.rotateOnAxis(Sc,t)}translateOnAxis(t,e){return xc.copy(t).applyQuaternion(this.quaternion),this.position.add(xc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Mc,t)}translateY(t){return this.translateOnAxis(yc,t)}translateZ(t){return this.translateOnAxis(Sc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?or.copy(t):or.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(vs,or,this.up):Un.lookAt(or,vs,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),ki.setFromRotationMatrix(Un),this.quaternion.premultiply(ki.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(bc),Hi.child=t,this.dispatchEvent(Hi),Hi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Wu),ro.child=t,this.dispatchEvent(ro),ro.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(bc),Hi.child=t,this.dispatchEvent(Hi),Hi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,t,Vu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,Gu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Se.DEFAULT_UP=new P(0,1,0);Se.DEFAULT_MATRIX_AUTO_UPDATE=!0;Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new P,Nn=new P,oo=new P,Fn=new P,Vi=new P,Gi=new P,Ec=new P,ao=new P,co=new P,lo=new P,ho=new Te,uo=new Te,fo=new Te;class vn{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),mn.subVectors(t,e),s.cross(mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){mn.subVectors(s,e),Nn.subVectors(n,e),oo.subVectors(t,e);const o=mn.dot(mn),a=mn.dot(Nn),c=mn.dot(oo),l=Nn.dot(Nn),h=Nn.dot(oo),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Fn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Fn.x),c.addScaledVector(o,Fn.y),c.addScaledVector(a,Fn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return ho.setScalar(0),uo.setScalar(0),fo.setScalar(0),ho.fromBufferAttribute(t,e),uo.fromBufferAttribute(t,n),fo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ho,r.x),o.addScaledVector(uo,r.y),o.addScaledVector(fo,r.z),o}static isFrontFacing(t,e,n,s){return mn.subVectors(n,e),Nn.subVectors(t,e),mn.cross(Nn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),mn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return vn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return vn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return vn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return vn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return vn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Vi.subVectors(s,n),Gi.subVectors(r,n),ao.subVectors(t,n);const c=Vi.dot(ao),l=Gi.dot(ao);if(c<=0&&l<=0)return e.copy(n);co.subVectors(t,s);const h=Vi.dot(co),u=Gi.dot(co);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Vi,o);lo.subVectors(t,r);const d=Vi.dot(lo),g=Gi.dot(lo);if(g>=0&&d<=g)return e.copy(r);const M=d*l-c*g;if(M<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Gi,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Ec.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(Ec,a);const p=1/(m+M+f);return o=M*p,a=f*p,e.copy(n).addScaledVector(Vi,o).addScaledVector(Gi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const kl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},ar={h:0,s:0,l:0};function po(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=se.workingColorSpace){if(t=ka(t,1),e=jt(e,0,1),n=jt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=po(o,r,t+1/3),this.g=po(o,r,t),this.b=po(o,r,t-1/3)}return se.colorSpaceToWorking(this,s),this}setStyle(t,e=Ue){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){const n=kl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Hn(t.r),this.g=Hn(t.g),this.b=Hn(t.b),this}copyLinearToSRGB(t){return this.r=Qi(t.r),this.g=Qi(t.g),this.b=Qi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return se.workingToColorSpace(ze.copy(this),t),Math.round(jt(ze.r*255,0,255))*65536+Math.round(jt(ze.g*255,0,255))*256+Math.round(jt(ze.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(ze.copy(this),e);const n=ze.r,s=ze.g,r=ze.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=Ue){se.workingToColorSpace(ze.copy(this),t);const e=ze.r,n=ze.g,s=ze.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Yn),this.setHSL(Yn.h+t,Yn.s+e,Yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Yn),t.getHSL(ar);const n=Rs(Yn.h,ar.h,e),s=Rs(Yn.s,ar.s,e),r=Rs(Yn.l,ar.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ze=new Wt;Wt.NAMES=kl;let Xu=0;class ds extends us{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=Pi(),this.name="",this.type="Material",this.blending=ji,this.side=ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Uo,this.blendDst=No,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ui,this.stencilZFail=Ui,this.stencilZPass=Ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ji&&(n.blending=this.blending),this.side!==ii&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Uo&&(n.blendSrc=this.blendSrc),this.blendDst!==No&&(n.blendDst=this.blendDst),this.blendEquation!==xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==es&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==lc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ui&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ui&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ui&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ga extends ds{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ae=new P,cr=new ft;let qu=0;class Ce{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=hc,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)cr.fromBufferAttribute(this,e),cr.applyMatrix3(t),this.setXY(e,cr.x,cr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=$i(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=We(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=$i(e,this.array)),e}setX(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=$i(e,this.array)),e}setY(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=$i(e,this.array)),e}setZ(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=$i(e,this.array)),e}setW(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),s=We(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),s=We(s,this.array),r=We(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==hc&&(t.usage=this.usage),t}}class Hl extends Ce{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Vl extends Ce{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Nt extends Ce{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Yu=0;const an=new pe,mo=new Se,Wi=new P,tn=new Di,xs=new Di,Ie=new P;class oe extends us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=Pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ol(t)?Vl:Hl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return an.makeRotationFromQuaternion(t),this.applyMatrix4(an),this}rotateX(t){return an.makeRotationX(t),this.applyMatrix4(an),this}rotateY(t){return an.makeRotationY(t),this.applyMatrix4(an),this}rotateZ(t){return an.makeRotationZ(t),this.applyMatrix4(an),this}translate(t,e,n){return an.makeTranslation(t,e,n),this.applyMatrix4(an),this}scale(t,e,n){return an.makeScale(t,e,n),this.applyMatrix4(an),this}lookAt(t){return mo.lookAt(t),mo.updateMatrix(),this.applyMatrix4(mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wi).negate(),this.translate(Wi.x,Wi.y,Wi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Nt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Di);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Li);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];xs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(tn.min,xs.min),tn.expandByPoint(Ie),Ie.addVectors(tn.max,xs.max),tn.expandByPoint(Ie)):(tn.expandByPoint(xs.min),tn.expandByPoint(xs.max))}tn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ie.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ie));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ie.fromBufferAttribute(a,l),c&&(Wi.fromBufferAttribute(t,l),Ie.add(Wi)),s=Math.max(s,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ce(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<n.count;D++)a[D]=new P,c[D]=new P;const l=new P,h=new P,u=new P,f=new ft,d=new ft,g=new ft,M=new P,m=new P;function p(D,S,x){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,x),f.fromBufferAttribute(r,D),d.fromBufferAttribute(r,S),g.fromBufferAttribute(r,x),h.sub(l),u.sub(l),d.sub(f),g.sub(f);const C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(M.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(C),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(C),a[D].add(M),a[S].add(M),a[x].add(M),c[D].add(m),c[S].add(m),c[x].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let D=0,S=v.length;D<S;++D){const x=v[D],C=x.start,U=x.count;for(let z=C,Y=C+U;z<Y;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const y=new P,_=new P,w=new P,A=new P;function T(D){w.fromBufferAttribute(s,D),A.copy(w);const S=a[D];y.copy(S),y.sub(w.multiplyScalar(w.dot(S))).normalize(),_.crossVectors(A,S);const C=_.dot(c[D])<0?-1:1;o.setXYZW(D,y.x,y.y,y.z,C)}for(let D=0,S=v.length;D<S;++D){const x=v[D],C=x.start,U=x.count;for(let z=C,Y=C+U;z<Y;z+=3)T(t.getX(z+0)),T(t.getX(z+1)),T(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ce(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new P,r=new P,o=new P,a=new P,c=new P,l=new P,h=new P,u=new P;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),M=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,M),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,M),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,g=0;for(let M=0,m=c.length;M<m;M++){a.isInterleavedBufferAttribute?d=c[M]*a.data.stride+a.offset:d=c[M]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Ce(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new oe,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wc=new pe,li=new Va,lr=new Li,Tc=new P,hr=new P,ur=new P,dr=new P,go=new P,fr=new P,Ac=new P,pr=new P;class St extends Se{constructor(t=new oe,e=new Ga){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){fr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(go.fromBufferAttribute(u,t),o?fr.addScaledVector(go,h):fr.addScaledVector(go.sub(e),h))}e.add(fr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere),lr.applyMatrix4(r),li.copy(t.ray).recast(t.near),!(lr.containsPoint(li.origin)===!1&&(li.intersectSphere(lr,Tc)===null||li.origin.distanceToSquared(Tc)>(t.far-t.near)**2))&&(wc.copy(r).invert(),li.copy(t.ray).applyMatrix4(wc),!(n.boundingBox!==null&&li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,li)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,M=f.length;g<M;g++){const m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let _=v,w=y;_<w;_+=3){const A=a.getX(_),T=a.getX(_+1),D=a.getX(_+2);s=mr(this,p,t,n,l,h,u,A,T,D),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),M=Math.min(a.count,d.start+d.count);for(let m=g,p=M;m<p;m+=3){const v=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);s=mr(this,o,t,n,l,h,u,v,y,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,M=f.length;g<M;g++){const m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let _=v,w=y;_<w;_+=3){const A=_,T=_+1,D=_+2;s=mr(this,p,t,n,l,h,u,A,T,D),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),M=Math.min(c.count,d.start+d.count);for(let m=g,p=M;m<p;m+=3){const v=m,y=m+1,_=m+2;s=mr(this,o,t,n,l,h,u,v,y,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Zu(i,t,e,n,s,r,o,a){let c;if(t.side===Ye?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===ii,a),c===null)return null;pr.copy(a),pr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(pr);return l<e.near||l>e.far?null:{distance:l,point:pr.clone(),object:i}}function mr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,hr),i.getVertexPosition(c,ur),i.getVertexPosition(l,dr);const h=Zu(i,t,e,n,hr,ur,dr,Ac);if(h){const u=new P;vn.getBarycoord(Ac,hr,ur,dr,u),s&&(h.uv=vn.getInterpolatedAttribute(s,a,c,l,u,new ft)),r&&(h.uv1=vn.getInterpolatedAttribute(r,a,c,l,u,new ft)),o&&(h.normal=vn.getInterpolatedAttribute(o,a,c,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new P,materialIndex:0};vn.getNormal(hr,ur,dr,f.normal),h.face=f,h.barycoord=u}return h}class dn extends oe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Nt(l,3)),this.setAttribute("normal",new Nt(h,3)),this.setAttribute("uv",new Nt(u,2));function g(M,m,p,v,y,_,w,A,T,D,S){const x=_/T,C=w/D,U=_/2,z=w/2,Y=A/2,G=T+1,X=D+1;let F=0,H=0;const it=new P;for(let V=0;V<X;V++){const J=V*C-z;for(let bt=0;bt<G;bt++){const Xt=bt*x-U;it[M]=Xt*v,it[m]=J*y,it[p]=Y,l.push(it.x,it.y,it.z),it[M]=0,it[m]=0,it[p]=A>0?1:-1,h.push(it.x,it.y,it.z),u.push(bt/T),u.push(1-V/D),F+=1}}for(let V=0;V<D;V++)for(let J=0;J<T;J++){const bt=f+J+G*V,Xt=f+J+G*(V+1),Ft=f+(J+1)+G*(V+1),Zt=f+(J+1)+G*V;c.push(bt,Xt,Zt),c.push(Xt,Ft,Zt),H+=6}a.addGroup(d,H,S),d+=H,f+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function os(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Xe(i){const t={};for(let e=0;e<i.length;e++){const n=os(i[e]);for(const s in n)t[s]=n[s]}return t}function $u(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Gl(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}const Ju={clone:os,merge:Xe};var Ku=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ju=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qe extends ds{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ku,this.fragmentShader=ju,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=os(t.uniforms),this.uniformsGroups=$u(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Wl extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Zn=new P,Rc=new ft,Cc=new ft;class ln extends Wl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=zs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(As*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zs*2*Math.atan(Math.tan(As*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Zn.x,Zn.y).multiplyScalar(-t/Zn.z),Zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Zn.x,Zn.y).multiplyScalar(-t/Zn.z)}getViewSize(t,e){return this.getViewBounds(t,Rc,Cc),e.subVectors(Cc,Rc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(As*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Xi=-90,qi=1;class Qu extends Se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ln(Xi,qi,t,e);s.layers=this.layers,this.add(s);const r=new ln(Xi,qi,t,e);r.layers=this.layers,this.add(r);const o=new ln(Xi,qi,t,e);o.layers=this.layers,this.add(o);const a=new ln(Xi,qi,t,e);a.layers=this.layers,this.add(a);const c=new ln(Xi,qi,t,e);c.layers=this.layers,this.add(c);const l=new ln(Xi,qi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===zr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=M,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Xl extends Ve{constructor(t=[],e=ns,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class td extends Ti{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Xl(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new dn(5,5,5),r=new qe({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:ei});r.uniforms.tEquirect.value=e;const o=new St(s,r),a=e.minFilter;return e.minFilter===Si&&(e.minFilter=En),new Qu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class fe extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ed={type:"move"};class _o{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const M of t.hand.values()){const m=e.getJointPose(M,n),p=this._getHandJoint(l,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ed)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new fe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Wa{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Wt(t),this.density=e}clone(){return new Wa(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ql extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class nd extends Ve{constructor(t=null,e=1,n=1,s,r,o,a,c,l=sn,h=sn,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pc extends Ce{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Yi=new pe,Dc=new pe,gr=[],Lc=new Di,id=new pe,Ms=new St,ys=new Li;class Ur extends St{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Pc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,id)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Di),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Yi),Lc.copy(t.boundingBox).applyMatrix4(Yi),this.boundingBox.union(Lc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Li),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Yi),ys.copy(t.boundingSphere).applyMatrix4(Yi),this.boundingSphere.union(ys)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ms.geometry=this.geometry,Ms.material=this.material,Ms.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ys.copy(this.boundingSphere),ys.applyMatrix4(n),t.ray.intersectsSphere(ys)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Yi),Dc.multiplyMatrices(n,Yi),Ms.matrixWorld=Dc,Ms.raycast(t,gr);for(let o=0,a=gr.length;o<a;o++){const c=gr[o];c.instanceId=r,c.object=this,e.push(c)}gr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Pc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new nd(new Float32Array(s*this.count),s,this.count,Fa,wn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const vo=new P,sd=new P,rd=new Jt;class gi{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=vo.subVectors(n,e).cross(sd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(vo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||rd.getNormalMatrix(t),s=this.coplanarPoint(vo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const hi=new Li,od=new ft(.5,.5),_r=new P;class Xa{constructor(t=new gi,e=new gi,n=new gi,s=new gi,r=new gi,o=new gi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Tn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],M=r[9],m=r[10],p=r[11],v=r[12],y=r[13],_=r[14],w=r[15];if(s[0].setComponents(l-o,d-h,p-g,w-v).normalize(),s[1].setComponents(l+o,d+h,p+g,w+v).normalize(),s[2].setComponents(l+a,d+u,p+M,w+y).normalize(),s[3].setComponents(l-a,d-u,p-M,w-y).normalize(),n)s[4].setComponents(c,f,m,_).normalize(),s[5].setComponents(l-c,d-f,p-m,w-_).normalize();else if(s[4].setComponents(l-c,d-f,p-m,w-_).normalize(),e===Tn)s[5].setComponents(l+c,d+f,p+m,w+_).normalize();else if(e===zr)s[5].setComponents(c,f,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(t){hi.center.set(0,0,0);const e=od.distanceTo(t.center);return hi.radius=.7071067811865476+e,hi.applyMatrix4(t.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(_r.x=s.normal.x>0?t.max.x:t.min.x,_r.y=s.normal.y>0?t.max.y:t.min.y,_r.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(_r)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class qa extends ds{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Ic=new pe,Ma=new Va,vr=new Li,xr=new P;class kr extends Se{constructor(t=new oe,e=new qa){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere),vr.applyMatrix4(s),vr.radius+=r,t.ray.intersectsSphere(vr)===!1)return;Ic.copy(s).invert(),Ma.copy(t.ray).applyMatrix4(Ic);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,M=d;g<M;g++){const m=l.getX(g);xr.fromBufferAttribute(u,m),Uc(xr,m,c,s,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,M=d;g<M;g++)xr.fromBufferAttribute(u,g),Uc(xr,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Uc(i,t,e,n,s,r,o){const a=Ma.distanceSqToPoint(i);if(a<e){const c=new P;Ma.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class fs extends Ve{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Yl extends Ve{constructor(t,e,n=wi,s,r,o,a=sn,c=sn,l,h=Fs,u=1){if(h!==Fs&&h!==Os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ha(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Zl extends Ve{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class as extends oe{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],c=[],l=[],h=e/2,u=Math.PI/2*t,f=e,d=2*u+f,g=n*2+r,M=s+1,m=new P,p=new P;for(let v=0;v<=g;v++){let y=0,_=0,w=0,A=0;if(v<=n){const S=v/n,x=S*Math.PI/2;_=-h-t*Math.cos(x),w=t*Math.sin(x),A=-t*Math.cos(x),y=S*u}else if(v<=n+r){const S=(v-n)/r;_=-h+S*e,w=t,A=0,y=u+S*f}else{const S=(v-n-r)/n,x=S*Math.PI/2;_=h+t*Math.sin(x),w=t*Math.cos(x),A=t*Math.sin(x),y=u+f+S*u}const T=Math.max(0,Math.min(1,y/d));let D=0;v===0?D=.5/s:v===g&&(D=-.5/s);for(let S=0;S<=s;S++){const x=S/s,C=x*Math.PI*2,U=Math.sin(C),z=Math.cos(C);p.x=-w*z,p.y=_,p.z=w*U,a.push(p.x,p.y,p.z),m.set(-w*z,A,w*U),m.normalize(),c.push(m.x,m.y,m.z),l.push(x+D,T)}if(v>0){const S=(v-1)*M;for(let x=0;x<s;x++){const C=S+x,U=S+x+1,z=v*M+x,Y=v*M+x+1;o.push(C,U,z),o.push(U,Y,z)}}}this.setIndex(o),this.setAttribute("position",new Nt(a,3)),this.setAttribute("normal",new Nt(c,3)),this.setAttribute("uv",new Nt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new as(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Ya extends oe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new P,h=new ft;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Nt(o,3)),this.setAttribute("normal",new Nt(a,3)),this.setAttribute("uv",new Nt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ya(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class we extends oe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const M=[],m=n/2;let p=0;v(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Nt(u,3)),this.setAttribute("normal",new Nt(f,3)),this.setAttribute("uv",new Nt(d,2));function v(){const _=new P,w=new P;let A=0;const T=(e-t)/n;for(let D=0;D<=r;D++){const S=[],x=D/r,C=x*(e-t)+t;for(let U=0;U<=s;U++){const z=U/s,Y=z*c+a,G=Math.sin(Y),X=Math.cos(Y);w.x=C*G,w.y=-x*n+m,w.z=C*X,u.push(w.x,w.y,w.z),_.set(G,T,X).normalize(),f.push(_.x,_.y,_.z),d.push(z,1-x),S.push(g++)}M.push(S)}for(let D=0;D<s;D++)for(let S=0;S<r;S++){const x=M[S][D],C=M[S+1][D],U=M[S+1][D+1],z=M[S][D+1];(t>0||S!==0)&&(h.push(x,C,z),A+=3),(e>0||S!==r-1)&&(h.push(C,U,z),A+=3)}l.addGroup(p,A,0),p+=A}function y(_){const w=g,A=new ft,T=new P;let D=0;const S=_===!0?t:e,x=_===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,m*x,0),f.push(0,x,0),d.push(.5,.5),g++;const C=g;for(let U=0;U<=s;U++){const Y=U/s*c+a,G=Math.cos(Y),X=Math.sin(Y);T.x=S*X,T.y=m*x,T.z=S*G,u.push(T.x,T.y,T.z),f.push(0,x,0),A.x=G*.5+.5,A.y=X*.5*x+.5,d.push(A.x,A.y),g++}for(let U=0;U<s;U++){const z=w+U,Y=C+U;_===!0?h.push(Y,Y+1,z):h.push(Y+1,Y,z),D+=3}l.addGroup(p,D,_===!0?1:2),p+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new we(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ks extends we{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new ks(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Wr extends oe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new Nt(r,3)),this.setAttribute("normal",new Nt(r.slice(),3)),this.setAttribute("uv",new Nt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new P,_=new P,w=new P;for(let A=0;A<e.length;A+=3)d(e[A+0],y),d(e[A+1],_),d(e[A+2],w),c(y,_,w,v)}function c(v,y,_,w){const A=w+1,T=[];for(let D=0;D<=A;D++){T[D]=[];const S=v.clone().lerp(_,D/A),x=y.clone().lerp(_,D/A),C=A-D;for(let U=0;U<=C;U++)U===0&&D===A?T[D][U]=S:T[D][U]=S.clone().lerp(x,U/C)}for(let D=0;D<A;D++)for(let S=0;S<2*(A-D)-1;S++){const x=Math.floor(S/2);S%2===0?(f(T[D][x+1]),f(T[D+1][x]),f(T[D][x])):(f(T[D][x+1]),f(T[D+1][x+1]),f(T[D+1][x]))}}function l(v){const y=new P;for(let _=0;_<r.length;_+=3)y.x=r[_+0],y.y=r[_+1],y.z=r[_+2],y.normalize().multiplyScalar(v),r[_+0]=y.x,r[_+1]=y.y,r[_+2]=y.z}function h(){const v=new P;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];const _=m(v)/2/Math.PI+.5,w=p(v)/Math.PI+.5;o.push(_,1-w)}g(),u()}function u(){for(let v=0;v<o.length;v+=6){const y=o[v+0],_=o[v+2],w=o[v+4],A=Math.max(y,_,w),T=Math.min(y,_,w);A>.9&&T<.1&&(y<.2&&(o[v+0]+=1),_<.2&&(o[v+2]+=1),w<.2&&(o[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function d(v,y){const _=v*3;y.x=t[_+0],y.y=t[_+1],y.z=t[_+2]}function g(){const v=new P,y=new P,_=new P,w=new P,A=new ft,T=new ft,D=new ft;for(let S=0,x=0;S<r.length;S+=9,x+=6){v.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),A.set(o[x+0],o[x+1]),T.set(o[x+2],o[x+3]),D.set(o[x+4],o[x+5]),w.copy(v).add(y).add(_).divideScalar(3);const C=m(w);M(A,x+0,v,C),M(T,x+2,y,C),M(D,x+4,_,C)}}function M(v,y,_,w){w<0&&v.x===1&&(o[y]=v.x-1),_.x===0&&_.z===0&&(o[y]=w/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wr(t.vertices,t.indices,t.radius,t.details)}}class Za extends Wr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Za(t.radius,t.detail)}}class Cn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ft:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new P,s=[],r=[],o=[],a=new P,c=new pe;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(jt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(jt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class $a extends Cn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ft){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class ad extends $a{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ja(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Mr=new P,xo=new Ja,Mo=new Ja,yo=new Ja;class si extends Cn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Mr.subVectors(s[0],s[1]).add(s[0]),l=Mr);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Mr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Mr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),d),M=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);M<1e-4&&(M=1),g<1e-4&&(g=M),m<1e-4&&(m=M),xo.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,M,m),Mo.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,M,m),yo.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,M,m)}else this.curveType==="catmullrom"&&(xo.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Mo.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),yo.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(xo.calc(c),Mo.calc(c),yo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Nc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function cd(i,t){const e=1-i;return e*e*t}function ld(i,t){return 2*(1-i)*i*t}function hd(i,t){return i*i*t}function Cs(i,t,e,n){return cd(i,t)+ld(i,e)+hd(i,n)}function ud(i,t){const e=1-i;return e*e*e*t}function dd(i,t){const e=1-i;return 3*e*e*i*t}function fd(i,t){return 3*(1-i)*i*i*t}function pd(i,t){return i*i*i*t}function Ps(i,t,e,n,s){return ud(i,t)+dd(i,e)+fd(i,n)+pd(i,s)}class $l extends Cn{constructor(t=new ft,e=new ft,n=new ft,s=new ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ft){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ps(t,s.x,r.x,o.x,a.x),Ps(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class md extends Cn{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ps(t,s.x,r.x,o.x,a.x),Ps(t,s.y,r.y,o.y,a.y),Ps(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Jl extends Cn{constructor(t=new ft,e=new ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ft){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class gd extends Cn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kl extends Cn{constructor(t=new ft,e=new ft,n=new ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ft){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Cs(t,s.x,r.x,o.x),Cs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jl extends Cn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Cs(t,s.x,r.x,o.x),Cs(t,s.y,r.y,o.y),Cs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ql extends Cn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ft){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Nc(a,c.x,l.x,h.x,u.x),Nc(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ft().fromArray(s))}return this}}var Hr=Object.freeze({__proto__:null,ArcCurve:ad,CatmullRomCurve3:si,CubicBezierCurve:$l,CubicBezierCurve3:md,EllipseCurve:$a,LineCurve:Jl,LineCurve3:gd,QuadraticBezierCurve:Kl,QuadraticBezierCurve3:jl,SplineCurve:Ql});class _d extends Cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Hr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Hr[s.type]().fromJSON(s))}return this}}class Fc extends _d{constructor(t){super(),this.type="Path",this.currentPoint=new ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Jl(this.currentPoint.clone(),new ft(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Kl(this.currentPoint.clone(),new ft(t,e),new ft(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new $l(this.currentPoint.clone(),new ft(t,e),new ft(n,s),new ft(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Ql(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new $a(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ai extends Fc{constructor(t){super(t),this.uuid=Pi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Fc().fromJSON(s))}return this}}function vd(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=th(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=bd(i,t,r,e)),i.length>80*e){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let f=e;f<s;f+=e){const d=i[f],g=i[f+1];d<a&&(a=d),g<c&&(c=g),d>h&&(h=d),g>u&&(u=g)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return Hs(r,o,e,a,c,l,0),o}function th(i,t,e,n,s){let r;if(s===Ud(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=Oc(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Oc(o/n|0,i[o],i[o+1],r);return r&&cs(r,r.next)&&(Gs(r),r=r.next),r}function Ri(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(cs(e,e.next)||ye(e.prev,e,e.next)===0)){if(Gs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Hs(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Rd(i,n,s,r);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?Md(i,n,s,r):xd(i)){t.push(c.i,i.i,l.i),Gs(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=yd(Ri(i),t),Hs(i,t,e,n,s,r,2)):o===2&&Sd(i,t,e,n,s,r):Hs(Ri(i),t,e,n,s,r,1);break}}}function xd(i){const t=i.prev,e=i,n=i.next;if(ye(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),f=Math.max(s,r,o),d=Math.max(a,c,l);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Es(s,a,r,c,o,l,g.x,g.y)&&ye(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Md(i,t,e,n){const s=i.prev,r=i,o=i.next;if(ye(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,c,l),g=Math.min(h,u,f),M=Math.max(a,c,l),m=Math.max(h,u,f),p=ya(d,g,t,e,n),v=ya(M,m,t,e,n);let y=i.prevZ,_=i.nextZ;for(;y&&y.z>=p&&_&&_.z<=v;){if(y.x>=d&&y.x<=M&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Es(a,h,c,u,l,f,y.x,y.y)&&ye(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=d&&_.x<=M&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Es(a,h,c,u,l,f,_.x,_.y)&&ye(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=M&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Es(a,h,c,u,l,f,y.x,y.y)&&ye(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=v;){if(_.x>=d&&_.x<=M&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Es(a,h,c,u,l,f,_.x,_.y)&&ye(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function yd(i,t){let e=i;do{const n=e.prev,s=e.next.next;!cs(n,s)&&nh(n,e,e.next,s)&&Vs(n,s)&&Vs(s,n)&&(t.push(n.i,e.i,s.i),Gs(e),Gs(e.next),e=i=s),e=e.next}while(e!==i);return Ri(e)}function Sd(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Dd(o,a)){let c=ih(o,a);o=Ri(o,o.next),c=Ri(c,c.next),Hs(o,t,e,n,s,r,0),Hs(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function bd(i,t,e,n){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=th(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(Pd(l))}s.sort(Ed);for(let r=0;r<s.length;r++)e=wd(s[r],e);return e}function Ed(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function wd(i,t){const e=Td(i,t);if(!e)return t;const n=ih(e,i);return Ri(n,n.next),Ri(e,e.next)}function Td(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,o;if(cs(i,e))return e;do{if(cs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&eh(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);Vs(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&Ad(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function Ad(i,t){return ye(i.prev,i,t.prev)<0&&ye(t.next,i,i.next)<0}function Rd(i,t,e,n){let s=i;do s.z===0&&(s.z=ya(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Cd(s)}function Cd(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function ya(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Pd(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function eh(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Es(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&eh(i,t,e,n,s,r,o,a)}function Dd(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Ld(i,t)&&(Vs(i,t)&&Vs(t,i)&&Id(i,t)&&(ye(i.prev,i,t.prev)||ye(i,t.prev,t))||cs(i,t)&&ye(i.prev,i,i.next)>0&&ye(t.prev,t,t.next)>0)}function ye(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function cs(i,t){return i.x===t.x&&i.y===t.y}function nh(i,t,e,n){const s=Sr(ye(i,t,e)),r=Sr(ye(i,t,n)),o=Sr(ye(e,n,i)),a=Sr(ye(e,n,t));return!!(s!==r&&o!==a||s===0&&yr(i,e,t)||r===0&&yr(i,n,t)||o===0&&yr(e,i,n)||a===0&&yr(e,t,n))}function yr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Sr(i){return i>0?1:i<0?-1:0}function Ld(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&nh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Vs(i,t){return ye(i.prev,i,i.next)<0?ye(i,t,i.next)>=0&&ye(i,i.prev,t)>=0:ye(i,t,i.prev)<0||ye(i,i.next,t)<0}function Id(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function ih(i,t){const e=Sa(i.i,i.x,i.y),n=Sa(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Oc(i,t,e,n){const s=Sa(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Gs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Sa(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ud(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Nd{static triangulate(t,e,n=2){return vd(t,e,n)}}class kn{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return kn.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];zc(t),Bc(n,t);let o=t.length;e.forEach(zc);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Bc(n,e[c]);const a=Nd.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function zc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Bc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Xr extends oe{constructor(t=new Ai([new ft(.5,.5),new ft(-.5,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new Nt(s,3)),this.setAttribute("uv",new Nt(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,M=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:Fd;let y,_=!1,w,A,T,D;p&&(y=p.getSpacedPoints(h),_=!0,f=!1,w=p.computeFrenetFrames(h,!1),A=new P,T=new P,D=new P),f||(m=0,d=0,g=0,M=0);const S=a.extractPoints(l);let x=S.shape;const C=S.holes;if(!kn.isClockWise(x)){x=x.reverse();for(let st=0,tt=C.length;st<tt;st++){const Q=C[st];kn.isClockWise(Q)&&(C[st]=Q.reverse())}}function z(st){const Q=10000000000000001e-36;let j=st[0];for(let pt=1;pt<=st.length;pt++){const ot=pt%st.length,mt=st[ot],qt=mt.x-j.x,Gt=mt.y-j.y,R=qt*qt+Gt*Gt,b=Math.max(Math.abs(mt.x),Math.abs(mt.y),Math.abs(j.x),Math.abs(j.y)),k=Q*b*b;if(R<=k){st.splice(ot,1),pt--;continue}j=mt}}z(x),C.forEach(z);const Y=C.length,G=x;for(let st=0;st<Y;st++){const tt=C[st];x=x.concat(tt)}function X(st,tt,Q){return tt||console.error("THREE.ExtrudeGeometry: vec does not exist"),st.clone().addScaledVector(tt,Q)}const F=x.length;function H(st,tt,Q){let j,pt,ot;const mt=st.x-tt.x,qt=st.y-tt.y,Gt=Q.x-st.x,R=Q.y-st.y,b=mt*mt+qt*qt,k=mt*R-qt*Gt;if(Math.abs(k)>Number.EPSILON){const Z=Math.sqrt(b),nt=Math.sqrt(Gt*Gt+R*R),$=tt.x-qt/Z,Lt=tt.y+mt/Z,dt=Q.x-R/nt,Ct=Q.y+Gt/nt,Pt=((dt-$)*R-(Ct-Lt)*Gt)/(mt*R-qt*Gt);j=$+mt*Pt-st.x,pt=Lt+qt*Pt-st.y;const at=j*j+pt*pt;if(at<=2)return new ft(j,pt);ot=Math.sqrt(at/2)}else{let Z=!1;mt>Number.EPSILON?Gt>Number.EPSILON&&(Z=!0):mt<-Number.EPSILON?Gt<-Number.EPSILON&&(Z=!0):Math.sign(qt)===Math.sign(R)&&(Z=!0),Z?(j=-qt,pt=mt,ot=Math.sqrt(b)):(j=mt,pt=qt,ot=Math.sqrt(b/2))}return new ft(j/ot,pt/ot)}const it=[];for(let st=0,tt=G.length,Q=tt-1,j=st+1;st<tt;st++,Q++,j++)Q===tt&&(Q=0),j===tt&&(j=0),it[st]=H(G[st],G[Q],G[j]);const V=[];let J,bt=it.concat();for(let st=0,tt=Y;st<tt;st++){const Q=C[st];J=[];for(let j=0,pt=Q.length,ot=pt-1,mt=j+1;j<pt;j++,ot++,mt++)ot===pt&&(ot=0),mt===pt&&(mt=0),J[j]=H(Q[j],Q[ot],Q[mt]);V.push(J),bt=bt.concat(J)}let Xt;if(m===0)Xt=kn.triangulateShape(G,C);else{const st=[],tt=[];for(let Q=0;Q<m;Q++){const j=Q/m,pt=d*Math.cos(j*Math.PI/2),ot=g*Math.sin(j*Math.PI/2)+M;for(let mt=0,qt=G.length;mt<qt;mt++){const Gt=X(G[mt],it[mt],ot);Ut(Gt.x,Gt.y,-pt),j===0&&st.push(Gt)}for(let mt=0,qt=Y;mt<qt;mt++){const Gt=C[mt];J=V[mt];const R=[];for(let b=0,k=Gt.length;b<k;b++){const Z=X(Gt[b],J[b],ot);Ut(Z.x,Z.y,-pt),j===0&&R.push(Z)}j===0&&tt.push(R)}}Xt=kn.triangulateShape(st,tt)}const Ft=Xt.length,Zt=g+M;for(let st=0;st<F;st++){const tt=f?X(x[st],bt[st],Zt):x[st];_?(T.copy(w.normals[0]).multiplyScalar(tt.x),A.copy(w.binormals[0]).multiplyScalar(tt.y),D.copy(y[0]).add(T).add(A),Ut(D.x,D.y,D.z)):Ut(tt.x,tt.y,0)}for(let st=1;st<=h;st++)for(let tt=0;tt<F;tt++){const Q=f?X(x[tt],bt[tt],Zt):x[tt];_?(T.copy(w.normals[st]).multiplyScalar(Q.x),A.copy(w.binormals[st]).multiplyScalar(Q.y),D.copy(y[st]).add(T).add(A),Ut(D.x,D.y,D.z)):Ut(Q.x,Q.y,u/h*st)}for(let st=m-1;st>=0;st--){const tt=st/m,Q=d*Math.cos(tt*Math.PI/2),j=g*Math.sin(tt*Math.PI/2)+M;for(let pt=0,ot=G.length;pt<ot;pt++){const mt=X(G[pt],it[pt],j);Ut(mt.x,mt.y,u+Q)}for(let pt=0,ot=C.length;pt<ot;pt++){const mt=C[pt];J=V[pt];for(let qt=0,Gt=mt.length;qt<Gt;qt++){const R=X(mt[qt],J[qt],j);_?Ut(R.x,R.y+y[h-1].y,y[h-1].x+Q):Ut(R.x,R.y,u+Q)}}}K(),rt();function K(){const st=s.length/3;if(f){let tt=0,Q=F*tt;for(let j=0;j<Ft;j++){const pt=Xt[j];Rt(pt[2]+Q,pt[1]+Q,pt[0]+Q)}tt=h+m*2,Q=F*tt;for(let j=0;j<Ft;j++){const pt=Xt[j];Rt(pt[0]+Q,pt[1]+Q,pt[2]+Q)}}else{for(let tt=0;tt<Ft;tt++){const Q=Xt[tt];Rt(Q[2],Q[1],Q[0])}for(let tt=0;tt<Ft;tt++){const Q=Xt[tt];Rt(Q[0]+F*h,Q[1]+F*h,Q[2]+F*h)}}n.addGroup(st,s.length/3-st,0)}function rt(){const st=s.length/3;let tt=0;wt(G,tt),tt+=G.length;for(let Q=0,j=C.length;Q<j;Q++){const pt=C[Q];wt(pt,tt),tt+=pt.length}n.addGroup(st,s.length/3-st,1)}function wt(st,tt){let Q=st.length;for(;--Q>=0;){const j=Q;let pt=Q-1;pt<0&&(pt=st.length-1);for(let ot=0,mt=h+m*2;ot<mt;ot++){const qt=F*ot,Gt=F*(ot+1),R=tt+j+qt,b=tt+pt+qt,k=tt+pt+Gt,Z=tt+j+Gt;te(R,b,k,Z)}}}function Ut(st,tt,Q){c.push(st),c.push(tt),c.push(Q)}function Rt(st,tt,Q){ue(st),ue(tt),ue(Q);const j=s.length/3,pt=v.generateTopUV(n,s,j-3,j-2,j-1);L(pt[0]),L(pt[1]),L(pt[2])}function te(st,tt,Q,j){ue(st),ue(tt),ue(j),ue(tt),ue(Q),ue(j);const pt=s.length/3,ot=v.generateSideWallUV(n,s,pt-6,pt-3,pt-2,pt-1);L(ot[0]),L(ot[1]),L(ot[3]),L(ot[1]),L(ot[2]),L(ot[3])}function ue(st){s.push(c[st*3+0]),s.push(c[st*3+1]),s.push(c[st*3+2])}function L(st){r.push(st.x),r.push(st.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Od(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Hr[s.type]().fromJSON(s)),new Xr(n,t.options)}}const Fd={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new ft(r,o),new ft(a,c),new ft(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],M=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ft(o,1-c),new ft(l,1-u),new ft(f,1-g),new ft(M,1-p)]:[new ft(a,1-c),new ft(h,1-u),new ft(d,1-g),new ft(m,1-p)]}};function Od(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ka extends Wr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ka(t.radius,t.detail)}}class Ne extends oe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],M=[],m=[];for(let p=0;p<h;p++){const v=p*f-o;for(let y=0;y<l;y++){const _=y*u-r;g.push(_,-v,0),M.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){const y=v+l*p,_=v+l*(p+1),w=v+1+l*(p+1),A=v+1+l*p;d.push(y,_,A),d.push(_,w,A)}this.setIndex(d),this.setAttribute("position",new Nt(g,3)),this.setAttribute("normal",new Nt(M,3)),this.setAttribute("uv",new Nt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ne(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ws extends oe{constructor(t=new Ai([new ft(0,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Nt(s,3)),this.setAttribute("normal",new Nt(r,3)),this.setAttribute("uv",new Nt(o,2));function l(h){const u=s.length/3,f=h.extractPoints(e);let d=f.shape;const g=f.holes;kn.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const v=g[m];kn.isClockWise(v)===!0&&(g[m]=v.reverse())}const M=kn.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const v=g[m];d=d.concat(v)}for(let m=0,p=d.length;m<p;m++){const v=d[m];s.push(v.x,v.y,0),r.push(0,0,1),o.push(v.x,v.y)}for(let m=0,p=M.length;m<p;m++){const v=M[m],y=v[0]+u,_=v[1]+u,w=v[2]+u;n.push(y,_,w),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return zd(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new Ws(n,t.curveSegments)}}function zd(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class hn extends oe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new P,f=new P,d=[],g=[],M=[],m=[];for(let p=0;p<=n;p++){const v=[],y=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let w=0;w<=e;w++){const A=w/e;u.x=-t*Math.cos(s+A*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+A*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),M.push(f.x,f.y,f.z),m.push(A+_,1-y),v.push(l++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){const y=h[p][v+1],_=h[p][v],w=h[p+1][v],A=h[p+1][v+1];(p!==0||o>0)&&d.push(y,_,A),(p!==n-1||c<Math.PI)&&d.push(_,w,A)}this.setIndex(d),this.setAttribute("position",new Nt(g,3)),this.setAttribute("normal",new Nt(M,3)),this.setAttribute("uv",new Nt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class un extends oe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new P,u=new P,f=new P;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const M=g/s*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(M),u.y=(t+e*Math.cos(m))*Math.sin(M),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(M),h.y=t*Math.sin(M),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const M=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,v=(s+1)*d+g;o.push(M,m,v),o.push(m,p,v)}this.setIndex(o),this.setAttribute("position",new Nt(a,3)),this.setAttribute("normal",new Nt(c,3)),this.setAttribute("uv",new Nt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new un(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class $s extends oe{constructor(t=new jl(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new P,c=new P,l=new ft;let h=new P;const u=[],f=[],d=[],g=[];M(),this.setIndex(g),this.setAttribute("position",new Nt(u,3)),this.setAttribute("normal",new Nt(f,3)),this.setAttribute("uv",new Nt(d,2));function M(){for(let y=0;y<e;y++)m(y);m(r===!1?e:0),v(),p()}function m(y){h=t.getPointAt(y/e,h);const _=o.normals[y],w=o.binormals[y];for(let A=0;A<=s;A++){const T=A/s*Math.PI*2,D=Math.sin(T),S=-Math.cos(T);c.x=S*_.x+D*w.x,c.y=S*_.y+D*w.y,c.z=S*_.z+D*w.z,c.normalize(),f.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function p(){for(let y=1;y<=e;y++)for(let _=1;_<=s;_++){const w=(s+1)*(y-1)+(_-1),A=(s+1)*y+(_-1),T=(s+1)*y+_,D=(s+1)*(y-1)+_;g.push(w,A,D),g.push(A,T,D)}}function v(){for(let y=0;y<=e;y++)for(let _=0;_<=s;_++)l.x=y/e,l.y=_/s,d.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new $s(new Hr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class re extends ds{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nl,this.normalScale=new ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Xs extends re{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ft(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return jt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Wt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Wt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Wt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Bd extends ds{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=su,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class kd extends ds{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class sh extends Se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Hd extends sh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const So=new pe,kc=new P,Hc=new P;class Vd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ft(512,512),this.mapType=An,this.map=null,this.mapPass=null,this.matrix=new pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xa,this._frameExtents=new ft(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;kc.setFromMatrixPosition(t.matrixWorld),e.position.copy(kc),Hc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Hc),e.updateMatrixWorld(),So.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(So,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(So)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class rh extends Wl{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Gd extends Vd{constructor(){super(new rh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wd extends sh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.shadow=new Gd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Xd extends ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Vc(i,t,e,n){const s=qd(n);switch(e){case Ll:return i*t;case Fa:return i*t/s.components*s.byteLength;case Oa:return i*t/s.components*s.byteLength;case Ul:return i*t*2/s.components*s.byteLength;case za:return i*t*2/s.components*s.byteLength;case Il:return i*t*3/s.components*s.byteLength;case xn:return i*t*4/s.components*s.byteLength;case Ba:return i*t*4/s.components*s.byteLength;case Pr:case Dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Lr:case Ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Yo:case $o:return Math.max(i,16)*Math.max(t,8)/4;case qo:case Zo:return Math.max(i,8)*Math.max(t,8)/2;case Jo:case Ko:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case jo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Qo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ta:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ea:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case na:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ia:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case sa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ra:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case oa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case aa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ca:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case la:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ha:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ua:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case da:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case fa:case pa:case ma:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ga:case _a:return Math.ceil(i/4)*Math.ceil(t/4)*8;case va:case xa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function qd(i){switch(i){case An:case Rl:return{byteLength:1,components:1};case Us:case Cl:case Ys:return{byteLength:2,components:1};case Ua:case Na:return{byteLength:2,components:4};case wi:case Ia:case wn:return{byteLength:4,components:1};case Pl:case Dl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:La}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=La);function oh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Yd(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],M=u[d];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++f,u[f]=M)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const M=u[d];i.bufferSubData(l,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Zd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$d=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Kd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ef=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,sf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,of=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,af=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,cf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,hf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,uf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,df=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ff=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_f=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,vf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Mf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,yf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ef=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Af=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Rf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Pf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Df=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Lf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,If=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Uf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ff=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Of=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Hf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Vf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Zf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$f=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Jf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ep=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,np=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ip=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,op=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ap=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,up=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_p=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,vp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ep=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ap=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Dp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Lp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ip=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Up=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Np=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Op=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,zp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Gp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Yp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Zp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$p=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,em=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,nm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,im=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,om=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,am=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,lm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,um=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,mm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_m=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ym=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Em=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Tm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Am=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kt={alphahash_fragment:Zd,alphahash_pars_fragment:$d,alphamap_fragment:Jd,alphamap_pars_fragment:Kd,alphatest_fragment:jd,alphatest_pars_fragment:Qd,aomap_fragment:tf,aomap_pars_fragment:ef,batching_pars_vertex:nf,batching_vertex:sf,begin_vertex:rf,beginnormal_vertex:of,bsdfs:af,iridescence_fragment:cf,bumpmap_pars_fragment:lf,clipping_planes_fragment:hf,clipping_planes_pars_fragment:uf,clipping_planes_pars_vertex:df,clipping_planes_vertex:ff,color_fragment:pf,color_pars_fragment:mf,color_pars_vertex:gf,color_vertex:_f,common:vf,cube_uv_reflection_fragment:xf,defaultnormal_vertex:Mf,displacementmap_pars_vertex:yf,displacementmap_vertex:Sf,emissivemap_fragment:bf,emissivemap_pars_fragment:Ef,colorspace_fragment:wf,colorspace_pars_fragment:Tf,envmap_fragment:Af,envmap_common_pars_fragment:Rf,envmap_pars_fragment:Cf,envmap_pars_vertex:Pf,envmap_physical_pars_fragment:Hf,envmap_vertex:Df,fog_vertex:Lf,fog_pars_vertex:If,fog_fragment:Uf,fog_pars_fragment:Nf,gradientmap_pars_fragment:Ff,lightmap_pars_fragment:Of,lights_lambert_fragment:zf,lights_lambert_pars_fragment:Bf,lights_pars_begin:kf,lights_toon_fragment:Vf,lights_toon_pars_fragment:Gf,lights_phong_fragment:Wf,lights_phong_pars_fragment:Xf,lights_physical_fragment:qf,lights_physical_pars_fragment:Yf,lights_fragment_begin:Zf,lights_fragment_maps:$f,lights_fragment_end:Jf,logdepthbuf_fragment:Kf,logdepthbuf_pars_fragment:jf,logdepthbuf_pars_vertex:Qf,logdepthbuf_vertex:tp,map_fragment:ep,map_pars_fragment:np,map_particle_fragment:ip,map_particle_pars_fragment:sp,metalnessmap_fragment:rp,metalnessmap_pars_fragment:op,morphinstance_vertex:ap,morphcolor_vertex:cp,morphnormal_vertex:lp,morphtarget_pars_vertex:hp,morphtarget_vertex:up,normal_fragment_begin:dp,normal_fragment_maps:fp,normal_pars_fragment:pp,normal_pars_vertex:mp,normal_vertex:gp,normalmap_pars_fragment:_p,clearcoat_normal_fragment_begin:vp,clearcoat_normal_fragment_maps:xp,clearcoat_pars_fragment:Mp,iridescence_pars_fragment:yp,opaque_fragment:Sp,packing:bp,premultiplied_alpha_fragment:Ep,project_vertex:wp,dithering_fragment:Tp,dithering_pars_fragment:Ap,roughnessmap_fragment:Rp,roughnessmap_pars_fragment:Cp,shadowmap_pars_fragment:Pp,shadowmap_pars_vertex:Dp,shadowmap_vertex:Lp,shadowmask_pars_fragment:Ip,skinbase_vertex:Up,skinning_pars_vertex:Np,skinning_vertex:Fp,skinnormal_vertex:Op,specularmap_fragment:zp,specularmap_pars_fragment:Bp,tonemapping_fragment:kp,tonemapping_pars_fragment:Hp,transmission_fragment:Vp,transmission_pars_fragment:Gp,uv_pars_fragment:Wp,uv_pars_vertex:Xp,uv_vertex:qp,worldpos_vertex:Yp,background_vert:Zp,background_frag:$p,backgroundCube_vert:Jp,backgroundCube_frag:Kp,cube_vert:jp,cube_frag:Qp,depth_vert:tm,depth_frag:em,distanceRGBA_vert:nm,distanceRGBA_frag:im,equirect_vert:sm,equirect_frag:rm,linedashed_vert:om,linedashed_frag:am,meshbasic_vert:cm,meshbasic_frag:lm,meshlambert_vert:hm,meshlambert_frag:um,meshmatcap_vert:dm,meshmatcap_frag:fm,meshnormal_vert:pm,meshnormal_frag:mm,meshphong_vert:gm,meshphong_frag:_m,meshphysical_vert:vm,meshphysical_frag:xm,meshtoon_vert:Mm,meshtoon_frag:ym,points_vert:Sm,points_frag:bm,shadow_vert:Em,shadow_frag:wm,sprite_vert:Tm,sprite_frag:Am},_t={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},yn={basic:{uniforms:Xe([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:Xe([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:Xe([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:Xe([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:Xe([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:Xe([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:Xe([_t.points,_t.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:Xe([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:Xe([_t.common,_t.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:Xe([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:Xe([_t.sprite,_t.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:Xe([_t.common,_t.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:Xe([_t.lights,_t.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};yn.physical={uniforms:Xe([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const br={r:0,b:0,g:0},ui=new Rn,Rm=new pe;function Cm(i,t,e,n,s,r,o){const a=new Wt(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function M(y){let _=!1;const w=g(y);w===null?p(a,c):w&&w.isColor&&(p(w,1),_=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,_){const w=g(_);w&&(w.isCubeTexture||w.mapping===Gr)?(h===void 0&&(h=new St(new dn(1,1,1),new qe({name:"BackgroundCubeMaterial",uniforms:os(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,T,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ui.copy(_.backgroundRotation),ui.x*=-1,ui.y*=-1,ui.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Rm.makeRotationFromEuler(ui)),h.material.toneMapped=se.getTransfer(w.colorSpace)!==le,(u!==w||f!==w.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=w,f=w.version,d=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new St(new Ne(2,2),new qe({name:"BackgroundMaterial",uniforms:os(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=se.getTransfer(w.colorSpace)!==le,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||f!==w.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=w,f=w.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,_){y.getRGB(br,Gl(i)),n.buffers.color.setClear(br.r,br.g,br.b,_,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),c=_,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:M,addToRenderList:m,dispose:v}}function Pm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(x,C,U,z,Y){let G=!1;const X=u(z,U,C);r!==X&&(r=X,l(r.object)),G=d(x,z,U,Y),G&&g(x,z,U,Y),Y!==null&&t.update(Y,i.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,_(x,C,U,z),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function u(x,C,U){const z=U.wireframe===!0;let Y=n[x.id];Y===void 0&&(Y={},n[x.id]=Y);let G=Y[C.id];G===void 0&&(G={},Y[C.id]=G);let X=G[z];return X===void 0&&(X=f(c()),G[z]=X),X}function f(x){const C=[],U=[],z=[];for(let Y=0;Y<e;Y++)C[Y]=0,U[Y]=0,z[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:U,attributeDivisors:z,object:x,attributes:{},index:null}}function d(x,C,U,z){const Y=r.attributes,G=C.attributes;let X=0;const F=U.getAttributes();for(const H in F)if(F[H].location>=0){const V=Y[H];let J=G[H];if(J===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(J=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(J=x.instanceColor)),V===void 0||V.attribute!==J||J&&V.data!==J.data)return!0;X++}return r.attributesNum!==X||r.index!==z}function g(x,C,U,z){const Y={},G=C.attributes;let X=0;const F=U.getAttributes();for(const H in F)if(F[H].location>=0){let V=G[H];V===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(V=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(V=x.instanceColor));const J={};J.attribute=V,V&&V.data&&(J.data=V.data),Y[H]=J,X++}r.attributes=Y,r.attributesNum=X,r.index=z}function M(){const x=r.newAttributes;for(let C=0,U=x.length;C<U;C++)x[C]=0}function m(x){p(x,0)}function p(x,C){const U=r.newAttributes,z=r.enabledAttributes,Y=r.attributeDivisors;U[x]=1,z[x]===0&&(i.enableVertexAttribArray(x),z[x]=1),Y[x]!==C&&(i.vertexAttribDivisor(x,C),Y[x]=C)}function v(){const x=r.newAttributes,C=r.enabledAttributes;for(let U=0,z=C.length;U<z;U++)C[U]!==x[U]&&(i.disableVertexAttribArray(U),C[U]=0)}function y(x,C,U,z,Y,G,X){X===!0?i.vertexAttribIPointer(x,C,U,Y,G):i.vertexAttribPointer(x,C,U,z,Y,G)}function _(x,C,U,z){M();const Y=z.attributes,G=U.getAttributes(),X=C.defaultAttributeValues;for(const F in G){const H=G[F];if(H.location>=0){let it=Y[F];if(it===void 0&&(F==="instanceMatrix"&&x.instanceMatrix&&(it=x.instanceMatrix),F==="instanceColor"&&x.instanceColor&&(it=x.instanceColor)),it!==void 0){const V=it.normalized,J=it.itemSize,bt=t.get(it);if(bt===void 0)continue;const Xt=bt.buffer,Ft=bt.type,Zt=bt.bytesPerElement,K=Ft===i.INT||Ft===i.UNSIGNED_INT||it.gpuType===Ia;if(it.isInterleavedBufferAttribute){const rt=it.data,wt=rt.stride,Ut=it.offset;if(rt.isInstancedInterleavedBuffer){for(let Rt=0;Rt<H.locationSize;Rt++)p(H.location+Rt,rt.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Rt=0;Rt<H.locationSize;Rt++)m(H.location+Rt);i.bindBuffer(i.ARRAY_BUFFER,Xt);for(let Rt=0;Rt<H.locationSize;Rt++)y(H.location+Rt,J/H.locationSize,Ft,V,wt*Zt,(Ut+J/H.locationSize*Rt)*Zt,K)}else{if(it.isInstancedBufferAttribute){for(let rt=0;rt<H.locationSize;rt++)p(H.location+rt,it.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let rt=0;rt<H.locationSize;rt++)m(H.location+rt);i.bindBuffer(i.ARRAY_BUFFER,Xt);for(let rt=0;rt<H.locationSize;rt++)y(H.location+rt,J/H.locationSize,Ft,V,J*Zt,J/H.locationSize*rt*Zt,K)}}else if(X!==void 0){const V=X[F];if(V!==void 0)switch(V.length){case 2:i.vertexAttrib2fv(H.location,V);break;case 3:i.vertexAttrib3fv(H.location,V);break;case 4:i.vertexAttrib4fv(H.location,V);break;default:i.vertexAttrib1fv(H.location,V)}}}}v()}function w(){D();for(const x in n){const C=n[x];for(const U in C){const z=C[U];for(const Y in z)h(z[Y].object),delete z[Y];delete C[U]}delete n[x]}}function A(x){if(n[x.id]===void 0)return;const C=n[x.id];for(const U in C){const z=C[U];for(const Y in z)h(z[Y].object),delete z[Y];delete C[U]}delete n[x.id]}function T(x){for(const C in n){const U=n[C];if(U[x.id]===void 0)continue;const z=U[x.id];for(const Y in z)h(z[Y].object),delete z[Y];delete U[x.id]}}function D(){S(),o=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:S,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:M,enableAttribute:m,disableUnusedAttributes:v}}function Dm(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let M=0;M<u;M++)g+=h[M]*f[M];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Lm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==xn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const D=T===Ys&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==An&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==wn&&!D)}function c(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:w,maxSamples:A}}function Im(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new gi,a=new Jt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,M=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const v=r?0:n,y=v*4;let _=p.clippingState||null;c.value=_,_=h(g,f,y,d);for(let w=0;w!==y;++w)_[w]=e[w];p.clippingState=_,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const M=u!==null?u.length:0;let m=null;if(M!==0){if(m=c.value,g!==!0||m===null){const p=d+M*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,_=d;y!==M;++y,_+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,m}}function Um(i){let t=new WeakMap;function e(o,a){return a===Go?o.mapping=ns:a===Wo&&(o.mapping=is),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Go||a===Wo)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new td(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Ji=4,Gc=[.125,.215,.35,.446,.526,.582],Mi=20,bo=new rh,Wc=new Wt;let Eo=null,wo=0,To=0,Ao=!1;const _i=(1+Math.sqrt(5))/2,Zi=1/_i,Xc=[new P(-_i,Zi,0),new P(_i,Zi,0),new P(-Zi,0,_i),new P(Zi,0,_i),new P(0,_i,-Zi),new P(0,_i,Zi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Nm=new P;class ba{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=Nm}=r;Eo=this._renderer.getRenderTarget(),wo=this._renderer.getActiveCubeFace(),To=this._renderer.getActiveMipmapLevel(),Ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Eo,wo,To),this._renderer.xr.enabled=Ao,t.scissorTest=!1,Er(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ns||t.mapping===is?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Eo=this._renderer.getRenderTarget(),wo=this._renderer.getActiveCubeFace(),To=this._renderer.getActiveMipmapLevel(),Ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:En,minFilter:En,generateMipmaps:!1,type:Ys,format:xn,colorSpace:rs,depthBuffer:!1},s=qc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Fm(r)),this._blurMaterial=Om(r,t,e)}return s}_compileMaterial(t){const e=new St(this._lodPlanes[0],t);this._renderer.compile(e,bo)}_sceneToCubeUV(t,e,n,s,r){const c=new ln(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Wc),u.toneMapping=ni,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const M=new Ga({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),m=new St(new dn,M);let p=!1;const v=t.background;v?v.isColor&&(M.color.copy(v),t.background=null,p=!0):(M.color.copy(Wc),p=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[y],r.y,r.z)):_===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[y]));const w=this._cubeSize;Er(s,_*w,y>2?w:0,w,w),u.setRenderTarget(s),p&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ns||t.mapping===is;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new St(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Er(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,bo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Xc[(s-r-1)%Xc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new St(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Mi-1),M=r/g,m=isFinite(r)?1+Math.floor(h*M):Mi;m>Mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Mi}`);const p=[];let v=0;for(let T=0;T<Mi;++T){const D=T/M,S=Math.exp(-D*D/2);p.push(S),T===0?v+=S:T<m&&(v+=2*S)}for(let T=0;T<p.length;T++)p[T]=p[T]/v;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;const _=this._sizeLods[s],w=3*_*(s>y-Ji?s-y+Ji:0),A=4*(this._cubeSize-_);Er(e,w,A,3*_,2*_),c.setRenderTarget(e),c.render(u,bo)}}function Fm(i){const t=[],e=[],n=[];let s=i;const r=i-Ji+1+Gc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Ji?c=Gc[o-i+Ji-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,M=3,m=2,p=1,v=new Float32Array(M*g*d),y=new Float32Array(m*g*d),_=new Float32Array(p*g*d);for(let A=0;A<d;A++){const T=A%3*2/3-1,D=A>2?0:-1,S=[T,D,0,T+2/3,D,0,T+2/3,D+1,0,T,D,0,T+2/3,D+1,0,T,D+1,0];v.set(S,M*g*A),y.set(f,m*g*A);const x=[A,A,A,A,A,A];_.set(x,p*g*A)}const w=new oe;w.setAttribute("position",new Ce(v,M)),w.setAttribute("uv",new Ce(y,m)),w.setAttribute("faceIndex",new Ce(_,p)),t.push(w),s>Ji&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function qc(i,t,e){const n=new Ti(i,t,e);return n.texture.mapping=Gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Er(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Om(i,t,e){const n=new Float32Array(Mi),s=new P(0,1,0);return new qe({name:"SphericalGaussianBlur",defines:{n:Mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Yc(){return new qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Zc(){return new qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function ja(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function zm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Go||c===Wo,h=c===ns||c===is;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new ba(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new ba(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Bm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Bs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function km(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,g=u.attributes.position;let M=0;if(d!==null){const v=d.array;M=d.version;for(let y=0,_=v.length;y<_;y+=3){const w=v[y+0],A=v[y+1],T=v[y+2];f.push(w,A,A,T,T,w)}}else if(g!==void 0){const v=g.array;M=g.version;for(let y=0,_=v.length/3-1;y<_;y+=3){const w=y+0,A=y+1,T=y+2;f.push(w,A,A,T,T,w)}}else return;const m=new(Ol(f)?Vl:Hl)(f,1);m.version=M;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Hm(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,M){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],M[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,M,0,g);let p=0;for(let v=0;v<g;v++)p+=d[v]*M[v];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Vm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Gm(i,t,e){const n=new WeakMap,s=new Te;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let x=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var d=x;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,M=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),M===!0&&(_=2),m===!0&&(_=3);let w=a.attributes.position.count*_,A=1;w>t.maxTextureSize&&(A=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const T=new Float32Array(w*A*4*u),D=new zl(T,w,A,u);D.type=wn,D.needsUpdate=!0;const S=_*4;for(let C=0;C<u;C++){const U=p[C],z=v[C],Y=y[C],G=w*A*4*C;for(let X=0;X<U.count;X++){const F=X*S;g===!0&&(s.fromBufferAttribute(U,X),T[G+F+0]=s.x,T[G+F+1]=s.y,T[G+F+2]=s.z,T[G+F+3]=0),M===!0&&(s.fromBufferAttribute(z,X),T[G+F+4]=s.x,T[G+F+5]=s.y,T[G+F+6]=s.z,T[G+F+7]=0),m===!0&&(s.fromBufferAttribute(Y,X),T[G+F+8]=s.x,T[G+F+9]=s.y,T[G+F+10]=s.z,T[G+F+11]=Y.itemSize===4?s.w:1)}}f={count:u,texture:D,size:new ft(w,A)},n.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const M=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",M),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Wm(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const ah=new Ve,$c=new Yl(1,1),ch=new zl,lh=new Ou,hh=new Xl,Jc=[],Kc=[],jc=new Float32Array(16),Qc=new Float32Array(9),tl=new Float32Array(4);function ps(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Jc[s];if(r===void 0&&(r=new Float32Array(s),Jc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function De(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function qr(i,t){let e=Kc[t];e===void 0&&(e=new Int32Array(t),Kc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Xm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function qm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2fv(this.addr,t),Le(e,t)}}function Ym(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(De(e,t))return;i.uniform3fv(this.addr,t),Le(e,t)}}function Zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4fv(this.addr,t),Le(e,t)}}function $m(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(De(e,n))return;tl.set(n),i.uniformMatrix2fv(this.addr,!1,tl),Le(e,n)}}function Jm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(De(e,n))return;Qc.set(n),i.uniformMatrix3fv(this.addr,!1,Qc),Le(e,n)}}function Km(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(De(e,n))return;jc.set(n),i.uniformMatrix4fv(this.addr,!1,jc),Le(e,n)}}function jm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Qm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2iv(this.addr,t),Le(e,t)}}function t0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;i.uniform3iv(this.addr,t),Le(e,t)}}function e0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4iv(this.addr,t),Le(e,t)}}function n0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function i0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2uiv(this.addr,t),Le(e,t)}}function s0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;i.uniform3uiv(this.addr,t),Le(e,t)}}function r0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4uiv(this.addr,t),Le(e,t)}}function o0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?($c.compareFunction=Fl,r=$c):r=ah,e.setTexture2D(t||r,s)}function a0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||lh,s)}function c0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||hh,s)}function l0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ch,s)}function h0(i){switch(i){case 5126:return Xm;case 35664:return qm;case 35665:return Ym;case 35666:return Zm;case 35674:return $m;case 35675:return Jm;case 35676:return Km;case 5124:case 35670:return jm;case 35667:case 35671:return Qm;case 35668:case 35672:return t0;case 35669:case 35673:return e0;case 5125:return n0;case 36294:return i0;case 36295:return s0;case 36296:return r0;case 35678:case 36198:case 36298:case 36306:case 35682:return o0;case 35679:case 36299:case 36307:return a0;case 35680:case 36300:case 36308:case 36293:return c0;case 36289:case 36303:case 36311:case 36292:return l0}}function u0(i,t){i.uniform1fv(this.addr,t)}function d0(i,t){const e=ps(t,this.size,2);i.uniform2fv(this.addr,e)}function f0(i,t){const e=ps(t,this.size,3);i.uniform3fv(this.addr,e)}function p0(i,t){const e=ps(t,this.size,4);i.uniform4fv(this.addr,e)}function m0(i,t){const e=ps(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function g0(i,t){const e=ps(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function _0(i,t){const e=ps(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function v0(i,t){i.uniform1iv(this.addr,t)}function x0(i,t){i.uniform2iv(this.addr,t)}function M0(i,t){i.uniform3iv(this.addr,t)}function y0(i,t){i.uniform4iv(this.addr,t)}function S0(i,t){i.uniform1uiv(this.addr,t)}function b0(i,t){i.uniform2uiv(this.addr,t)}function E0(i,t){i.uniform3uiv(this.addr,t)}function w0(i,t){i.uniform4uiv(this.addr,t)}function T0(i,t,e){const n=this.cache,s=t.length,r=qr(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||ah,r[o])}function A0(i,t,e){const n=this.cache,s=t.length,r=qr(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||lh,r[o])}function R0(i,t,e){const n=this.cache,s=t.length,r=qr(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||hh,r[o])}function C0(i,t,e){const n=this.cache,s=t.length,r=qr(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||ch,r[o])}function P0(i){switch(i){case 5126:return u0;case 35664:return d0;case 35665:return f0;case 35666:return p0;case 35674:return m0;case 35675:return g0;case 35676:return _0;case 5124:case 35670:return v0;case 35667:case 35671:return x0;case 35668:case 35672:return M0;case 35669:case 35673:return y0;case 5125:return S0;case 36294:return b0;case 36295:return E0;case 36296:return w0;case 35678:case 36198:case 36298:case 36306:case 35682:return T0;case 35679:case 36299:case 36307:return A0;case 35680:case 36300:case 36308:case 36293:return R0;case 36289:case 36303:case 36311:case 36292:return C0}}class D0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=h0(e.type)}}class L0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=P0(e.type)}}class I0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ro=/(\w+)(\])?(\[|\.)?/g;function el(i,t){i.seq.push(t),i.map[t.id]=t}function U0(i,t,e){const n=i.name,s=n.length;for(Ro.lastIndex=0;;){const r=Ro.exec(n),o=Ro.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){el(e,l===void 0?new D0(a,i,t):new L0(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new I0(a),el(e,u)),e=u}}}class Nr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);U0(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function nl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const N0=37297;let F0=0;function O0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const il=new Jt;function z0(i){se._getMatrix(il,se.workingColorSpace,i);const t=`mat3( ${il.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(i)){case Or:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function sl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+O0(i.getShaderSource(t),a)}else return r}function B0(i,t){const e=z0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function k0(i,t){let e;switch(t){case Kh:e="Linear";break;case jh:e="Reinhard";break;case Qh:e="Cineon";break;case Tl:e="ACESFilmic";break;case eu:e="AgX";break;case nu:e="Neutral";break;case tu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const wr=new P;function H0(){se.getLuminanceCoefficients(wr);const i=wr.x.toFixed(4),t=wr.y.toFixed(4),e=wr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function V0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ws).join(`
`)}function G0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function W0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ws(i){return i!==""}function rl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ol(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const X0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ea(i){return i.replace(X0,Y0)}const q0=new Map;function Y0(i,t){let e=Kt[t];if(e===void 0){const n=q0.get(t);if(n!==void 0)e=Kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ea(e)}const Z0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function al(i){return i.replace(Z0,$0)}function $0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function J0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===bl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===El?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Bn&&(t="SHADOWMAP_TYPE_VSM"),t}function K0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ns:case is:t="ENVMAP_TYPE_CUBE";break;case Gr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function j0(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===is&&(t="ENVMAP_MODE_REFRACTION"),t}function Q0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case wl:t="ENVMAP_BLENDING_MULTIPLY";break;case $h:t="ENVMAP_BLENDING_MIX";break;case Jh:t="ENVMAP_BLENDING_ADD";break}return t}function tg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function eg(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=J0(e),l=K0(e),h=j0(e),u=Q0(e),f=tg(e),d=V0(e),g=G0(r),M=s.createProgram();let m,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ws).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ws).join(`
`),p.length>0&&(p+=`
`)):(m=[cl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),p=[cl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ni?"#define TONE_MAPPING":"",e.toneMapping!==ni?Kt.tonemapping_pars_fragment:"",e.toneMapping!==ni?k0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,B0("linearToOutputTexel",e.outputColorSpace),H0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ws).join(`
`)),o=Ea(o),o=rl(o,e),o=ol(o,e),a=Ea(a),a=rl(a,e),a=ol(a,e),o=al(o),a=al(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===uc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===uc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=v+m+o,_=v+p+a,w=nl(s,s.VERTEX_SHADER,y),A=nl(s,s.FRAGMENT_SHADER,_);s.attachShader(M,w),s.attachShader(M,A),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function T(C){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(M)||"",z=s.getShaderInfoLog(w)||"",Y=s.getShaderInfoLog(A)||"",G=U.trim(),X=z.trim(),F=Y.trim();let H=!0,it=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,w,A);else{const V=sl(s,w,"vertex"),J=sl(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+G+`
`+V+`
`+J)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(X===""||F==="")&&(it=!1);it&&(C.diagnostics={runnable:H,programLog:G,vertexShader:{log:X,prefix:m},fragmentShader:{log:F,prefix:p}})}s.deleteShader(w),s.deleteShader(A),D=new Nr(s,M),S=W0(s,M)}let D;this.getUniforms=function(){return D===void 0&&T(this),D};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(M,N0)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=F0++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=w,this.fragmentShader=A,this}let ng=0;class ig{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new sg(t),e.set(t,n)),n}}class sg{constructor(t){this.id=ng++,this.code=t,this.usedTimes=0}}function rg(i,t,e,n,s,r,o){const a=new Bl,c=new ig,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,x,C,U,z){const Y=U.fog,G=z.geometry,X=S.isMeshStandardMaterial?U.environment:null,F=(S.isMeshStandardMaterial?e:t).get(S.envMap||X),H=F&&F.mapping===Gr?F.image.height:null,it=g[S.type];S.precision!==null&&(d=s.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const V=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,J=V!==void 0?V.length:0;let bt=0;G.morphAttributes.position!==void 0&&(bt=1),G.morphAttributes.normal!==void 0&&(bt=2),G.morphAttributes.color!==void 0&&(bt=3);let Xt,Ft,Zt,K;if(it){const ae=yn[it];Xt=ae.vertexShader,Ft=ae.fragmentShader}else Xt=S.vertexShader,Ft=S.fragmentShader,c.update(S),Zt=c.getVertexShaderID(S),K=c.getFragmentShaderID(S);const rt=i.getRenderTarget(),wt=i.state.buffers.depth.getReversed(),Ut=z.isInstancedMesh===!0,Rt=z.isBatchedMesh===!0,te=!!S.map,ue=!!S.matcap,L=!!F,st=!!S.aoMap,tt=!!S.lightMap,Q=!!S.bumpMap,j=!!S.normalMap,pt=!!S.displacementMap,ot=!!S.emissiveMap,mt=!!S.metalnessMap,qt=!!S.roughnessMap,Gt=S.anisotropy>0,R=S.clearcoat>0,b=S.dispersion>0,k=S.iridescence>0,Z=S.sheen>0,nt=S.transmission>0,$=Gt&&!!S.anisotropyMap,Lt=R&&!!S.clearcoatMap,dt=R&&!!S.clearcoatNormalMap,Ct=R&&!!S.clearcoatRoughnessMap,Pt=k&&!!S.iridescenceMap,at=k&&!!S.iridescenceThicknessMap,Mt=Z&&!!S.sheenColorMap,Ht=Z&&!!S.sheenRoughnessMap,It=!!S.specularMap,vt=!!S.specularColorMap,$t=!!S.specularIntensityMap,N=nt&&!!S.transmissionMap,ut=nt&&!!S.thicknessMap,gt=!!S.gradientMap,Tt=!!S.alphaMap,ct=S.alphaTest>0,et=!!S.alphaHash,Dt=!!S.extensions;let Yt=ni;S.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(Yt=i.toneMapping);const de={shaderID:it,shaderType:S.type,shaderName:S.name,vertexShader:Xt,fragmentShader:Ft,defines:S.defines,customVertexShaderID:Zt,customFragmentShaderID:K,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:Rt,batchingColor:Rt&&z._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&z.instanceColor!==null,instancingMorph:Ut&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:rs,alphaToCoverage:!!S.alphaToCoverage,map:te,matcap:ue,envMap:L,envMapMode:L&&F.mapping,envMapCubeUVHeight:H,aoMap:st,lightMap:tt,bumpMap:Q,normalMap:j,displacementMap:f&&pt,emissiveMap:ot,normalMapObjectSpace:j&&S.normalMapType===ou,normalMapTangentSpace:j&&S.normalMapType===Nl,metalnessMap:mt,roughnessMap:qt,anisotropy:Gt,anisotropyMap:$,clearcoat:R,clearcoatMap:Lt,clearcoatNormalMap:dt,clearcoatRoughnessMap:Ct,dispersion:b,iridescence:k,iridescenceMap:Pt,iridescenceThicknessMap:at,sheen:Z,sheenColorMap:Mt,sheenRoughnessMap:Ht,specularMap:It,specularColorMap:vt,specularIntensityMap:$t,transmission:nt,transmissionMap:N,thicknessMap:ut,gradientMap:gt,opaque:S.transparent===!1&&S.blending===ji&&S.alphaToCoverage===!1,alphaMap:Tt,alphaTest:ct,alphaHash:et,combine:S.combine,mapUv:te&&M(S.map.channel),aoMapUv:st&&M(S.aoMap.channel),lightMapUv:tt&&M(S.lightMap.channel),bumpMapUv:Q&&M(S.bumpMap.channel),normalMapUv:j&&M(S.normalMap.channel),displacementMapUv:pt&&M(S.displacementMap.channel),emissiveMapUv:ot&&M(S.emissiveMap.channel),metalnessMapUv:mt&&M(S.metalnessMap.channel),roughnessMapUv:qt&&M(S.roughnessMap.channel),anisotropyMapUv:$&&M(S.anisotropyMap.channel),clearcoatMapUv:Lt&&M(S.clearcoatMap.channel),clearcoatNormalMapUv:dt&&M(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ct&&M(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Pt&&M(S.iridescenceMap.channel),iridescenceThicknessMapUv:at&&M(S.iridescenceThicknessMap.channel),sheenColorMapUv:Mt&&M(S.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&M(S.sheenRoughnessMap.channel),specularMapUv:It&&M(S.specularMap.channel),specularColorMapUv:vt&&M(S.specularColorMap.channel),specularIntensityMapUv:$t&&M(S.specularIntensityMap.channel),transmissionMapUv:N&&M(S.transmissionMap.channel),thicknessMapUv:ut&&M(S.thicknessMap.channel),alphaMapUv:Tt&&M(S.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(j||Gt),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!G.attributes.uv&&(te||Tt),fog:!!Y,useFog:S.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:wt,skinning:z.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:bt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Yt,decodeVideoTexture:te&&S.map.isVideoTexture===!0&&se.getTransfer(S.map.colorSpace)===le,decodeVideoTextureEmissive:ot&&S.emissiveMap.isVideoTexture===!0&&se.getTransfer(S.emissiveMap.colorSpace)===le,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ve,flipSided:S.side===Ye,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Dt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Dt&&S.extensions.multiDraw===!0||Rt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return de.vertexUv1s=l.has(1),de.vertexUv2s=l.has(2),de.vertexUv3s=l.has(3),l.clear(),de}function p(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)x.push(C),x.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(v(x,S),y(x,S),x.push(i.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function v(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function y(S,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),x.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reversedDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){const x=g[S.type];let C;if(x){const U=yn[x];C=Ju.clone(U.uniforms)}else C=S.uniforms;return C}function w(S,x){let C;for(let U=0,z=h.length;U<z;U++){const Y=h[U];if(Y.cacheKey===x){C=Y,++C.usedTimes;break}}return C===void 0&&(C=new eg(i,x,S,r),h.push(C)),C}function A(S){if(--S.usedTimes===0){const x=h.indexOf(S);h[x]=h[h.length-1],h.pop(),S.destroy()}}function T(S){c.remove(S)}function D(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:w,releaseProgram:A,releaseShaderCache:T,programs:h,dispose:D}}function og(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function ag(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ll(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function hl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,g,M,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:M,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=M,p.group=m),t++,p}function a(u,f,d,g,M,m){const p=o(u,f,d,g,M,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,g,M,m){const p=o(u,f,d,g,M,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||ag),n.length>1&&n.sort(f||ll),s.length>1&&s.sort(f||ll)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function cg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new hl,i.set(n,[o])):s>=r.length?(o=new hl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function lg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Wt};break;case"SpotLight":e={position:new P,direction:new P,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function hg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let ug=0;function dg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function fg(i){const t=new lg,e=hg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const s=new P,r=new pe,o=new pe;function a(l){let h=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,g=0,M=0,m=0,p=0,v=0,y=0,_=0,w=0,A=0,T=0;l.sort(dg);for(let S=0,x=l.length;S<x;S++){const C=l[S],U=C.color,z=C.intensity,Y=C.distance,G=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=U.r*z,u+=U.g*z,f+=U.b*z;else if(C.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(C.sh.coefficients[X],z);T++}else if(C.isDirectionalLight){const X=t.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const F=C.shadow,H=e.get(C);H.shadowIntensity=F.intensity,H.shadowBias=F.bias,H.shadowNormalBias=F.normalBias,H.shadowRadius=F.radius,H.shadowMapSize=F.mapSize,n.directionalShadow[d]=H,n.directionalShadowMap[d]=G,n.directionalShadowMatrix[d]=C.shadow.matrix,v++}n.directional[d]=X,d++}else if(C.isSpotLight){const X=t.get(C);X.position.setFromMatrixPosition(C.matrixWorld),X.color.copy(U).multiplyScalar(z),X.distance=Y,X.coneCos=Math.cos(C.angle),X.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),X.decay=C.decay,n.spot[M]=X;const F=C.shadow;if(C.map&&(n.spotLightMap[w]=C.map,w++,F.updateMatrices(C),C.castShadow&&A++),n.spotLightMatrix[M]=F.matrix,C.castShadow){const H=e.get(C);H.shadowIntensity=F.intensity,H.shadowBias=F.bias,H.shadowNormalBias=F.normalBias,H.shadowRadius=F.radius,H.shadowMapSize=F.mapSize,n.spotShadow[M]=H,n.spotShadowMap[M]=G,_++}M++}else if(C.isRectAreaLight){const X=t.get(C);X.color.copy(U).multiplyScalar(z),X.halfWidth.set(C.width*.5,0,0),X.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=X,m++}else if(C.isPointLight){const X=t.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),X.distance=C.distance,X.decay=C.decay,C.castShadow){const F=C.shadow,H=e.get(C);H.shadowIntensity=F.intensity,H.shadowBias=F.bias,H.shadowNormalBias=F.normalBias,H.shadowRadius=F.radius,H.shadowMapSize=F.mapSize,H.shadowCameraNear=F.camera.near,H.shadowCameraFar=F.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=C.shadow.matrix,y++}n.point[g]=X,g++}else if(C.isHemisphereLight){const X=t.get(C);X.skyColor.copy(C.color).multiplyScalar(z),X.groundColor.copy(C.groundColor).multiplyScalar(z),n.hemi[p]=X,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const D=n.hash;(D.directionalLength!==d||D.pointLength!==g||D.spotLength!==M||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==v||D.numPointShadows!==y||D.numSpotShadows!==_||D.numSpotMaps!==w||D.numLightProbes!==T)&&(n.directional.length=d,n.spot.length=M,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+w-A,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=T,D.directionalLength=d,D.pointLength=g,D.spotLength=M,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=v,D.numPointShadows=y,D.numSpotShadows=_,D.numSpotMaps=w,D.numLightProbes=T,n.version=ug++)}function c(l,h){let u=0,f=0,d=0,g=0,M=0;const m=h.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){const y=l[p];if(y.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(y.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const _=n.hemi[M];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),M++}}}return{setup:a,setupView:c,state:n}}function ul(i){const t=new fg(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function pg(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new ul(i),t.set(s,[a])):r>=o.length?(a=new ul(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const mg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function _g(i,t,e){let n=new Xa;const s=new ft,r=new ft,o=new Te,a=new Bd({depthPacking:ru}),c=new kd,l={},h=e.maxTextureSize,u={[ii]:Ye,[Ye]:ii,[ve]:ve},f=new qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:mg,fragmentShader:gg}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new oe;g.setAttribute("position",new Ce(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new St(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bl;let p=this.type;this.render=function(A,T,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),x=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),U=i.state;U.setBlending(ei),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const z=p!==Bn&&this.type===Bn,Y=p===Bn&&this.type!==Bn;for(let G=0,X=A.length;G<X;G++){const F=A[G],H=F.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",F,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const it=H.getFrameExtents();if(s.multiply(it),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/it.x),s.x=r.x*it.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/it.y),s.y=r.y*it.y,H.mapSize.y=r.y)),H.map===null||z===!0||Y===!0){const J=this.type!==Bn?{minFilter:sn,magFilter:sn}:{};H.map!==null&&H.map.dispose(),H.map=new Ti(s.x,s.y,J),H.map.texture.name=F.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const V=H.getViewportCount();for(let J=0;J<V;J++){const bt=H.getViewport(J);o.set(r.x*bt.x,r.y*bt.y,r.x*bt.z,r.y*bt.w),U.viewport(o),H.updateMatrices(F,J),n=H.getFrustum(),_(T,D,H.camera,F,this.type)}H.isPointLightShadow!==!0&&this.type===Bn&&v(H,D),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,x,C)};function v(A,T){const D=t.update(M);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ti(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(T,null,D,f,M,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(T,null,D,d,M,null)}function y(A,T,D,S){let x=null;const C=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)x=C;else if(x=D.isPointLight===!0?c:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const U=x.uuid,z=T.uuid;let Y=l[U];Y===void 0&&(Y={},l[U]=Y);let G=Y[z];G===void 0&&(G=x.clone(),Y[z]=G,T.addEventListener("dispose",w)),x=G}if(x.visible=T.visible,x.wireframe=T.wireframe,S===Bn?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:u[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,D.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const U=i.properties.get(x);U.light=D}return x}function _(A,T,D,S,x){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===Bn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);const z=t.update(A),Y=A.material;if(Array.isArray(Y)){const G=z.groups;for(let X=0,F=G.length;X<F;X++){const H=G[X],it=Y[H.materialIndex];if(it&&it.visible){const V=y(A,it,S,x);A.onBeforeShadow(i,A,T,D,z,V,H),i.renderBufferDirect(D,null,z,V,A,H),A.onAfterShadow(i,A,T,D,z,V,H)}}}else if(Y.visible){const G=y(A,Y,S,x);A.onBeforeShadow(i,A,T,D,z,G,null),i.renderBufferDirect(D,null,z,G,A,null),A.onAfterShadow(i,A,T,D,z,G,null)}}const U=A.children;for(let z=0,Y=U.length;z<Y;z++)_(U[z],T,D,S,x)}function w(A){A.target.removeEventListener("dispose",w);for(const D in l){const S=l[D],x=A.target.uuid;x in S&&(S[x].dispose(),delete S[x])}}}const vg={[Fo]:Oo,[zo]:Ho,[Bo]:Vo,[es]:ko,[Oo]:Fo,[Ho]:zo,[Vo]:Bo,[ko]:es};function xg(i,t){function e(){let N=!1;const ut=new Te;let gt=null;const Tt=new Te(0,0,0,0);return{setMask:function(ct){gt!==ct&&!N&&(i.colorMask(ct,ct,ct,ct),gt=ct)},setLocked:function(ct){N=ct},setClear:function(ct,et,Dt,Yt,de){de===!0&&(ct*=Yt,et*=Yt,Dt*=Yt),ut.set(ct,et,Dt,Yt),Tt.equals(ut)===!1&&(i.clearColor(ct,et,Dt,Yt),Tt.copy(ut))},reset:function(){N=!1,gt=null,Tt.set(-1,0,0,0)}}}function n(){let N=!1,ut=!1,gt=null,Tt=null,ct=null;return{setReversed:function(et){if(ut!==et){const Dt=t.get("EXT_clip_control");et?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT),ut=et;const Yt=ct;ct=null,this.setClear(Yt)}},getReversed:function(){return ut},setTest:function(et){et?rt(i.DEPTH_TEST):wt(i.DEPTH_TEST)},setMask:function(et){gt!==et&&!N&&(i.depthMask(et),gt=et)},setFunc:function(et){if(ut&&(et=vg[et]),Tt!==et){switch(et){case Fo:i.depthFunc(i.NEVER);break;case Oo:i.depthFunc(i.ALWAYS);break;case zo:i.depthFunc(i.LESS);break;case es:i.depthFunc(i.LEQUAL);break;case Bo:i.depthFunc(i.EQUAL);break;case ko:i.depthFunc(i.GEQUAL);break;case Ho:i.depthFunc(i.GREATER);break;case Vo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Tt=et}},setLocked:function(et){N=et},setClear:function(et){ct!==et&&(ut&&(et=1-et),i.clearDepth(et),ct=et)},reset:function(){N=!1,gt=null,Tt=null,ct=null,ut=!1}}}function s(){let N=!1,ut=null,gt=null,Tt=null,ct=null,et=null,Dt=null,Yt=null,de=null;return{setTest:function(ae){N||(ae?rt(i.STENCIL_TEST):wt(i.STENCIL_TEST))},setMask:function(ae){ut!==ae&&!N&&(i.stencilMask(ae),ut=ae)},setFunc:function(ae,Dn,Mn){(gt!==ae||Tt!==Dn||ct!==Mn)&&(i.stencilFunc(ae,Dn,Mn),gt=ae,Tt=Dn,ct=Mn)},setOp:function(ae,Dn,Mn){(et!==ae||Dt!==Dn||Yt!==Mn)&&(i.stencilOp(ae,Dn,Mn),et=ae,Dt=Dn,Yt=Mn)},setLocked:function(ae){N=ae},setClear:function(ae){de!==ae&&(i.clearStencil(ae),de=ae)},reset:function(){N=!1,ut=null,gt=null,Tt=null,ct=null,et=null,Dt=null,Yt=null,de=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,M=!1,m=null,p=null,v=null,y=null,_=null,w=null,A=null,T=new Wt(0,0,0),D=0,S=!1,x=null,C=null,U=null,z=null,Y=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,F=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(H)[1]),X=F>=1):H.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),X=F>=2);let it=null,V={};const J=i.getParameter(i.SCISSOR_BOX),bt=i.getParameter(i.VIEWPORT),Xt=new Te().fromArray(J),Ft=new Te().fromArray(bt);function Zt(N,ut,gt,Tt){const ct=new Uint8Array(4),et=i.createTexture();i.bindTexture(N,et),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Dt=0;Dt<gt;Dt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ut,0,i.RGBA,1,1,Tt,0,i.RGBA,i.UNSIGNED_BYTE,ct):i.texImage2D(ut+Dt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ct);return et}const K={};K[i.TEXTURE_2D]=Zt(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=Zt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=Zt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=Zt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),rt(i.DEPTH_TEST),o.setFunc(es),Q(!1),j(oc),rt(i.CULL_FACE),st(ei);function rt(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function wt(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Ut(N,ut){return u[N]!==ut?(i.bindFramebuffer(N,ut),u[N]=ut,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ut),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ut),!0):!1}function Rt(N,ut){let gt=d,Tt=!1;if(N){gt=f.get(ut),gt===void 0&&(gt=[],f.set(ut,gt));const ct=N.textures;if(gt.length!==ct.length||gt[0]!==i.COLOR_ATTACHMENT0){for(let et=0,Dt=ct.length;et<Dt;et++)gt[et]=i.COLOR_ATTACHMENT0+et;gt.length=ct.length,Tt=!0}}else gt[0]!==i.BACK&&(gt[0]=i.BACK,Tt=!0);Tt&&i.drawBuffers(gt)}function te(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const ue={[xi]:i.FUNC_ADD,[Lh]:i.FUNC_SUBTRACT,[Ih]:i.FUNC_REVERSE_SUBTRACT};ue[Uh]=i.MIN,ue[Nh]=i.MAX;const L={[Fh]:i.ZERO,[Oh]:i.ONE,[zh]:i.SRC_COLOR,[Uo]:i.SRC_ALPHA,[Wh]:i.SRC_ALPHA_SATURATE,[Vh]:i.DST_COLOR,[kh]:i.DST_ALPHA,[Bh]:i.ONE_MINUS_SRC_COLOR,[No]:i.ONE_MINUS_SRC_ALPHA,[Gh]:i.ONE_MINUS_DST_COLOR,[Hh]:i.ONE_MINUS_DST_ALPHA,[Xh]:i.CONSTANT_COLOR,[qh]:i.ONE_MINUS_CONSTANT_COLOR,[Yh]:i.CONSTANT_ALPHA,[Zh]:i.ONE_MINUS_CONSTANT_ALPHA};function st(N,ut,gt,Tt,ct,et,Dt,Yt,de,ae){if(N===ei){M===!0&&(wt(i.BLEND),M=!1);return}if(M===!1&&(rt(i.BLEND),M=!0),N!==Dh){if(N!==m||ae!==S){if((p!==xi||_!==xi)&&(i.blendEquation(i.FUNC_ADD),p=xi,_=xi),ae)switch(N){case ji:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fr:i.blendFunc(i.ONE,i.ONE);break;case ac:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case cc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case ji:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ac:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case cc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}v=null,y=null,w=null,A=null,T.set(0,0,0),D=0,m=N,S=ae}return}ct=ct||ut,et=et||gt,Dt=Dt||Tt,(ut!==p||ct!==_)&&(i.blendEquationSeparate(ue[ut],ue[ct]),p=ut,_=ct),(gt!==v||Tt!==y||et!==w||Dt!==A)&&(i.blendFuncSeparate(L[gt],L[Tt],L[et],L[Dt]),v=gt,y=Tt,w=et,A=Dt),(Yt.equals(T)===!1||de!==D)&&(i.blendColor(Yt.r,Yt.g,Yt.b,de),T.copy(Yt),D=de),m=N,S=!1}function tt(N,ut){N.side===ve?wt(i.CULL_FACE):rt(i.CULL_FACE);let gt=N.side===Ye;ut&&(gt=!gt),Q(gt),N.blending===ji&&N.transparent===!1?st(ei):st(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const Tt=N.stencilWrite;a.setTest(Tt),Tt&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ot(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):wt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Q(N){x!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),x=N)}function j(N){N!==Ch?(rt(i.CULL_FACE),N!==C&&(N===oc?i.cullFace(i.BACK):N===Ph?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):wt(i.CULL_FACE),C=N}function pt(N){N!==U&&(X&&i.lineWidth(N),U=N)}function ot(N,ut,gt){N?(rt(i.POLYGON_OFFSET_FILL),(z!==ut||Y!==gt)&&(i.polygonOffset(ut,gt),z=ut,Y=gt)):wt(i.POLYGON_OFFSET_FILL)}function mt(N){N?rt(i.SCISSOR_TEST):wt(i.SCISSOR_TEST)}function qt(N){N===void 0&&(N=i.TEXTURE0+G-1),it!==N&&(i.activeTexture(N),it=N)}function Gt(N,ut,gt){gt===void 0&&(it===null?gt=i.TEXTURE0+G-1:gt=it);let Tt=V[gt];Tt===void 0&&(Tt={type:void 0,texture:void 0},V[gt]=Tt),(Tt.type!==N||Tt.texture!==ut)&&(it!==gt&&(i.activeTexture(gt),it=gt),i.bindTexture(N,ut||K[N]),Tt.type=N,Tt.texture=ut)}function R(){const N=V[it];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function b(){try{i.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Z(){try{i.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function nt(){try{i.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Lt(){try{i.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function dt(){try{i.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ct(){try{i.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pt(){try{i.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function at(){try{i.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Mt(N){Xt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Xt.copy(N))}function Ht(N){Ft.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),Ft.copy(N))}function It(N,ut){let gt=l.get(ut);gt===void 0&&(gt=new WeakMap,l.set(ut,gt));let Tt=gt.get(N);Tt===void 0&&(Tt=i.getUniformBlockIndex(ut,N.name),gt.set(N,Tt))}function vt(N,ut){const Tt=l.get(ut).get(N);c.get(ut)!==Tt&&(i.uniformBlockBinding(ut,Tt,N.__bindingPointIndex),c.set(ut,Tt))}function $t(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},it=null,V={},u={},f=new WeakMap,d=[],g=null,M=!1,m=null,p=null,v=null,y=null,_=null,w=null,A=null,T=new Wt(0,0,0),D=0,S=!1,x=null,C=null,U=null,z=null,Y=null,Xt.set(0,0,i.canvas.width,i.canvas.height),Ft.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:rt,disable:wt,bindFramebuffer:Ut,drawBuffers:Rt,useProgram:te,setBlending:st,setMaterial:tt,setFlipSided:Q,setCullFace:j,setLineWidth:pt,setPolygonOffset:ot,setScissorTest:mt,activeTexture:qt,bindTexture:Gt,unbindTexture:R,compressedTexImage2D:b,compressedTexImage3D:k,texImage2D:Pt,texImage3D:at,updateUBOMapping:It,uniformBlockBinding:vt,texStorage2D:dt,texStorage3D:Ct,texSubImage2D:Z,texSubImage3D:nt,compressedTexSubImage2D:$,compressedTexSubImage3D:Lt,scissor:Mt,viewport:Ht,reset:$t}}function Mg(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ft,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,b){return d?new OffscreenCanvas(R,b):Br("canvas")}function M(R,b,k){let Z=1;const nt=Gt(R);if((nt.width>k||nt.height>k)&&(Z=k/Math.max(nt.width,nt.height)),Z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const $=Math.floor(Z*nt.width),Lt=Math.floor(Z*nt.height);u===void 0&&(u=g($,Lt));const dt=b?g($,Lt):u;return dt.width=$,dt.height=Lt,dt.getContext("2d").drawImage(R,0,0,$,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+$+"x"+Lt+")."),dt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(R,b,k,Z,nt=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let $=b;if(b===i.RED&&(k===i.FLOAT&&($=i.R32F),k===i.HALF_FLOAT&&($=i.R16F),k===i.UNSIGNED_BYTE&&($=i.R8)),b===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&($=i.R8UI),k===i.UNSIGNED_SHORT&&($=i.R16UI),k===i.UNSIGNED_INT&&($=i.R32UI),k===i.BYTE&&($=i.R8I),k===i.SHORT&&($=i.R16I),k===i.INT&&($=i.R32I)),b===i.RG&&(k===i.FLOAT&&($=i.RG32F),k===i.HALF_FLOAT&&($=i.RG16F),k===i.UNSIGNED_BYTE&&($=i.RG8)),b===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&($=i.RG8UI),k===i.UNSIGNED_SHORT&&($=i.RG16UI),k===i.UNSIGNED_INT&&($=i.RG32UI),k===i.BYTE&&($=i.RG8I),k===i.SHORT&&($=i.RG16I),k===i.INT&&($=i.RG32I)),b===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&($=i.RGB8UI),k===i.UNSIGNED_SHORT&&($=i.RGB16UI),k===i.UNSIGNED_INT&&($=i.RGB32UI),k===i.BYTE&&($=i.RGB8I),k===i.SHORT&&($=i.RGB16I),k===i.INT&&($=i.RGB32I)),b===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&($=i.RGBA8UI),k===i.UNSIGNED_SHORT&&($=i.RGBA16UI),k===i.UNSIGNED_INT&&($=i.RGBA32UI),k===i.BYTE&&($=i.RGBA8I),k===i.SHORT&&($=i.RGBA16I),k===i.INT&&($=i.RGBA32I)),b===i.RGB&&(k===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),b===i.RGBA){const Lt=nt?Or:se.getTransfer(Z);k===i.FLOAT&&($=i.RGBA32F),k===i.HALF_FLOAT&&($=i.RGBA16F),k===i.UNSIGNED_BYTE&&($=Lt===le?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function _(R,b){let k;return R?b===null||b===wi||b===Ns?k=i.DEPTH24_STENCIL8:b===wn?k=i.DEPTH32F_STENCIL8:b===Us&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===wi||b===Ns?k=i.DEPTH_COMPONENT24:b===wn?k=i.DEPTH_COMPONENT32F:b===Us&&(k=i.DEPTH_COMPONENT16),k}function w(R,b){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==sn&&R.minFilter!==En?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function A(R){const b=R.target;b.removeEventListener("dispose",A),D(b),b.isVideoTexture&&h.delete(b)}function T(R){const b=R.target;b.removeEventListener("dispose",T),x(b)}function D(R){const b=n.get(R);if(b.__webglInit===void 0)return;const k=R.source,Z=f.get(k);if(Z){const nt=Z[b.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&S(R),Object.keys(Z).length===0&&f.delete(k)}n.remove(R)}function S(R){const b=n.get(R);i.deleteTexture(b.__webglTexture);const k=R.source,Z=f.get(k);delete Z[b.__cacheKey],o.memory.textures--}function x(R){const b=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(b.__webglFramebuffer[Z]))for(let nt=0;nt<b.__webglFramebuffer[Z].length;nt++)i.deleteFramebuffer(b.__webglFramebuffer[Z][nt]);else i.deleteFramebuffer(b.__webglFramebuffer[Z]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[Z])}else{if(Array.isArray(b.__webglFramebuffer))for(let Z=0;Z<b.__webglFramebuffer.length;Z++)i.deleteFramebuffer(b.__webglFramebuffer[Z]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Z=0;Z<b.__webglColorRenderbuffer.length;Z++)b.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[Z]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const k=R.textures;for(let Z=0,nt=k.length;Z<nt;Z++){const $=n.get(k[Z]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(k[Z])}n.remove(R)}let C=0;function U(){C=0}function z(){const R=C;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),C+=1,R}function Y(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function G(R,b){const k=n.get(R);if(R.isVideoTexture&&mt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const Z=R.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(k,R,b);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+b)}function X(R,b){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){K(k,R,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+b)}function F(R,b){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){K(k,R,b);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+b)}function H(R,b){const k=n.get(R);if(R.version>0&&k.__version!==R.version){rt(k,R,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+b)}const it={[ss]:i.REPEAT,[yi]:i.CLAMP_TO_EDGE,[Xo]:i.MIRRORED_REPEAT},V={[sn]:i.NEAREST,[iu]:i.NEAREST_MIPMAP_NEAREST,[Qs]:i.NEAREST_MIPMAP_LINEAR,[En]:i.LINEAR,[$r]:i.LINEAR_MIPMAP_NEAREST,[Si]:i.LINEAR_MIPMAP_LINEAR},J={[au]:i.NEVER,[fu]:i.ALWAYS,[cu]:i.LESS,[Fl]:i.LEQUAL,[lu]:i.EQUAL,[du]:i.GEQUAL,[hu]:i.GREATER,[uu]:i.NOTEQUAL};function bt(R,b){if(b.type===wn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===En||b.magFilter===$r||b.magFilter===Qs||b.magFilter===Si||b.minFilter===En||b.minFilter===$r||b.minFilter===Qs||b.minFilter===Si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,it[b.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,it[b.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,it[b.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,V[b.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,V[b.minFilter]),b.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,J[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===sn||b.minFilter!==Qs&&b.minFilter!==Si||b.type===wn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Xt(R,b){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",A));const Z=b.source;let nt=f.get(Z);nt===void 0&&(nt={},f.set(Z,nt));const $=Y(b);if($!==R.__cacheKey){nt[$]===void 0&&(nt[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),nt[$].usedTimes++;const Lt=nt[R.__cacheKey];Lt!==void 0&&(nt[R.__cacheKey].usedTimes--,Lt.usedTimes===0&&S(b)),R.__cacheKey=$,R.__webglTexture=nt[$].texture}return k}function Ft(R,b,k){return Math.floor(Math.floor(R/k)/b)}function Zt(R,b,k,Z){const $=R.updateRanges;if($.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,k,Z,b.data);else{$.sort((at,Mt)=>at.start-Mt.start);let Lt=0;for(let at=1;at<$.length;at++){const Mt=$[Lt],Ht=$[at],It=Mt.start+Mt.count,vt=Ft(Ht.start,b.width,4),$t=Ft(Mt.start,b.width,4);Ht.start<=It+1&&vt===$t&&Ft(Ht.start+Ht.count-1,b.width,4)===vt?Mt.count=Math.max(Mt.count,Ht.start+Ht.count-Mt.start):(++Lt,$[Lt]=Ht)}$.length=Lt+1;const dt=i.getParameter(i.UNPACK_ROW_LENGTH),Ct=i.getParameter(i.UNPACK_SKIP_PIXELS),Pt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let at=0,Mt=$.length;at<Mt;at++){const Ht=$[at],It=Math.floor(Ht.start/4),vt=Math.ceil(Ht.count/4),$t=It%b.width,N=Math.floor(It/b.width),ut=vt,gt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,$t),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),e.texSubImage2D(i.TEXTURE_2D,0,$t,N,ut,gt,k,Z,b.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,dt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ct),i.pixelStorei(i.UNPACK_SKIP_ROWS,Pt)}}function K(R,b,k){let Z=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Z=i.TEXTURE_3D);const nt=Xt(R,b),$=b.source;e.bindTexture(Z,R.__webglTexture,i.TEXTURE0+k);const Lt=n.get($);if($.version!==Lt.__version||nt===!0){e.activeTexture(i.TEXTURE0+k);const dt=se.getPrimaries(se.workingColorSpace),Ct=b.colorSpace===Kn?null:se.getPrimaries(b.colorSpace),Pt=b.colorSpace===Kn||dt===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let at=M(b.image,!1,s.maxTextureSize);at=qt(b,at);const Mt=r.convert(b.format,b.colorSpace),Ht=r.convert(b.type);let It=y(b.internalFormat,Mt,Ht,b.colorSpace,b.isVideoTexture);bt(Z,b);let vt;const $t=b.mipmaps,N=b.isVideoTexture!==!0,ut=Lt.__version===void 0||nt===!0,gt=$.dataReady,Tt=w(b,at);if(b.isDepthTexture)It=_(b.format===Os,b.type),ut&&(N?e.texStorage2D(i.TEXTURE_2D,1,It,at.width,at.height):e.texImage2D(i.TEXTURE_2D,0,It,at.width,at.height,0,Mt,Ht,null));else if(b.isDataTexture)if($t.length>0){N&&ut&&e.texStorage2D(i.TEXTURE_2D,Tt,It,$t[0].width,$t[0].height);for(let ct=0,et=$t.length;ct<et;ct++)vt=$t[ct],N?gt&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,vt.width,vt.height,Mt,Ht,vt.data):e.texImage2D(i.TEXTURE_2D,ct,It,vt.width,vt.height,0,Mt,Ht,vt.data);b.generateMipmaps=!1}else N?(ut&&e.texStorage2D(i.TEXTURE_2D,Tt,It,at.width,at.height),gt&&Zt(b,at,Mt,Ht)):e.texImage2D(i.TEXTURE_2D,0,It,at.width,at.height,0,Mt,Ht,at.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){N&&ut&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Tt,It,$t[0].width,$t[0].height,at.depth);for(let ct=0,et=$t.length;ct<et;ct++)if(vt=$t[ct],b.format!==xn)if(Mt!==null)if(N){if(gt)if(b.layerUpdates.size>0){const Dt=Vc(vt.width,vt.height,b.format,b.type);for(const Yt of b.layerUpdates){const de=vt.data.subarray(Yt*Dt/vt.data.BYTES_PER_ELEMENT,(Yt+1)*Dt/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,Yt,vt.width,vt.height,1,Mt,de)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,vt.width,vt.height,at.depth,Mt,vt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ct,It,vt.width,vt.height,at.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?gt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,vt.width,vt.height,at.depth,Mt,Ht,vt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ct,It,vt.width,vt.height,at.depth,0,Mt,Ht,vt.data)}else{N&&ut&&e.texStorage2D(i.TEXTURE_2D,Tt,It,$t[0].width,$t[0].height);for(let ct=0,et=$t.length;ct<et;ct++)vt=$t[ct],b.format!==xn?Mt!==null?N?gt&&e.compressedTexSubImage2D(i.TEXTURE_2D,ct,0,0,vt.width,vt.height,Mt,vt.data):e.compressedTexImage2D(i.TEXTURE_2D,ct,It,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?gt&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,vt.width,vt.height,Mt,Ht,vt.data):e.texImage2D(i.TEXTURE_2D,ct,It,vt.width,vt.height,0,Mt,Ht,vt.data)}else if(b.isDataArrayTexture)if(N){if(ut&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Tt,It,at.width,at.height,at.depth),gt)if(b.layerUpdates.size>0){const ct=Vc(at.width,at.height,b.format,b.type);for(const et of b.layerUpdates){const Dt=at.data.subarray(et*ct/at.data.BYTES_PER_ELEMENT,(et+1)*ct/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,et,at.width,at.height,1,Mt,Ht,Dt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,Mt,Ht,at.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,It,at.width,at.height,at.depth,0,Mt,Ht,at.data);else if(b.isData3DTexture)N?(ut&&e.texStorage3D(i.TEXTURE_3D,Tt,It,at.width,at.height,at.depth),gt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,Mt,Ht,at.data)):e.texImage3D(i.TEXTURE_3D,0,It,at.width,at.height,at.depth,0,Mt,Ht,at.data);else if(b.isFramebufferTexture){if(ut)if(N)e.texStorage2D(i.TEXTURE_2D,Tt,It,at.width,at.height);else{let ct=at.width,et=at.height;for(let Dt=0;Dt<Tt;Dt++)e.texImage2D(i.TEXTURE_2D,Dt,It,ct,et,0,Mt,Ht,null),ct>>=1,et>>=1}}else if($t.length>0){if(N&&ut){const ct=Gt($t[0]);e.texStorage2D(i.TEXTURE_2D,Tt,It,ct.width,ct.height)}for(let ct=0,et=$t.length;ct<et;ct++)vt=$t[ct],N?gt&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,Mt,Ht,vt):e.texImage2D(i.TEXTURE_2D,ct,It,Mt,Ht,vt);b.generateMipmaps=!1}else if(N){if(ut){const ct=Gt(at);e.texStorage2D(i.TEXTURE_2D,Tt,It,ct.width,ct.height)}gt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Mt,Ht,at)}else e.texImage2D(i.TEXTURE_2D,0,It,Mt,Ht,at);m(b)&&p(Z),Lt.__version=$.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function rt(R,b,k){if(b.image.length!==6)return;const Z=Xt(R,b),nt=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+k);const $=n.get(nt);if(nt.version!==$.__version||Z===!0){e.activeTexture(i.TEXTURE0+k);const Lt=se.getPrimaries(se.workingColorSpace),dt=b.colorSpace===Kn?null:se.getPrimaries(b.colorSpace),Ct=b.colorSpace===Kn||Lt===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);const Pt=b.isCompressedTexture||b.image[0].isCompressedTexture,at=b.image[0]&&b.image[0].isDataTexture,Mt=[];for(let et=0;et<6;et++)!Pt&&!at?Mt[et]=M(b.image[et],!0,s.maxCubemapSize):Mt[et]=at?b.image[et].image:b.image[et],Mt[et]=qt(b,Mt[et]);const Ht=Mt[0],It=r.convert(b.format,b.colorSpace),vt=r.convert(b.type),$t=y(b.internalFormat,It,vt,b.colorSpace),N=b.isVideoTexture!==!0,ut=$.__version===void 0||Z===!0,gt=nt.dataReady;let Tt=w(b,Ht);bt(i.TEXTURE_CUBE_MAP,b);let ct;if(Pt){N&&ut&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Tt,$t,Ht.width,Ht.height);for(let et=0;et<6;et++){ct=Mt[et].mipmaps;for(let Dt=0;Dt<ct.length;Dt++){const Yt=ct[Dt];b.format!==xn?It!==null?N?gt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Dt,0,0,Yt.width,Yt.height,It,Yt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Dt,$t,Yt.width,Yt.height,0,Yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Dt,0,0,Yt.width,Yt.height,It,vt,Yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Dt,$t,Yt.width,Yt.height,0,It,vt,Yt.data)}}}else{if(ct=b.mipmaps,N&&ut){ct.length>0&&Tt++;const et=Gt(Mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Tt,$t,et.width,et.height)}for(let et=0;et<6;et++)if(at){N?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Mt[et].width,Mt[et].height,It,vt,Mt[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,$t,Mt[et].width,Mt[et].height,0,It,vt,Mt[et].data);for(let Dt=0;Dt<ct.length;Dt++){const de=ct[Dt].image[et].image;N?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Dt+1,0,0,de.width,de.height,It,vt,de.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Dt+1,$t,de.width,de.height,0,It,vt,de.data)}}else{N?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,It,vt,Mt[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,$t,It,vt,Mt[et]);for(let Dt=0;Dt<ct.length;Dt++){const Yt=ct[Dt];N?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Dt+1,0,0,It,vt,Yt.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Dt+1,$t,It,vt,Yt.image[et])}}}m(b)&&p(i.TEXTURE_CUBE_MAP),$.__version=nt.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function wt(R,b,k,Z,nt,$){const Lt=r.convert(k.format,k.colorSpace),dt=r.convert(k.type),Ct=y(k.internalFormat,Lt,dt,k.colorSpace),Pt=n.get(b),at=n.get(k);if(at.__renderTarget=b,!Pt.__hasExternalTextures){const Mt=Math.max(1,b.width>>$),Ht=Math.max(1,b.height>>$);nt===i.TEXTURE_3D||nt===i.TEXTURE_2D_ARRAY?e.texImage3D(nt,$,Ct,Mt,Ht,b.depth,0,Lt,dt,null):e.texImage2D(nt,$,Ct,Mt,Ht,0,Lt,dt,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),ot(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,nt,at.__webglTexture,0,pt(b)):(nt===i.TEXTURE_2D||nt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,nt,at.__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(R,b,k){if(i.bindRenderbuffer(i.RENDERBUFFER,R),b.depthBuffer){const Z=b.depthTexture,nt=Z&&Z.isDepthTexture?Z.type:null,$=_(b.stencilBuffer,nt),Lt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=pt(b);ot(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,dt,$,b.width,b.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,dt,$,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,$,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Lt,i.RENDERBUFFER,R)}else{const Z=b.textures;for(let nt=0;nt<Z.length;nt++){const $=Z[nt],Lt=r.convert($.format,$.colorSpace),dt=r.convert($.type),Ct=y($.internalFormat,Lt,dt,$.colorSpace),Pt=pt(b);k&&ot(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,Ct,b.width,b.height):ot(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt,Ct,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Ct,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(b.depthTexture);Z.__renderTarget=b,(!Z.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),G(b.depthTexture,0);const nt=Z.__webglTexture,$=pt(b);if(b.depthTexture.format===Fs)ot(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0);else if(b.depthTexture.format===Os)ot(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function te(R){const b=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const Z=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Z){const nt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Z.removeEventListener("dispose",nt)};Z.addEventListener("dispose",nt),b.__depthDisposeCallback=nt}b.__boundDepthTexture=Z}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const Z=R.texture.mipmaps;Z&&Z.length>0?Rt(b.__webglFramebuffer[0],R):Rt(b.__webglFramebuffer,R)}else if(k){b.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[Z]),b.__webglDepthbuffer[Z]===void 0)b.__webglDepthbuffer[Z]=i.createRenderbuffer(),Ut(b.__webglDepthbuffer[Z],R,!1);else{const nt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=b.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,$)}}else{const Z=R.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Ut(b.__webglDepthbuffer,R,!1);else{const nt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,$)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ue(R,b,k){const Z=n.get(R);b!==void 0&&wt(Z.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&te(R)}function L(R){const b=R.texture,k=n.get(R),Z=n.get(b);R.addEventListener("dispose",T);const nt=R.textures,$=R.isWebGLCubeRenderTarget===!0,Lt=nt.length>1;if(Lt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=b.version,o.memory.textures++),$){k.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer[dt]=[];for(let Ct=0;Ct<b.mipmaps.length;Ct++)k.__webglFramebuffer[dt][Ct]=i.createFramebuffer()}else k.__webglFramebuffer[dt]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer=[];for(let dt=0;dt<b.mipmaps.length;dt++)k.__webglFramebuffer[dt]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Lt)for(let dt=0,Ct=nt.length;dt<Ct;dt++){const Pt=n.get(nt[dt]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&ot(R)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let dt=0;dt<nt.length;dt++){const Ct=nt[dt];k.__webglColorRenderbuffer[dt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[dt]);const Pt=r.convert(Ct.format,Ct.colorSpace),at=r.convert(Ct.type),Mt=y(Ct.internalFormat,Pt,at,Ct.colorSpace,R.isXRRenderTarget===!0),Ht=pt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht,Mt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,k.__webglColorRenderbuffer[dt])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Ut(k.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),bt(i.TEXTURE_CUBE_MAP,b);for(let dt=0;dt<6;dt++)if(b.mipmaps&&b.mipmaps.length>0)for(let Ct=0;Ct<b.mipmaps.length;Ct++)wt(k.__webglFramebuffer[dt][Ct],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Ct);else wt(k.__webglFramebuffer[dt],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);m(b)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let dt=0,Ct=nt.length;dt<Ct;dt++){const Pt=nt[dt],at=n.get(Pt);let Mt=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Mt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Mt,at.__webglTexture),bt(Mt,Pt),wt(k.__webglFramebuffer,R,Pt,i.COLOR_ATTACHMENT0+dt,Mt,0),m(Pt)&&p(Mt)}e.unbindTexture()}else{let dt=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(dt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,Z.__webglTexture),bt(dt,b),b.mipmaps&&b.mipmaps.length>0)for(let Ct=0;Ct<b.mipmaps.length;Ct++)wt(k.__webglFramebuffer[Ct],R,b,i.COLOR_ATTACHMENT0,dt,Ct);else wt(k.__webglFramebuffer,R,b,i.COLOR_ATTACHMENT0,dt,0);m(b)&&p(dt),e.unbindTexture()}R.depthBuffer&&te(R)}function st(R){const b=R.textures;for(let k=0,Z=b.length;k<Z;k++){const nt=b[k];if(m(nt)){const $=v(R),Lt=n.get(nt).__webglTexture;e.bindTexture($,Lt),p($),e.unbindTexture()}}}const tt=[],Q=[];function j(R){if(R.samples>0){if(ot(R)===!1){const b=R.textures,k=R.width,Z=R.height;let nt=i.COLOR_BUFFER_BIT;const $=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Lt=n.get(R),dt=b.length>1;if(dt)for(let Pt=0;Pt<b.length;Pt++)e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);const Ct=R.texture.mipmaps;Ct&&Ct.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Pt=0;Pt<b.length;Pt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(nt|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(nt|=i.STENCIL_BUFFER_BIT)),dt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[Pt]);const at=n.get(b[Pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,at,0)}i.blitFramebuffer(0,0,k,Z,0,0,k,Z,nt,i.NEAREST),c===!0&&(tt.length=0,Q.length=0,tt.push(i.COLOR_ATTACHMENT0+Pt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(tt.push($),Q.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Q)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,tt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),dt)for(let Pt=0;Pt<b.length;Pt++){e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[Pt]);const at=n.get(b[Pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,at,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const b=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function pt(R){return Math.min(s.maxSamples,R.samples)}function ot(R){const b=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function mt(R){const b=o.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function qt(R,b){const k=R.colorSpace,Z=R.format,nt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==rs&&k!==Kn&&(se.getTransfer(k)===le?(Z!==xn||nt!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),b}function Gt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=U,this.setTexture2D=G,this.setTexture2DArray=X,this.setTexture3D=F,this.setTextureCube=H,this.rebindTextures=ue,this.setupRenderTarget=L,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=j,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=ot}function yg(i,t){function e(n,s=Kn){let r;const o=se.getTransfer(s);if(n===An)return i.UNSIGNED_BYTE;if(n===Ua)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Na)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Pl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Dl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Rl)return i.BYTE;if(n===Cl)return i.SHORT;if(n===Us)return i.UNSIGNED_SHORT;if(n===Ia)return i.INT;if(n===wi)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===Ys)return i.HALF_FLOAT;if(n===Ll)return i.ALPHA;if(n===Il)return i.RGB;if(n===xn)return i.RGBA;if(n===Fs)return i.DEPTH_COMPONENT;if(n===Os)return i.DEPTH_STENCIL;if(n===Fa)return i.RED;if(n===Oa)return i.RED_INTEGER;if(n===Ul)return i.RG;if(n===za)return i.RG_INTEGER;if(n===Ba)return i.RGBA_INTEGER;if(n===Pr||n===Dr||n===Lr||n===Ir)if(o===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Pr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Pr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Lr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===qo||n===Yo||n===Zo||n===$o)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===qo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Yo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===$o)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Jo||n===Ko||n===jo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Jo||n===Ko)return o===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===jo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Qo||n===ta||n===ea||n===na||n===ia||n===sa||n===ra||n===oa||n===aa||n===ca||n===la||n===ha||n===ua||n===da)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Qo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ta)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ea)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===na)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ia)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===sa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ra)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===oa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===aa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ca)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===la)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ha)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ua)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===da)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fa||n===pa||n===ma)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===fa)return o===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===pa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ma)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ga||n===_a||n===va||n===xa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ga)return r.COMPRESSED_RED_RGTC1_EXT;if(n===_a)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===va)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===xa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ns?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Sg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Eg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Zl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new qe({vertexShader:Sg,fragmentShader:bg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new St(new Ne(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wg extends us{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null;const M=typeof XRWebGLBinding<"u",m=new Eg,p={},v=e.getContextAttributes();let y=null,_=null;const w=[],A=[],T=new ft;let D=null;const S=new ln;S.viewport=new Te;const x=new ln;x.viewport=new Te;const C=[S,x],U=new Xd;let z=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let rt=w[K];return rt===void 0&&(rt=new _o,w[K]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(K){let rt=w[K];return rt===void 0&&(rt=new _o,w[K]=rt),rt.getGripSpace()},this.getHand=function(K){let rt=w[K];return rt===void 0&&(rt=new _o,w[K]=rt),rt.getHandSpace()};function G(K){const rt=A.indexOf(K.inputSource);if(rt===-1)return;const wt=w[rt];wt!==void 0&&(wt.update(K.inputSource,K.frame,l||o),wt.dispatchEvent({type:K.type,data:K.inputSource}))}function X(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",F);for(let K=0;K<w.length;K++){const rt=A[K];rt!==null&&(A[K]=null,w[K].disconnect(rt))}z=null,Y=null,m.reset();for(const K in p)delete p[K];t.setRenderTarget(y),d=null,f=null,u=null,s=null,_=null,Zt.stop(),n.isPresenting=!1,t.setPixelRatio(D),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",X),s.addEventListener("inputsourceschange",F),v.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(T),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let wt=null,Ut=null,Rt=null;v.depth&&(Rt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,wt=v.stencil?Os:Fs,Ut=v.stencil?Ns:wi);const te={colorFormat:e.RGBA8,depthFormat:Rt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(te),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new Ti(f.textureWidth,f.textureHeight,{format:xn,type:An,depthTexture:new Yl(f.textureWidth,f.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const wt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,wt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Ti(d.framebufferWidth,d.framebufferHeight,{format:xn,type:An,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Zt.setContext(s),Zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function F(K){for(let rt=0;rt<K.removed.length;rt++){const wt=K.removed[rt],Ut=A.indexOf(wt);Ut>=0&&(A[Ut]=null,w[Ut].disconnect(wt))}for(let rt=0;rt<K.added.length;rt++){const wt=K.added[rt];let Ut=A.indexOf(wt);if(Ut===-1){for(let te=0;te<w.length;te++)if(te>=A.length){A.push(wt),Ut=te;break}else if(A[te]===null){A[te]=wt,Ut=te;break}if(Ut===-1)break}const Rt=w[Ut];Rt&&Rt.connect(wt)}}const H=new P,it=new P;function V(K,rt,wt){H.setFromMatrixPosition(rt.matrixWorld),it.setFromMatrixPosition(wt.matrixWorld);const Ut=H.distanceTo(it),Rt=rt.projectionMatrix.elements,te=wt.projectionMatrix.elements,ue=Rt[14]/(Rt[10]-1),L=Rt[14]/(Rt[10]+1),st=(Rt[9]+1)/Rt[5],tt=(Rt[9]-1)/Rt[5],Q=(Rt[8]-1)/Rt[0],j=(te[8]+1)/te[0],pt=ue*Q,ot=ue*j,mt=Ut/(-Q+j),qt=mt*-Q;if(rt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(qt),K.translateZ(mt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Rt[10]===-1)K.projectionMatrix.copy(rt.projectionMatrix),K.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const Gt=ue+mt,R=L+mt,b=pt-qt,k=ot+(Ut-qt),Z=st*L/R*Gt,nt=tt*L/R*Gt;K.projectionMatrix.makePerspective(b,k,Z,nt,Gt,R),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function J(K,rt){rt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(rt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let rt=K.near,wt=K.far;m.texture!==null&&(m.depthNear>0&&(rt=m.depthNear),m.depthFar>0&&(wt=m.depthFar)),U.near=x.near=S.near=rt,U.far=x.far=S.far=wt,(z!==U.near||Y!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),z=U.near,Y=U.far),U.layers.mask=K.layers.mask|6,S.layers.mask=U.layers.mask&3,x.layers.mask=U.layers.mask&5;const Ut=K.parent,Rt=U.cameras;J(U,Ut);for(let te=0;te<Rt.length;te++)J(Rt[te],Ut);Rt.length===2?V(U,S,x):U.projectionMatrix.copy(S.projectionMatrix),bt(K,U,Ut)};function bt(K,rt,wt){wt===null?K.matrix.copy(rt.matrixWorld):(K.matrix.copy(wt.matrixWorld),K.matrix.invert(),K.matrix.multiply(rt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(rt.projectionMatrix),K.projectionMatrixInverse.copy(rt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=zs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(K){c=K,f!==null&&(f.fixedFoveation=K),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(K){return p[K]};let Xt=null;function Ft(K,rt){if(h=rt.getViewerPose(l||o),g=rt,h!==null){const wt=h.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let Ut=!1;wt.length!==U.cameras.length&&(U.cameras.length=0,Ut=!0);for(let L=0;L<wt.length;L++){const st=wt[L];let tt=null;if(d!==null)tt=d.getViewport(st);else{const j=u.getViewSubImage(f,st);tt=j.viewport,L===0&&(t.setRenderTargetTextures(_,j.colorTexture,j.depthStencilTexture),t.setRenderTarget(_))}let Q=C[L];Q===void 0&&(Q=new ln,Q.layers.enable(L),Q.viewport=new Te,C[L]=Q),Q.matrix.fromArray(st.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(st.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(tt.x,tt.y,tt.width,tt.height),L===0&&(U.matrix.copy(Q.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ut===!0&&U.cameras.push(Q)}const Rt=s.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){u=n.getBinding();const L=u.getDepthInformation(wt[0]);L&&L.isValid&&L.texture&&m.init(L,s.renderState)}if(Rt&&Rt.includes("camera-access")&&M){t.state.unbindTexture(),u=n.getBinding();for(let L=0;L<wt.length;L++){const st=wt[L].camera;if(st){let tt=p[st];tt||(tt=new Zl,p[st]=tt);const Q=u.getCameraImage(st);tt.sourceTexture=Q}}}}for(let wt=0;wt<w.length;wt++){const Ut=A[wt],Rt=w[wt];Ut!==null&&Rt!==void 0&&Rt.update(Ut,rt,l||o)}Xt&&Xt(K,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),g=null}const Zt=new oh;Zt.setAnimationLoop(Ft),this.setAnimationLoop=function(K){Xt=K},this.dispose=function(){}}}const di=new Rn,Tg=new pe;function Ag(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Gl(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),M(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ye&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ye&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=t.get(p),y=v.envMap,_=v.envMapRotation;y&&(m.envMap.value=y,di.copy(_),di.x*=-1,di.y*=-1,di.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),m.envMapRotation.value.setFromMatrix4(Tg.makeRotationFromEuler(di)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ye&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){const v=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Rg(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){const _=y.program;n.uniformBlockBinding(v,_)}function l(v,y){let _=s[v.id];_===void 0&&(g(v),_=h(v),s[v.id]=_,v.addEventListener("dispose",m));const w=y.program;n.updateUBOMapping(v,w);const A=t.render.frame;r[v.id]!==A&&(f(v),r[v.id]=A)}function h(v){const y=u();v.__bindingPointIndex=y;const _=i.createBuffer(),w=v.__size,A=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,w,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const y=s[v.id],_=v.uniforms,w=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let A=0,T=_.length;A<T;A++){const D=Array.isArray(_[A])?_[A]:[_[A]];for(let S=0,x=D.length;S<x;S++){const C=D[S];if(d(C,A,S,w)===!0){const U=C.__offset,z=Array.isArray(C.value)?C.value:[C.value];let Y=0;for(let G=0;G<z.length;G++){const X=z[G],F=M(X);typeof X=="number"||typeof X=="boolean"?(C.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,U+Y,C.__data)):X.isMatrix3?(C.__data[0]=X.elements[0],C.__data[1]=X.elements[1],C.__data[2]=X.elements[2],C.__data[3]=0,C.__data[4]=X.elements[3],C.__data[5]=X.elements[4],C.__data[6]=X.elements[5],C.__data[7]=0,C.__data[8]=X.elements[6],C.__data[9]=X.elements[7],C.__data[10]=X.elements[8],C.__data[11]=0):(X.toArray(C.__data,Y),Y+=F.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,y,_,w){const A=v.value,T=y+"_"+_;if(w[T]===void 0)return typeof A=="number"||typeof A=="boolean"?w[T]=A:w[T]=A.clone(),!0;{const D=w[T];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return w[T]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function g(v){const y=v.uniforms;let _=0;const w=16;for(let T=0,D=y.length;T<D;T++){const S=Array.isArray(y[T])?y[T]:[y[T]];for(let x=0,C=S.length;x<C;x++){const U=S[x],z=Array.isArray(U.value)?U.value:[U.value];for(let Y=0,G=z.length;Y<G;Y++){const X=z[Y],F=M(X),H=_%w,it=H%F.boundary,V=H+it;_+=it,V!==0&&w-V<F.storage&&(_+=w-V),U.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=_,_+=F.storage}}}const A=_%w;return A>0&&(_+=w-A),v.__size=_,v.__cache={},this}function M(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){const y=v.target;y.removeEventListener("dispose",m);const _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Cg{constructor(t={}){const{canvas:e=Pu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),M=new Int32Array(4);let m=null,p=null;const v=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let w=!1;this._outputColorSpace=Ue;let A=0,T=0,D=null,S=-1,x=null;const C=new Te,U=new Te;let z=null;const Y=new Wt(0);let G=0,X=e.width,F=e.height,H=1,it=null,V=null;const J=new Te(0,0,X,F),bt=new Te(0,0,X,F);let Xt=!1;const Ft=new Xa;let Zt=!1,K=!1;const rt=new pe,wt=new P,Ut=new Te,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let te=!1;function ue(){return D===null?H:1}let L=n;function st(E,O){return e.getContext(E,O)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${La}`),e.addEventListener("webglcontextlost",gt,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",ct,!1),L===null){const O="webgl2";if(L=st(O,E),L===null)throw st(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let tt,Q,j,pt,ot,mt,qt,Gt,R,b,k,Z,nt,$,Lt,dt,Ct,Pt,at,Mt,Ht,It,vt,$t;function N(){tt=new Bm(L),tt.init(),It=new yg(L,tt),Q=new Lm(L,tt,t,It),j=new xg(L,tt),Q.reversedDepthBuffer&&f&&j.buffers.depth.setReversed(!0),pt=new Vm(L),ot=new og,mt=new Mg(L,tt,j,ot,Q,It,pt),qt=new Um(_),Gt=new zm(_),R=new Yd(L),vt=new Pm(L,R),b=new km(L,R,pt,vt),k=new Wm(L,b,R,pt),at=new Gm(L,Q,mt),dt=new Im(ot),Z=new rg(_,qt,Gt,tt,Q,vt,dt),nt=new Ag(_,ot),$=new cg,Lt=new pg(tt),Pt=new Cm(_,qt,Gt,j,k,d,c),Ct=new _g(_,k,Q),$t=new Rg(L,pt,Q,j),Mt=new Dm(L,tt,pt),Ht=new Hm(L,tt,pt),pt.programs=Z.programs,_.capabilities=Q,_.extensions=tt,_.properties=ot,_.renderLists=$,_.shadowMap=Ct,_.state=j,_.info=pt}N();const ut=new wg(_,L);this.xr=ut,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const E=tt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=tt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(E){E!==void 0&&(H=E,this.setSize(X,F,!1))},this.getSize=function(E){return E.set(X,F)},this.setSize=function(E,O,W=!0){if(ut.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=E,F=O,e.width=Math.floor(E*H),e.height=Math.floor(O*H),W===!0&&(e.style.width=E+"px",e.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(X*H,F*H).floor()},this.setDrawingBufferSize=function(E,O,W){X=E,F=O,H=W,e.width=Math.floor(E*W),e.height=Math.floor(O*W),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(C)},this.getViewport=function(E){return E.copy(J)},this.setViewport=function(E,O,W,q){E.isVector4?J.set(E.x,E.y,E.z,E.w):J.set(E,O,W,q),j.viewport(C.copy(J).multiplyScalar(H).round())},this.getScissor=function(E){return E.copy(bt)},this.setScissor=function(E,O,W,q){E.isVector4?bt.set(E.x,E.y,E.z,E.w):bt.set(E,O,W,q),j.scissor(U.copy(bt).multiplyScalar(H).round())},this.getScissorTest=function(){return Xt},this.setScissorTest=function(E){j.setScissorTest(Xt=E)},this.setOpaqueSort=function(E){it=E},this.setTransparentSort=function(E){V=E},this.getClearColor=function(E){return E.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor(...arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha(...arguments)},this.clear=function(E=!0,O=!0,W=!0){let q=0;if(E){let B=!1;if(D!==null){const lt=D.texture.format;B=lt===Ba||lt===za||lt===Oa}if(B){const lt=D.texture.type,xt=lt===An||lt===wi||lt===Us||lt===Ns||lt===Ua||lt===Na,At=Pt.getClearColor(),Et=Pt.getClearAlpha(),kt=At.r,Vt=At.g,Ot=At.b;xt?(g[0]=kt,g[1]=Vt,g[2]=Ot,g[3]=Et,L.clearBufferuiv(L.COLOR,0,g)):(M[0]=kt,M[1]=Vt,M[2]=Ot,M[3]=Et,L.clearBufferiv(L.COLOR,0,M))}else q|=L.COLOR_BUFFER_BIT}O&&(q|=L.DEPTH_BUFFER_BIT),W&&(q|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),Pt.dispose(),$.dispose(),Lt.dispose(),ot.dispose(),qt.dispose(),Gt.dispose(),k.dispose(),vt.dispose(),$t.dispose(),Z.dispose(),ut.dispose(),ut.removeEventListener("sessionstart",Mn),ut.removeEventListener("sessionend",tc),ri.stop()};function gt(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function Tt(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const E=pt.autoReset,O=Ct.enabled,W=Ct.autoUpdate,q=Ct.needsUpdate,B=Ct.type;N(),pt.autoReset=E,Ct.enabled=O,Ct.autoUpdate=W,Ct.needsUpdate=q,Ct.type=B}function ct(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function et(E){const O=E.target;O.removeEventListener("dispose",et),Dt(O)}function Dt(E){Yt(E),ot.remove(E)}function Yt(E){const O=ot.get(E).programs;O!==void 0&&(O.forEach(function(W){Z.releaseProgram(W)}),E.isShaderMaterial&&Z.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,W,q,B,lt){O===null&&(O=Rt);const xt=B.isMesh&&B.matrixWorld.determinant()<0,At=bh(E,O,W,q,B);j.setMaterial(q,xt);let Et=W.index,kt=1;if(q.wireframe===!0){if(Et=b.getWireframeAttribute(W),Et===void 0)return;kt=2}const Vt=W.drawRange,Ot=W.attributes.position;let ee=Vt.start*kt,ce=(Vt.start+Vt.count)*kt;lt!==null&&(ee=Math.max(ee,lt.start*kt),ce=Math.min(ce,(lt.start+lt.count)*kt)),Et!==null?(ee=Math.max(ee,0),ce=Math.min(ce,Et.count)):Ot!=null&&(ee=Math.max(ee,0),ce=Math.min(ce,Ot.count));const be=ce-ee;if(be<0||be===1/0)return;vt.setup(B,q,At,W,Et);let ge,he=Mt;if(Et!==null&&(ge=R.get(Et),he=Ht,he.setIndex(ge)),B.isMesh)q.wireframe===!0?(j.setLineWidth(q.wireframeLinewidth*ue()),he.setMode(L.LINES)):he.setMode(L.TRIANGLES);else if(B.isLine){let zt=q.linewidth;zt===void 0&&(zt=1),j.setLineWidth(zt*ue()),B.isLineSegments?he.setMode(L.LINES):B.isLineLoop?he.setMode(L.LINE_LOOP):he.setMode(L.LINE_STRIP)}else B.isPoints?he.setMode(L.POINTS):B.isSprite&&he.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Bs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),he.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))he.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const zt=B._multiDrawStarts,xe=B._multiDrawCounts,ne=B._multiDrawCount,Ke=Et?R.get(Et).bytesPerElement:1,Ii=ot.get(q).currentProgram.getUniforms();for(let je=0;je<ne;je++)Ii.setValue(L,"_gl_DrawID",je),he.render(zt[je]/Ke,xe[je])}else if(B.isInstancedMesh)he.renderInstances(ee,be,B.count);else if(W.isInstancedBufferGeometry){const zt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,xe=Math.min(W.instanceCount,zt);he.renderInstances(ee,be,xe)}else he.render(ee,be)};function de(E,O,W){E.transparent===!0&&E.side===ve&&E.forceSinglePass===!1?(E.side=Ye,E.needsUpdate=!0,js(E,O,W),E.side=ii,E.needsUpdate=!0,js(E,O,W),E.side=ve):js(E,O,W)}this.compile=function(E,O,W=null){W===null&&(W=E),p=Lt.get(W),p.init(O),y.push(p),W.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),E!==W&&E.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const q=new Set;return E.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const lt=B.material;if(lt)if(Array.isArray(lt))for(let xt=0;xt<lt.length;xt++){const At=lt[xt];de(At,W,B),q.add(At)}else de(lt,W,B),q.add(lt)}),p=y.pop(),q},this.compileAsync=function(E,O,W=null){const q=this.compile(E,O,W);return new Promise(B=>{function lt(){if(q.forEach(function(xt){ot.get(xt).currentProgram.isReady()&&q.delete(xt)}),q.size===0){B(E);return}setTimeout(lt,10)}tt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let ae=null;function Dn(E){ae&&ae(E)}function Mn(){ri.stop()}function tc(){ri.start()}const ri=new oh;ri.setAnimationLoop(Dn),typeof self<"u"&&ri.setContext(self),this.setAnimationLoop=function(E){ae=E,ut.setAnimationLoop(E),E===null?ri.stop():ri.start()},ut.addEventListener("sessionstart",Mn),ut.addEventListener("sessionend",tc),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ut.enabled===!0&&ut.isPresenting===!0&&(ut.cameraAutoUpdate===!0&&ut.updateCamera(O),O=ut.getCamera()),E.isScene===!0&&E.onBeforeRender(_,E,O,D),p=Lt.get(E,y.length),p.init(O),y.push(p),rt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ft.setFromProjectionMatrix(rt,Tn,O.reversedDepth),K=this.localClippingEnabled,Zt=dt.init(this.clippingPlanes,K),m=$.get(E,v.length),m.init(),v.push(m),ut.enabled===!0&&ut.isPresenting===!0){const lt=_.xr.getDepthSensingMesh();lt!==null&&Yr(lt,O,-1/0,_.sortObjects)}Yr(E,O,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(it,V),te=ut.enabled===!1||ut.isPresenting===!1||ut.hasDepthSensing()===!1,te&&Pt.addToRenderList(m,E),this.info.render.frame++,Zt===!0&&dt.beginShadows();const W=p.state.shadowsArray;Ct.render(W,E,O),Zt===!0&&dt.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,B=m.transmissive;if(p.setupLights(),O.isArrayCamera){const lt=O.cameras;if(B.length>0)for(let xt=0,At=lt.length;xt<At;xt++){const Et=lt[xt];nc(q,B,E,Et)}te&&Pt.render(E);for(let xt=0,At=lt.length;xt<At;xt++){const Et=lt[xt];ec(m,E,Et,Et.viewport)}}else B.length>0&&nc(q,B,E,O),te&&Pt.render(E),ec(m,E,O);D!==null&&T===0&&(mt.updateMultisampleRenderTarget(D),mt.updateRenderTargetMipmap(D)),E.isScene===!0&&E.onAfterRender(_,E,O),vt.resetDefaultState(),S=-1,x=null,y.pop(),y.length>0?(p=y[y.length-1],Zt===!0&&dt.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Yr(E,O,W,q){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)W=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Ft.intersectsSprite(E)){q&&Ut.setFromMatrixPosition(E.matrixWorld).applyMatrix4(rt);const xt=k.update(E),At=E.material;At.visible&&m.push(E,xt,At,W,Ut.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Ft.intersectsObject(E))){const xt=k.update(E),At=E.material;if(q&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ut.copy(E.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),Ut.copy(xt.boundingSphere.center)),Ut.applyMatrix4(E.matrixWorld).applyMatrix4(rt)),Array.isArray(At)){const Et=xt.groups;for(let kt=0,Vt=Et.length;kt<Vt;kt++){const Ot=Et[kt],ee=At[Ot.materialIndex];ee&&ee.visible&&m.push(E,xt,ee,W,Ut.z,Ot)}}else At.visible&&m.push(E,xt,At,W,Ut.z,null)}}const lt=E.children;for(let xt=0,At=lt.length;xt<At;xt++)Yr(lt[xt],O,W,q)}function ec(E,O,W,q){const B=E.opaque,lt=E.transmissive,xt=E.transparent;p.setupLightsView(W),Zt===!0&&dt.setGlobalState(_.clippingPlanes,W),q&&j.viewport(C.copy(q)),B.length>0&&Ks(B,O,W),lt.length>0&&Ks(lt,O,W),xt.length>0&&Ks(xt,O,W),j.buffers.depth.setTest(!0),j.buffers.depth.setMask(!0),j.buffers.color.setMask(!0),j.setPolygonOffset(!1)}function nc(E,O,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new Ti(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?Ys:An,minFilter:Si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));const lt=p.state.transmissionRenderTarget[q.id],xt=q.viewport||C;lt.setSize(xt.z*_.transmissionResolutionScale,xt.w*_.transmissionResolutionScale);const At=_.getRenderTarget(),Et=_.getActiveCubeFace(),kt=_.getActiveMipmapLevel();_.setRenderTarget(lt),_.getClearColor(Y),G=_.getClearAlpha(),G<1&&_.setClearColor(16777215,.5),_.clear(),te&&Pt.render(W);const Vt=_.toneMapping;_.toneMapping=ni;const Ot=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),Zt===!0&&dt.setGlobalState(_.clippingPlanes,q),Ks(E,W,q),mt.updateMultisampleRenderTarget(lt),mt.updateRenderTargetMipmap(lt),tt.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let ce=0,be=O.length;ce<be;ce++){const ge=O[ce],he=ge.object,zt=ge.geometry,xe=ge.material,ne=ge.group;if(xe.side===ve&&he.layers.test(q.layers)){const Ke=xe.side;xe.side=Ye,xe.needsUpdate=!0,ic(he,W,q,zt,xe,ne),xe.side=Ke,xe.needsUpdate=!0,ee=!0}}ee===!0&&(mt.updateMultisampleRenderTarget(lt),mt.updateRenderTargetMipmap(lt))}_.setRenderTarget(At,Et,kt),_.setClearColor(Y,G),Ot!==void 0&&(q.viewport=Ot),_.toneMapping=Vt}function Ks(E,O,W){const q=O.isScene===!0?O.overrideMaterial:null;for(let B=0,lt=E.length;B<lt;B++){const xt=E[B],At=xt.object,Et=xt.geometry,kt=xt.group;let Vt=xt.material;Vt.allowOverride===!0&&q!==null&&(Vt=q),At.layers.test(W.layers)&&ic(At,O,W,Et,Vt,kt)}}function ic(E,O,W,q,B,lt){E.onBeforeRender(_,O,W,q,B,lt),E.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),B.onBeforeRender(_,O,W,q,E,lt),B.transparent===!0&&B.side===ve&&B.forceSinglePass===!1?(B.side=Ye,B.needsUpdate=!0,_.renderBufferDirect(W,O,q,B,E,lt),B.side=ii,B.needsUpdate=!0,_.renderBufferDirect(W,O,q,B,E,lt),B.side=ve):_.renderBufferDirect(W,O,q,B,E,lt),E.onAfterRender(_,O,W,q,B,lt)}function js(E,O,W){O.isScene!==!0&&(O=Rt);const q=ot.get(E),B=p.state.lights,lt=p.state.shadowsArray,xt=B.state.version,At=Z.getParameters(E,B.state,lt,O,W),Et=Z.getProgramCacheKey(At);let kt=q.programs;q.environment=E.isMeshStandardMaterial?O.environment:null,q.fog=O.fog,q.envMap=(E.isMeshStandardMaterial?Gt:qt).get(E.envMap||q.environment),q.envMapRotation=q.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,kt===void 0&&(E.addEventListener("dispose",et),kt=new Map,q.programs=kt);let Vt=kt.get(Et);if(Vt!==void 0){if(q.currentProgram===Vt&&q.lightsStateVersion===xt)return rc(E,At),Vt}else At.uniforms=Z.getUniforms(E),E.onBeforeCompile(At,_),Vt=Z.acquireProgram(At,Et),kt.set(Et,Vt),q.uniforms=At.uniforms;const Ot=q.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ot.clippingPlanes=dt.uniform),rc(E,At),q.needsLights=wh(E),q.lightsStateVersion=xt,q.needsLights&&(Ot.ambientLightColor.value=B.state.ambient,Ot.lightProbe.value=B.state.probe,Ot.directionalLights.value=B.state.directional,Ot.directionalLightShadows.value=B.state.directionalShadow,Ot.spotLights.value=B.state.spot,Ot.spotLightShadows.value=B.state.spotShadow,Ot.rectAreaLights.value=B.state.rectArea,Ot.ltc_1.value=B.state.rectAreaLTC1,Ot.ltc_2.value=B.state.rectAreaLTC2,Ot.pointLights.value=B.state.point,Ot.pointLightShadows.value=B.state.pointShadow,Ot.hemisphereLights.value=B.state.hemi,Ot.directionalShadowMap.value=B.state.directionalShadowMap,Ot.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ot.spotShadowMap.value=B.state.spotShadowMap,Ot.spotLightMatrix.value=B.state.spotLightMatrix,Ot.spotLightMap.value=B.state.spotLightMap,Ot.pointShadowMap.value=B.state.pointShadowMap,Ot.pointShadowMatrix.value=B.state.pointShadowMatrix),q.currentProgram=Vt,q.uniformsList=null,Vt}function sc(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=Nr.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function rc(E,O){const W=ot.get(E);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function bh(E,O,W,q,B){O.isScene!==!0&&(O=Rt),mt.resetTextureUnits();const lt=O.fog,xt=q.isMeshStandardMaterial?O.environment:null,At=D===null?_.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:rs,Et=(q.isMeshStandardMaterial?Gt:qt).get(q.envMap||xt),kt=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Vt=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ot=!!W.morphAttributes.position,ee=!!W.morphAttributes.normal,ce=!!W.morphAttributes.color;let be=ni;q.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(be=_.toneMapping);const ge=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,he=ge!==void 0?ge.length:0,zt=ot.get(q),xe=p.state.lights;if(Zt===!0&&(K===!0||E!==x)){const Ge=E===x&&q.id===S;dt.setState(q,E,Ge)}let ne=!1;q.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==xe.state.version||zt.outputColorSpace!==At||B.isBatchedMesh&&zt.batching===!1||!B.isBatchedMesh&&zt.batching===!0||B.isBatchedMesh&&zt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&zt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&zt.instancing===!1||!B.isInstancedMesh&&zt.instancing===!0||B.isSkinnedMesh&&zt.skinning===!1||!B.isSkinnedMesh&&zt.skinning===!0||B.isInstancedMesh&&zt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&zt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&zt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&zt.instancingMorph===!1&&B.morphTexture!==null||zt.envMap!==Et||q.fog===!0&&zt.fog!==lt||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==dt.numPlanes||zt.numIntersection!==dt.numIntersection)||zt.vertexAlphas!==kt||zt.vertexTangents!==Vt||zt.morphTargets!==Ot||zt.morphNormals!==ee||zt.morphColors!==ce||zt.toneMapping!==be||zt.morphTargetsCount!==he)&&(ne=!0):(ne=!0,zt.__version=q.version);let Ke=zt.currentProgram;ne===!0&&(Ke=js(q,O,B));let Ii=!1,je=!1,ms=!1;const Me=Ke.getUniforms(),rn=zt.uniforms;if(j.useProgram(Ke.program)&&(Ii=!0,je=!0,ms=!0),q.id!==S&&(S=q.id,je=!0),Ii||x!==E){j.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Me.setValue(L,"projectionMatrix",E.projectionMatrix),Me.setValue(L,"viewMatrix",E.matrixWorldInverse);const Ze=Me.map.cameraPosition;Ze!==void 0&&Ze.setValue(L,wt.setFromMatrixPosition(E.matrixWorld)),Q.logarithmicDepthBuffer&&Me.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Me.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),x!==E&&(x=E,je=!0,ms=!0)}if(B.isSkinnedMesh){Me.setOptional(L,B,"bindMatrix"),Me.setOptional(L,B,"bindMatrixInverse");const Ge=B.skeleton;Ge&&(Ge.boneTexture===null&&Ge.computeBoneTexture(),Me.setValue(L,"boneTexture",Ge.boneTexture,mt))}B.isBatchedMesh&&(Me.setOptional(L,B,"batchingTexture"),Me.setValue(L,"batchingTexture",B._matricesTexture,mt),Me.setOptional(L,B,"batchingIdTexture"),Me.setValue(L,"batchingIdTexture",B._indirectTexture,mt),Me.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&Me.setValue(L,"batchingColorTexture",B._colorsTexture,mt));const on=W.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0)&&at.update(B,W,Ke),(je||zt.receiveShadow!==B.receiveShadow)&&(zt.receiveShadow=B.receiveShadow,Me.setValue(L,"receiveShadow",B.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(rn.envMap.value=Et,rn.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&O.environment!==null&&(rn.envMapIntensity.value=O.environmentIntensity),je&&(Me.setValue(L,"toneMappingExposure",_.toneMappingExposure),zt.needsLights&&Eh(rn,ms),lt&&q.fog===!0&&nt.refreshFogUniforms(rn,lt),nt.refreshMaterialUniforms(rn,q,H,F,p.state.transmissionRenderTarget[E.id]),Nr.upload(L,sc(zt),rn,mt)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Nr.upload(L,sc(zt),rn,mt),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Me.setValue(L,"center",B.center),Me.setValue(L,"modelViewMatrix",B.modelViewMatrix),Me.setValue(L,"normalMatrix",B.normalMatrix),Me.setValue(L,"modelMatrix",B.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const Ge=q.uniformsGroups;for(let Ze=0,Zr=Ge.length;Ze<Zr;Ze++){const oi=Ge[Ze];$t.update(oi,Ke),$t.bind(oi,Ke)}}return Ke}function Eh(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function wh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(E,O,W){const q=ot.get(E);q.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),ot.get(E.texture).__webglTexture=O,ot.get(E.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:W,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,O){const W=ot.get(E);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0};const Th=L.createFramebuffer();this.setRenderTarget=function(E,O=0,W=0){D=E,A=O,T=W;let q=!0,B=null,lt=!1,xt=!1;if(E){const Et=ot.get(E);if(Et.__useDefaultFramebuffer!==void 0)j.bindFramebuffer(L.FRAMEBUFFER,null),q=!1;else if(Et.__webglFramebuffer===void 0)mt.setupRenderTarget(E);else if(Et.__hasExternalTextures)mt.rebindTextures(E,ot.get(E.texture).__webglTexture,ot.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ot=E.depthTexture;if(Et.__boundDepthTexture!==Ot){if(Ot!==null&&ot.has(Ot)&&(E.width!==Ot.image.width||E.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");mt.setupDepthRenderbuffer(E)}}const kt=E.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(xt=!0);const Vt=ot.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Vt[O])?B=Vt[O][W]:B=Vt[O],lt=!0):E.samples>0&&mt.useMultisampledRTT(E)===!1?B=ot.get(E).__webglMultisampledFramebuffer:Array.isArray(Vt)?B=Vt[W]:B=Vt,C.copy(E.viewport),U.copy(E.scissor),z=E.scissorTest}else C.copy(J).multiplyScalar(H).floor(),U.copy(bt).multiplyScalar(H).floor(),z=Xt;if(W!==0&&(B=Th),j.bindFramebuffer(L.FRAMEBUFFER,B)&&q&&j.drawBuffers(E,B),j.viewport(C),j.scissor(U),j.setScissorTest(z),lt){const Et=ot.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,Et.__webglTexture,W)}else if(xt){const Et=O;for(let kt=0;kt<E.textures.length;kt++){const Vt=ot.get(E.textures[kt]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+kt,Vt.__webglTexture,W,Et)}}else if(E!==null&&W!==0){const Et=ot.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Et.__webglTexture,W)}S=-1},this.readRenderTargetPixels=function(E,O,W,q,B,lt,xt,At=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=ot.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&xt!==void 0&&(Et=Et[xt]),Et){j.bindFramebuffer(L.FRAMEBUFFER,Et);try{const kt=E.textures[At],Vt=kt.format,Ot=kt.type;if(!Q.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Q.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-q&&W>=0&&W<=E.height-B&&(E.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+At),L.readPixels(O,W,q,B,It.convert(Vt),It.convert(Ot),lt))}finally{const kt=D!==null?ot.get(D).__webglFramebuffer:null;j.bindFramebuffer(L.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(E,O,W,q,B,lt,xt,At=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=ot.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&xt!==void 0&&(Et=Et[xt]),Et)if(O>=0&&O<=E.width-q&&W>=0&&W<=E.height-B){j.bindFramebuffer(L.FRAMEBUFFER,Et);const kt=E.textures[At],Vt=kt.format,Ot=kt.type;if(!Q.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Q.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ee=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,ee),L.bufferData(L.PIXEL_PACK_BUFFER,lt.byteLength,L.STREAM_READ),E.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+At),L.readPixels(O,W,q,B,It.convert(Vt),It.convert(Ot),0);const ce=D!==null?ot.get(D).__webglFramebuffer:null;j.bindFramebuffer(L.FRAMEBUFFER,ce);const be=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Du(L,be,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,ee),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,lt),L.deleteBuffer(ee),L.deleteSync(be),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,O=null,W=0){const q=Math.pow(2,-W),B=Math.floor(E.image.width*q),lt=Math.floor(E.image.height*q),xt=O!==null?O.x:0,At=O!==null?O.y:0;mt.setTexture2D(E,0),L.copyTexSubImage2D(L.TEXTURE_2D,W,0,0,xt,At,B,lt),j.unbindTexture()};const Ah=L.createFramebuffer(),Rh=L.createFramebuffer();this.copyTextureToTexture=function(E,O,W=null,q=null,B=0,lt=null){lt===null&&(B!==0?(Bs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),lt=B,B=0):lt=0);let xt,At,Et,kt,Vt,Ot,ee,ce,be;const ge=E.isCompressedTexture?E.mipmaps[lt]:E.image;if(W!==null)xt=W.max.x-W.min.x,At=W.max.y-W.min.y,Et=W.isBox3?W.max.z-W.min.z:1,kt=W.min.x,Vt=W.min.y,Ot=W.isBox3?W.min.z:0;else{const on=Math.pow(2,-B);xt=Math.floor(ge.width*on),At=Math.floor(ge.height*on),E.isDataArrayTexture?Et=ge.depth:E.isData3DTexture?Et=Math.floor(ge.depth*on):Et=1,kt=0,Vt=0,Ot=0}q!==null?(ee=q.x,ce=q.y,be=q.z):(ee=0,ce=0,be=0);const he=It.convert(O.format),zt=It.convert(O.type);let xe;O.isData3DTexture?(mt.setTexture3D(O,0),xe=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(mt.setTexture2DArray(O,0),xe=L.TEXTURE_2D_ARRAY):(mt.setTexture2D(O,0),xe=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const ne=L.getParameter(L.UNPACK_ROW_LENGTH),Ke=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Ii=L.getParameter(L.UNPACK_SKIP_PIXELS),je=L.getParameter(L.UNPACK_SKIP_ROWS),ms=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ge.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ge.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,kt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Vt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ot);const Me=E.isDataArrayTexture||E.isData3DTexture,rn=O.isDataArrayTexture||O.isData3DTexture;if(E.isDepthTexture){const on=ot.get(E),Ge=ot.get(O),Ze=ot.get(on.__renderTarget),Zr=ot.get(Ge.__renderTarget);j.bindFramebuffer(L.READ_FRAMEBUFFER,Ze.__webglFramebuffer),j.bindFramebuffer(L.DRAW_FRAMEBUFFER,Zr.__webglFramebuffer);for(let oi=0;oi<Et;oi++)Me&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ot.get(E).__webglTexture,B,Ot+oi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ot.get(O).__webglTexture,lt,be+oi)),L.blitFramebuffer(kt,Vt,xt,At,ee,ce,xt,At,L.DEPTH_BUFFER_BIT,L.NEAREST);j.bindFramebuffer(L.READ_FRAMEBUFFER,null),j.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(B!==0||E.isRenderTargetTexture||ot.has(E)){const on=ot.get(E),Ge=ot.get(O);j.bindFramebuffer(L.READ_FRAMEBUFFER,Ah),j.bindFramebuffer(L.DRAW_FRAMEBUFFER,Rh);for(let Ze=0;Ze<Et;Ze++)Me?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,on.__webglTexture,B,Ot+Ze):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,on.__webglTexture,B),rn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ge.__webglTexture,lt,be+Ze):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ge.__webglTexture,lt),B!==0?L.blitFramebuffer(kt,Vt,xt,At,ee,ce,xt,At,L.COLOR_BUFFER_BIT,L.NEAREST):rn?L.copyTexSubImage3D(xe,lt,ee,ce,be+Ze,kt,Vt,xt,At):L.copyTexSubImage2D(xe,lt,ee,ce,kt,Vt,xt,At);j.bindFramebuffer(L.READ_FRAMEBUFFER,null),j.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else rn?E.isDataTexture||E.isData3DTexture?L.texSubImage3D(xe,lt,ee,ce,be,xt,At,Et,he,zt,ge.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(xe,lt,ee,ce,be,xt,At,Et,he,ge.data):L.texSubImage3D(xe,lt,ee,ce,be,xt,At,Et,he,zt,ge):E.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,lt,ee,ce,xt,At,he,zt,ge.data):E.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,lt,ee,ce,ge.width,ge.height,he,ge.data):L.texSubImage2D(L.TEXTURE_2D,lt,ee,ce,xt,At,he,zt,ge);L.pixelStorei(L.UNPACK_ROW_LENGTH,ne),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ke),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ii),L.pixelStorei(L.UNPACK_SKIP_ROWS,je),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ms),lt===0&&O.generateMipmaps&&L.generateMipmap(xe),j.unbindTexture()},this.initRenderTarget=function(E){ot.get(E).__webglFramebuffer===void 0&&mt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?mt.setTextureCube(E,0):E.isData3DTexture?mt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?mt.setTexture2DArray(E,0):mt.setTexture2D(E,0),j.unbindTexture()},this.resetState=function(){A=0,T=0,D=null,j.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}}const nn=[[-65,220,30,"漂木岛"],[74,670,34,"海松岛"],[-70,1120,32,"避风岛"],[66,1510,29,"北岬林岛"]].map(([i,t,e,n],s)=>{const r=-Math.sign(Number(i));return{id:s,name:String(n),x:Number(i),z:Number(t),radius:Number(e),side:r,dockX:Number(i)+r*(Number(e)+10),landingX:Number(i)+r*(Number(e)*.67)}});function Jn(i,t,e){const n=t-i.x,s=e-i.z,r=Math.hypot(n,s)/i.radius;return 1.25+Math.max(0,1-r*r)*3.2+Math.sin(n*.16)*Math.sin(s*.14)*Math.max(0,1-r)*1.2}function Pg(i){return Array.from({length:9},(t,e)=>{const n=e*2.399+i.id*.7,s=e===0?i.radius*.48:8+e%4*3.7;return{id:i.id*9+e,islandId:i.id,x:e===0?i.x+i.side*s:i.x+Math.sin(n)*s,z:e===0?i.z:i.z+Math.cos(n)*s}})}const wa=nn.flatMap(Pg);function Ts(i,t){return-58+Math.sin(i*.007+t*.004)*8+Math.sin(t*.019)*4+Math.sin(i*.027+t*.016)*2.5}const Tr={x:0,z:1800,radius:65},uh=38,dl=13.6;class Dg{phase="ready";mode="helm";weapon="speargun";x=0;z=0;heading=0;speed=0;throttle=0;rudder=0;hull=100;cageHealth=100;depth=0;deckX=0;deckZ=-.4;time=0;elapsed=0;ammo=5;reload=0;cooldown=0;damageFlash=0;hitFlash=0;message="";messageTime=0;reason="";anchored=!1;wood=0;hasAxe=!1;shoreX=0;shoreZ=0;islandId=-1;repairProgress=0;chopCooldown=0;dragTime=0;repairs=0;trees=wa.map(t=>({...t,hits:0,felledAt:-1,collected:!1}));stats={hits:0,repelled:0,breaches:0,maxDepth:0,distance:0};enteredDanger=!1;deepNotice=!1;start(){this.reset(),this.phase="playing",this.notify("灯塔在正北 1.8 km。缓推油门，驶离这片浅海。",7)}reset(){this.phase="ready",this.mode="helm",this.weapon="speargun",this.x=0,this.z=0,this.heading=0,this.speed=0,this.throttle=0,this.rudder=0,this.hull=100,this.cageHealth=100,this.depth=0,this.deckX=0,this.deckZ=-.4,this.time=0,this.elapsed=0,this.ammo=5,this.reload=0,this.cooldown=0,this.damageFlash=0,this.hitFlash=0,this.message="",this.messageTime=0,this.reason="",this.anchored=!1,this.enteredDanger=!1,this.deepNotice=!1,this.stats={hits:0,repelled:0,breaches:0,maxDepth:0,distance:0},this.wood=0,this.hasAxe=!1,this.shoreX=0,this.shoreZ=0,this.islandId=-1,this.repairProgress=0,this.chopCooldown=0,this.dragTime=0,this.repairs=0,this.trees=wa.map(t=>({...t,hits:0,felledAt:-1,collected:!1}))}get remaining(){return Math.hypot(Tr.x-this.x,Tr.z-this.z)}get progress(){return Math.max(0,Math.min(1,this.z/Tr.z))}get nearCage(){return Math.hypot(this.deckX-1.2,this.deckZ+2.2)<1.55}get nearHelm(){return Math.hypot(this.deckX,this.deckZ-1.8)<1.65}get nearestIsland(){return[...nn].sort((t,e)=>Math.hypot(this.x-t.dockX,this.z-t.z)-Math.hypot(this.x-e.dockX,this.z-e.z))[0]}get dockDistance(){const t=this.nearestIsland;return Math.hypot(this.x-t.dockX,this.z-t.z)}get landingDistance(){const t=nn[this.islandId];return t?Math.hypot(this.shoreX-t.landingX,this.shoreZ-t.z):1/0}get nearbyTree(){return this.trees.filter(t=>t.islandId===this.islandId&&!t.collected).sort((t,e)=>Math.hypot(this.shoreX-t.x,this.shoreZ-t.z)-Math.hypot(this.shoreX-e.x,this.shoreZ-e.z))[0]}get interactLabel(){if(this.mode==="dragged")return"笼架已断裂";if(this.mode==="shore"){if(!this.hasAxe&&this.landingDistance<4)return"从岸边工具架拿起斧头";const t=this.nearbyTree;return t&&Math.hypot(this.shoreX-t.x,this.shoreZ-t.z)<3?t.hits>=3?"收集倒木 · +4 木材":"F / 左键挥斧 · 砍伐海松":this.landingDistance<6?"B 返回船上 · R 使用木材修复":"走近树木砍伐，或返回码头"}return this.mode==="helm"?Math.abs(this.speed)>1.2?"停船并离开驾驶位":"离开驾驶位":this.mode==="cage"?this.depth>.12?"先升至海面，再返回甲板":"打开笼门 · 返回甲板":this.nearCage?"进入潜水笼":this.nearHelm?"回到驾驶位":"走向左后方潜笼 / 前方舵台"}notify(t,e=4){this.message=t,this.messageTime=e}interact(){if(this.phase==="playing"&&this.mode!=="dragged"){if(this.mode==="shore"){if(!this.hasAxe&&this.landingDistance<4){this.hasAxe=!0,this.notify("已拿起伐木斧。靠近海松，左键 / F 砍三次，再按 E 收集木材。",6);return}const t=this.nearbyTree;if(t&&Math.hypot(this.shoreX-t.x,this.shoreZ-t.z)<3&&t.hits>=3){if(this.time-t.felledAt<1.8){this.notify("树正在倒下，稍等片刻。",1);return}t.collected=!0,this.wood+=4,this.notify("收集到 4 份木材。回到码头或甲板，按住 R 修复船只。",5);return}this.notify(this.interactLabel,3);return}if(this.mode==="helm"){if(Math.abs(this.speed)>1.2){this.anchored=!0,this.throttle=0,this.notify("正在减速抛锚。停稳后再次按 E 离开驾驶位。");return}this.anchored=!0,this.throttle=0,this.mode="deck",this.deckX=0,this.deckZ=-.4,this.notify("已抛锚。WASD 在甲板移动；左后方是潜水笼，前方是舵台。",7);return}if(this.mode==="deck"){if(this.nearCage){this.mode="cage",this.depth=0,this.notify("W 下潜 / S 上浮。按住右键环顾，1 鱼枪 / 2 潜水刀。无需氧气。",8);return}if(this.nearHelm){this.mode="helm",this.anchored=!1,this.notify("起锚。W 加油门，A / D 转向，灯塔仍在前方。");return}this.notify("靠近左后方的潜笼入口，或走到前方舵台。");return}if(this.depth>.12){this.notify("按住 S 或空格升到海面，随后按 E 打开笼门。");return}this.mode="deck",this.deckX=1,this.deckZ=-2.2,this.notify("回到甲板。E 回到前方舵台；维修需要从小岛采集的木材。",6)}}dock(){if(this.phase!=="playing"||this.mode==="cage"||this.mode==="dragged")return;if(this.mode==="shore"){if(this.landingDistance>6){this.notify("先返回码头，再按 B 登船。");return}this.mode="deck",this.deckX=0,this.deckZ=-.4,this.notify("已登船。前往舵台按 E，继续航行。");return}if(this.dockDistance>19){this.notify(`驶向${this.nearestIsland.name}码头（${Math.round(this.dockDistance)} m），在岸边按 B。`,4);return}if(Math.abs(this.speed)>1.2){this.throttle=0,this.anchored=!0,this.notify("靠岸前正在减速，停稳后再次按 B。");return}const t=this.nearestIsland;this.x=t.dockX,this.z=t.z,this.heading=0,this.speed=0,this.throttle=0,this.anchored=!0,this.mode="shore",this.islandId=t.id,this.shoreX=t.landingX,this.shoreZ=t.z,this.notify(this.hasAxe?"已靠岸。砍伐海松收集木材；码头按 R 修船、B 登船。":"已靠岸。按 E 从工具架拿斧头，再去砍伐海松。",6)}chop(){if(this.phase!=="playing"||this.mode!=="shore"||this.chopCooldown>0)return!1;if(!this.hasAxe)return this.notify("先到码头工具架按 E 拿起斧头。"),!1;this.chopCooldown=.8;const t=this.nearbyTree;return!t||Math.hypot(this.shoreX-t.x,this.shoreZ-t.z)>2.7?(this.notify("再靠近树干一些。",1.2),!0):t.hits>=3?(this.notify("按 E 收集倒木。",1.2),!0):(t.hits++,this.hitFlash=.7,t.hits===3?(t.felledAt=this.time,this.notify("海松倒下了。按 E 收集木材。",3)):this.notify(`斧头切入树干 · ${t.hits} / 3`,1.5),!0)}pause(){this.phase==="playing"?this.phase="paused":this.phase==="paused"&&(this.phase="playing")}damage(t,e){this.phase==="playing"&&(this.mode==="shore"||this.mode==="dragged"||e==="cage"&&this.mode!=="cage"||(e==="boat"?this.hull=Math.max(0,this.hull-t):this.cageHealth=Math.max(0,this.cageHealth-t),this.damageFlash=1,this.notify(e==="cage"?"白鲨正在撕咬笼架！立即防御或上浮！":"船板被咬裂！寻找小岛伐木，用木材修复船体。",4),this.cageHealth<=0?(this.mode="dragged",this.dragTime=0,this.throttle=0,this.reason="白鲨撞破潜笼，将你拖进了深海。",this.notify("钢条断裂了——白鲨冲进了笼子！",6)):this.hull<=0&&(this.throttle=0,this.notify("船体严重破损，引擎熄火！WASD 应急划桨，驶向小岛伐木修复。",9))))}reloadWeapon(){this.phase==="playing"&&this.mode==="cage"&&this.ammo<5&&this.reload<=0&&(this.reload=2.4,this.notify("正在装填鱼枪…",2.4))}fire(){return this.phase!=="playing"||this.mode!=="cage"||this.cooldown>0||this.reload>0?!1:this.depth<1?(this.notify("下潜后再使用武器。"),!1):this.weapon==="speargun"&&this.ammo<=0?(this.reloadWeapon(),!1):(this.weapon==="speargun"&&this.ammo--,this.cooldown=this.weapon==="speargun"?1.05:.65,!0)}registerHit(t){this.stats.hits++,t&&this.stats.repelled++,this.hitFlash=1,this.notify(t?"威胁解除 · 白鲨缓缓沉入深处":"命中 · 白鲨受惊退避",2.4)}step(t,e){if(this.phase!=="playing")return;if(t=Math.min(Math.max(t,0),.05),this.elapsed+=t,this.time+=t,this.mode==="dragged"){this.dragTime+=t,this.dragTime>=6&&(this.phase="lost");return}this.chopCooldown=Math.max(0,this.chopCooldown-t),this.cooldown=Math.max(0,this.cooldown-t),this.damageFlash=Math.max(0,this.damageFlash-t*.75),this.hitFlash=Math.max(0,this.hitFlash-t*2.5),this.messageTime=Math.max(0,this.messageTime-t),this.reload>0&&(this.reload=Math.max(0,this.reload-t),this.reload===0&&(this.ammo=5,this.notify("鱼枪已装填",1.6))),this.mode==="helm"?(e.forward>0&&(this.anchored=!1,this.throttle=Math.min(1,this.throttle+t*.38)),e.forward<0&&(this.anchored=!1,this.throttle=Math.max(-.24,this.throttle-t*.58)),e.brake&&(this.throttle=0,this.anchored=!0),this.rudder+=(e.turn-this.rudder)*Math.min(1,t*2.5)):(this.throttle=0,this.rudder*=Math.exp(-t*3));const n=this.anchored?0:this.throttle*(this.hull<=0?2.6:dl*(.32+.68*this.hull/100)),s=this.anchored?1.4:.33;this.speed+=(n-this.speed)*(1-Math.exp(-t*s)),Math.abs(n)<.01&&Math.abs(this.speed)<.015&&(this.speed=0),this.heading+=this.rudder*.38*(this.hull<=0?this.speed/5:this.speed/dl)*t;const r=Math.sin(this.heading)*this.speed*t,o=Math.cos(this.heading)*this.speed*t;this.x+=r,this.z+=o,this.stats.distance+=Math.hypot(r,o);for(const a of nn){const c=this.x-a.x,l=this.z-a.z,h=Math.hypot(c,l),u=a.radius+6;if(h<u){const f=h<.001?a.side:c/h,d=h<.001?0:l/h;this.x=a.x+f*u,this.z=a.z+d*u,this.speed*=.92,this.notify("浅滩！沿海岸找到挂旗的码头，停船后按 B 上岸。",2)}}if((Math.abs(this.x)>900||this.z<-100||this.z>2e3)&&(this.x=Math.max(-900,Math.min(900,this.x)),this.z=Math.max(-100,Math.min(2e3,this.z)),this.speed*=.95,this.notify("已偏离航道。转向罗盘上的灯塔标记。",3)),this.mode==="deck"){const a=Math.max(1,Math.hypot(e.moveX,e.moveZ)),c=e.lookYaw-this.heading;this.deckX+=(Math.cos(c)*e.moveX+Math.sin(c)*e.moveZ)/a*t*2,this.deckZ+=(-Math.sin(c)*e.moveX+Math.cos(c)*e.moveZ)/a*t*2,this.deckX=Math.max(-1.18,Math.min(1.18,this.deckX)),this.deckZ=Math.max(-3.6,Math.min(3.5,this.deckZ))}if(this.mode==="shore"){const a=Math.max(1,Math.hypot(e.moveX,e.moveZ)),c=e.lookYaw;this.shoreX+=(Math.cos(c)*e.moveX+Math.sin(c)*e.moveZ)/a*t*3,this.shoreZ+=(-Math.sin(c)*e.moveX+Math.cos(c)*e.moveZ)/a*t*3;const l=nn[this.islandId],h=this.shoreX-l.x,u=this.shoreZ-l.z,f=Math.hypot(h,u),d=l.radius*.8;f>d&&(this.shoreX=l.x+h/f*d,this.shoreZ=l.z+u/f*d);for(const g of this.trees){if(g.islandId!==this.islandId||g.hits>=3)continue;const M=this.shoreX-g.x,m=this.shoreZ-g.z,p=Math.hypot(M,m);p<.9&&(this.shoreX=g.x+(p>.001?M/p:1)*.9,this.shoreZ=g.z+(p>.001?m/p:0)*.9)}}e.repair&&(this.mode==="deck"||this.mode==="shore"&&this.landingDistance<6)?this.hull>=100&&this.cageHealth>=100?(this.repairProgress=0,this.notify("船体与笼架已完好。",.3)):this.wood<1?(this.repairProgress=0,this.notify("需要木材：靠岸拿斧头，砍树后按 E 收集。",.5)):(this.repairProgress+=t,this.notify(`正在固定新船板… ${Math.round(this.repairProgress/1.4*100)}%`,.3),this.repairProgress>=1.4&&(this.repairProgress=0,this.wood--,this.hull=Math.min(100,this.hull+25),this.cageHealth=Math.min(100,this.cageHealth+18),this.repairs++,this.notify("船板已固定 · 木材 -1",1))):this.repairProgress=0,this.mode==="cage"&&(this.depth=Math.max(0,Math.min(uh,this.depth+e.dive*2.6*t)),this.stats.maxDepth=Math.max(this.stats.maxDepth,this.depth),this.depth>9&&!this.deepNotice&&(this.deepNotice=!0,this.notify("深度 10 m。留意侧方与脚下；急促靠近的白鲨才是威胁。",6))),this.z>240&&!this.enteredDanger&&(this.enteredDanger=!0,this.notify("进入白鲨巡游区。水面上的背鳍，只是它们的一小部分。",6)),this.remaining<Tr.radius&&this.mode==="helm"&&this.hull>0&&(this.phase="won",this.throttle=0,this.notify("已抵达北岬灯塔。"))}snapshot(){return{phase:this.phase,mode:this.mode,x:this.x,z:this.z,heading:this.heading,speed:this.speed,throttle:this.throttle,hull:this.hull,cageHealth:this.cageHealth,depth:this.depth,ammo:this.ammo,reload:this.reload,weapon:this.weapon,elapsed:this.elapsed,remaining:this.remaining,progress:this.progress,deckX:this.deckX,deckZ:this.deckZ,stats:{...this.stats},interact:this.interactLabel,wood:this.wood,hasAxe:this.hasAxe,shoreX:this.shoreX,shoreZ:this.shoreZ,islandId:this.islandId,dockDistance:this.dockDistance,nearestIsland:this.nearestIsland.name,repairs:this.repairs,dragTime:this.dragTime,trees:this.trees.map(t=>({...t}))}}}function ls(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new oe;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(const h in r){const u=fl(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let M=0;M<o[h].length;++M)d.push(o[h][M][f]);const g=fl(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function fl(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new Ce(o,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){const M=h.getComponent(f,g);a.setComponent(f+u,g,M)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function Lg(i,t=1e-4){t=Math.max(t,Number.EPSILON);const e={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count;let o=0;const a=Object.keys(i.attributes),c={},l={},h=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let v=0,y=a.length;v<y;v++){const _=a[v],w=i.attributes[_];c[_]=new w.constructor(new w.array.constructor(w.count*w.itemSize),w.itemSize,w.normalized);const A=i.morphAttributes[_];A&&(l[_]||(l[_]=[]),A.forEach((T,D)=>{const S=new T.array.constructor(T.count*T.itemSize);l[_][D]=new T.constructor(S,T.itemSize,T.normalized)}))}const d=t*.5,g=Math.log10(1/t),M=Math.pow(10,g),m=d*M;for(let v=0;v<r;v++){const y=n?n.getX(v):v;let _="";for(let w=0,A=a.length;w<A;w++){const T=a[w],D=i.getAttribute(T),S=D.itemSize;for(let x=0;x<S;x++)_+=`${~~(D[u[x]](y)*M+m)},`}if(_ in e)h.push(e[_]);else{for(let w=0,A=a.length;w<A;w++){const T=a[w],D=i.getAttribute(T),S=i.morphAttributes[T],x=D.itemSize,C=c[T],U=l[T];for(let z=0;z<x;z++){const Y=u[z],G=f[z];if(C[G](o,D[Y](y)),S)for(let X=0,F=S.length;X<F;X++)U[X][G](o,S[X][Y](y))}}e[_]=o,h.push(o),o++}}const p=i.clone();for(const v in i.attributes){const y=c[v];if(p.setAttribute(v,new y.constructor(y.array.slice(0,o*y.itemSize),y.itemSize,y.normalized)),v in l)for(let _=0;_<l[v].length;_++){const w=l[v][_];p.morphAttributes[v][_]=new w.constructor(w.array.slice(0,o*w.itemSize),w.itemSize,w.normalized)}}return p.setIndex(h),p}const fi=Math.PI*2,Ar=Fe.clamp,dh=`
  float seaHeight(vec2 p, float t) {
    return sin(p.x * .039 + p.y * .051 + t * .73) * .58
         + sin(p.x * -.075 + p.y * .028 + t * .97) * .25
         + sin(p.x * .148 + p.y * .107 + t * 1.43) * .18
         + sin(p.x * -.30 + p.y * .235 + t * 1.90) * .043;
  }
`;function pi(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}const Ig=`
varying vec3 vDirection;
void main() { vDirection = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }
`,Ug=`
precision highp float;
varying vec3 vDirection;
uniform vec3 sunDirection;
uniform float time;
uniform float submerged;
uniform vec3 underwaterColor;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p) { float f = 0., a=.5; for(int i=0;i<5;i++){f+=a*noise(p);p=p*2.04+vec2(7.1,3.2);a*=.5;} return f; }
void main(){
 vec3 d=normalize(vDirection); float h=max(0.,d.y);
 vec3 color=mix(vec3(.64,.73,.77),vec3(.19,.37,.53),pow(h,.55));
 float s=max(0.,dot(d,sunDirection));
 color+=vec3(.55,.41,.24)*pow(s,15.) + vec3(1.,.83,.53)*pow(s,280.)*.58;
 color+=vec3(5.8,4.8,3.2)*smoothstep(.99965,.99994,s);
 vec2 p=d.xz/(max(.075,d.y)+.13)*1.45+vec2(time*.0013,0.);
 float cloud=fbm(p); float wisps=fbm(p*2.8+cloud*3.);
 float cover=smoothstep(.405,.68,cloud*.83+wisps*.17)*smoothstep(.01,.19,d.y);
 vec3 cloudColor=mix(vec3(.38,.47,.53),vec3(.89,.90,.85),smoothstep(.43,.7,cloud));
 cloudColor+=vec3(.27,.19,.11)*pow(s,12.);
 color=mix(color,cloudColor,cover*.87);
 color=mix(vec3(.48,.64,.67),color,smoothstep(-.08,.045,d.y));
 gl_FragColor=vec4(color,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 gl_FragColor.rgb=mix(gl_FragColor.rgb,underwaterColor,submerged);
}
`,Ng=`
uniform float time;
varying vec3 vWorld;
${dh}
void main(){
  vec4 world=modelMatrix*vec4(position,1.);
  world.y=seaHeight(world.xz,time);
  vWorld=world.xyz;
  gl_Position=projectionMatrix*viewMatrix*world;
}
`,Fg=`
precision highp float;
uniform float time;
uniform vec3 sunDirection;
uniform vec3 boat;
uniform float submerged;
uniform float farSurface;
uniform vec3 underwaterColor;
varying vec3 vWorld;
${dh}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){ vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
vec3 reflectionSky(vec3 d){
 float h=max(0.,d.y);
 vec3 col=mix(vec3(.61,.72,.76),vec3(.19,.37,.53),pow(h,.5));
 float s=max(0.,dot(d,sunDirection));
 col+=vec3(.50,.36,.19)*pow(s,12.);
 float n=noise(d.xz/(max(.08,d.y)+.13)*7.);
 col=mix(col,vec3(.62,.69,.71),smoothstep(.30,.80,n)*.17);
 return col;
}
void main(){
 vec2 local=vWorld.xz-boat.xz;
 if(farSurface>.5 && max(abs(local.x),abs(local.y))<209.) discard;
 vec2 p=vWorld.xz;
 float e=.25;
 vec3 n=normalize(vec3(seaHeight(p-vec2(e,0.),time)-seaHeight(p+vec2(e,0.),time),2.*e,seaHeight(p-vec2(0.,e),time)-seaHeight(p+vec2(0.,e),time)));
 float dist=distance(cameraPosition,vWorld);
 float detail=1.-smoothstep(180.,900.,dist);
 vec2 q=p*.73+vec2(time*.21,-time*.15)+vec2(noise(p*.047),noise(p*.052+3.))*2.;
 n.x+=(noise(q+vec2(.09,0.))-noise(q-vec2(.09,0.)))*.86*detail;
 n.z+=(noise(q+vec2(0.,.09))-noise(q-vec2(0.,.09)))*.86*detail;
 n=normalize(n);
 vec3 eye=normalize(cameraPosition-vWorld);
 float facing=abs(dot(eye,n));
 float fresnel=.055+.945*pow(1.-facing,4.3);
 vec3 reflectDir=reflect(-eye,n);
 vec3 reflection=reflectionSky(reflectDir);
 float sun=pow(max(0.,dot(reflectDir,sunDirection)),650.);
 float broad=pow(max(0.,dot(reflectDir,sunDirection)),30.);
 vec3 base=mix(vec3(.004,.034,.051),vec3(.012,.079,.096),clamp(n.x*.8+n.z*.6+.45,0.,1.));
 vec3 col=mix(base,reflection,fresnel*.91);
 col+=vec3(2.4,1.9,1.17)*sun + vec3(.12,.095,.045)*broad;
 float crest=smoothstep(.52,.84,vWorld.y);
 float foam=crest*smoothstep(.57,.76,noise(p*.83+time*.12))*detail;
 col=mix(col,vec3(.59,.76,.76),foam*.37);
 float haze=1.-exp(-dist*.00031);
 col=mix(col,vec3(.57,.69,.73),haze);
 float alpha=mix(.72,.985,fresnel);
 alpha=mix(alpha,1.,smoothstep(95.,310.,dist));
 if(submerged>.5){
   vec3 ceiling=mix(vec3(.018,.10,.15),vec3(.09,.27,.31),pow(max(0.,dot(n,normalize(vec3(.2,1.,.3)))),12.));
   ceiling+=vec3(.29,.39,.29)*broad;
   col=ceiling;
   alpha=.77;
 }
 gl_FragColor=vec4(col,alpha);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 if(submerged>.5)gl_FragColor.rgb=mix(gl_FragColor.rgb,underwaterColor,1.-exp(-dist*.037));
}
`;class Og{scene;sky;skyMaterial;waterMaterial;nearWater;farWater;deepBackdrop;deepObjects=[];sun=new P(-.58,.36,.73).normalize();sunlight;hemi;fog=new Wa(10073020,22e-5);motes;moteMaterial;beams;beamMaterial;spray;sprayGeometry;sprayPool=[];sprayCursor=0;sprayClock=0;sprayRandom=pi(16821);ripples=[];rippleCursor=0;buoys=[];kelpMaterial;fish;fishOrigins=[];fishDummy=new Se;lighthouseLamp;currentTime=0;underwater=!1;constructor(t,e){this.scene=t,t.background=new Wt(9679811),t.fog=this.fog,this.sunlight=new Wd(16770225,2.4),this.sunlight.position.copy(this.sun).multiplyScalar(300),this.sunlight.castShadow=!0,this.sunlight.shadow.mapSize.set(1024,1024),this.sunlight.shadow.camera.left=-38,this.sunlight.shadow.camera.right=38,this.sunlight.shadow.camera.top=38,this.sunlight.shadow.camera.bottom=-38,this.sunlight.shadow.camera.near=1,this.sunlight.shadow.camera.far=650,this.sunlight.shadow.bias=-.0012,this.sunlight.shadow.normalBias=.06,t.add(this.sunlight,this.sunlight.target),this.hemi=new Hd(12179688,1457472,1.48),t.add(this.hemi),this.skyMaterial=new qe({uniforms:{sunDirection:{value:this.sun},time:{value:0},submerged:{value:0},underwaterColor:{value:new Wt(.015,.14,.17)}},vertexShader:Ig,fragmentShader:Ug,side:Ye,depthWrite:!1}),this.sky=new St(new hn(8500,32,20),this.skyMaterial),this.sky.renderOrder=-100,this.sky.frustumCulled=!1,t.add(this.sky);const n=new ql;n.add(new St(new hn(200,32,16),this.skyMaterial));const s=new ba(e);t.environment=s.fromScene(n,.1,.1,500).texture,t.environmentIntensity=.72,s.dispose(),this.waterMaterial=new qe({uniforms:{time:{value:0},sunDirection:{value:this.sun},boat:{value:new P},submerged:{value:0},farSurface:{value:0},underwaterColor:{value:new Wt(.015,.14,.17)}},vertexShader:Ng,fragmentShader:Fg,transparent:!0,depthWrite:!1,side:ve});const r=[];for(let v=0;v<=210;v+=3)r.push(v);r.push(260,330,430,570,760,1020,1400,2e3,3e3,4700,7200,11500);const o=[],a=[],c=256;for(const v of r)for(let y=0;y<=c;y++){const _=y/c*fi;o.push(Math.sin(_)*v,0,Math.cos(_)*v)}for(let v=0;v<r.length-1;v++)for(let y=0;y<c;y++){const _=v*(c+1)+y,w=_+c+1;a.push(_,w,_+1,w,w+1,_+1)}const l=new oe;l.setAttribute("position",new Nt(o,3)),l.setIndex(a),this.nearWater=new St(l,this.waterMaterial),this.nearWater.renderOrder=20,this.nearWater.frustumCulled=!1,t.add(this.nearWater);const h=this.waterMaterial.clone();h.uniforms.farSurface.value=1;const u=new Ne(23e3,23e3,100,100);u.rotateX(-Math.PI/2),this.farWater=new St(u,h),this.farWater.visible=!1,this.deepBackdrop=new St(new Ne(23e3,23e3),new Ga({color:202528,fog:!1})),this.deepBackdrop.rotation.x=-Math.PI/2,this.deepBackdrop.position.y=-145,t.add(this.deepBackdrop),this.buildLand(),this.lighthouseLamp=this.buildLighthouse(),this.buildSeabed(),this.kelpMaterial=this.buildKelp(),this.fish=this.buildFish();for(const v of[95,440,860,1250,1620])this.buoys.push(this.makeBuoy(-48,v,11884851)),(v===95||v===1620)&&this.buoys.push(this.makeBuoy(48,v,4226660));const f=pi(7123),d=new oe,g=new Float32Array(840*3),M=new Float32Array(840);for(let v=0;v<840;v++)g[v*3]=(f()-.5)*72,g[v*3+1]=(f()-.5)*58,g[v*3+2]=(f()-.5)*72,M[v]=.5+f()*1.6;d.setAttribute("position",new Ce(g,3)),d.setAttribute("aSize",new Ce(M,1)),this.moteMaterial=new qe({uniforms:{time:{value:0},opacity:{value:0}},vertexShader:"attribute float aSize;uniform float time;varying float vFade;void main(){vec3 p=position;p.x+=sin(time*.09+p.y)*.5;p.y=mod(p.y+time*.08+29.,58.)-29.;vec4 mv=modelViewMatrix*vec4(p,1.);vFade=clamp(1.-length(p)/40.,0.,1.);gl_PointSize=min(5.,aSize*80./max(1.,-mv.z));gl_Position=projectionMatrix*mv;}",fragmentShader:"uniform float opacity;varying float vFade;void main(){float d=length(gl_PointCoord-.5);gl_FragColor=vec4(.58,.82,.78,smoothstep(.5,.10,d)*opacity*vFade);}",transparent:!0,depthWrite:!1,blending:Fr}),this.motes=new kr(d,this.moteMaterial),this.motes.frustumCulled=!1,this.motes.renderOrder=25,t.add(this.motes),this.beamMaterial=new qe({uniforms:{time:{value:0},opacity:{value:0}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform float time;uniform float opacity;varying vec2 vUv;void main(){float a=pow(sin(vUv.x*3.14159),3.)*sin(vUv.y*3.14159);a*=.6+.4*sin(vUv.y*19.+time*.21);gl_FragColor=vec4(.26,.65,.64,a*opacity);}",transparent:!0,depthWrite:!1,side:ve,blending:Fr}),this.beams=new fe;for(let v=0;v<7;v++){const y=new St(new Ne(8+v%3*4,70),this.beamMaterial);y.position.set((v%3-1)*33,-34,Math.floor(v/3)*37-45),y.rotation.z=-.23,y.rotation.y=v*1.3,this.beams.add(y)}t.add(this.beams),this.sprayGeometry=new oe,this.sprayGeometry.setAttribute("position",new Ce(new Float32Array(600*3),3)),this.sprayGeometry.setAttribute("aLife",new Ce(new Float32Array(600),1)),this.sprayGeometry.setAttribute("aSize",new Ce(new Float32Array(600),1));const m=new qe({vertexShader:"attribute float aLife;attribute float aSize;varying float vLife;void main(){vLife=aLife;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=clamp(aSize*420./max(1.,-mv.z),1.,48.);gl_Position=projectionMatrix*mv;}",fragmentShader:"varying float vLife;void main(){float d=length(gl_PointCoord-.5);if(d>.5||vLife<=0.)discard;float a=smoothstep(.5,.05,d)*min(1.,vLife*3.);gl_FragColor=vec4(.72,.88,.90,a*.65);}",transparent:!0,depthWrite:!1});this.spray=new kr(this.sprayGeometry,m),this.spray.frustumCulled=!1,this.spray.renderOrder=24,t.add(this.spray);for(let v=0;v<600;v++)this.sprayPool.push({position:new P,velocity:new P,life:0,total:1,size:.2});const p=new Ne(1,1);p.rotateX(-Math.PI/2);for(let v=0;v<90;v++){const y=new qe({uniforms:{opacity:{value:0}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform float opacity;varying vec2 vUv;void main(){float d=length(vUv-.5)*2.;float ring=smoothstep(.60,.79,d)*(1.-smoothstep(.84,1.,d));float breakup=.62+.38*sin(atan(vUv.y-.5,vUv.x-.5)*19.+d*12.);gl_FragColor=vec4(.68,.84,.82,ring*opacity*breakup);}",transparent:!0,depthWrite:!1,side:ve}),_=new St(p,y);_.visible=!1,_.renderOrder=23,t.add(_),this.ripples.push({mesh:_,life:0,strength:1})}}heightAt(t,e,n){return Math.sin(t*.039+e*.051+n*.73)*.58+Math.sin(t*-.075+e*.028+n*.97)*.25+Math.sin(t*.148+e*.107+n*1.43)*.18+Math.sin(t*-.3+e*.235+n*1.9)*.043}rockGeometry(t,e){const n=pi(e),s=Lg(new Ka(t,3)),r=s.attributes.position,o=[];for(let a=0;a<r.count;a++){const c=r.getX(a),l=r.getY(a),h=r.getZ(a),u=1+Math.sin(c*5.2+e)*Math.sin(h*4.3)*.17+Math.sin(l*7.4+c*2.7)*.12;r.setXYZ(a,c*u,l*u,h*u);const f=.15+n()*.06,d=Ar(l/t,0,1)*.055;o.push(f*.91-d*.7,f+d*.28,f*.98-d*.65)}return s.setAttribute("color",new Nt(o,3)),s.computeVertexNormals(),s}buildLand(){const t=new re({vertexColors:!0,roughness:.96}),e=(n,s,r,o,a,c,l)=>{let h;if(o>65){h=new Ne(o*2.4,c*2.4,58,58),h.rotateX(-Math.PI/2);const f=h.attributes.position,d=[];for(let g=0;g<f.count;g++){const M=f.getX(g),m=f.getZ(g),p=M/o,v=m/c,y=Math.atan2(v,p),_=.86+.1*Math.sin(y*3+l)+.08*Math.cos(y*7+l*.31)+.05*Math.sin(y*13),w=Math.sqrt(p*p+v*v)/_,A=1-Fe.smoothstep(w,.48,1.08),T=.56+.19*Math.sin(p*5.2+l)*Math.cos(v*4.1)+.1*Math.sin(p*11.1+v*6.4+l)+.07*Math.sin(v*22.5+p*9.8),D=a*(T*A-.2*Math.pow(Ar(w-.7,0,1),.5));f.setY(g,D);const S=(Math.sin(D*.43+p*.8)+1)*.016,x=(Math.sin(p*71+v*37)*Math.cos(v*65-p*29)+1)*.012,C=Fe.smoothstep(A,.68,.92)*.018;d.push(.105+S+x+C*.4,.116+S+x+C,.117+S+x-C)}h.setAttribute("color",new Nt(d,3)),h.computeVertexNormals()}else h=this.rockGeometry(1,l),h.scale(o,a,c);const u=new St(h,t);return u.position.set(n,s,r),u.castShadow=!0,u.receiveShadow=!0,this.scene.add(u),u};e(85,-18,1985,135,76,115,3),e(-29,-12,1950,74,53,72,9),e(175,-12,1920,68,43,50,11),e(250,-16,2090,110,84,103,4),e(-155,-23,2040,96,46,97,16),e(22,15,1971,19,26,18,35);for(let n=0;n<16;n++){const s=pi(183+n);e(-185+s()*480,-3-s()*5,1880+s()*210,8+s()*18,5+s()*10,7+s()*18,30+n)}e(-135,-26,-225,170,62,96,41),e(120,-19,-255,149,58,83,42),e(20,-35,-350,210,88,130,43),e(-1040,-42,1040,250,110,500,48),e(1650,-60,1980,570,180,480,49)}buildLighthouse(){const t=new fe;t.position.set(22,37,1971);const e=new re({color:13357256,roughness:.75}),n=new re({color:3160894,metalness:.6,roughness:.4}),s=new St(new we(5.3,7,38,18),e);s.position.y=19,s.castShadow=!0,t.add(s);const r=new St(new we(5.65,5.8,7,18),new re({color:9525313,roughness:.8}));r.position.y=29,t.add(r);const o=new St(new we(7,7,1.4,18),n);o.position.y=39,t.add(o);const a=new St(new we(4.3,4.3,5.8,12),new re({color:16771252,emissive:16763e3,emissiveIntensity:1.5,metalness:.5,roughness:.13}));a.position.y=42.7,t.add(a);for(let l=0;l<8;l++){const h=new St(new we(.18,.18,6,5),n);h.position.set(Math.cos(l/8*fi)*4.5,42.8,Math.sin(l/8*fi)*4.5),t.add(h)}const c=new St(new ks(6.3,5,12),n);return c.position.y=48,t.add(c),this.scene.add(t),a}buildSeabed(){const t=new Ne(2100,3100,90,125);t.rotateX(-Math.PI/2);const e=t.attributes.position,n=[];for(let f=0;f<e.count;f++){const d=e.getX(f),g=e.getZ(f)+880,M=Ts(d,g);e.setXYZ(f,d,M,g);const m=(Math.sin(d*.15+g*.27)*Math.sin(g*.16)+1)*.035;n.push(.19+m,.26+m,.235+m)}t.setAttribute("color",new Nt(n,3)),t.computeVertexNormals();const s=new St(t,new re({vertexColors:!0,roughness:1}));s.receiveShadow=!0,this.scene.add(s),this.deepObjects.push(s);const r=pi(991),o=this.rockGeometry(1,71),a=new Ur(o,new re({vertexColors:!0,roughness:1}),210),c=new Se;for(let f=0;f<210;f++){const d=(r()-.5)*1150,g=-100+r()*2250;c.position.set(d,Ts(d,g)+1,g),c.rotation.set(r()*.4,r()*fi,r()*.5),c.scale.set(2+r()*8,2+r()*6,2+r()*9),c.updateMatrix(),a.setMatrixAt(f,c.matrix)}this.scene.add(a),this.deepObjects.push(a);const l=new fe,h=new re({color:2571579,roughness:1,metalness:.22});for(let f=0;f<10;f++){const d=new St(new un(4.7-f*.11,.17,4,16,Math.PI),h);d.rotation.z=Math.PI,d.position.set(0,1.5,f*2.1),l.add(d)}const u=new St(new dn(.5,.5,24),h);u.position.set(0,-2,10),l.add(u),l.position.set(30,Ts(30,780)+3,780),l.rotation.set(.12,.37,.17),this.scene.add(l),this.deepObjects.push(l)}buildKelp(){const t=new qe({uniforms:{time:{value:0},fogColor:{value:new Wt(214611)},fogDensity:{value:.032}},vertexShader:"uniform float time;varying vec2 vUv;varying float depth;void main(){vUv=uv;vec3 p=position;p.x+=sin(time*.62+p.y*.4+instanceMatrix[3].x)*p.y*.047;p.z+=sin(time*.31+p.y*.36+instanceMatrix[3].z)*p.y*.035;vec4 mv=modelViewMatrix*instanceMatrix*vec4(p,1.);depth=-mv.z;gl_Position=projectionMatrix*mv;}",fragmentShader:`uniform vec3 fogColor;uniform float fogDensity;varying vec2 vUv;varying float depth;void main(){float width=(.5+sin(vUv.y*31.)*.25)*(1.-vUv.y*.77);if(abs(vUv.x-.5)>width*.5)discard;vec3 c=mix(vec3(.025,.075,.045),vec3(.11,.19,.075),vUv.y);gl_FragColor=vec4(c,1.);#include <tonemapping_fragment>
    #include <colorspace_fragment>
    gl_FragColor.rgb=mix(gl_FragColor.rgb,fogColor,1.-exp(-fogDensity*fogDensity*depth*depth));
    }`,side:ve});t.fragmentShader=t.fragmentShader.replace(";#include",`;
#include`);const e=new Ne(2.2,10,1,14);e.translate(0,5,0);const n=new Ur(e,t,330),s=pi(321),r=new Se;for(let o=0;o<330;o++){const a=(s()-.5)*520,c=100+s()*1820;r.position.set(a,Ts(a,c),c),r.rotation.set(0,s()*fi,(s()-.5)*.25),r.scale.set(.5+s(),.35+s(),1),r.updateMatrix(),n.setMatrixAt(o,r.matrix)}return this.scene.add(n),this.deepObjects.push(n),t}buildFish(){const t=new oe,e=[0,0,1.1,.21,0,.1,0,.36,0,0,0,1.1,0,.36,0,-.21,0,.1,0,0,1.1,-.21,0,.1,0,-.28,0,0,0,1.1,0,-.28,0,.21,0,.1,.21,0,.1,0,0,-.8,0,.36,0,-.21,0,.1,0,.36,0,0,0,-.8,0,0,-.8,.21,0,.1,0,-.28,0,0,0,-.8,0,-.28,0,-.21,0,.1,0,0,-.68,0,.35,-1.2,0,-.35,-1.2];t.setAttribute("position",new Nt(e,3)),t.computeVertexNormals();const n=new Ur(t,new re({color:8494762,metalness:.52,roughness:.44,side:ve}),95),s=pi(774);for(let r=0;r<95;r++)this.fishOrigins.push(new P((s()-.5)*64,-13-s()*36,(s()-.5)*70));return this.scene.add(n),this.deepObjects.push(n),n}makeBuoy(t,e,n){const s=new fe,r=new re({color:n,roughness:.57,metalness:.2}),o=new St(new we(.95,1.5,1.7,12),r);o.position.y=.6,o.castShadow=!0,s.add(o);const a=new St(new we(.11,.15,3.7,6),r);a.position.y=2.2,s.add(a);const c=new St(new ks(.48,.8,8),r);c.position.y=4.2,s.add(c);const l=new St(new un(1.38,.16,6,18),new re({color:2438970,roughness:.7}));return l.rotation.x=Math.PI/2,l.position.y=.15,s.add(l),s.position.set(t,0,e),this.scene.add(s),s}emit(t,e,n,s){const r=this.sprayPool[this.sprayCursor++%this.sprayPool.length];r.position.copy(t),r.velocity.copy(e),r.life=s,r.total=s,r.size=n}ripple(t,e){const n=this.ripples[this.rippleCursor++%this.ripples.length];n.mesh.position.copy(t),n.mesh.position.y=this.heightAt(t.x,t.z,this.currentTime)+.035,n.strength=e,n.life=1,n.mesh.visible=!0,n.mesh.scale.setScalar(e),n.mesh.rotation.y=this.sprayRandom()*fi}splash(t,e=1){const n=Math.min(130,Math.ceil(e*37));for(let s=0;s<n;s++){const r=this.sprayRandom()*fi,o=(.7+this.sprayRandom()*2.8)*e;this.emit(new P(t.x,Math.max(t.y,.12),t.z),new P(Math.cos(r)*o,1.6+this.sprayRandom()*4*e,Math.sin(r)*o),.16+this.sprayRandom()*.36,1+this.sprayRandom()*1.4)}this.ripple(t,Math.max(2,e*2.5))}reset(){this.sprayClock=0;for(const t of this.sprayPool)t.life=0;for(const t of this.ripples)t.life=0,t.mesh.visible=!1}update(t){const{time:e,dt:n,camera:s,boatPosition:r,boatHeading:o,speed:a,underwater:c,depth:l}=t;this.currentTime=e,this.underwater=c;for(const d of this.deepObjects)d.visible=c;this.deepBackdrop.visible=!c,this.deepBackdrop.position.x=r.x,this.deepBackdrop.position.z=r.z,this.sky.position.copy(s.position),this.skyMaterial.uniforms.time.value=e,this.skyMaterial.uniforms.submerged.value=c?1:0,this.nearWater.position.set(r.x,0,r.z),this.farWater.position.set(r.x,0,r.z);for(const d of[this.waterMaterial,this.farWater.material])d.uniforms.time.value=e,d.uniforms.boat.value.copy(r),d.uniforms.submerged.value=c?1:0;if(c){const d=Ar(l/47,0,1);this.fog.color.setRGB(.018-d*.01,.2-d*.105,.23-d*.096),this.fog.density=.016+d*.014,this.hemi.intensity=1.25-d*.43,this.sunlight.intensity=1.9-d*1.05,this.scene.environmentIntensity=.48}else this.fog.color.setRGB(.57,.69,.73),this.fog.density=25e-5,this.hemi.intensity=1.48,this.sunlight.intensity=2.4,this.scene.environmentIntensity=.72;this.skyMaterial.uniforms.underwaterColor.value.copy(this.fog.color).convertLinearToSRGB(),this.waterMaterial.uniforms.underwaterColor.value.copy(this.fog.color).convertLinearToSRGB(),this.sunlight.position.copy(r).addScaledVector(this.sun,300),this.sunlight.target.position.copy(r),this.motes.position.copy(s.position),this.motes.visible=c,this.moteMaterial.uniforms.time.value=e,this.moteMaterial.uniforms.opacity.value=c?.28:0,this.beams.position.set(r.x,0,r.z),this.beams.visible=c,this.beamMaterial.uniforms.time.value=e,this.beamMaterial.uniforms.opacity.value=.028*(1-Ar(l/95,0,.7)),this.kelpMaterial.uniforms.time.value=e,this.kelpMaterial.uniforms.fogColor.value.copy(this.fog.color).convertLinearToSRGB(),this.kelpMaterial.uniforms.fogDensity.value=this.fog.density;for(const d of this.buoys)d.position.y=this.heightAt(d.position.x,d.position.z,e)*.82,d.rotation.z=Math.sin(e*.7+d.position.z)*.07,d.rotation.x=Math.cos(e*.9+d.position.x)*.06;this.lighthouseLamp.material.emissiveIntensity=1.8+Math.pow(Math.max(0,Math.cos(e*.9)),25)*2;for(let d=0;d<this.fishOrigins.length;d++){const g=this.fishOrigins[d],M=Math.floor(d/24),m=e*.055+M*1.6;this.fishDummy.position.set(r.x+g.x+Math.sin(m)*21,g.y+Math.sin(e*.7+d)*.13,r.z+g.z+Math.cos(m)*21),this.fishDummy.rotation.set(0,m+Math.PI/2+Math.sin(e*2+d)*.06,Math.sin(e+d)*.05),this.fishDummy.scale.setScalar(.28+d%5*.065),this.fishDummy.updateMatrix(),this.fish.setMatrixAt(d,this.fishDummy.matrix)}if(this.fish.instanceMatrix.needsUpdate=!0,this.sprayClock+=n,Math.abs(a)>.6&&this.sprayClock>.065){this.sprayClock=0;const d=new P(Math.sin(o),0,Math.cos(o)),g=new P(Math.cos(o),0,-Math.sin(o));for(const m of[-1,1]){const p=r.clone().addScaledVector(d,3).addScaledVector(g,m*1.3);p.y=this.heightAt(p.x,p.z,e)+.15;const v=g.clone().multiplyScalar(m*(.4+Math.abs(a)*.09)).addScaledVector(d,-Math.abs(a)*.25);v.y=.7+this.sprayRandom()*.9,this.emit(p,v,.1+Math.abs(a)*.011,.65+this.sprayRandom()*.35)}const M=r.clone().addScaledVector(d,-4.4);this.ripple(M,1.45+Math.abs(a)*.095)}const h=this.sprayGeometry.attributes.position,u=this.sprayGeometry.attributes.aLife,f=this.sprayGeometry.attributes.aSize;for(let d=0;d<this.sprayPool.length;d++){const g=this.sprayPool[d];g.life>0?(g.life-=n,g.velocity.y-=7*n,g.position.addScaledVector(g.velocity,n),g.position.y<-.7&&(g.life=0),h.setXYZ(d,g.position.x,g.position.y,g.position.z),f.setX(d,g.size),u.setX(d,Math.max(0,g.life/g.total))):u.setX(d,0)}h.needsUpdate=!0,u.needsUpdate=!0,f.needsUpdate=!0,this.spray.visible=!c;for(const d of this.ripples)d.life<=0||(d.life-=n*.32,d.mesh.visible=d.life>0&&!c,d.mesh.position.y=this.heightAt(d.mesh.position.x,d.mesh.position.z,e)+.035,d.mesh.scale.setScalar(d.strength+(1-d.life)*d.strength*2.1),d.mesh.material.uniforms.opacity.value=Math.max(0,d.life)*.19)}}const Co=Math.PI*2,bi=Fe.clamp,zg=i=>Math.atan2(Math.sin(i),Math.cos(i)),$e=i=>{const t=Math.sin(i*173.172+12.76)*43758.5453;return t-Math.floor(t)},mi=[[-2.24,.075,.095,-.012],[-2.03,.106,.129,-.025],[-1.76,.151,.183,-.032],[-1.4,.224,.274,-.035],[-.96,.337,.371,-.025],[-.5,.47,.45,-.008],[0,.575,.526,.012],[.48,.647,.54,.016],[.96,.651,.502,.012],[1.39,.608,.445,.017],[1.77,.513,.36,.035],[2.04,.394,.272,.063],[2.26,.251,.171,.072],[2.42,.1,.078,.064],[2.48,.008,.007,.06]];function Ds(i){let t=0;for(;t<mi.length-2&&i>mi[t+1][0];)t++;const e=mi[t],n=mi[t+1],s=bi((i-e[0])/(n[0]-e[0]),0,1),r=mi[Math.max(0,t-1)],o=mi[Math.min(mi.length-1,t+2)],a=[];for(let c=1;c<4;c++){const l=(n[c]-r[c])/(n[0]-r[0]),h=(o[c]-e[c])/(o[0]-e[0]),u=n[0]-e[0];a.push((2*s*s*s-3*s*s+1)*e[c]+(s*s*s-2*s*s+s)*l*u+(-2*s*s*s+3*s*s)*n[c]+(s*s*s-s*s)*h*u)}return a}function Bg(i,t,e,n=!1){const s=Ds(bi(e,-2.23,2.47)),r=(t-s[2])/Math.max(.09,s[1]),o=-.26+.055*Math.sin(e*9+i*11)+.025*Math.sin(e*24),a=n?.97:1-Fe.smoothstep(r,o-.08,o+.18),c=.965+.045*$e(i*170+t*211+e*347),l=new Wt(.125,.19,.217),h=new Wt(.76,.79,.7);return l.lerp(h,a).multiplyScalar(c),l}function Ta(i,t){const[e,n,s]=Ds(i),r=bi((i-1.3)/.88,0,1),o=Math.min(e*.94,.55*Math.sqrt(1-r*r));return new P(t*o,s-Math.sqrt(Math.max(0,1-o*o/(e*e)))*n*.9,i)}function fh(i=!1){const t=[],e=[],n=[],s=[],r=Array.from({length:77},(c,l)=>-2.24+4.72*l/76).concat([1.3,2.18]).sort((c,l)=>c-l),o=40;for(let c=0;c<r.length;c++){const l=r[c],[h,u,f]=Ds(l),d=l>=1.3?Math.PI-Math.asin(bi(Ta(l,1).x/h,0,1)):13/40*Co;for(let g=0;g<=o;g++){const M=g<=13?g/13*d:g<=27?d+(g-13)/14*(Co-2*d):Co-d+(g-27)/13*d,m=Math.sin(M)*h,p=f+Math.cos(M)*u*(Math.cos(M)<0?.9:1.03);t.push(m,p,l);const v=Bg(m,p,l);e.push(v.r,v.g,v.b);const y=Math.max(-2.24,l-.002),_=Math.min(2.48,l+.002),w=Ds(y),A=Ds(_),T=_-y,D=Math.cos(M)<0?.9:1.03,S=u*D,x=p-f,C=new P(m/(h*h),x/(S*S),-m*m/(h*h*h)*(A[0]-w[0])/T-x*x/(S*S*S)*(A[1]-w[1])*D/T-x/(S*S)*(A[2]-w[2])/T).normalize();if(n.push(C.x,C.y,C.z),c<r.length-1&&g<o){const U=c*(o+1)+g;(l>=1.3&&l<2.18&&g>=13&&g<27)===i&&s.push(U,U+o+1,U+1,U+1,U+o+1,U+o+2)}}}const a=new oe;return a.setAttribute("position",new Nt(t,3)),a.setAttribute("color",new Nt(e,3)),a.setAttribute("skinRegion",new Nt(new Float32Array(t.length/3).fill(1),1)),a.setIndex(s),a.setAttribute("normal",new Nt(n,3)),a}function $n(i,t,e,n,s=!1){const r=new si(i),o=new si(t),a=[],c=[],l=[],h=18,u=10;for(let d=0;d<2;d++)for(let g=0;g<=h;g++){const M=g/h,m=r.getPoint(M),p=o.getPoint(M);for(let v=0;v<=u;v++){const y=v/u,_=m.clone().lerp(p,y),w=Math.sin(Math.PI*y)*Math.pow(1-M,.6)*e;_.addScaledVector(n,(d?-1:1)*w),a.push(_.x,_.y,_.z);const A=s&&d?new Wt(.65,.69,.62):new Wt(.125,.19,.217);if(A.multiplyScalar(.93+.07*Math.sin(Math.PI*y)),c.push(A.r,A.g,A.b),g<h&&v<u){const T=d*(h+1)*(u+1)+g*(u+1)+v;d?l.push(T,T+1,T+u+1,T+1,T+u+2,T+u+1):l.push(T,T+u+1,T+1,T+1,T+u+1,T+u+2)}}}const f=new oe;return f.setAttribute("position",new Nt(a,3)),f.setAttribute("color",new Nt(c,3)),f.setAttribute("skinRegion",new Nt(new Float32Array(a.length/3),1)),f.setIndex(l),f.computeVertexNormals(),f}const yt=(i,t,e)=>new P(i,t,e);function kg(){const i=[];i.push($n([yt(0,.42,.62),yt(0,.96,.25),yt(0,1.39,-.36)],[yt(0,.45,-.83),yt(0,.78,-.43),yt(0,1.39,-.36)],.073,yt(1,0,0))),i.push($n([yt(0,.19,-1.48),yt(0,.43,-1.63),yt(0,.48,-1.79)],[yt(0,.16,-1.9),yt(0,.29,-1.83),yt(0,.48,-1.79)],.032,yt(1,0,0))),i.push($n([yt(0,-.18,-1.4),yt(0,-.41,-1.68),yt(0,-.45,-1.81)],[yt(0,-.13,-1.95),yt(0,-.25,-1.87),yt(0,-.45,-1.81)],.025,yt(1,0,0)));for(const t of[-1,1])i.push($n([yt(t*.51,-.16,1.03),yt(t*1.14,-.3,.52),yt(t*1.75,-.48,-.24)],[yt(t*.39,-.24,-.16),yt(t*.9,-.37,-.16),yt(t*1.75,-.48,-.24)],.075,yt(0,1,0),!0)),i.push($n([yt(t*.3,-.24,-.72),yt(t*.64,-.34,-1.04),yt(t*.74,-.39,-1.33)],[yt(t*.18,-.23,-1.4),yt(t*.51,-.37,-1.36),yt(t*.74,-.39,-1.33)],.043,yt(0,1,0),!0)),i.push($n([yt(t*.11,-.01,-1.91),yt(t*.19,-.01,-2.2),yt(t*.12,-.01,-2.37)],[yt(t*.09,-.01,-2.3),yt(t*.14,-.01,-2.3),yt(t*.12,-.01,-2.37)],.025,yt(0,1,0)));return i.push($n([yt(0,.02,-2.16),yt(0,.7,-2.65),yt(0,1.2,-3.02)],[yt(0,-.03,-2.61),yt(0,.59,-2.77),yt(0,1.2,-3.02)],.073,yt(1,0,0))),i.push($n([yt(0,-.02,-2.18),yt(0,-.57,-2.57),yt(0,-.89,-2.95)],[yt(0,-.01,-2.61),yt(0,-.43,-2.73),yt(0,-.89,-2.95)],.065,yt(1,0,0))),i}function Hg(i,t,e,n){const s=new Xs({vertexColors:!0,roughness:.59,metalness:.015,clearcoat:.075,clearcoatRoughness:.55,side:ve});return s.onBeforeCompile=r=>{r.uniforms.uSwim=i,r.uniforms.uStrength=t,r.uniforms.uFlash=e,r.uniforms.uPattern={value:n},r.vertexShader=`uniform float uSwim; uniform float uStrength; attribute float skinRegion; varying vec3 vSkinPosition; varying float vSkinRegion;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      vSkinPosition = position;
      vSkinRegion = skinRegion;
      float tail = 1.0 - smoothstep(-2.95, 0.95, position.z);
      float bend = sin(uSwim + position.z * 1.45) * tail * tail * uStrength;
      transformed.x += bend;
      transformed.y += sin(uSwim * 0.53 + position.z) * tail * 0.022;
    `),r.fragmentShader=`uniform float uFlash; uniform float uPattern;
      varying vec3 vSkinPosition; varying float vSkinRegion;
      float sharkHash(vec3 p) { return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453); }
      float sharkNoise(vec3 p) {
        vec3 a=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(mix(sharkHash(a),sharkHash(a+vec3(1,0,0)),f.x),mix(sharkHash(a+vec3(0,1,0)),sharkHash(a+vec3(1,1,0)),f.x),f.y),mix(mix(sharkHash(a+vec3(0,0,1)),sharkHash(a+vec3(1,0,1)),f.x),mix(sharkHash(a+vec3(0,1,1)),sharkHash(a+vec3(1,1,1)),f.x),f.y),f.z);
      }
    `+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`
      #include <color_fragment>
      vec3 skinP=vSkinPosition;
      float mottle=sharkNoise(skinP*5.0+uPattern*3.1);
      float pores=sharkNoise(skinP*135.0+uPattern);
      diffuseColor.rgb *= .88 + .19*mottle + .05*pores;
      // Gill shadows are flush to the skin, with tapered tips and a soft edge;
      // there are no raised black tubes masquerading as anatomical incisions.
      float gill=0.0;
      float gillY=clamp((.29-skinP.y)/.522,0.0,1.0);
      float taper=sin(gillY*3.14159);
      for(int i=0;i<5;i++) {
        float line=1.22-float(i)*.155-.050*sin(gillY*3.14159);
        gill=max(gill,(1.0-smoothstep(.0015,.0055*taper+.0025,abs(skinP.z-line)))*taper);
      }
      gill*=smoothstep(.40,.49,abs(skinP.x))*vSkinRegion;
      diffuseColor.rgb *= 1.0-gill*.49;
      float scar=0.0;
      if(mod(uPattern,3.0)<.5) {
        float stripe=abs(skinP.z-.35-uPattern*.025-skinP.y*.68);
        scar=(1.0-smoothstep(.003,.011,stripe))*smoothstep(.09,.16,skinP.y)*(1.0-smoothstep(.30,.37,skinP.y))*smoothstep(.40,.49,skinP.x)*vSkinRegion;
      }
      diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.36,.42,.41),scar*.35);
      diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.43,.14,.12),uFlash*.6);
    `),r.fragmentShader=r.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
 roughnessFactor=clamp(roughnessFactor+(pores-.5)*.12,.4,.8);`)},s}function pl(i,t,e,n=16){return new St(new $s(new si(i),n,t,5,!1),e)}function Vg(i,t,e){const n=new fe;n.name=`Great white ${i+1}`;const s={value:0},r={value:.31},o={value:0},a=Hg(s,r,o,i),c=new St(e,a);c.castShadow=!0,c.receiveShadow=!0,n.add(c);const l=new fe;l.position.set(0,-.12,1.05),n.add(l);const h=fh(!0);h.translate(0,.12,-1.05);const u=new Xs({vertexColors:!0,roughness:.6,clearcoat:.08,side:ve});l.add(new St(h,u));const f=new re({color:7568748,roughness:.86}),d=[];for(let F=0;F<=16;F++)d.push(Ta(1.3+.88*F/16,-1));for(let F=15;F>=0;F--)d.push(Ta(1.3+.88*F/16,1));const g=new re({color:3818555,roughness:.95,side:ve}),M=[0,-.28,1.55],m=[];for(const F of d)M.push(F.x,F.y+.005,F.z);for(let F=0;F<d.length-1;F++)m.push(0,F+1,F+2);m.push(0,d.length,1);const p=new oe;p.setAttribute("position",new Nt(M,3)),p.setIndex(m),p.computeVertexNormals(),n.add(new St(p,g));const v=p.clone();v.translate(0,.12,-1.05),l.add(new St(v,g));const y=pl(d,.012,f,30);n.add(y);const _=pl(d.map(F=>F.clone().sub(l.position)),.012,f,30);l.add(_);const w=new re({color:14276030,roughness:.36}),A=new oe;A.setAttribute("position",new Nt([-.04,0,0,.04,0,0,0,-.072,.007,0,-.016,.021,0,-.016,-.009],3)),A.setIndex([0,3,2,3,1,2,0,2,4,4,2,1,0,4,1,0,1,3]),A.computeVertexNormals();const T=new si(d);for(let F=0;F<2;F++)for(let H=0;H<23;H++)for(const it of[!1,!0]){const V=T.getPoint((H+.5+F*.2)/24);V.z-=F*.045,V.y-=F*.015;const J=new St(A,w);J.position.copy(V),J.scale.setScalar(F?.68:1),it?(J.position.sub(l.position),J.rotation.z=Math.PI,l.add(J)):n.add(J)}const D=new re({color:2503736,roughness:.65}),S=new Xs({color:330251,roughness:.12,clearcoat:1});for(const F of[-1,1]){const H=new St(new hn(.06,12,8),D);H.scale.set(.4,.8,1),H.position.set(F*.465,.115,1.88),n.add(H);const it=new St(new hn(.039,12,10),S);it.scale.set(.56,1,1),it.position.set(F*.479,.115,1.88),n.add(it);const V=new St(new hn(.03,8,6),D);V.position.set(F*.238,-.042,2.26),V.scale.set(1,.24,.5),n.add(V)}const x=new Map;for(const F of[...n.children]){if(!(F instanceof St)||F.material===a)continue;F.updateMatrix();const H=F.material,it=x.get(H)||[];it.push(F.geometry.clone().applyMatrix4(F.matrix)),x.set(H,it),n.remove(F),F.geometry.dispose()}for(const[F,H]of x){const it=ls(H,!1);it&&n.add(new St(it,F)),H.forEach(V=>V.dispose())}const C=t/5.5;n.scale.setScalar(C),n.traverse(F=>{F.frustumCulled=!0});const U=new Map;for(const F of[...l.children]){if(!(F instanceof St))continue;F.updateMatrix();const H=F.material,it=U.get(H)||[];it.push(F.geometry.clone().applyMatrix4(F.matrix)),U.set(H,it),l.remove(F)}for(const[F,H]of U){const it=H.map(J=>J.index?J.toNonIndexed():J);for(const J of it)J.deleteAttribute("uv"),J.deleteAttribute("skinRegion"),!J.getAttribute("color")&&F===u&&J.setAttribute("color",new Nt(new Float32Array(J.getAttribute("position").count*3).fill(.6),3));const V=ls(it);V&&l.add(new St(V,F))}const z=[d[0],d.at(-1)];for(let F=0;F<d.length-1;F++)d[F].z<1.6&&d[F+1].z<1.6&&z.push(d[F],d[F+1]);const Y=new oe;Y.setAttribute("position",new Nt(new Float32Array(z.length*6),3));const G=[];for(let F=0;F<z.length;F+=2){const H=F*2;G.push(H,H+1,H+2,H+1,H+3,H+2)}Y.setIndex(G);const X=new St(Y,g);return X.frustumCulled=!1,n.add(X),{id:i,root:n,position:n.position,heading:0,pitch:0,health:100,state:"cruise",length:t,scale:C,speed:2.3,phase:i*1.9,stateUntil:0,target:yt(0,0,0),swim:s,strength:r,flash:o,active:!1,contact:!1,turn:0,deathAge:0,jaw:l,gape:0,teeth:w,cheeks:X,cheekEdges:z}}class Gg{animals=[];scene;onEvent;current;firstBreach=!1;nextBreach=48;nextThreat=18;threatId=-1;clouds=[];attackCount=0;drag;constructor(t,e){this.scene=t,this.onEvent=e;const n=[fh(),...kg()],s=ls(n,!1);n.forEach(r=>r.dispose());for(let r=0;r<15;r++){const o=r===0?7.1:4.75+$e(r+9)*1.65,a=Vg(r,o,s);this.animals.push(a),t.add(a.root)}this.reset()}get sharks(){return this.animals.filter(t=>t.active).map(t=>({id:t.id,position:t.position.clone(),heading:t.heading,health:t.health,state:t.state,length:t.length}))}reset(){this.firstBreach=!1,this.nextBreach=48,this.nextThreat=18,this.threatId=-1,this.attackCount=0,this.clouds.forEach(t=>{this.scene.remove(t.points),t.points.geometry.dispose(),t.points.material.dispose()}),this.clouds=[],this.current=void 0,this.drag=void 0;for(const t of this.animals)t.health=100,t.state="cruise",t.stateUntil=0,t.breach=void 0,t.deathAge=0,t.flash.value=0,t.speed=2.8,t.jaw.rotation.x=0,t.gape=0,t.position.set(($e(t.id+20)-.5)*95,-2-$e(t.id+90)*12,26+$e(t.id+31)*85),t.heading=-.5+$e(t.id+40),t.pitch=0,t.root.rotation.set(0,t.heading,0),t.active=t.id<4,t.root.visible=t.active}update(t){this.current=t;const e=Math.min(t.dt,.06),n=t.time,s=Math.min(15,4+Math.floor(t.progress*21+n*.016)),r=t.inCage&&t.cageDepth>2.2,o=r?t.cagePosition:t.boatPosition;for(const a of this.animals){if(!a.active&&a.id<s&&(a.active=!0,a.root.visible=!0,this.placeAhead(a,t)),!a.active)continue;a.gape=Fe.damp(a.gape,a.state==="drag"?.65:a.state==="rush"?.44:a.state==="warning"?.035:0,6,e),a.jaw.rotation.x=a.gape,a.teeth.visible=a.gape>.05;const c=a.cheeks.geometry.getAttribute("position");for(let u=0;u<a.cheekEdges.length;u++){const f=a.cheekEdges[u],d=f.y+.12,g=f.z-1.05;c.setXYZ(u*2,f.x,f.y,f.z),c.setXYZ(u*2+1,f.x,-.12+d*Math.cos(a.gape)-g*Math.sin(a.gape),1.05+d*Math.sin(a.gape)+g*Math.cos(a.gape))}if(c.needsUpdate=!0,a.cheeks.geometry.computeVertexNormals(),a.state==="drag"&&this.drag){this.updateDrag(e);continue}if(a.flash.value=Math.max(0,a.flash.value-e*1.9),a.state==="dead"){a.deathAge+=e,a.position.y-=e*.42,a.position.addScaledVector(a.target,e*.26),a.root.rotation.z=Fe.damp(a.root.rotation.z,Math.PI*.83,1,e),a.root.rotation.x=Fe.damp(a.root.rotation.x,.18,1,e),a.swim.value+=e*.3;continue}if(a.state==="breach"&&a.breach){this.updateBreach(a,e);continue}a.position.distanceTo(t.boatPosition)>170&&!r&&this.placeAhead(a,t);const l=a.id*2.399;let h=2.5+$e(a.id+111)*1.8;if((a.state==="flee"||a.state==="retreat")&&n>a.stateUntil&&(a.state="cruise"),a.state==="warning"){h=1.35;const u=r?8.5:12,f=l+n*.035;a.target.set(o.x+Math.sin(f)*u,r?o.y-.35:-1.5,o.z+Math.cos(f)*u),n>a.stateUntil&&(a.state="rush",a.stateUntil=n+4.8,a.contact=!1)}if(a.state==="rush")h=r?7.8:Math.max(10.5,t.speed+3),a.target.copy(o),a.target.y=r?o.y:-.55,n>a.stateUntil&&this.retreat(a,t);else if(a.state==="flee"||a.state==="retreat")h=a.state==="flee"?8.8:5.9;else if(a.state!=="warning")if(r){const u=5.9+a.id%6*1.8,f=l+n*(a.id%2?-.13:.1);a.state=a.id%3?"circle":"inspect",a.target.set(o.x+Math.sin(f)*u,o.y-1+Math.sin(n*.14+l)*(3+a.id%4),o.z+Math.cos(f)*u),h=2.2+a.id%3*.65}else{const u=a.id<4||t.speed<2.5,f=u?12+a.id*2.6:25+a.id%6*8,d=l+n*(a.id%2?-.075:.061),g=t.speed*2.4+Math.sin(l+n*.03)*10;a.state=u?"circle":"cruise",a.target.set(o.x+Math.sin(d)*f+Math.sin(t.boatHeading)*g,-1.65-a.id%5*1.55+Math.sin(n*.28+l)*.7,o.z+Math.cos(d)*f+Math.cos(t.boatHeading)*g),(a.id===1||a.id===3)&&(a.target.y=-.78+Math.sin(n*.28+l)*.2),h+=Math.min(t.speed*.45,3.2)}if(this.steer(a,t,h,e),a.state==="rush"){const u=a.position.clone().add(yt(Math.sin(a.heading)*2.35*a.scale,0,Math.cos(a.heading)*2.35*a.scale)),f=r?2.75:5.15,d=Math.hypot(u.x-o.x,u.z-o.z);!a.contact&&d<f&&Math.abs(u.y-o.y)<(r?2.3:2.2)&&(a.contact=!0,t.safeHarbor||this.onEvent({type:"impact",position:u,amount:r?18:16,target:r?"cage":"boat"}),a.state!=="drag"&&this.retreat(a,t))}}if(n>this.nextThreat&&this.threatId<0&&(t.progress>.12||r)&&!t.safeHarbor&&!this.drag){const c=this.animals.filter(l=>l.active&&l.health>0&&l.state!=="breach"&&l.state!=="flee"&&l.state!=="retreat").sort((l,h)=>l.position.distanceToSquared(o)-h.position.distanceToSquared(o))[0];c&&(c.state="warning",c.stateUntil=n+2.35,this.threatId=c.id,this.onEvent({type:"threat",position:c.position.clone(),target:r?"cage":"boat",message:r?"它正在转向你。准备防御。":"背鳍正在靠近船舷。保持航速。"})),this.nextThreat=n+(r?8:17)}this.threatId>=0&&!["warning","rush"].includes(this.animals[this.threatId].state)&&(this.threatId=-1),!r&&!this.drag&&!t.safeHarbor&&!this.animals.some(a=>a.state==="breach")&&(!this.firstBreach&&n>32&&t.progress>.13||this.firstBreach&&n>this.nextBreach&&t.progress>.26)&&this.beginBreach(),this.updateClouds(e)}placeAhead(t,e){const n=yt(Math.cos(e.boatHeading),0,-Math.sin(e.boatHeading)),s=yt(Math.sin(e.boatHeading),0,Math.cos(e.boatHeading));t.position.copy(e.boatPosition).addScaledVector(s,55+$e(t.id+e.time)*65).addScaledVector(n,($e(t.id+e.time+62)-.5)*100),t.position.y=-6-$e(t.id+71)*12,t.heading=e.boatHeading+Math.PI*.65}steer(t,e,n,s){const r=t.target.clone().sub(t.position);for(const h of this.animals){if(h===t||!h.active||h.state==="dead"||h.state==="breach")continue;const u=t.position.clone().sub(h.position),f=u.length();f<5&&f>.01&&r.addScaledVector(u,(5-f)*2.8/f)}const o=Math.atan2(r.x,r.z),a=zg(o-t.heading),c=(t.state==="rush"?1.2:.78)/Math.sqrt(t.scale);t.turn=bi(a,-c,c),t.heading+=t.turn*s,n*=1-.31*bi(Math.abs(a)/Math.PI,0,1),t.speed=Fe.damp(t.speed,n,1.65,s);const l=bi(Math.atan2(r.y,Math.max(4,Math.hypot(r.x,r.z))),-.33,.33);t.pitch=Fe.damp(t.pitch,l,2.1,s),t.position.x+=Math.sin(t.heading)*t.speed*s,t.position.z+=Math.cos(t.heading)*t.speed*s,t.position.y+=Math.sin(t.pitch)*t.speed*s,t.position.y=Math.min(t.position.y,-.72),this.avoidSolids(t,e),t.phase+=s*(2.5+t.speed*.68),t.swim.value=t.phase,t.strength.value=.25+t.speed*.028,t.root.rotation.set(-t.pitch,t.heading,-t.turn*.09,"YXZ")}avoidSolids(t,e){for(const c of nn){const l=t.position.x-c.x,h=t.position.z-c.z,u=Math.hypot(l,h),f=c.radius+7;u<f&&(t.position.x=c.x+(u>.001?l/u:c.side)*f,t.position.z=c.z+(u>.001?h/u:0)*f)}const n=Math.sin(t.heading),s=Math.cos(t.heading),r=Math.sin(e.boatHeading),o=Math.cos(e.boatHeading),a=[[-2.2,0,0,.2],[-1.2,0,0,.4],[0,0,0,.64],[1.1,0,0,.63],[2.2,0,.03,.28],[-.28,0,.96,.43],[.05,-1.19,-.34,.52],[.05,1.19,-.34,.52],[-2.8,0,.82,.4],[-2.75,0,-.61,.3]];for(let c=0;c<2;c++)for(const[l,h,u,f]of a){const d=f*t.scale,g=t.position.x+(n*l+s*h)*t.scale,M=t.position.z+(s*l-n*h)*t.scale,m=t.position.y+(u+Math.sin(t.pitch)*l)*t.scale,p=g-e.boatPosition.x,v=M-e.boatPosition.z,y=p*o-v*r,_=p*r+v*o;Math.abs(y)<1.95+d&&Math.abs(_)<5.15+d&&m+d>e.boatPosition.y-1.15&&(t.position.y-=m+d-(e.boatPosition.y-1.19));const w=g-e.cagePosition.x,A=M-e.cagePosition.z,T=m-e.cagePosition.y;if(e.cageDepth>1&&Math.abs(T)<1.45+d){const D=w*o-A*r,S=w*r+A*o,x=1.15+d;if(Math.abs(D)<x&&Math.abs(S)<x){const C=x-Math.abs(D),U=x-Math.abs(S);if(C<U){const z=(D>=0?1:-1)*(C+.015);t.position.x+=o*z,t.position.z-=r*z}else{const z=(S>=0?1:-1)*(U+.015);t.position.x+=r*z,t.position.z+=o*z}}}}}retreat(t,e){t.state="retreat",t.stateUntil=e.time+6;const n=e.inCage?e.cagePosition:e.boatPosition;let s=t.position.clone().sub(n);s.y=0,s.lengthSq()<.01&&s.set(Math.sin(t.heading),0,Math.cos(t.heading)),s.normalize().multiplyScalar(24),t.target.copy(n).add(s),t.target.y=n.y-5}beginBreach(){const t=this.current;if(!t)return;const e=this.animals.find(h=>h.health>0&&h.active&&h.state!=="flee");if(!e)return;const n=yt(Math.sin(t.boatHeading),0,Math.cos(t.boatHeading)),s=yt(Math.cos(t.boatHeading),0,-Math.sin(t.boatHeading)),r=this.firstBreach?-1:1,o=2.65,c=t.boatPosition.clone().addScaledVector(n,4.5+t.speed*(o*.5+.85)).clone().addScaledVector(s,-r*15);c.y=-2.3;const l=s.multiplyScalar(r);e.breach={start:c,direction:l,age:-.85,duration:o,velocity:14.65,launched:!1},e.state="breach",e.heading=Math.atan2(l.x,l.z),e.speed=11.32,e.position.copy(c).addScaledVector(l,-.85*e.speed),e.position.y=c.y-14.65*.85-5.53*.85*.85,this.firstBreach=!0,this.nextBreach=t.time+64+$e(t.time)*22,this.onEvent({type:"breach",position:c.clone(),amount:e.length,message:"船舷下方有急速上升的影子。"})}updateBreach(t,e){const n=t.breach;n.age+=e;const s=n.age;t.position.copy(n.start).addScaledVector(n.direction,t.speed*s),t.position.y=n.start.y+n.velocity*s-5.53*s*s;const r=n.velocity-11.06*s;t.pitch=Math.atan2(r,t.speed),t.phase+=e*7,t.swim.value=t.phase,t.strength.value=.17,t.root.rotation.set(-t.pitch,t.heading,Math.sin(s*2)*.08,"YXZ"),s>=0&&!n.launched&&(n.launched=!0,this.onEvent({type:"splash",position:yt(t.position.x,0,t.position.z),amount:1.5})),s>n.duration&&(this.onEvent({type:"splash",position:yt(t.position.x,0,t.position.z),amount:3}),t.breach=void 0,t.state="retreat",t.stateUntil=(this.current?.time||0)+7,t.target.copy(t.position).addScaledVector(n.direction,30),t.target.y=-8,t.position.y=-2.8)}attack(t,e,n){const s=e.clone().normalize(),r=new Va(t,s),o=n==="knife"?3.9:48;let a,c=o;const l=new P;for(const f of this.animals){if(!f.active||f.health<=0)continue;const d=yt(Math.sin(f.heading)*Math.cos(f.pitch),Math.sin(f.pitch),Math.cos(f.heading)*Math.cos(f.pitch));for(const[g,M]of[[-2.1,.16],[-1.5,.25],[-.8,.43],[0,.59],[.75,.59],[1.45,.44],[1.95,.3],[2.28,.16]]){const m=f.position.clone().addScaledVector(d,g*f.scale),p=new Li(m,M*f.scale+(n==="knife"?.18:0)),v=r.intersectSphere(p,new P);if(!v)continue;const y=t.distanceTo(v);y<c&&(a=f,c=y,l.copy(v))}}if(!a)return{hit:!1,killed:!1,distance:o};const h=a;h.health=Math.max(0,h.health-(n==="knife"?38:56)),h.flash.value=1;const u=h.health<=0;if(this.attackCount++,this.bloodCloud(l,n==="knife"?20:34),this.onEvent({type:u?"kill":"hit",position:l.clone(),amount:n==="knife"?38:56}),u)h.state="dead",h.deathAge=0,h.target.set(Math.sin(h.heading),0,Math.cos(h.heading)),h.strength.value=.03;else{h.state="flee",h.stateUntil=(this.current?.time||0)+8;const f=h.position.clone().sub(t).normalize();h.target.copy(h.position).addScaledVector(f,35),h.target.y-=5}return this.threatId===h.id&&(this.threatId=-1),{hit:!0,killed:u,distance:c}}bloodCloud(t,e){const n=new Float32Array(e*3),s=new Float32Array(e*3);for(let c=0;c<e;c++)n.set([t.x,t.y,t.z],c*3),s.set([($e(c+this.attackCount*41)-.5)*1.1,($e(c+80)-.3)*.65,($e(c+141)-.5)*1.1],c*3);const r=new oe;r.setAttribute("position",new Ce(n,3));const o=new qa({color:4744811,size:.11,transparent:!0,opacity:.65,depthWrite:!1,sizeAttenuation:!0}),a=new kr(r,o);this.scene.add(a),this.clouds.push({points:a,velocity:s,age:0})}updateClouds(t){for(let e=this.clouds.length-1;e>=0;e--){const n=this.clouds[e];n.age+=t;const s=n.points.geometry.getAttribute("position");for(let o=0;o<s.count;o++)s.setXYZ(o,s.getX(o)+n.velocity[o*3]*t,s.getY(o)+n.velocity[o*3+1]*t,s.getZ(o)+n.velocity[o*3+2]*t);s.needsUpdate=!0;const r=n.points.material;r.opacity=Math.max(0,.6-n.age*.17),r.size=.11+n.age*.05,n.age>3.6&&(this.scene.remove(n.points),n.points.geometry.dispose(),r.dispose(),this.clouds.splice(e,1))}}debugForceBreach(){this.beginBreach()}beginDrag(t){const e=this.animals.filter(s=>s.active&&s.health>0).sort((s,r)=>s.position.distanceToSquared(t)-r.position.distanceToSquared(t))[0];if(!e)return;const n=t.clone().sub(e.position);n.y=0,n.lengthSq()<.01&&n.set(0,0,1),n.normalize(),this.drag={animal:e,origin:t.clone(),start:e.position.clone(),direction:n,age:0},e.state="drag",e.breach=void 0,e.heading=Math.atan2(n.x,n.z),this.threatId=-1}updateDrag(t){const e=this.drag;e.age+=t;const n=e.animal,s=e.origin.clone().addScaledVector(e.direction,-2.5*n.scale);e.age<1.2?n.position.copy(e.start).lerp(s,Math.min(1,e.age/1.2)):(n.position.copy(s).addScaledVector(e.direction,(e.age-1.2)*3.8),n.position.y-=this.dragDescent(e.age-1.2)),n.root.rotation.set(e.age>1.2?.24:0,n.heading,Math.sin(e.age*4)*.09),n.swim.value+=t*8,n.strength.value=.42}dragDescent(t){const e=this.drag,n=e.origin.clone().addScaledVector(e.direction,t*3.8);return Math.min(t*6.8,Math.max(0,e.origin.y-Ts(n.x,n.z)-5))}get dragView(){if(!this.drag)return null;const t=this.drag,e=Math.max(0,t.age-1.2);return{position:t.origin.clone().addScaledVector(t.direction,2+e*3.8).add(yt(t.direction.z*.8,-1.75-this.dragDescent(e),-t.direction.x*.8)),target:t.animal.position.clone().addScaledVector(t.direction,1.8*t.animal.scale).add(yt(0,-.75,0))}}debugThreatNearCage(){const t=this.current;if(!t)return;const e=this.animals.find(n=>n.health>0);e&&(e.active=!0,e.root.visible=!0,e.state="warning",e.stateUntil=t.time+2.5,e.position.copy(t.cagePosition).add(yt(0,0,7)),e.heading=Math.PI,e.target.copy(t.cagePosition),this.threatId=e.id,this.onEvent({type:"threat",position:e.position.clone(),target:"cage"}))}}const Wg=new P(0,1,0),ke=(i,t=.65,e=0)=>new re({color:i,roughness:t,metalness:e});function Qt(i,t,e,n=0,s=0,r=0){const o=new St(i,t);return o.position.set(n,s,r),o.castShadow=!0,o.receiveShadow=!0,e.add(o),o}function Bt(i,t,e,n,s,r=8){const o=new P(...t),a=new P(...e),c=a.clone().sub(o),l=Qt(new we(n,n,c.length(),r),s,i);return l.position.copy(o.add(a).multiplyScalar(.5)),l.quaternion.setFromUnitVectors(Wg,c.normalize()),l}function _n(i,t,e,n){return Qt(new dn(...t),n,i,...e)}function jn(i,t,e,n,s=60){return Qt(new $s(new si(t),s,e,6,!1),n,i)}function Po(i,t){const e=document.createElement("canvas");e.width=512,e.height=512;const n=e.getContext("2d");n.fillStyle=i,n.fillRect(0,0,512,512);let s=719;const r=()=>(s=s*16807%2147483647,s/2147483647);for(let a=0;a<3500;a++){const c=r()>.5;n.fillStyle=c?"rgba(236,230,202,.08)":"rgba(27,36,37,.09)";const l=r()*512,h=r()*512;n.fillRect(l,h,t==="wood"?1+r()*3:1+r()*6,t==="wood"?10+r()*95:1+r()*10)}if(t==="paint")for(let a=0;a<45;a++){const c=r()*512,l=r()*512;n.fillStyle="rgba(116,70,31,.19)",n.fillRect(c,l,r()*3+1,r()*35)}const o=new fs(e);return o.colorSpace=Ue,o.wrapS=o.wrapT=ss,o.anisotropy=4,o}function Xg(i,t=512,e=128){const n=document.createElement("canvas");n.width=t,n.height=e;const s=n.getContext("2d");s.fillStyle="#e4dfc9",s.fillRect(0,0,t,e),s.fillStyle="#233a46",s.textAlign="center",s.font=`700 ${e*.55}px Georgia`,s.fillText(i,t/2,e*.7);const r=new fs(n);return r.colorSpace=Ue,r}function Rr(i,t=[]){i.updateMatrixWorld(!0);const e=new Map;i.traverse(n=>{if(!(n instanceof St)||Array.isArray(n.material)||n.material.transparent)return;let s=n;for(;s&&s!==i;){if(t.includes(s))return;s=s.parent}const r=n.material.uuid+Object.keys(n.geometry.attributes).sort().join(",");let o=e.get(r);o||(o={material:n.material,meshes:[],geometries:[]},e.set(r,o));let a=n.geometry.clone().applyMatrix4(n.matrixWorld);if(a.index){const c=a;a=c.toNonIndexed(),c.dispose()}o.meshes.push(n),o.geometries.push(a)});for(const n of e.values()){if(n.meshes.length<2){for(const r of n.geometries)r.dispose();continue}const s=ls(n.geometries,!1);for(const r of n.geometries)r.dispose();if(s){for(const r of n.meshes)r.removeFromParent(),r.geometry.dispose();Qt(s,n.material,i)}}}function ml(){const i=[],t=[],e=[];for(let o=0;o<=40;o++){const a=o/40,c=-4.75+a*10.1,l=Fe.smoothstep(a,.64,1),h=(1.56+.2*Math.sin(a*Math.PI))*Math.pow(1-l,.55)+.035,u=1.1+.36*Math.pow(a,4)+.1*Math.pow(1-a,3);for(let f=0;f<=20;f++){const d=f/20*Math.PI,g=-Math.cos(d)*h,M=u-(1.94-.7*Math.pow(a,7))*Math.pow(Math.sin(d),.72);if(i.push(g,M,c),e.push(f/20,a*2),o<40&&f<20){const m=o*21+f,p=m+20+1;t.push(m,m+1,p,m+1,p+1,p)}}}const r=new oe;return r.setAttribute("position",new Nt(i,3)),r.setAttribute("uv",new Nt(e,2)),r.setIndex(t),r.computeVertexNormals(),r}function qg(){const i=new Ai;return i.moveTo(-1.48,-4.55),i.lineTo(1.48,-4.55),i.bezierCurveTo(1.67,-2,1.64,1.6,1.2,3.25),i.bezierCurveTo(.98,4.1,.48,4.75,0,5.14),i.bezierCurveTo(-.48,4.75,-.98,4.1,-1.2,3.25),i.bezierCurveTo(-1.64,1.6,-1.67,-2,-1.48,-4.55),i}function Yg(){const i=new fe;i.name="Morrow — 10 metre fishing launch";const t=ke("#cac5b0",.86);t.map=Po("#c9c3ac","paint");const e=ke("#1c3845",.68);e.map=Po("#284754","paint");const n=ke("#746149",.95);n.map=Po("#837057","wood");const s=ke("#38382c",.92),r=ke("#a27c3d",.4,.58),o=ke("#7c8885",.35,.72),a=ke("#363f3d",.64,.7),c=ke("#9b9576",1),l=ke("#171d1d",.82),h=ke("#b85425",.73),u=Qt(ml(),t,i);u.material.side=ve;const f=Qt(ml(),e,i);f.scale.set(.988,.61,.999),f.position.y=-.44;const d=new Ai;d.moveTo(-1.57,1.19),d.lineTo(1.57,1.19),d.quadraticCurveTo(1.3,-.56,0,-.78),d.quadraticCurveTo(-1.3,-.56,-1.57,1.19);const g=Qt(new Ws(d,16),t,i,0,0,-4.75);g.rotation.y=Math.PI;const M=Qt(new Ne(1.4,.35),new re({map:Xg("MORROW"),roughness:.85}),i,0,.7,-4.766);M.rotation.y=Math.PI;const m=Qt(new Ws(qg(),32),n,i,0,.67,0);m.rotation.x=Math.PI/2,m.material.side=ve;for(let V=-1.4;V<=1.4;V+=.205){const J=5-Math.pow(Math.abs(V)/1.46,1.9)*2.1;Bt(i,[V,.68,-4.5],[V,.68,J],.0075,s,4)}for(let V=-3.7;V<4;V+=1.55)for(let J=-1.3;J<1.3;J+=.41){const bt=V+Math.round(J*10)%2*.4;Bt(i,[J,.682,bt],[J+.2,.682,bt],.008,s,4)}for(const V of[-1,1]){const J=[];for(let Ft=0;Ft<=30;Ft++){const Zt=Ft/30,K=Fe.smoothstep(Zt,.64,1);J.push(new P(V*((1.56+.2*Math.sin(Zt*Math.PI))*Math.pow(1-K,.55)+.035),1.1+.36*Math.pow(Zt,4)+.1*Math.pow(1-Zt,3),-4.75+Zt*10.1))}jn(i,J,.074,s);const bt=J.map(Ft=>Ft.clone().add(new P(V*.016,-.17,0)));jn(i,bt,.048,e);const Xt=[];for(let Ft=18;Ft<31;Ft++)Xt.push(J[Ft].clone().add(new P(0,.55,0)));jn(i,Xt,.025,o);for(const Ft of[18,22,26,29])Bt(i,J[Ft].toArray(),J[Ft].clone().add(new P(0,.55,0)).toArray(),.024,o);for(const Ft of[-3.4,-.6]){const Zt=Qt(new as(.15,.65,4,8),l,i,V*1.68,.49,Ft);Zt.rotation.z=V*.15,Bt(i,[V*1.62,1.16,Ft],[V*1.68,.9,Ft],.013,c)}for(const Ft of[-4,3.5])Bt(i,[V*1.07,.85,Ft],[V*1.07,1,Ft],.043,o),Bt(i,[V*.87,1,Ft],[V*1.27,1,Ft],.03,o)}Bt(i,[-1.57,1.19,-4.75],[1.57,1.19,-4.75],.07,s);const p=new fe;i.add(p);const v=new Ai;v.moveTo(-1.1,-.8),v.lineTo(1.1,-.8),v.lineTo(1.15,.65),v.quadraticCurveTo(0,1.12,-1.15,.65),v.closePath();const y=Qt(new Xr(v,{depth:.11,bevelEnabled:!0,bevelSize:.06,bevelThickness:.035,bevelSegments:2,steps:1}),t,p,0,3.13,2.2);y.rotation.x=Math.PI/2;for(const V of[-1,1]){Bt(p,[V*1.02,.72,1.45],[V*1.02,3.12,1.45],.047,t),Bt(p,[V*.96,1.2,3.1],[V*.94,3.12,2.95],.045,t),Bt(p,[V*1.02,1.68,1.45],[V*.96,1.68,3.1],.04,t);const J=Qt(new Ne(1.39,1.14),new Xs({color:"#83b2b6",transparent:!0,opacity:.14,roughness:.16,metalness:.1,side:ve,depthWrite:!1}),p,V*1.005,2.37,2.24);J.rotation.y=Math.PI/2;const bt=Qt(new hn(.073,10,8),new re({color:V===1?"#5faa67":"#c24b3e",emissive:V===1?"#246833":"#7e241a",emissiveIntensity:.7}),p,V*1.12,3.17,2.28);bt.castShadow=!1}const _=Qt(new Ne(1.78,1.27),new Xs({color:"#9cc5c8",transparent:!0,opacity:.12,roughness:.13,side:ve,depthWrite:!1}),p,0,2.44,3.01);_.rotation.x=-.085,Bt(p,[0,1.81,3.06],[0,3.13,2.96],.025,t);const w=_n(p,[1.47,.63,.55],[0,1.18,2.62],t);w.rotation.x=-.08;const A=_n(p,[1.4,.31,.08],[0,1.56,2.29],e);A.rotation.x=-.22;for(const V of[-.44,-.13,.23]){const J=Qt(new we(.088,.088,.018,24),l,p,V,1.58,2.24);J.rotation.x=Math.PI/2;const bt=Qt(new Ya(.066,24),ke("#d9d6bd"),p,V,1.58,2.228);bt.rotation.y=Math.PI,Bt(p,[V,1.58,2.21],[V+.032,1.617,2.21],.004,l,4)}const T=new fe;T.position.set(0,1.66,2.02),T.rotation.x=-.15,p.add(T),Qt(new un(.26,.022,7,32),s,T),Qt(new we(.06,.06,.07,12),r,T).rotation.x=Math.PI/2;for(let V=0;V<6;V++){const J=V*Math.PI/3;Bt(T,[0,0,0],[Math.sin(J)*.26,Math.cos(J)*.26,0],.013,o)}Bt(p,[.62,1.5,2.17],[.64,1.75,2.02],.014,o),Qt(new hn(.047,10,8),l,p,.64,1.75,2.02),_n(p,[.32,.15,.18],[-.58,1.78,2.53],l),_n(p,[.17,.05,.01],[-.59,1.81,2.429],ke("#678f76")),Bt(p,[.65,3.2,2.35],[.7,4.67,2.35],.023,a),Bt(p,[.7,4.67,2.35],[.7,5.33,2.35],.008,a),Bt(p,[-.68,3.22,2.5],[-.73,4.15,2.5],.012,o),Qt(new hn(.26,20,12),t,p,0,3.37,2.5).scale.set(1,.5,.7),Bt(i,[1.18,.72,-1.55],[1.18,4.73,-1.55],.095,t,10),Bt(i,[1.18,4.73,-1.55],[3.5,5,-2],.085,t,10),Bt(i,[1.18,2.7,-1.55],[2.56,4.88,-1.8],.051,o,10),Bt(i,[1.12,1,-1.55],[1.12,2.8,-1.55],.066,a,10);const S=Qt(new un(.17,.038,8,20),a,i,3.5,4.89,-2);S.rotation.y=Math.PI/2;const x=Qt(new we(.013,.013,1,6),a,i,3.5,3,-2),C=Qt(new we(.18,.18,.35,16),a,i,1.17,1.44,-1.55);C.rotation.z=Math.PI/2;const U=Qt(new we(.14,.14,.3,16),c,i,1.17,1.44,-1.55);U.rotation.z=Math.PI/2,_n(i,[2,.1,.82],[2.29,.72,-2],a);for(let V=1.45;V<3.22;V+=.13)Bt(i,[V,.785,-2.37],[V,.785,-1.63],.012,o,5);for(const V of[-2.43,-1.57])Bt(i,[1.57,.78,V],[1.57,1.5,V],.024,o),Bt(i,[3.15,.78,V],[3.15,1.5,V],.024,o),Bt(i,[1.57,1.5,V],[3.15,1.5,V],.024,o);_n(i,[.8,.4,.67],[-.93,.9,-3.4],t),_n(i,[.84,.06,.7],[-.93,1.13,-3.4],e),Bt(i,[-1.25,1.17,-3.12],[-.63,1.17,-3.12],.016,o);for(let V=0;V<4;V++){const J=Qt(new un(.28-V*.043,.018,5,30),c,i,-.95,.72+V*.013,-1.52);J.rotation.x=Math.PI/2}jn(i,[new P(-.7,.75,-1.5),new P(-.3,.7,-1.3),new P(-.4,.71,-.7),new P(-.9,.72,-.5)],.016,c,24);const z=new fe;z.position.set(-1.1,2.18,1.5),z.rotation.y=Math.PI/2,i.add(z),Qt(new un(.35,.094,10,32),h,z);for(let V=0;V<4;V++){const J=V*Math.PI/2,bt=Qt(new un(.35,.097,8,8,Math.PI/7),t,z);bt.rotation.z=J}const Y=[new P(-1.23,.86,-2.4),new P(-1.6,2.2,-3.1),new P(-1.78,3.4,-4.1),new P(-1.67,4.2,-5)];jn(i,Y,.015,a,32),Bt(i,[-1.67,4.2,-5],[-1.72,.2,-6.1],.003,c,3);for(let V=0;V<7;V++)for(let J=0;J<5;J++){const bt=-1.35+J*.11,Xt=-3.85+V*.13;Bt(i,[bt,.8,Xt],[bt+.09,.9,Xt+.13],.008,c,4),Bt(i,[bt+.09,.9,Xt],[bt,.8,Xt+.13],.008,c,4)}const G=new fe;G.position.set(0,-.64,-4.68),i.add(G),Bt(i,[0,-.6,-3.8],[0,-.64,-4.68],.055,o),Qt(new hn(.11,12,8),r,G);for(let V=0;V<3;V++){const J=Qt(new hn(.18,12,6),r,G),bt=V*Math.PI*2/3;J.position.set(Math.sin(bt)*.18,Math.cos(bt)*.18,0),J.scale.set(.62,1.1,.16),J.rotation.z=-bt+.5}const X=_n(i,[.055,.48,.42],[0,-.58,-4.96],e);X.rotation.y=0;const F=Zg(o,a,h),{weapon:H,knife:it}=$g(o,a,n,l);return Rr(i,[T,G,x,X,z]),Rr(F),Rr(H),Rr(it),{root:i,wheel:T,propeller:G,cable:x,cage:F,weapon:H,knife:it,update(V,J,bt,Xt){T.rotation.z=-bt*.68,G.rotation.z=V*(2+Math.abs(J)*4),X.rotation.y=bt*.4;const Ft=Math.max(.15,1.6+Xt);x.scale.y=Ft,x.position.set(3.5,5-Ft/2,-2),z.rotation.z=Math.sin(V*1.37)*.015}}}function Zg(i,t,e){const n=new fe;n.name="Dive cage — 2.2 × 2.8 metres";for(const s of[-1.4,1.4])for(const r of[-1,1])Bt(n,[-1.1,s,r*1.1],[1.1,s,r*1.1],.044,i),Bt(n,[r*1.1,s,-1.1],[r*1.1,s,1.1],.044,i);for(const s of[-1.1,1.1])for(const r of[-1.1,1.1])Bt(n,[s,-1.4,r],[s,1.4,r],.048,i);for(const s of[-1,1]){for(const r of[-.69,.69])Bt(n,[r,-1.4,s*1.1],[r,1.4,s*1.1],.023,i),Bt(n,[s*1.1,-1.4,r],[s*1.1,1.4,r],.023,i);for(const r of[-.82,1])Bt(n,[-1.1,r,s*1.1],[1.1,r,s*1.1],.026,i),Bt(n,[s*1.1,r,-1.1],[s*1.1,r,1.1],.026,i)}for(let s=-1;s<=1.001;s+=.14)Bt(n,[s,-1.38,-1.08],[s,-1.38,1.08],.019,t,5),Bt(n,[-1.08,-1.36,s],[1.08,-1.36,s],.012,i,5);Bt(n,[-1.1,1.4,-1.1],[1.1,1.4,1.1],.02,i),Bt(n,[1.1,1.4,-1.1],[-1.1,1.4,1.1],.02,i);for(const s of[-1.1,1.1])for(const r of[-1.1,1.1])Bt(n,[s,1.4,r],[0,2.35,0],.012,t,5);Qt(new un(.08,.02,6,16),i,n,0,2.4,0);for(const s of[-.9,.85]){const r=Qt(new we(.053,.053,.18,10),t,n,-1.11,s,-.69);r.rotation.z=Math.PI/2}Bt(n,[-1.08,-.1,.69],[-1.08,.13,.69],.019,e);for(const s of[-.93,.93])Bt(n,[s,-.2,-.94],[s,-.2,-.69],.025,e),Bt(n,[s,-.2,-.69],[s,.15,-.69],.025,e);for(const s of[-1.12,1.12])for(const r of[-1.12,1.12]){const o=Qt(new as(.062,.45,3,6),ke("#1c2729"),n,s,-1.03,r);o.rotation.z=.15}return n}function $g(i,t,e,n){const s=new fe;s.name="Pneumatic spear gun",Bt(s,[0,0,.2],[0,0,-.89],.044,t,12),Bt(s,[0,.025,.22],[0,.025,-1.3],.009,i,6);const r=Qt(new ks(.022,.17,6),i,s,0,.025,-1.37);r.rotation.x=-Math.PI/2,_n(s,[.08,.23,.12],[0,-.135,.1],e).rotation.x=-.2;const o=Qt(new un(.065,.008,5,14,Math.PI*1.7),i,s,0,-.11,-.045);o.rotation.y=Math.PI/2;for(const u of[-.06,.06])Bt(s,[u,0,-.85],[u,.045,-.44],.012,n),Bt(s,[u,.045,-.44],[0,.025,-.38],.012,n);_n(s,[.026,.034,.05],[0,.055,-.79],i);const a=Qt(new we(.08,.08,.065,16),n,s,0,-.055,-.19);a.rotation.z=Math.PI/2;const c=new fe;c.name="Dive knife",Bt(c,[0,0,.18],[0,0,-.07],.045,n,8);for(let u=0;u<6;u++)Qt(new un(.045,.005,4,8),t,c,0,0,.13-u*.031);_n(c,[.18,.025,.04],[0,0,-.07],i);const l=[-.047,0,-.09,.047,0,-.09,.043,0,-.38,0,0,-.57,-.047,0,-.38,0,.012,-.1,0,.012,-.39,0,-.012,-.1,0,-.012,-.39],h=new oe;return h.setAttribute("position",new Nt(l,3)),h.setIndex([0,5,4,4,5,6,4,6,3,3,6,2,2,6,1,1,6,5,1,5,0,0,4,7,4,8,7,4,3,8,3,2,8,2,1,8,1,7,8,1,0,7]),h.computeVertexNormals(),Qt(h,i,c),gl(s,!1),gl(c,!0),{weapon:s,knife:c}}function Be(i,t,e,n,s=28){const r=new si(t.map(g=>new P(...g))),o=[],a=[],c=[],l=12,h=new P,u=new P,f=new P;for(let g=0;g<=s;g++){const M=g/s,m=r.getPoint(M);u.copy(r.getTangent(M)),h.set(1,0,0).addScaledVector(u,-u.x).normalize(),h.lengthSq()<.1&&h.set(0,1,0).addScaledVector(u,-u.y).normalize(),f.crossVectors(u,h).normalize();const p=M*(e.length-1),v=Math.min(e.length-2,Math.floor(p)),y=p-v,_=Fe.lerp(e[v][0],e[v+1][0],y),w=Fe.lerp(e[v][1],e[v+1][1],y);for(let A=0;A<=l;A++){const T=A/l*Math.PI*2,D=m.clone().addScaledVector(h,Math.cos(T)*_).addScaledVector(f,Math.sin(T)*w);if(o.push(D.x,D.y,D.z),a.push(A/l,M),g<s&&A<l){const S=g*(l+1)+A,x=S+l+1;c.push(S,S+1,x,S+1,x+1,x)}}}const d=new oe;return d.setAttribute("position",new Nt(o,3)),d.setAttribute("uv",new Nt(a,2)),d.setIndex(c),d.computeVertexNormals(),Qt(d,n,i)}function gl(i,t){const e=ke("#252e30",.91),n=ke("#414b4c",.84),s=ke("#67706b",.9),r=new fe;if(r.name="Right hand · stitched neoprene diving glove",i.add(r),t){Be(r,[[.055,-.026,-.042],[.071,-.043,.018],[.072,-.044,.09],[.073,-.049,.158]],[[.004,.004],[.051,.047],[.054,.046],[.035,.036]],e);for(let o=0;o<4;o++){const a=-.025+o*.043;Be(r,[[.085,-.047,a],[.047,-.069,a],[-.018,-.059,a],[-.056,-.025,a],[-.039,.022,a]],[[.019,.02],[.024,.023],[.022,.021],[.018,.019],[.009,.01]],e,20)}Be(r,[[.075,-.018,.102],[.068,.037,.071],[.027,.049,.002],[-.011,.039,-.022]],[[.025,.025],[.027,.026],[.023,.024],[.009,.012]],n,20),Be(r,[[.08,-.042,.119],[.098,-.067,.185],[.155,-.124,.302],[.26,-.224,.48]],[[.034,.038],[.051,.049],[.068,.063],[.083,.073]],e),Be(r,[[.101,-.07,.193],[.111,-.081,.213],[.12,-.09,.233]],[[.055,.052],[.055,.052],[.054,.051]],n,6),jn(r,[new P(.116,-.018,.225),new P(.169,-.06,.324),new P(.248,-.141,.447)],.0022,s,15)}else{Be(r,[[.052,-.062,.128],[.075,-.11,.145],[.079,-.178,.166],[.064,-.218,.183]],[[.018,.025],[.048,.055],[.05,.057],[.033,.036]],e);for(let a=0;a<3;a++){const c=-.12-a*.038;Be(r,[[.084,c,.11],[.06,c,.024],[-.001,c,.008],[-.053,c,.037],[-.046,c,.095]],[[.018,.02],[.021,.023],[.022,.023],[.019,.022],[.009,.013]],e,20)}Be(r,[[.074,-.081,.094],[.06,-.082,.012],[.028,-.084,-.058],[-.006,-.089,-.044]],[[.02,.02],[.021,.021],[.019,.019],[.009,.011]],e,20),Be(r,[[.051,-.151,.183],[-.012,-.107,.174],[-.055,-.071,.13],[-.047,-.069,.075]],[[.022,.025],[.026,.027],[.024,.025],[.01,.012]],n,20),Be(r,[[.065,-.184,.16],[.077,-.214,.233],[.144,-.256,.355],[.261,-.335,.53]],[[.032,.033],[.05,.049],[.067,.061],[.082,.075]],e),Be(r,[[.078,-.215,.238],[.09,-.224,.26],[.101,-.231,.281]],[[.054,.053],[.055,.053],[.053,.051]],n,6),jn(r,[new P(.097,-.18,.273),new P(.145,-.207,.362),new P(.229,-.263,.49)],.0022,s,15);const o=new fe;o.position.set(0,-.006,-.51),r.add(o),Be(o,[[-.051,-.029,-.03],[-.071,-.048,.03],[-.073,-.052,.1],[-.069,-.057,.145]],[[.012,.02],[.048,.045],[.049,.047],[.03,.035]],e);for(let a=0;a<4;a++){const c=-.025+a*.042;Be(o,[[-.079,-.045,c],[-.043,-.069,c],[.018,-.055,c],[.056,-.022,c],[.036,.024,c]],[[.018,.02],[.022,.022],[.021,.02],[.017,.018],[.008,.01]],e,18)}Be(o,[[-.066,-.026,.1],[-.067,.027,.061],[-.03,.049,-.001],[.003,.039,-.02]],[[.023,.025],[.026,.025],[.021,.022],[.008,.01]],n,18),Be(o,[[-.068,-.047,.105],[-.096,-.081,.181],[-.178,-.158,.309],[-.297,-.291,.476]],[[.032,.034],[.047,.046],[.061,.057],[.073,.067]],e),Be(o,[[-.097,-.083,.185],[-.11,-.096,.207],[-.123,-.108,.23]],[[.05,.049],[.052,.05],[.05,.048]],n,6),jn(o,[new P(-.125,-.065,.23),new P(-.192,-.125,.343),new P(-.26,-.196,.44)],.0022,s,15)}}class Jg{context=null;master=null;ocean=null;wind=null;engine=null;engineOsc=null;engineOvertone=null;lowpass=null;drone=null;buffers=[];sources=[];muted=!1;depth=0;lastThreat=0;lastPulse=0;async start(){if(this.context){this.context.state==="suspended"&&await this.context.resume();return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const e=this.context=new t;this.master=e.createGain(),this.master.gain.value=this.muted?0:.6,this.master.connect(e.destination),this.lowpass=e.createBiquadFilter(),this.lowpass.type="lowpass",this.lowpass.frequency.value=12e3,this.lowpass.Q.value=.35,this.lowpass.connect(this.master),this.buffers=[this.noiseBuffer(8),this.noiseBuffer(5)],this.ocean=this.noiseLoop(this.buffers[0],320,.21,"lowpass"),this.wind=this.noiseLoop(this.buffers[1],700,.055,"highpass"),this.engine=e.createGain(),this.engine.gain.value=.014,this.engine.connect(this.lowpass),this.engineOsc=this.oscillator("triangle",36,this.engine),this.engineOvertone=this.oscillator("sine",74,this.engine),this.drone=e.createGain(),this.drone.gain.value=0,this.drone.connect(this.lowpass),this.oscillator("sine",49,this.drone),this.oscillator("sine",51.6,this.drone),await e.resume()}noiseBuffer(t){const e=this.context,n=e.createBuffer(1,e.sampleRate*t,e.sampleRate),s=n.getChannelData(0);let r=0;for(let o=0;o<s.length;o++){const a=Math.random()*2-1;r=(r+.02*a)/1.02,s[o]=r*3.5+a*.22}return n}noiseLoop(t,e,n,s){const r=this.context,o=r.createBufferSource(),a=r.createBiquadFilter(),c=r.createGain();return o.buffer=t,o.loop=!0,a.type=s,a.frequency.value=e,a.Q.value=.3,c.gain.value=n,o.connect(a),a.connect(c),c.connect(this.lowpass),o.start(),this.sources.push(o),c}oscillator(t,e,n){const s=this.context.createOscillator();return s.type=t,s.frequency.value=e,s.connect(n),s.start(),this.sources.push(s),s}update(t,e,n){this.depth=e,this.lastThreat=n;const s=this.context;if(!s||!this.lowpass||!this.master||!this.ocean||!this.wind||!this.engine||!this.drone)return;const r=s.currentTime,o=Math.min(1,e/3),a=Math.min(1,Math.abs(t)/12);this.lowpass.frequency.setTargetAtTime(12e3*(1-o)+720*o,r,.22),this.ocean.gain.setTargetAtTime((.19+.025*Math.sin(r*.36))*(1-.62*o),r,.15),this.wind.gain.setTargetAtTime((.028+a*.032)*(1-.94*o),r,.3),this.engine.gain.setTargetAtTime((.008+a*.035)*(1-.88*o),r,.3),this.engineOsc?.frequency.setTargetAtTime(30+a*46,r,.3),this.engineOvertone?.frequency.setTargetAtTime(61+a*95,r,.3),this.drone.gain.setTargetAtTime(o*(.016+Math.min(1,n)*.015),r,.7),o>.7&&n>.55&&r-this.lastPulse>2.3-Kg(n)&&(this.lastPulse=r,this.tone(48,34,.21,.044),this.tone(41,30,.14,.028,.22))}play(t){if(this.context)switch(t){case"chop":this.burst(.16,950,.22,180),this.tone(160,73,.13,.075);break;case"timber":this.burst(1.8,700,.18,110),this.burst(.6,170,.3,60,1.2);break;case"repair":this.tone(260,100,.08,.08),this.burst(.12,1700,.1,400);break;case"cagebreak":this.burst(1.5,1700,.35,90),this.tone(730,85,.8,.11),this.tone(213,36,1.1,.12,.1);break;case"splash":this.burst(.65,500,.2,1800);break;case"breach":this.burst(1.6,350,.39,4300),this.tone(76,29,.62,.13);break;case"shot":this.burst(.14,2100,.25,430),this.tone(210,55,.17,.16),this.burst(.55,150,.07,580,.12);break;case"knife":this.burst(.2,620,.15,2300);break;case"hit":this.burst(.25,380,.23,160),this.tone(109,38,.2,.095);break;case"impact":this.burst(.8,480,.28,130),this.tone(88,30,.52,.19),this.tone(440,80,.29,.055,.03);break;case"enter":this.burst(.8,1600,.19,90),this.tone(118,42,.6,.06);break;case"engine":this.tone(35,72,.8,.1);break;case"win":for(let e=0;e<4;e++){const n=[196,246.94,293.66,392];this.tone(n[e],n[e],1.8,.055,e*.22)}break}}burst(t,e,n,s,r=0){const o=this.context,a=o.createBufferSource(),c=o.createBiquadFilter(),l=o.createGain(),h=o.currentTime+r;a.buffer=this.buffers[0],a.playbackRate.value=.8+Math.random()*.45,c.type="bandpass",c.Q.value=.55,c.frequency.setValueAtTime(e,h),c.frequency.exponentialRampToValueAtTime(Math.max(20,s),h+t),l.gain.setValueAtTime(1e-4,h),l.gain.exponentialRampToValueAtTime(n,h+.014),l.gain.exponentialRampToValueAtTime(1e-4,h+t),a.connect(c),c.connect(l),l.connect(this.lowpass),a.start(h,Math.random()*2),a.stop(h+t+.05),a.onended=()=>{a.disconnect(),c.disconnect(),l.disconnect()}}tone(t,e,n,s,r=0){const o=this.context,a=o.createOscillator(),c=o.createGain(),l=o.currentTime+r;a.type="sine",a.frequency.setValueAtTime(t,l),a.frequency.exponentialRampToValueAtTime(e,l+n),c.gain.setValueAtTime(1e-4,l),c.gain.exponentialRampToValueAtTime(s,l+.018),c.gain.exponentialRampToValueAtTime(1e-4,l+n),a.connect(c),c.connect(this.lowpass),a.start(l),a.stop(l+n+.04),a.onended=()=>{a.disconnect(),c.disconnect()}}setMuted(t){this.muted=t,this.context&&this.master&&this.master.gain.setTargetAtTime(t?0:.6,this.context.currentTime,.1)}dispose(){for(const t of this.sources){try{t.stop()}catch{}t.disconnect()}this.sources=[],this.context?.close(),this.context=null}}const Kg=i=>Math.max(0,Math.min(1,i)),en=(i,t,e)=>new P(i,t,e),qs=i=>{let t=i;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)};function Do(i,t,e,n,s){const r=new St(new we(n*.7,n,t.distanceTo(e),8),s);return r.position.copy(t).add(e).multiplyScalar(.5),r.quaternion.setFromUnitVectors(en(0,1,0),e.clone().sub(t).normalize()),i.add(r),r}function jg(){const i=document.createElement("canvas");i.width=256,i.height=512;const t=i.getContext("2d"),e=qs(913);t.fillStyle="#60574a",t.fillRect(0,0,256,512);for(let s=0;s<2400;s++)t.fillStyle=e()>.45?"rgba(30,24,18,.32)":"rgba(169,160,130,.24)",t.fillRect(e()*256,e()*512,.5+e()*3,4+e()*80);const n=new fs(i);return n.colorSpace=Ue,n.wrapS=n.wrapT=ss,n}function Qg(){const i=document.createElement("canvas");i.width=512,i.height=256;const t=i.getContext("2d"),e=qs(125);t.clearRect(0,0,512,256);for(let s=0;s<19;s++){const r=25+s*24,o=70*Math.sin(r/512*Math.PI)+12;for(const a of[-1,1]){const c=r+45,l=128+a*o;t.strokeStyle="#5d6140",t.lineWidth=2,t.beginPath(),t.moveTo(r,128),t.lineTo(c,l),t.stroke();for(let h=0;h<22;h++){const u=h/22,f=r+(c-r)*u,d=128+(l-128)*u;for(let g=0;g<5;g++)t.strokeStyle=`rgb(${48+e()*39},${75+e()*47},${39+e()*29})`,t.lineWidth=1.2+e()*1.3,t.beginPath(),t.moveTo(f,d),t.lineTo(f+8+e()*13,d+(e()-.5)*36),t.stroke()}}}const n=new fs(i);return n.colorSpace=Ue,n}function t_(){const i=document.createElement("canvas");i.width=i.height=512;const t=i.getContext("2d"),e=qs(762);t.fillStyle="#a79e88",t.fillRect(0,0,512,512);for(let s=0;s<55e3;s++){const r=90+e()*110;t.fillStyle=`rgba(${r},${r*.96},${r*.81},.45)`,t.fillRect(e()*512,e()*512,.6+e()*2,.6+e()*2)}for(let s=0;s<1e3;s++)t.fillStyle="rgba(77,72,54,.32)",t.beginPath(),t.ellipse(e()*512,e()*512,1+e()*3,.5+e()*1.6,e()*3,0,Math.PI*2),t.fill();const n=new fs(i);return n.colorSpace=Ue,n.wrapS=n.wrapT=ss,n.repeat.set(22,22),n}function _l(i,t=[]){i.updateMatrixWorld(!0);const e=i.matrixWorld.clone().invert(),n=new Map;i.traverse(s=>{if(!(s instanceof St)||t.includes(s))return;const r=s.material,o=n.get(r)||{gs:[],meshes:[]},a=s.geometry.index?s.geometry.toNonIndexed():s.geometry.clone();a.applyMatrix4(e.clone().multiply(s.matrixWorld)),a.deleteAttribute("uv1"),o.gs.push(a),o.meshes.push(s),n.set(r,o)});for(const[s,r]of n){r.gs.every(l=>!!l.getAttribute("uv"))||r.gs.forEach(l=>l.deleteAttribute("uv"));const a=ls(r.gs);if(!a)continue;r.meshes.forEach(l=>l.removeFromParent()),r.gs.forEach(l=>l.dispose());const c=new St(a,s);c.receiveShadow=!0,c.castShadow=!0,i.add(c)}}class e_{trees=[];flags=[];chips;chipAge=10;chipOrigin=new P;axe;constructor(t){const e=jg();e.repeat.set(2,5);const n=new re({map:e,bumpMap:e,bumpScale:.035,roughness:.93}),s=new re({color:9007959,map:e,roughness:.89}),r=new re({map:Qg(),alphaTest:.32,side:ve,roughness:1,color:14015942}),o=t_(),a=new re({vertexColors:!0,map:o,bumpMap:o,bumpScale:.13,roughness:1}),c=new re({color:6580832,roughness:.98,flatShading:!1});for(const h of nn){const u=new Ne(h.radius*2.45,h.radius*2.45,80,80);u.rotateX(-Math.PI/2);const f=u.getAttribute("position"),d=[];for(let x=0;x<f.count;x++){const C=f.getX(x),U=f.getZ(x),z=Math.hypot(C,U)/h.radius,Y=1+.025*Math.sin(Math.atan2(U,C)*9+h.id),G=z<.82?Jn(h,C+h.x,U+h.z):Fe.lerp(Jn(h,C+h.x,U+h.z),-8,Fe.smoothstep(z,.82,Y+.12))-30*Fe.smoothstep(z,Y+.08,1.22);f.setY(x,G);const X=Math.sin(C*9+U*17)*Math.cos(U*8-C*13)*.018,F=Math.max(0,1-z/.77);d.push(.52+X-F*.19,.49+X-F*.115,.37+X-F*.14)}u.setAttribute("color",new Nt(d,3)),u.computeVertexNormals();const g=new St(u,a);g.position.set(h.x,0,h.z),g.receiveShadow=!0,t.add(g);const M=qs(74+h.id),m=new Ur(new Za(1,1),c,30),p=new Se;for(let x=0;x<30;x++){const C=M()*Math.PI*2,U=h.radius*(.3+M()*.67),z=h.x+Math.sin(C)*U,Y=h.z+Math.cos(C)*U;p.position.set(z,Jn(h,z,Y)-.1,Y),p.scale.set(.35+M()*1.4,.2+M()*.6,.4+M()),p.rotation.set(M(),M()*6,M()),p.updateMatrix(),m.setMatrixAt(x,p.matrix)}t.add(m);const v=new fe;t.add(v);const y=Math.abs(h.dockX-h.landingX),_=(h.dockX+h.landingX)/2;for(let x=0;x<Math.ceil(y/.43);x++){const C=new St(new dn(.4,.16,2.35),s);C.position.set(h.landingX+h.side*x*.43,1.65,h.z),C.receiveShadow=!0,v.add(C)}for(const x of[-1,1])for(let C=0;C<4;C++){const U=h.landingX+h.side*C*y/3;Do(v,en(U,-2,h.z+x*1.1),en(U,2.35,h.z+x*1.1),.13,n)}Do(v,en(_,0,h.z+2),en(_,6,h.z+2),.055,n);const w=new St(new Ne(1.8,.8,10,3),new re({color:12954224,side:ve,roughness:1}));w.position.set(_+.9,5.5,h.z+2),v.add(w),this.flags.push(w);const A=document.createElement("canvas");A.width=512,A.height=256;const T=A.getContext("2d");T.fillStyle="#263e38",T.fillRect(0,0,512,256),T.fillStyle="#dfd2ac",T.textAlign="center",T.font="36px Microsoft YaHei",T.fillText(h.name,256,77),T.font="25px Microsoft YaHei",T.fillText("木材 · 工具 · 避风锚地",256,139),T.fillText("B 靠岸 / 登船",256,196);const D=new St(new dn(2.7,1.35,.08),new re({map:new fs(A),roughness:.9}));D.position.set(h.landingX,3.4,h.z+2),D.rotation.y=h.side*Math.PI/2,v.add(D);const S=new St(new dn(1.5,.14,.6),s);S.position.set(h.landingX,Jn(h,h.landingX,h.z)+.75,h.z+1.8),v.add(S);for(let x=0;x<2;x++){const C=vl();C.scale.setScalar(.9),C.rotation.z=Math.PI/2,C.position.copy(S.position).add(en(0,.18,(x-.5)*.25)),v.add(C)}_l(v,[w])}for(const h of wa){const u=nn[h.islandId],f=qs(h.id*271+123),d=6.8+f()*3,g=new fe;g.position.set(h.x,Jn(u,h.x,h.z),h.z),t.add(g);const M=new si([en(0,0,0),en(.05,d*.35,.03),en(.15,d*.75,.1),en(.28,d,.15)]),m=new St(new $s(M,16,.22,9,!1),n);g.add(m),m.castShadow=!0;const p=[];for(let w=0;w<8;w++)for(let A=0;A<9;A++){const T=A/9*Math.PI*2+w*.83,D=2.6*(1-w/9),S=d*.32+w*d*.083;Do(g,en(0,S,0),en(Math.sin(T)*D,S-.28,Math.cos(T)*D),.025,n);const x=new Ne(D*1.9,1.4,1,1),C=new Se;C.position.set(Math.sin(T)*D*.55,S+.13,Math.cos(T)*D*.55),C.rotation.set(-.2,T,Math.sin(T)*.18),C.updateMatrix(),x.applyMatrix4(C.matrix),p.push(x)}const v=ls(p);p.forEach(w=>w.dispose());const y=new St(v,r);g.add(y),_l(g,[y]);const _=new St(new we(.215,.29,.38,12),n);_.position.copy(g.position).add(en(0,.18,0)),t.add(_),this.trees.push({root:g,foliage:y,stump:_,id:h.id})}this.axe=vl();const l=new oe;l.setAttribute("position",new Ce(new Float32Array(84),3)),this.chips=new kr(l,new qa({color:13482123,size:.045,transparent:!0,opacity:.8})),this.chips.visible=!1,t.add(this.chips)}strike(t,e,n){this.chipOrigin.set(t,Jn(nn[n],t,e)+1.1,e),this.chipAge=0}update(t,e){for(const s of this.flags){const r=s.geometry.getAttribute("position");for(let o=0;o<r.count;o++)r.setZ(o,Math.sin(r.getX(o)*3+t.time*3)*.1*(r.getX(o)+.9));r.needsUpdate=!0}for(const s of this.trees){const r=t.trees[s.id];s.root.visible=!r.collected;const o=r.felledAt<0?0:Math.min(1,(t.time-r.felledAt)/2);s.root.rotation.z=o*o*1.48*(s.id%2?1:-1),s.foliage.rotation.z=Math.sin(t.time*.65+s.id)*.011,s.root.position.y=Jn(nn[r.islandId],r.x,r.z)-o*.08}this.chipAge+=e,this.chips.visible=this.chipAge<.85;const n=this.chips.geometry.getAttribute("position");for(let s=0;s<n.count;s++){const r=s*2.399,o=this.chipAge;n.setXYZ(s,this.chipOrigin.x+Math.sin(r)*o*2,this.chipOrigin.y+o*(1+s%3)-o*o*5,this.chipOrigin.z+Math.cos(r)*o*2)}n.needsUpdate=!0}}function vl(){const i=new fe,t=new re({color:8151363,roughness:.85}),e=new re({color:8687760,metalness:.85,roughness:.33}),n=new St(new as(.035,.66,5,10),t);n.rotation.x=-.5,n.position.set(0,-.07,-.04),i.add(n);const s=new Ai;s.moveTo(-.035,-.055),s.lineTo(.26,-.13),s.quadraticCurveTo(.31,.015,.27,.14),s.lineTo(-.035,.07),s.closePath();const r=new St(new Xr(s,{depth:.043,bevelEnabled:!0,bevelSize:.015,bevelThickness:.012,bevelSegments:2,steps:1}),e);r.position.set(-.05,.25,-.21),i.add(r);const o=new St(new as(.055,.15,4,9),new re({color:1584172,roughness:.85}));return o.position.set(.025,-.2,.06),o.rotation.x=-.5,i.add(o),i}class n_{cracks;patches;hull={value:0};cage={value:0};oar;constructor(t,e){this.cracks=new fe,this.patches=new fe,t.add(this.cracks,this.patches);const n=new re({color:1844517,roughness:1,side:ve}),s=new re({color:9073489,roughness:.95});for(let c=0;c<10;c++){const l=c%2?1:-1,h=-3.4+Math.floor(c/2)*1.35,u=new Ai;u.moveTo(0,-.25),u.lineTo(.035,.08),u.lineTo(.14,.12),u.lineTo(.06,.38),u.lineTo(.1,.55),u.lineTo(0,.26),u.lineTo(-.1,.2),u.lineTo(-.03,-.06),u.closePath();const f=new St(new Ws(u),n);f.rotation.y=l*Math.PI/2,f.position.set(l*1.7,.1,h),this.cracks.add(f);const d=new St(new dn(.045,.2,.9),s);d.position.set(l*1.76,.38,h),d.rotation.x=c%2*.09,this.patches.add(d)}const r=new Map;e.traverse(c=>{if(!(c instanceof St))return;const l=c.material;if(!r.has(l)){const h=l.clone();h.onBeforeCompile=u=>{u.uniforms.uBroken=this.cage,u.vertexShader=`uniform float uBroken;
`+u.vertexShader,u.vertexShader=u.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      float bend=max(0.0,1.0-abs(position.y)/1.45);transformed.x+=sign(position.x)*uBroken*bend*(.25+smoothstep(.5,1.0,abs(position.z))*.95);
      transformed.y-=uBroken*bend*.14;`)},r.set(l,h)}c.material=r.get(l)}),this.oar=new fe,this.oar.position.set(-1.9,1,-1.7),t.add(this.oar);const o=new St(new we(.034,.045,3.7,10),s);o.rotation.z=.9,this.oar.add(o);const a=new St(new dn(.22,.7,.055),s);a.position.set(-1.3,-1.15,0),a.rotation.z=.9,this.oar.add(a)}update(t,e,n,s,r,o){this.hull.value=1-t/100,this.cage.value=Math.min(1,(1-e/100)*.45+s*.75),this.cracks.children.forEach((a,c)=>a.visible=c<this.hull.value*10),this.patches.children.forEach((a,c)=>a.visible=c<Math.min(n,10)&&c>=this.hull.value*10),this.oar.visible=t<=0,this.oar.rotation.y=Math.sin(r*2.5)*.6,this.oar.rotation.x=Math.sin(r*2.5+1)*.2}}const i_=document.querySelector("#app");i_.innerHTML=`
  <main id="experience" aria-label="Shark Sea Survival 三维游戏">
    <div id="viewport"></div><div id="vignette"></div><div id="waterline"></div><div id="damage"></div>
    <header id="brand"><span class="brand-mark">〰</span><span>PELAGIC<span class="brand-sub">EXPEDITION 05</span></span></header>
    <div id="utility"><button id="sound" title="切换声音" aria-label="切换声音">声音 开</button><button id="help" title="操作指南" aria-label="操作指南">?</button><button id="pause" title="暂停" aria-label="暂停">Ⅱ</button></div>
    <section id="hud" hidden>
      <div id="objective"><span class="eyebrow">NORTH CAPE · 北岬灯塔</span><div>穿越白鲨海峡 <span id="distance">1.80 km</span></div><div class="route-track"><i id="route-fill"></i></div></div>
      <div id="compass"><div class="compass-ticks">W <span>· · · ·</span> N <span>· · · ·</span> E</div><div id="bearing">◆</div><small id="bearing-label">目标正前方</small></div>
      <div id="integrity"><div><span>船体</span><i><b id="hull-bar"></b></i><em id="hull-value">100</em></div><div id="cage-integrity"><span>笼架</span><i><b id="cage-bar"></b></i><em id="cage-value">100</em></div></div>
      <div id="encounter"><i></i><span id="encounter-label">附近水域平静</span></div>
      <div id="crosshair"><i></i><i></i><i></i><i></i><b></b></div><div id="hit-marker">×</div>
      <div id="toast" role="status" aria-live="polite"></div>
      <div id="bottom-left"><div id="mode-label" class="eyebrow">HELM / 驾驶位</div><div id="readout"><strong id="primary-number">0.0</strong><span id="primary-unit">节</span><small id="secondary-number">油门 0%</small></div><div id="depth-track"><i></i></div></div>
      <div id="bottom-center"><button id="interact"><kbd>E</kbd><span>离开驾驶位</span></button><button id="dock"><kbd>B</kbd><span>寻找小岛</span></button><div id="controls-hint"></div></div>
      <div id="supplies">木材 <b id="wood-count">0</b><span id="island-guide"></span></div>
      <div id="weapon-status"><span class="eyebrow" id="weapon-name">01 / 压缩气动鱼枪</span><div id="ammo">5 <span>/ ∞</span></div><small id="weapon-hint">R 装填 · 2 潜水刀</small></div>
      <div id="voyage"><span id="voyage-time">00:00</span><i></i><span id="voyage-zone">沿岸浅海</span></div>
    </section>
    <section id="intro" class="screen">
      <div class="intro-content"><span class="eyebrow intro-kicker"><i></i> SOUTHERN OCEAN / 34° S</span><h1>SHARK SEA<br/><span>SURVIVAL</span></h1><div class="intro-title">白 鲨 海 峡</div><p class="intro-description">一艘捕捞船。一段无人护航的航程。<br/>海面之下，是它们的领地。</p><div class="intro-rule"></div><p class="intro-mission">驾驶「晨潮号」抵达北岬灯塔。<br/>靠岛伐木修船，放下铁笼，潜入它们的领地。</p><button id="start" class="primary">启航 <span>→</span></button><div class="intro-meta">约 5–10 分钟探索 <span>·</span> 自由下潜 <span>·</span> 建议佩戴耳机</div></div>
      <div class="intro-side"><span>OPEN WATER</span><i></i><span>01 — 05</span></div><div class="intro-bottom"><span>一段可亲自经历的海洋冒险</span><span>WASD 驾驶 / 移动 <i>·</i> 鼠标环顾</span></div>
    </section>
    <section id="modal" class="screen" hidden><div class="modal-card"><span id="modal-eyebrow" class="eyebrow">EXPEDITION PAUSED</span><h2 id="modal-title">海峡会等你</h2><p id="modal-copy"></p><div id="modal-stats"></div><div id="guide"></div><button id="resume" class="primary">继续航程 <span>→</span></button><button id="restart" class="secondary">重新启航</button></div></section>
    <div id="loading">正在准备海域…</div>
  </main>`;const ht=i=>document.getElementById(i),I=new Dg,Pe=new Jg,Pn=new ql,me=new Cg({antialias:!0,alpha:!1,powerPreference:"high-performance"});me.setPixelRatio(Math.min(window.devicePixelRatio,1.35));me.setSize(window.innerWidth,window.innerHeight);me.outputColorSpace=Ue;me.toneMapping=Tl;me.toneMappingExposure=1.05;me.shadowMap.enabled=!0;me.shadowMap.type=El;ht("viewport").appendChild(me.domElement);me.domElement.setAttribute("aria-label","海洋游戏画面");me.domElement.tabIndex=0;const ie=new ln(64,window.innerWidth/window.innerHeight,.08,12e3);Pn.add(ie);const Ki=new Og(Pn,me),Ee=Yg();Pn.add(Ee.root,Ee.cage);ie.add(Ee.weapon,Ee.knife);const Qn=new e_(Pn);ie.add(Qn.axe);Qn.axe.visible=!1;const s_=new n_(Ee.root,Ee.cage),On=new P,vi=new P,zn=new P,Sn=new P,Ss=new P,cn=new P;let ti=0,Vn=0,xl=0,Aa=I.mode,Ra=I.phase,bn=0,gn=0,He=0,Re=.2,Ls=!1,Js=!1,Ca=0,Pa=0,bs=!1,Vr=!1,Ei=999,Lo=0,Io=0,Cr=0,ph=60,Is=!1;const _e=new Set,ts=[],mh=new we(.012,.016,1.7,5);mh.rotateX(Math.PI/2);const r_=new re({color:11584706,metalness:.9,roughness:.3});function o_(i){if(i.type==="splash"&&(Ki.splash(i.position,i.amount??1),Pe.play("splash")),i.type==="breach"&&(I.stats.breaches++,Pe.play("breach"),I.notify("破水！大白鲨正在船旁跃出海面。",4),ti=.35),i.type==="threat"&&I.phase==="playing"&&(Vn=1,I.notify(i.message??"白鲨正在加速接近。",3)),i.type==="impact"){const t=I.mode;I.damage(i.amount??8,i.target??"boat"),t==="cage"&&I.mode==="dragged"&&(Je.beginDrag(vi),Pe.play("cagebreak")),Pe.play("impact"),ti=.8}(i.type==="hit"||i.type==="kill")&&Pe.play("hit")}const Je=new Gg(Pn,o_);function gh(){I.start(),Je.reset(),Ki.reset(),_e.clear(),He=0,Re=.2,Ls=!1,Aa="helm",Ra="playing",Vr=!1,Vn=0,ti=0,bn=1,Is=!1;for(const i of ts)Pn.remove(i.mesh);ts.length=0,ht("intro").hidden=!0,ht("modal").hidden=!0,ht("hud").hidden=!1,ht("resume").innerHTML="继续航程 <span>→</span>",Pe.start(),me.domElement.focus({preventScroll:!0}),Ci()}function _h(){const i=I.mode;I.interact(),I.mode!==i&&(bn=1,Pe.play("enter"),I.mode==="cage"?(He=I.heading+Math.PI/2,Re=-.04):I.mode==="deck"?(He=I.heading+(i==="cage"?-.3:2.15),Re=-.12):(He=0,Re=.2)),Ci()}function vh(){if(I.mode==="shore"){const e=I.nearbyTree,n=e?.hits??0;I.chop()&&(gn=1,Pe.play("knife"),e&&e.hits>n&&(Qn.strike(e.x,e.z,e.islandId),Pe.play("chop"),e.hits===3&&Pe.play("timber"))),Ci();return}if(!I.fire())return;gn=1,ie.getWorldDirection(Sn);const i=ie.position.clone(),t=Je.attack(i,Sn.clone(),I.weapon);if(Pe.play(I.weapon==="speargun"?"shot":"knife"),t.hit?(I.registerHit(t.killed),Vn=Math.min(Vn,.3)):I.weapon==="knife"&&I.notify("刀刃挥空 · 等它接近笼边再出手",1.2),I.weapon==="speargun"){const e=new St(mh,r_);e.position.copy(i).addScaledVector(Sn,1.1),e.quaternion.setFromUnitVectors(new P(0,0,1),Sn),Pn.add(e),ts.push({mesh:e,velocity:Sn.clone().multiplyScalar(55),life:Math.min(1.1,t.hit?t.distance/55:.95)})}Ci()}function xh(){const i=I.mode;if(I.dock(),I.mode==="shore"&&i!=="shore"){const t=nn[I.islandId];He=Math.atan2(t.x-I.shoreX,t.z-I.shoreZ),Re=-.08,bn=1,Is=!0,Pe.play("enter")}else i==="shore"&&I.mode==="deck"?(He=I.heading,Re=-.08,bn=1,Is=I.hull<75):I.dockDistance>19&&(Is=!0);Ci()}const a_='<div class="guide-grid"><div><b>驾驶 / 航行</b><p><kbd>W</kbd> 加油门 <kbd>S</kbd> 减油门 / 倒车<br/><kbd>A</kbd> <kbd>D</kbd> 转向 <kbd>空格</kbd> 停船<br/><kbd>E</kbd> 停稳后离开驾驶位<br/><kbd>V</kbd> 驾驶视角切换</p></div><div><b>甲板 / 潜水笼</b><p><kbd>WASD</kbd> 行走，靠近潜笼 / 舵台按 <kbd>E</kbd><br/>甲板按住 <kbd>R</kbd> 消耗木材修船 / 修笼<br/>笼中 <kbd>W</kbd> 下潜 <kbd>S</kbd> 上浮<br/>海面按 <kbd>E</kbd> 返回甲板，无氧气限制</p></div><div><b>观察 / 防御</b><p>按住鼠标右键拖动 / 方向键环顾<br/><kbd>1</kbd> 鱼枪 <kbd>2</kbd> 潜水刀<br/><kbd>左键</kbd> 或 <kbd>F</kbd> 攻击 <kbd>R</kbd> 装填<br/>白鲨蓄势后扑咬；笼破会被拖入深海</p></div><div><b>小岛 / 伐木修船</b><p>靠近挂旗码头，停船按 <kbd>B</kbd> 上岸<br/>工具架 <kbd>E</kbd> 拿斧，<kbd>F / 左键</kbd> 砍三次<br/>倒木 <kbd>E</kbd> 收集，码头按住 <kbd>R</kbd> 修复<br/>回码头 <kbd>B</kbd> 登船；破船仍可应急划桨</p></div></div>';function Da(i=!1){ht("modal").hidden=!1,ht("intro").hidden=!0;const t=I.phase==="won",e=I.phase==="lost";ht("modal-eyebrow").textContent=t?"NORTH CAPE · SAFE ARRIVAL":e?"EXPEDITION LOST":i?"FIELD GUIDE / 航行手册":"EXPEDITION PAUSED",ht("modal-title").textContent=t?"你穿过了它们的海。":e?"海峡留下了这次航程。":i?"深入它们的世界":"海峡会等你",ht("modal-copy").textContent=t?"北岬灯塔就在眼前。引擎终于可以慢下来，而那些庞大的身影仍在深蓝中巡游。":e?I.reason:i?"航向灯塔，或随时抛锚下潜。保持警觉，也给这些大型动物留出空间。":"引擎、海浪与深处的影子，暂时停在这一刻。",ht("guide").innerHTML=i?a_:"",ht("modal-stats").innerHTML=t||e?`<div><b>${Mh(I.elapsed)}</b><span>航程时间</span></div><div><b>${Math.round(I.stats.maxDepth)} <small>m</small></b><span>最深下潜</span></div><div><b>${I.stats.hits}</b><span>有效命中</span></div><div><b>${I.stats.breaches}</b><span>跃水目击</span></div>`:"",ht("resume").hidden=t||e,ht("restart").textContent=t||e?"再次启航":"重新启航",t||e?ht("restart").classList.add("primary"):ht("restart").classList.remove("primary"),document.pointerLockElement&&document.exitPointerLock(),_e.clear(),Js=!1}function hs(i=!1){if(I.phase==="ready"){Vr=!0,I.phase="paused",Da(!0),ht("resume").textContent="返回主菜单";return}I.phase==="playing"&&I.pause(),I.phase==="paused"&&Da(i)}function Qa(){if(I.phase==="paused"){if(ht("modal").hidden=!0,_e.clear(),Vr){I.phase="ready",Vr=!1,ht("intro").hidden=!1,ht("hud").hidden=!0,ht("resume").innerHTML="继续航程 <span>→</span>";return}I.phase="playing",ht("hud").hidden=!1,me.domElement.focus({preventScroll:!0}),Pe.start()}}ht("start").addEventListener("click",gh);ht("restart").addEventListener("click",gh);ht("resume").addEventListener("click",Qa);ht("interact").addEventListener("click",()=>{_h(),me.domElement.focus({preventScroll:!0})});ht("dock").addEventListener("click",()=>{xh(),me.domElement.focus({preventScroll:!0})});ht("pause").addEventListener("click",()=>I.phase==="paused"?Qa():hs());ht("help").addEventListener("click",()=>hs(!0));ht("sound").addEventListener("click",()=>{bs=!bs,Pe.setMuted(bs),ht("sound").textContent=bs?"声音 关":"声音 开",bs||Pe.start()});window.addEventListener("keydown",i=>{const t=i.key.toLowerCase();if([" ","arrowup","arrowdown","arrowleft","arrowright","tab"].includes(t)&&i.preventDefault(),i.repeat){_e.add(t);return}if(t==="escape"||t==="p"){I.phase==="playing"?hs():I.phase==="paused"&&Qa();return}if(t==="h"){hs(!0);return}_e.add(t),I.phase==="playing"&&(t==="e"&&_h(),t==="f"&&vh(),t==="1"&&(I.weapon="speargun"),t==="2"&&(I.weapon="knife"),t==="b"&&xh(),t==="r"&&I.mode==="cage"&&I.reloadWeapon(),t==="v"&&I.mode==="helm"&&(Ls=!Ls,He=0,Re=Ls?.02:.2,bn=.8))});window.addEventListener("keyup",i=>_e.delete(i.key.toLowerCase()));window.addEventListener("blur",()=>{_e.clear(),Js=!1,I.phase==="playing"&&!new URLSearchParams(location.search).has("qa")&&hs()});document.addEventListener("visibilitychange",()=>{document.hidden&&I.phase==="playing"&&hs()});me.domElement.addEventListener("contextmenu",i=>i.preventDefault());me.domElement.addEventListener("pointerdown",i=>{if(I.phase==="playing"){if(me.domElement.focus({preventScroll:!0}),i.button===0&&(I.mode==="cage"||I.mode==="shore")){vh();return}(i.button===2||i.button===0)&&(Js=!0,Ca=i.clientX,Pa=i.clientY,me.domElement.setPointerCapture(i.pointerId))}});me.domElement.addEventListener("pointerup",()=>Js=!1);me.domElement.addEventListener("pointermove",i=>{if(!Js||I.phase!=="playing")return;const t=i.clientX-Ca,e=i.clientY-Pa;Ca=i.clientX,Pa=i.clientY,He-=t*.004,Re=Math.max(-1.48,Math.min(1.48,Re-e*.003))});window.addEventListener("resize",()=>{ie.aspect=innerWidth/innerHeight,ie.updateProjectionMatrix(),me.setSize(innerWidth,innerHeight)});function Mh(i){return`${Math.floor(i/60).toString().padStart(2,"0")}:${Math.floor(i%60).toString().padStart(2,"0")}`}function Ci(){const i=I.mode==="cage",t=I.mode==="deck",e=I.mode==="shore",n=I.mode==="dragged";ht("hud").hidden=I.phase==="ready",ht("brand").classList.toggle("playing",I.phase!=="ready"),ht("distance").textContent=I.remaining>999?`${(I.remaining/1e3).toFixed(2)} km`:`${Math.round(I.remaining)} m`,ht("route-fill").style.width=`${I.progress*100}%`,ht("hull-bar").style.width=`${I.hull}%`,ht("cage-bar").style.width=`${I.cageHealth}%`,ht("hull-bar").classList.toggle("danger",I.hull<35),ht("cage-bar").classList.toggle("danger",I.cageHealth<35),ht("hull-value").textContent=Math.ceil(I.hull).toString(),ht("cage-value").textContent=Math.ceil(I.cageHealth).toString(),ht("cage-integrity").style.opacity=i||I.cageHealth<100?"1":".45",ht("wood-count").textContent=String(I.wood),ht("island-guide").textContent=e?`${nn[I.islandId].name} · ${I.hasAxe?"已持斧":"工具架 E 拿斧头"}`:`${I.nearestIsland.name} ${Math.round(I.dockDistance)} m`,ht("dock").hidden=i||n,ht("dock").querySelector("span").textContent=e?"返回码头 · 登船":I.dockDistance<19?"停船靠岸":"小岛导航",ht("mode-label").textContent=i?"DIVE CAGE / 潜水笼":t?"ON DECK / 甲板":"HELM / 驾驶位",ht("primary-number").textContent=i?I.depth.toFixed(1):t?"已抛锚":(Math.abs(I.speed)*1.94384).toFixed(1),ht("primary-unit").textContent=i?"m":t?"":"节",ht("secondary-number").textContent=i?"水下深度":t?"按住 R 维修":`油门 ${Math.round(I.throttle*100)}%`,ht("depth-track").style.display=i?"block":"none",ht("depth-track").firstElementChild.setAttribute("style",`width:${I.depth/uh*100}%`),ht("controls-hint").innerHTML=i?"<kbd>W</kbd> 下潜 <kbd>S</kbd> 上浮 <span>·</span> 右键拖动环顾 <span>·</span> 左键 / F 攻击":t?"<kbd>WASD</kbd> 甲板行走 <span>·</span> 右键环顾 <span>·</span> <kbd>R</kbd> 维修":"<kbd>W / S</kbd> 油门 <kbd>A / D</kbd> 转向 <span>·</span> 空格停船 <span>·</span> <kbd>V</kbd> 视角",e&&(ht("mode-label").textContent="ASHORE / 海岛",ht("primary-number").textContent=String(I.wood),ht("primary-unit").textContent="木材",ht("secondary-number").textContent=I.hasAxe?"已携带伐木斧":"E 领取斧头",ht("controls-hint").innerHTML="<kbd>WASD</kbd> 行走 · <kbd>F / 左键</kbd> 砍树 · <kbd>E</kbd> 收集 · 码头 <kbd>R</kbd> 修船"),t&&(ht("secondary-number").textContent=`R 修复 · 木材 ${I.wood}`),I.hull<=0&&!e&&(ht("mode-label").textContent="HULL BREACHED / 应急划桨",ht("secondary-number").textContent="靠岸伐木修船"),n&&(ht("mode-label").textContent="CAGE BREACHED / 笼架断裂",ht("primary-number").textContent=Math.max(0,-ie.position.y).toFixed(1),ht("primary-unit").textContent="m",ht("secondary-number").textContent="正在被拖入深海",ht("controls-hint").textContent=""),ht("interact").querySelector("span").textContent=I.interactLabel,ht("interact").classList.toggle("available",I.mode==="helm"||t&&(I.nearCage||I.nearHelm)||i&&I.depth<.12),ht("weapon-status").style.display=i?"block":"none",ht("crosshair").style.display=i||e?"block":"none",ht("weapon-name").textContent=I.weapon==="speargun"?"01 / 压缩气动鱼枪":"02 / 潜水刀",ht("ammo").innerHTML=I.weapon==="knife"?"近身 <span>4 m</span>":I.reload>0?`${I.reload.toFixed(1)} <span>装填</span>`:`${I.ammo} <span>/ ∞</span>`,ht("weapon-hint").textContent=I.weapon==="knife"?"1 鱼枪 · 左键 / F 挥刀":"R 装填 · 2 潜水刀",ht("toast").textContent=I.message,ht("toast").classList.toggle("show",I.messageTime>0),ht("voyage-time").textContent=Mh(I.elapsed),ht("voyage-zone").textContent=I.progress<.13?"沿岸浅海":I.progress<.62?"白鲨巡游区":I.progress<.9?"北部深水区":"北岬灯塔外海";const s=Is||I.hull<45,r=s?{x:I.nearestIsland.dockX,z:I.nearestIsland.z}:{x:0,z:1800};let o=Math.atan2(r.x-I.x,r.z-I.z)-I.heading;o=Math.atan2(Math.sin(o),Math.cos(o)),ht("bearing").style.transform=`translateX(${Math.max(-85,Math.min(85,-o*80))}px)`,ht("bearing-label").textContent=Math.abs(o)<.14?"灯塔正前方":Math.abs(o)>2.6?"灯塔在身后":o>0?"向左转 · 灯塔":"向右转 · 灯塔",s&&(ht("bearing-label").textContent=Math.abs(o)<.14?"小岛码头正前方":Math.abs(o)>2.6?"小岛码头在身后":o>0?"向左转 · 小岛码头":"向右转 · 小岛码头"),ht("interact").hidden=n,ht("encounter").classList.toggle("warning",Vn>.4);const a=Je.sharks.filter(l=>l.health>0).sort((l,h)=>{const u=f=>f.state==="rush"||f.state==="warning"?-1e3:0;return u(l)+l.position.distanceToSquared(ie.position)-u(h)-h.position.distanceToSquared(ie.position)})[0];let c="";if(a&&Ei<45){ie.getWorldDirection(Sn);const l=a.position.clone().sub(ie.position),h=Math.atan2(Math.sin(Math.atan2(l.x,l.z)-Math.atan2(Sn.x,Sn.z)),Math.cos(Math.atan2(l.x,l.z)-Math.atan2(Sn.x,Sn.z)));c=l.y<-5&&i?" · 下方":Math.abs(h)>2?" · 身后":h>.6?" · 左侧":h<-.6?" · 右侧":" · 前方"}ht("encounter-label").textContent=(Vn>.4?"正在快速接近":Ei<14?"附近有大白鲨":Ei<45?"远处有巡游的身影":"留意水面与船底")+c}function yh(i){const t=I.phase==="playing";if(t){_e.has("arrowleft")&&(He+=i*1.1),_e.has("arrowright")&&(He-=i*1.1),_e.has("arrowup")&&(Re=Math.min(1.48,Re+i*.8)),_e.has("arrowdown")&&(Re=Math.max(-1.48,Re-i*.8));const h=I.repairs;I.step(i,{forward:(_e.has("w")?1:0)-(_e.has("s")?1:0),turn:(_e.has("a")?1:0)-(_e.has("d")?1:0),brake:_e.has(" "),moveX:(_e.has("a")?1:0)-(_e.has("d")?1:0),moveZ:(_e.has("w")?1:0)-(_e.has("s")?1:0),lookYaw:He,dive:(_e.has("w")||_e.has("shift")?1:0)-(_e.has("s")||_e.has(" ")?1:0),repair:_e.has("r")}),I.repairs>h&&Pe.play("repair")}I.phase==="ready"&&(xl+=i);const e=I.phase==="ready"?xl:I.time,n=I.phase==="paused"||I.phase==="won"||I.phase==="lost"?0:i,s=Ki.heightAt(I.x,I.z,e);On.set(I.x,s*.62-(1-I.hull/100)*.25,I.z),Ee.root.position.copy(On);const r=Ki.heightAt(I.x+Math.sin(I.heading)*3,I.z+Math.cos(I.heading)*3,e),o=Ki.heightAt(I.x+Math.cos(I.heading)*1.5,I.z-Math.sin(I.heading)*1.5,e);Ee.root.rotation.set((r-s)*-.12,I.heading,(o-s)*.14-I.rudder*I.speed*.003+(1-I.hull/100)*.065,"YXZ"),Ee.root.updateMatrixWorld(!0),vi.set(3.5,1-I.depth,-2).applyMatrix4(Ee.root.matrixWorld),Ee.cage.position.copy(vi),Ee.cage.rotation.set(Math.sin(e*.45)*.007*I.depth/12,I.heading,Math.sin(e*.65)*.009),Ee.update(e,I.speed,I.rudder,I.depth),s_.update(I.hull,I.cageHealth,I.repairs,I.dragTime,e,I.speed),Qn.update(I,n),I.mode==="dragged"&&!Je.dragView&&(Je.beginDrag(vi),Pe.play("cagebreak")),(I.phase==="ready"||t)&&Je.update({time:e,dt:n,boatPosition:On,boatHeading:I.heading,speed:I.speed,cagePosition:vi,cageDepth:I.depth,inCage:I.mode==="cage",progress:I.progress,safeHarbor:I.mode==="shore"||I.dockDistance<25}),Ei=999;for(const h of Je.sharks)h.health>0&&(Ei=Math.min(Ei,h.position.distanceTo(I.mode==="cage"?vi:On)));const a=I.mode;if(a!==Aa&&(Aa=a,bn=1),I.phase==="ready"){const h=-.53+Math.sin(e*.055)*.13;cn.set(-Math.sin(h)*18,7,-Math.cos(h)*18).add(On),Ss.copy(On).add(new P(0,1.1,5))}else if(a==="dragged"&&Je.dragView)cn.copy(Je.dragView.position),Ss.copy(Je.dragView.target);else if(a==="helm"&&!Ls){const h=I.heading+He,u=Math.max(-.03,Math.min(1,Re)),f=17.5;cn.set(-Math.sin(h)*Math.cos(u)*f,4+Math.sin(u)*f,-Math.cos(h)*Math.cos(u)*f).add(On),Ss.set(I.x+Math.sin(I.heading)*5,On.y+1.5,I.z+Math.cos(I.heading)*5)}else{let h=He;a==="helm"?(cn.set(0,2.45,.8).applyMatrix4(Ee.root.matrixWorld),h=I.heading+He):a==="deck"?cn.set(I.deckX,2.4,I.deckZ).applyMatrix4(Ee.root.matrixWorld):a==="shore"?cn.set(I.shoreX,Jn(nn[I.islandId],I.shoreX,I.shoreZ)+1.72,I.shoreZ):cn.copy(vi).add(new P(0,.32,0)),Ss.copy(cn).add(new P(Math.sin(h)*Math.cos(Re),Math.sin(Re),Math.cos(h)*Math.cos(Re)).multiplyScalar(20))}a==="cage"&&I.phase!=="ready"?ie.position.lerp(cn,Math.min(1,i*(bn>0?4:18))):ie.position.lerp(cn,Math.min(1,i*(bn>0?3.8:7))),ie.position.length()<.1&&ie.position.copy(cn),ti=Math.max(0,ti-i),bn=Math.max(0,bn-i),gn=Math.max(0,gn-i*3.2),Vn=Math.max(0,Vn-i*.09),t&&ti>0&&(ie.position.x+=Math.sin(e*45)*ti*.06,ie.position.y+=Math.sin(e*34)*ti*.065),ie.lookAt(Ss),ie.updateMatrixWorld(),a==="dragged"&&ie.rotateZ(Math.sin(I.dragTime*5)*.12+I.dragTime*.035);const c=ie.position.y<-.18,l=Math.max(0,-ie.position.y);Ki.update({time:e,dt:n,camera:ie,boatPosition:On,boatHeading:I.heading,speed:I.speed,underwater:c,depth:l}),ht("experience").classList.toggle("underwater",c),ht("waterline").style.opacity=I.mode==="cage"&&Math.abs(ie.position.y)<1.2?`${(1-Math.abs(ie.position.y)/1.2)*.6}`:"0",ht("damage").style.opacity=`${I.damageFlash*.65}`,ht("hit-marker").style.opacity=`${I.hitFlash}`,a==="dragged"&&(ht("damage").style.opacity=String(Math.max(.12,.4-I.dragTime*.04))),Qn.axe.visible=t&&a==="shore"&&I.hasAxe,Qn.axe.scale.setScalar(.85),Qn.axe.position.set(.42,-.39,-.75-Math.sin(gn*Math.PI)*.2),Qn.axe.rotation.set(gn*1.2,.25,-.25-gn*.6),Ee.weapon.visible=t&&a==="cage"&&I.weapon==="speargun",Ee.knife.visible=t&&a==="cage"&&I.weapon==="knife",Ee.weapon.rotation.x=-gn*.16,Ee.weapon.rotation.z=Math.sin(e*1.3)*.008,Ee.weapon.position.set(.35,-.3,-.6+gn*.12),Ee.knife.rotation.z=-gn*.8,Ee.knife.position.set(.35,-.3,-.6-Math.sin(gn*Math.PI)*.65);for(let h=ts.length-1;h>=0;h--){const u=ts[h];u.life-=n,u.mesh.position.addScaledVector(u.velocity,n),u.life<=0&&(Pn.remove(u.mesh),ts.splice(h,1))}Pe.update(t&&I.hull>0?Math.abs(I.speed):0,c?l:0,t?Vn:0),I.phase!==Ra&&(Ra=I.phase,(I.phase==="won"||I.phase==="lost")&&(Da(),I.phase==="won"&&Pe.play("win"))),(e-Lo>.09||Lo>e)&&(Ci(),Lo=e)}let Ml=performance.now(),yl=!1;function Sh(i){const t=(i-Ml)/1e3,e=Math.min(.05,t);Ml=i,yh(e),me.render(Pn,ie),Io++,Cr+=t,Cr>=2&&(ph=Io/Cr,Io=0,Cr=0),yl||(yl=!0,ht("loading").hidden=!0,ie.position.copy(cn)),requestAnimationFrame(Sh)}requestAnimationFrame(Sh);const c_=new URLSearchParams(location.search).get("qa")==="1",Sl={snapshot:()=>({...I.snapshot(),fps:ph,nearest:Ei,camera:ie.position.toArray(),sharks:Je.sharks.map(i=>({id:i.id,position:i.position.toArray(),health:i.health,state:i.state,length:i.length})),render:{calls:me.info.render.calls,triangles:me.info.render.triangles}})};Object.assign(window,{__sea:c_?{...Sl,game:I,sharks:Je,step:i=>{for(let t=0;t<i;t+=1/60)yh(1/60);me.render(Pn,ie),Ci()},setBoat:(i,t)=>{I.x=i,I.z=t},aimAt:i=>{const t=Je.sharks.find(e=>e.id===i);t&&(zn.copy(t.position).sub(ie.position),He=Math.atan2(zn.x,zn.z),Re=Math.atan2(zn.y,Math.hypot(zn.x,zn.z)))},setView:(i,t)=>{He=i,Re=t},project:(i,t,e)=>(zn.set(i,t,e).project(ie),{x:(zn.x*.5+.5)*innerWidth,y:(-.5*zn.y+.5)*innerHeight})}:Sl});window.addEventListener("error",()=>{ht("loading").textContent="海域载入遇到问题，请刷新页面重试。"});
