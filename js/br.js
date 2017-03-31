"use strict"
var svg = d3.select("svg#mapa"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var idhmPorLocal = d3.map();

var quantize = d3.scaleQuantize()
    .domain([0,1])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var projection = d3.geoMercator();

var serieIdhm = 0, anoIdhm=["2010","2000","1991"], SWIDTH;
var tooltip;


d3.queue()
    .defer(d3.json, "./json/BRMUE250GC_SIR_05.json")
    .defer(d3.csv, "./csv/IDHM.csv", function(d){
          idhmPorLocal.set(d.CD_GEOCMU, [+d.IDMH2010,+d.IDMH2000,+d.IDHM1991]);
          return {
                  Município: d.Município,
                  CodEstado: +d.CodEstado,
                  Estado: d.Estado,
                  IDHM1991: +d.IDHM1991,
                  IDHMR1991: +d.IDHMR1991,
                  IDHML1991: +d.IDHML1991,
                  IDHME1991: +d.IDHME1991,
                  R1991: +d.R1991,
                  IDMH2000: +d.IDMH2000,
                  IDHMR2000: +d.IDHMR2000,
                  IDHML2000: +d.IDHML2000,
                  IDHME2000: +d.IDHME2000,
                  R2000: +d.R2000,
                  IDMH2010: +d.IDMH2010,
                  IDHMR2010: +d.IDHMR2010,
                  IDHML2010: +d.IDHML2010,
                  IDHME2010: +d.IDHME2010,
                  R2010: +d.R2010,
                  NM_MUNNICIP: d.NM_MUNNICIP,
                  CD_GEOCMU: d.CD_GEOCMU
           };})
    .await(ready);

function ready(error, brasil, idhm2010) {
  if (error) throw error;

  projection.fitSize([width, height], topojson.feature(brasil, brasil.objects.BRMUN).features);

  var braF = topojson.feature(brasil, brasil.objects.BRMUN);

  var path = d3.geoPath()
    .projection(projection.fitSize([width, height], braF));

  svg.append("g")
      .attr("class", "municipios")
    .selectAll("path")
      .data(braF.features)
    .enter().append("path")
      .attr("class", function(d) {var i = idhmPorLocal.get(d.properties.CD_GEOCMU); return i == undefined ? "q9-9" : quantize(i[serieIdhm]); })
      .attr("d", path);

  

  SWIDTH = d3.select(".municipios").style("stroke-width");
  d3.select("#ano").html(" - "+anoIdhm[serieIdhm]);

  criaTooltip();

  function criaTooltip()
  {
    tooltip = d3.select("body")
      .append("div")
  
    //   .style("vertical-align", "middle")
      .classed("myTip", true)
      .html("IDHM Brasil");
      
      hookTooltip();
  }



  function hookTooltip()
  {
    var indice;
    var svg = d3.select(".municipios").selectAll("path")
  
    .on("mouseover", function(d){
      var tip = d3.select("div.myTip");
      var k;
      //var nomeMun = idhmPorLocal.get(d.properties.NM_MUNICIP);
      var nomeMun = d.properties.NM_MUNICIP;

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
      }).style("stroke-width", SWIDTH);

      return tooltip.style("visibility", "hidden");})
    .on("click", function(d){
      return;
    });
  }

/*
  svg.append("path")
      .datum(topojson.mesh(can, can.objects.CAN_adm1, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
  */
}


