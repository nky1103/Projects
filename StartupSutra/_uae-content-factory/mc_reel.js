module.exports = {
  acc:'#ef4444', acc2:'#ff9a86', deep:'#b91c1c', glow:'239,68,68', label:'UAE · Risk Radar', dur:19.5,
  scene:{kind:'skyline'},
  palette:{ sky:'linear-gradient(180deg,#05080f 0%,#0a1120 34%,#122036 54%,#1c2c44 70%,#26364f 82%,#0a0f18 100%)',
    sun:'radial-gradient(circle,rgba(150,180,220,.5),rgba(90,120,170,.22) 40%,transparent 64%)', sunY:40,
    haze:'rgba(120,150,190,.25)', tower:'#070b14', rim:'rgba(120,160,210,.4)' },
  scenes:[
    {type:'text',t0:0.0,t1:3.8,size:'sm',kick:'UAE · Risk Radar',html:"There are 3 ways to survive a property cycle."},
    {type:'text',t0:3.8,t1:7.6,size:'sm',html:"Be first. Be smarter. Or <span class='accent'>hold the bag.</span>"},
    {type:'bignum',t0:7.6,t1:12.4,size:'sm',kick:'Dubai · 2026 supply',num:'120,000',subnum:'new homes land in 2026. Double a normal year.'},
    {type:'text',t0:12.4,t1:16.2,size:'sm',html:"The crowd sees a boom. First movers see <span class='accent'>the exit.</span>"},
  ],
  outro:{t0:16.2,kick:'The risk, mapped',title:"Where the danger<br>actually sits."}
};
