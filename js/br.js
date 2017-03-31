"use strict"
/*
 * Visualizaiton of Brazil HDI stats by municipality
 * Covers the years 1991, 2000 and 2010 for 5572 municipalities */

var svg = d3.select("svg#mapa"),    // Map SVG object, defined at index.html
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    idhmPorLocal = d3.map(),        // Maps municipality GEOCMU with their HDI per year
    quantize = d3.scaleQuantize()   // Quantize scale for the map colors, q[i]-9 styles are defined at CSS level
      .domain([0,1])
      .range(d3.range(9).map(function(i){ return "q" + i + "-9";})),
    projection = d3.geoMercator(),  // Map projection
    serieIdhm = 0,                  // Current HDI series 0: 2010, 1: 2000, 2: 1991, index for anoIdhm
    anoIdhm=["2010","2000","1991"], // HDI years
    swidth,                         // Stroke width, defined at css level, fetched here for reuse
    tooltip;                        // Map tooltip object


d3.queue()                          // Triggers Map JSON and data assynchronous reading
  .defer(d3.json, "./json/BRMUE250GC_SIR_05.json")
  .defer(d3.csv, "./csv/IDHM.csv",
    function(d){
      idhmPorLocal.set(d.CD_GEOCMU, [+d.IDMH2010,+d.IDMH2000,+d.IDHM1991, d.Município]);
      return {
        Município: d.Município,     // Municipality name - Name case
        CodEstado: +d.CodEstado,    // State code
        Estado: d.Estado,           // State name
        IDHM1991: +d.IDHM1991,      // 1991 HDI total
        IDHMR1991: +d.IDHMR1991,    //  Income
        IDHML1991: +d.IDHML1991,    //  Life expectancy
        IDHME1991: +d.IDHME1991,    //  Education
        R1991: +d.R1991,            // 1991 Ranking
        IDMH2000: +d.IDMH2000,      // 2000 HDI total
        IDHMR2000: +d.IDHMR2000,
        IDHML2000: +d.IDHML2000,
        IDHME2000: +d.IDHME2000,
        R2000: +d.R2000,
        IDMH2010: +d.IDMH2010,      // 2010 HDI total
        IDHMR2010: +d.IDHMR2010,
        IDHML2010: +d.IDHML2010,
        IDHME2010: +d.IDHME2010,
        R2010: +d.R2010,
        NM_MUNNICIP: d.NM_MUNNICIP, // Normalized name
        CD_GEOCMU: d.CD_GEOCMU      // Municipality code - Used in idhmPorLocal mapping
      };
    })
  .await(ready);

// Callback for queued assynchronous deferred actions
function ready(error, brasil, idhm2010) {
  if (error) throw error;
  // Fits projection to SVG size
  projection.fitSize([width, height], topojson.feature(brasil, brasil.objects.BRMUN).features);

  var braF = topojson.feature(brasil, brasil.objects.BRMUN),
      path = d3.geoPath()
        .projection(projection.fitSize([width, height], braF));

  // Paints map
  svg.append("g")
      .attr("class", "municipios")
    .selectAll("path")
      .data(braF.features)
    .enter().append("path")
      .attr("class", function(d) {var i = idhmPorLocal.get(d.properties.CD_GEOCMU); return i == undefined ? "q9-9" : quantize(i[serieIdhm]); })
      .attr("d", path);

  // Fetches stroke width
  swidth = d3.select(".municipios").style("stroke-width");

  criaTooltip();

  // Creates tool tip object
  function criaTooltip()
  {
    tooltip = d3.select("body")
      .append("div")  
      .classed("myTip", true)       // myTip class is hidden by default
      .html("IDHM Brasil");

      hookTooltip();
  }

  // Creates tooltip hook actions: WARNING "click" is disabled at this moment
  function hookTooltip()
  {
    var indice;
    var svg = d3.select(".municipios").selectAll("path")
  
    .on("mouseover", function(d){
      var tip = d3.select("div.myTip");
      var k;

      var nomeMun = d.properties.NM_MUNICIP;
      /* Want to declare above as
       *  var nomeMun = idhmPorLocal.get(d.properties.CD_GEOCMU)[3];
       * to get municipality case names but first need to include missing
       * municipalities (that didn't exist when the census was performed)
       * to the mapping
       * WARNING: This will affect all idhmPorLocal.get logic, but code will
       * be simpler than current state of affairs */
      indice = idhmPorLocal.get(d.properties.CD_GEOCMU)
      k = nomeMun + ((indice == undefined) ? "" : (" Índice "+anoIdhm[serieIdhm]+": "+indice[serieIdhm]));

      tip.html(k);
      d3.selectAll("path").filter(function(dd) {
        return dd.properties.CD_GEOCMU == d.properties.CD_GEOCMU;
      }).style("stroke-width", "1");

      return tooltip.style("visibility", "visible");})
  
    .on("mousemove", function(){
      return tooltip.style("top", (d3.event.pageY-20)+"px")
        .style("left",(d3.event.pageX+25)+"px");})
  
    .on("mouseout", function(d){
      d3.selectAll("path").filter(function(dd) {
        return dd.properties.CD_GEOCMU == d.properties.CD_GEOCMU;
      }).style("stroke-width", swidth);

      return tooltip.style("visibility", "hidden");})
    .on("click", function(d){
      return;
    });
  }
}