module.exports = {
  acc:'#3b82f6', acc2:'#93c5fd', deep:'#1d4ed8', glow:'59,130,246', label:'UAE · Zone Watch', dur:21.0,
  scene:{kind:'skyline'}, palette:{},
  reveal:{ at:5.0, dur:1.4 },
  scenes:[
    {type:'bignum',t0:0.0,t1:2.5,size:'sm',kick:'AED 1,000,000 buys',num:'1,370 ft²',subnum:'in International City.'},
    {type:'bignum',t0:2.5,t1:5.0,size:'sm',kick:'The same AED 1,000,000 buys',num:'260 ft²',subnum:'on Palm Jumeirah.'},
    {type:'text',t0:5.0,t1:8.0,size:'sm',html:"Same AED 1M. <span class='accent'>5.3x the space.</span>"},
    {type:'bars',t0:8.0,t1:14.0,kick:'AED 1M buys you',title:'Space, by zone',data:[
      {lbl:'Intl City',v:1370,disp:'1,370 ft²'},{lbl:'Palm',v:260,disp:'260 ft²',muted:true}]},
    {type:'text',t0:14.0,t1:17.8,size:'sm',html:"Dubai isn't one market. It's <span class='accent'>dozens of micro-markets.</span>"},
  ],
  outro:{t0:17.8,kick:'Your move',title:"Where would you put<br>AED 1M?",sub:'Comment the zone 👇'}
};
