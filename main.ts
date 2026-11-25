import{readdirSync,readFileSync as R,mkdirSync,writeFileSync as W}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of readdirSync(I).sort()){
const P=R(I+'/'+d+'/program.bin'),N=R(I+'/'+d+'/input.bin'),L=P.length;
let S=[],C=[],M=new Int32Array(256),p=0,j=0,o=[],e=null,t=0;
const l=()=>S.length,h=v=>{if(l()>255)e=3;else S.push(v|0)};
const b=f=>{if(l()<2)e=2;else{const y=S.pop(),x=S.pop(),r=f(x,y);if(e===null)S.push(r|0)}};
const u=f=>{if(!l())e=2;else S.push(f(S.pop())|0)};
const s16=()=>{const v=P[p]|P[p+1]<<8;return(v&32768)?v-65536:v};
const J=c=>{if(p+1>=L)e=9;else{const w=s16();if(!l())e=2;else if(c(S.pop()))p=p+2+w;else p+=2}};
while(e===null){
if(t>=1e6){e=10;break}
if(p<0||p>=L){e=9;break}
const q=P[p++];t++;
if(q==0)e=0;
else if(q==1){if(p>=L)e=9;else h((P[p++]<<24)>>24)}
else if(q==2){if(p+3>=L)e=9;else{h(P.readInt32LE(p));p+=4}}
else if(q==3){if(!l())e=2;else S.pop()}
else if(q==4){if(!l())e=2;else if(l()>255)e=3;else S.push(S[l()-1])}
else if(q==5){if(l()<2)e=2;else{const y=S.pop(),x=S.pop();S.push(y,x)}}
else if(q==6){if(l()<2)e=2;else if(l()>255)e=3;else S.push(S[l()-2])}
else if(q==7){if(l()<3)e=2;else{const c=S.pop(),b2=S.pop(),a=S.pop();S.push(b2,c,a)}}
else if(q==16)b((a,b)=>a+b);
else if(q==17)b((a,b)=>a-b);
else if(q==18)b(Math.imul);
else if(q==19)b((a,b)=>b?(a/b|0):(e=4,0));
else if(q==20)b((a,b)=>b?a%b:(e=4,0));
else if(q==21)b((a,b)=>b?((a>>>0)/(b>>>0)|0):(e=4,0));
else if(q==22)b((a,b)=>b?(a>>>0)%(b>>>0):(e=4,0));
else if(q==23)u(a=>-a);
else if(q==24)b((a,b)=>a&b);
else if(q==25)b((a,b)=>a|b);
else if(q==26)b((a,b)=>a^b);
else if(q==27)u(a=>~a);
else if(q==28)b((a,b)=>a<<(b&31));
else if(q==29)b((a,b)=>a>>(b&31));
else if(q==30)b((a,b)=>a>>>(b&31));
else if(q==32)b((a,b)=>a==b?1:0);
else if(q==33)b((a,b)=>a<b?1:0);
else if(q==34)b((a,b)=>(a>>>0)<(b>>>0)?1:0);
else if(q==48){if(p+1>=L)e=9;else p=p+2+s16()}
else if(q==49)J(v=>!v);
else if(q==50)J(v=>!!v);
else if(q==51){if(p+1>=L)e=9;else{const v=P[p]|P[p+1]<<8;if(C.length>63)e=7;else{C.push(p+2);p=v}}}
else if(q==52){if(!C.length)e=8;else p=C.pop()}
else if(q==64){if(!l())e=2;else{const a=S.pop();if(a<0||a>255)e=6;else S.push(M[a])}}
else if(q==65){if(l()<2)e=2;else{const a=S.pop(),v=S.pop();if(a<0||a>255)e=6;else M[a]=v}}
else if(q==80){if(!l())e=2;else{const s=''+S.pop();if(o.length+s.length>65536)e=11;else o.push(...Buffer.from(s))}}
else if(q==81){if(!l())e=2;else{const v=S.pop();if(o.length>=65536)e=11;else o.push(v&255)}}
else if(q==82){if(l()>255)e=3;else S.push(j<N.length?N[j++]:-1)}
else if(q==83){if(!l())e=2;else e=S.pop()&255}
else e=5;
}
mkdirSync(O+'/'+d,{recursive:true});
W(O+'/'+d+'/stdout.bin',Buffer.from(o));
W(O+'/'+d+'/exit.txt',e+'\n');
}
