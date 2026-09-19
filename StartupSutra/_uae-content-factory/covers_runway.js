// 5-post runway — COVERS (1080x1920 poster). Dark cinematic skyline, big number.
const A = "color:var(--acc2)"; // accent span helper

module.exports = {
  p1: { tag:'UAE · Builder Watch', scene:'skyline', acc2:'#fcd34d', big2:'#ffd98a',
    pre:`One developer.<br><span style="${A}">One year.</span>`, big:'AED 65.8B', bigSm:true,
    post:'Dubai, 2025 sales.', badge:'Watch · the builders' },

  p2: { tag:'UAE · Yield Lab', scene:'marina', acc2:'#5eead4', big2:'#7ff0dd',
    pre:`Same city.<br><span style="${A}">Double the yield.</span>`, big:'8.9%',
    post:'International City.', badge:'Watch · the yields' },

  p3: { tag:'UAE · Money Moves', scene:'creek', acc2:'#86efac', big2:'#a7f3bf',
    pre:`Buy property.<br><span style="${A}">Get residency.</span>`, big:'AED 2M', bigSm:true,
    post:'= a 10-year UAE visa.', badge:'Watch · the rules' },

  p4: { tag:'UAE · World vs Dubai', scene:'skyline', acc2:'#c4b5fd', big2:'#d6c9ff',
    pre:`What $1M buys<br><span style="${A}">in Dubai.</span>`, big:'670 ft²', bigSm:true,
    post:'vs 172 in Monaco.', badge:'Watch · the world' },

  p5: { tag:'UAE · Rent vs Buy', scene:'marina', acc2:'#fda4af', big2:'#ffc2c9',
    pre:`Dubai pays back<br><span style="${A}">faster.</span>`, big:'15x',
    post:'years of rent. Lowest of majors.', badge:'Watch · the math' },
};
