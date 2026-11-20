const hex = h => { h=h.replace('#',''); return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16)); };
const lum = c => { const [r,g,b]=c.map(v=>{v/=255;return v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4}); return 0.2126*r+0.7152*g+0.0722*b; };
export const ratio = (a,b) => { const [x,y]=[lum(typeof a==='string'?hex(a):a),lum(typeof b==='string'?hex(b):b)].sort((p,q)=>q-p); return (x+0.05)/(y+0.05); };
export const blend = (fg, a, bg) => hex(fg).map((v,i)=>Math.round(v*a+hex(bg)[i]*(1-a)));
