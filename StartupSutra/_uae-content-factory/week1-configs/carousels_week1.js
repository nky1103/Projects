const STAIR=[
  {lbl:'2021',v:300,disp:'AED 300B',muted:true},{lbl:'2022',v:528,disp:'AED 528B',muted:true},
  {lbl:'2023',v:634,disp:'AED 634B',muted:true},{lbl:'2024',v:761,disp:'AED 761B',muted:true},
  {lbl:'2025',v:917,disp:'AED 917B'}];
const CTA=(note)=>({type:'cta',title:'Follow for the UAE, decoded daily.',note:note,subfollow:'UAE real estate, decoded with data'});

module.exports = {
  d1:{ acc:'#f59e0b',deep:'#b45309',glow:'245,158,11',label:'Market Pulse',slides:[
    {type:'cover',kick:'New chapter',size:'sm',title:"We're now decoding<br><span class='accent'>UAE real estate.</span>",sub:"A year on Indian startups. Now: the UAE's property market — data over hype."},
    {type:'bignum',kick:'Dubai · 2025',num:'AED 917B',subnum:'≈ $250 billion in property',note:"The biggest year in the city's history.",src:'Dubai Land Department, 2025',swipe:true},
    {type:'bars',kick:'Total transactions',title:'Five record years in a row',data:STAIR,src:'DLD annual transaction value',swipe:true},
    {type:'bignum',kick:'Depth of demand',num:'270,000+',size:'sm',subnum:'property sales in 2025 · +20% YoY',note:'Hundreds of thousands of buyers — not a few trophy deals.',src:'DLD, 2025',swipe:true},
    {type:'lesson',tag:'Rich Dad lens',tx:"Five record years isn't a bubble.<br>It's a market with a floor.",note:'Volume means liquidity — and liquidity turns property from a bet into an asset you can actually exit.',swipe:true},
    CTA('One chart, one lesson every day — Dubai, Abu Dhabi, Sharjah, RAK.') ]},

  d2:{ acc:'#ef4444',deep:'#b91c1c',glow:'239,68,68',label:'Crash Files',slides:[
    {type:'cover',kick:'Crash Files',size:'sm',title:"The UAE crashed 50% once.<br><span class='accent'>Then it doubled.</span>",sub:"2009's crash, the recovery, and what it means for the next dip."},
    {type:'bignum',kick:'2008 → 2009',num:'−50%',subnum:'Dubai home prices in the crash',note:'A global crisis plus oversupply hit all at once.',src:'Global Property Guide; S&P',swipe:true},
    {type:'bars',kick:'The comeback',title:'AED per sq ft',data:[{lbl:'2021 low',v:794,disp:'794'},{lbl:'2025',v:1863,disp:'1,863'}],src:'DXBinteract / market data',swipe:true},
    {type:'bignum',kick:'Recovery',num:'+135%',subnum:'price per sq ft, 2021 low → 2025',note:'The people who bought the fear were rewarded the most.',src:'market data',swipe:true},
    {type:'lesson',tag:'Rich Dad lens',tx:"Leverage cuts both ways.<br>Fear is a discount.",note:'Crashes wipe out the over-leveraged and reward the patient. Buy assets you can hold through a full cycle.',swipe:true},
    CTA('Every cycle, charted — so you buy fear, not hype.') ]},

  d3:{ acc:'#22c55e',deep:'#15803d',glow:'34,197,94',label:'Boom Radar',slides:[
    {type:'cover',kick:'Boom Radar',size:'sm',title:"The UAE areas that surged<br><span class='accent'>while everyone waited.</span>",sub:"Where prices actually went in 2025."},
    {type:'bars',kick:'Price growth · 2025',title:'The areas that ran',data:[{lbl:'Palm',v:31,disp:'+31%'},{lbl:'JVC',v:17,disp:'+17%',muted:true},{lbl:'Marina',v:15,disp:'+15%',muted:true},{lbl:'B. Bay',v:10,disp:'+10%',muted:true}],src:'Knight Frank, Q3 2025',swipe:true},
    {type:'bignum',kick:'Dubai Marina',num:'AED 1,501',size:'sm',subnum:'price per sq ft (2025)',note:'Up 11.6% in a single year.',src:'Knight Frank',swipe:true},
    {type:'bignum',kick:'The bigger picture',num:'2.3×',subnum:'Dubai price per sq ft since the 2021 low',note:'AED 794 → 1,863.',src:'market data',swipe:true},
    {type:'lesson',tag:'Rich Dad lens',tx:"The crowd watches 'the market'.<br>The owner watches the trendline.",note:'Averages hide the winners. The returns are in the areas — not the headline index.',swipe:true},
    CTA('We track where the UAE money actually moves.') ]},

  d4:{ acc:'#14b8a6',deep:'#0f766e',glow:'20,184,166',label:'Yield Lab',slides:[
    {type:'cover',kick:'Yield Lab',size:'sm',title:"Dubai pays landlords<br><span class='accent'>double London.</span>",sub:"Gross rental yields, city by city."},
    {type:'bars',kick:'Gross rental yield',title:'Dubai vs the world',data:[{lbl:'Dubai',v:6.8,disp:'6.8%'},{lbl:'N. York',v:4.2,disp:'4.2%',muted:true},{lbl:'London',v:3.4,disp:'3.4%',muted:true},{lbl:"S'pore",v:3.4,disp:'3.4%',muted:true}],src:'Engel & Völkers / market data 2025',swipe:true},
    {type:'bignum',kick:'The tax edge',num:'0%',subnum:'income & capital-gains tax in the UAE',note:'Net yields hold up far better than in taxed markets.',swipe:true},
    {type:'bignum',kick:'Apartments',num:'~7%',size:'sm',subnum:'typical Dubai apartment gross yield',note:'Roughly double London, New York and Singapore.',src:'market data',swipe:true},
    {type:'lesson',tag:'Rich Dad lens',tx:"Buy for cashflow,<br>not for the postcode.",note:'A trophy address at 3% is a liability that happens to appreciate. Cashflow is what pays you to hold.',swipe:true},
    CTA('The real yield math, every week.') ]},
};
