"use strict"
/*
 * Visualizaiton of Brazil HDI stats by municipality
 * Covers the years 1991, 2000 and 2010 for 5572 municipalities */

const RANGE = 10,
  COLORMARK = "black";
var svg = d3.select("svg#mapa"), // Map SVG object, defined at index.html
  width = 875, //+svg.attr("width"),
  height = 800, // +svg.attr("height"),
  HDIByLocality = d3.map(), // Maps municipality GEOCMU with their HDI per year
  // CD_GEOCMU -> [IDHM2010, IDHM2000, IDHM1991, MunicipalityName]
  totalMunicipalities = 0,
  totalArea = 0,
  quantizeDiverging = d3.scaleQuantize() // Quantize scale for the map colors, q[i]-9 styles are defined at CSS level
               .domain([0, 1])
               .range(d3.range(RANGE).map(function(i) {
                 return i; /* return "q" + i + "-9"; */
             })),
  quantizeSlices = d3.scaleQuantize()
                   .domain([0,1])
                   .range(d3.range(10).map(function(i){
                     return i < 5 ? 0 : i < 6 ? 1 : i < 7 ? 2 : i < 8 ? 3 : 4;
                   })),
  quantize = quantizeDiverging,
  projection = d3.geoMercator(), // Map projection
  HDISeries = +d3.select("#selecIndicador").node().value, // Current HDI series 2010: HDMI2010, 2000: HDMI2000, 1991: HDMI1991
  popMun = d3.map(), // Population by Municipality (CD_GEOCMU): [[pop2010, pop2000, pop1991], est2017]
  areaMun = d3.map(),
  swidth, // Stroke width, defined at css level, fetched here for reuse
  tooltip, // Map tooltip object
  numMun = 30, // # of Municipalities on the list
  ranks,
  color = colorDiverging; // First numMun municipalities by HDI

/*
 * selectYearSeries, called if year or series changes on HTML form
 */
function selectYearSeries() {
  // If year or series have changed then:
  // repaint Map
  // update table
  HDISeries = document.getElementById('selecIndicador').value;
  repaintAll();
  tableFill(HDISeries);
}

function repaintAll() {
  // Repaints the map, 1 second transition
  repaintMap(function(d){return true;}, 1000);
  // and label
  svg.select(".label").selectAll("rect")
     .transition().duration(1000).ease(d3.easeCubicInOut)
     .style("fill", function(d){return color(quantize((d[0]/10)+0.05));})
}

function repaintMARKED() {
  // Repaints all black regions, no transition
  repaintMap(function(mun) {
      return d3.select(this).style("fill") == "rgb(0, 0, 0)";
    }, 0);
}

function repaintMap(filter, duration) {
  var serie, sliceColorMode;
  serie = document.getElementById('selecSerie').value;
  sliceColorMode = document.getElementById('colorMode').checked;

  if (sliceColorMode) {
    color = colorSlices;
    quantize = quantizeSlices;
  }
  else {
    color = colorDiverging;
    quantize = quantizeDiverging;
  }

  svg.select(".municipalities").selectAll("path")
    .transition().duration(duration).ease(d3.easeCubicInOut)
    .filter(filter)
    //.transition().duration(250)
    .style("fill", function(d) {
      var i = HDIByLocality.get(d.properties.CD_GEOCMU);
      return color(quantize(i["IDHM" + serie + HDISeries]));
    });
}

function colorDiverging(i) {
  return colorVec(i, ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695', '#ffffff']);
}

function colorSlices(i) {
  return colorVec(i, ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6', '#ffffff']);
}

function colorVec(i, vec) {
  if (isNaN(i))
    return vec[vec.length-1];
  return vec[Math.min(Math.max(0, i), vec.length-1)];
}

function numBrazil(number, options) {
  return number.toLocaleString("pt-BR", options);
}

/* Can be called from a D3 mouseover or DOM mouseover.
 * CD_GEOCMU will come from data properties (d.properties) if it is being called from a DOM
 */
function munMouseover(d) {
  var tip = d3.select("div.myTip");
  var populacao2017, populacaoAno;
  var k;
  var nomeMun, CD_GEOCMU, indice, munData, serie;

  serie = document.getElementById('selecSerie').value;

  if (d != undefined) // Use path properties
    CD_GEOCMU = d.properties.CD_GEOCMU;
  else // Use name attr from table (see tablePrep and tableFill)
    CD_GEOCMU = this.attributes.name.nodeValue;


  indice = HDIByLocality.get(CD_GEOCMU);
  nomeMun = indice.municipio;

  munData = popMun.get(CD_GEOCMU);
  populacao2017 = munData.estimativa;
  populacaoAno = munData.populacao["p" + HDISeries];
  k = nomeMun + " (" + munData.estado + ")";
  if (areaMun.get(CD_GEOCMU).area > 0)
    k += "<br>Área: " + numBrazil(areaMun.get(CD_GEOCMU).area, {
      maximumFractionDigits: 2
    }) + " km<sup>2</sup>";
  if (populacao2017 != 0) {
    if (!isNaN(indice["IDHM" + serie + HDISeries]))
      k += "<br>Índice " + HDISeries + ": " + numBrazil(indice["IDHM" + serie + HDISeries]);
    if (!isNaN(populacaoAno))
      k += "<br>Populaço " + HDISeries + ": " + numBrazil(populacaoAno);
    k += "<br>População 2017: " + numBrazil(populacao2017);
  }

  tip.html(k);
  d3.selectAll("path").filter(function(dd) {
    return dd.properties.CD_GEOCMU == CD_GEOCMU;
  }).style("stroke-width", "5px").style("stroke", "red");

  return tooltip.style("visibility", "visible");
}

function mouseMove(d) {
  // Just moves the tooltip around
  return tooltip.style("top", (d3.event.pageY - 20) + "px")
    .style("left", (d3.event.pageX + 25) + "px");
}

function munMouseout(d) {
  d3.selectAll("path").filter(function(dd) {
    return dd.properties.CD_GEOCMU == d.properties.CD_GEOCMU;
  }).style("stroke-width", swidth);
  return tooltip.style("visibility", "hidden");
}

function ignore() {
  return;
}

/*
 * Creates room for the HTML table and trigger hooks, called once
 */
function tablePrep() { // Builds the table tamplate for the HDI rank, with the first numMun Municipalities
  var i, table, tabHtml;
  table = d3.select("#leg1");

  tabHtml = '<tbody><tr><th id="tTit" colspan="3"></th></tr><tr><td class="tdOrd"></td><td class="tpHDIT">Município</td><td class="tdHDI">IDHM</td></tr>';

  for (i = 1; i <= numMun; i++)
    tabHtml += '<tr><td class="tdOrd" id="tdOrd' + (i) + '"></td><td class="tpHDI" id="tp' + (i) + '"></td><td class="tdHDI" id="tv' + (i) + '"></td></tr>';

  tabHtml += '</tbody>';
  table.html(tabHtml);

  d3.selectAll(".tpHDI")
    .on("mouseover", munMouseover)
    .on("mousemove", tableMousemove)
    .on("mouseout", tableMouseout)
    .on("click", ignore);

  function tableMousemove(d) {
    return mouseMove(d);
  }

  function tableMouseout(d) {
    var CD_GEOCMU = this.attributes.name.nodeValue;
    d3.selectAll("path").filter(function(dd) {
      return dd.properties.CD_GEOCMU == CD_GEOCMU;
    }).style("stroke-width", swidth);
    return tooltip.style("visibility", "hidden");
  }
}

/*
 * Fills the table, called anytime the series or index changes
 */
function tableFill(year) {
  var i, munRanks, diff, dir, cor, tclose, serie, previous = {
    2010: 2000,
    2000: 1991
  };

  diff = "";
  dir = "";
  cor = "<text>";
  tclose = "</text>";
  serie = document.getElementById('selecSerie').value;

  d3.select("#leg1").style("display", "none");
  d3.select("#tTit").html(numMun + " maiores IDHMs do Brasil - " + year);
  for (i = 0; i < numMun; i++) {
    munRanks = HDIByLocality.get(ranks["r" + serie + year][i].CD_GEOCMU).ranking; // Dict with ranks for each collected year: r2010, r2000, r1991, for the given CD.GEOCMU
    if (previous[year] != undefined) { // If there is a previous rank
      diff = Math.abs(munRanks["r" + year] - munRanks["r" + previous[year]]);
      if (diff == 0) { // if there was no change from previous year
        cor = "<text style='color:steelblue'>";
        dir = " (=)"
      } else { // else if there was a rank change then adds a ")" to diff and indicate the direction of the change
        if (munRanks["r" + year] > munRanks["r" + previous[year]]) {
          cor = "<text style='color:red'>";
          dir = " (-" + diff + ")";
        } else {
          cor = "<text style='color:blue'>";
          dir = " (+" + diff + ")";
        }
        //dir = munRanks[year] > munRanks[year+1] ? " (-" : " (+";
      }
    }
    d3.select("#tdOrd" + (i + 1))
      .html(munRanks["r" + year] + cor + dir + tclose); // Current rank
    /* Municipality Name for (i) position in (year - 0/1/2 2010/2000/1991) */
    d3.select("#tp" + (i + 1))
      .html(ranks["r" + serie + year][i].Município)
      .attr("name", ranks["r" + serie + year][i].CD_GEOCMU);
    /* HDI for (i) position 0/1/2 IDHM2010/IDHM2000/IDHM1991 */
    d3.select("#tv" + (i + 1))
      .html(numBrazil(ranks["r" + serie + year][i]["IDHM" + serie + year], {
        minimumFractionDigits: 3
      }));
    //.style("color", (dir==""|dir==" (=)")?"black":(dir==" (-")?"red":"steelblue");
    // d3.selectAll("path").filter(function(d){return d.properties.CD_GEOCMU == "1101807"})
  }
  d3.select("#leg1").style("display", "table");
}

// Reads map and HDI, population and area files
d3.queue() // Triggers Map JSON and data assynchronous reading
  .defer(d3.json, "./json/BRMUE250GC_SIR_05.json") //brasil
  .defer(d3.csv, "./csv/IDHM.csv", // HDI
    function(d) {
      HDIByLocality.set(d.CD_GEOCMU, {
        IDHMT2010: +d.IDHM2010,
        IDHMR2010: +d.IDHMR2010,
        IDHML2010: +d.IDHML2010,
        IDHME2010: +d.IDHME2010,
        IDHMT2000: +d.IDHM2000,
        IDHMR2000: +d.IDHMR2000,
        IDHML2000: +d.IDHML2000,
        IDHME2000: +d.IDHME2000,
        IDHMT1991: +d.IDHM1991,
        IDHMR1991: +d.IDHMR1991,
        IDHML1991: +d.IDHML1991,
        IDHME1991: +d.IDHME1991,
        municipio: d.Município,
        ranking: {
          r2010: +d.R2010,
          r2000: +d.R2000,
          r1991: +d.R1991
        },
        estado: d.Estado
      });
      return {
        Município: d.Município, // Municipality name - Name case
        CodEstado: +d.CodEstado, // State code
        Estado: d.Estado, // State name
        IDHMT1991: +d.IDHM1991, // 1991 HDI total
        IDHMR1991: +d.IDHMR1991, //  Income
        IDHML1991: +d.IDHML1991, //  Life expectancy
        IDHME1991: +d.IDHME1991, //  Education
        RT1991: +d.R1991, // 1991 Ranking
        IDHMT2000: +d.IDHM2000, // 2000 HDI total
        IDHMR2000: +d.IDHMR2000, //  Income
        IDHML2000: +d.IDHML2000, //  Life expectancy
        IDHME2000: +d.IDHME2000, //  Education
        RT2000: +d.R2000, // 2000 Ranking
        IDHMT2010: +d.IDHM2010, // 2010 HDI total
        IDHMR2010: +d.IDHMR2010, //  Income
        IDHML2010: +d.IDHML2010, //  Life expectancy
        IDHME2010: +d.IDHME2010, //  Education
        RT2010: +d.R2010, // 2000 Ranking
        NM_MUNNICIP: d.NM_MUNNICIP, // Normalized name
        CD_GEOCMU: d.CD_GEOCMU // Municipality code - Used in HDIByLocality mapping
      };
    })
  .defer(d3.csv, "./csv/pop91_00_10_17.csv", // popEst
    function(d) {
      if (+d.PopEst2017 > 0)
        totalMunicipalities++;

      popMun.set(d.CD_GEOCMU, {
        populacao: {
          p2010: +d.Pop2010,
          p2000: +d.Pop2000,
          p1991: +d.Pop1991
        },
        estimativa: +d.PopEst2017,
        estado: d.UF
      });
      return {
        CD_GEOCMU: d.CD_GEOCMU,
        PopEst2017: +d.PopEst2017,
        UF: d.UF,
        Pop1991: +d.Pop1991,
        Pop2000: +d.Pop2000,
        Pop2010: +d.Pop2010
      };
    })
  .defer(d3.csv, "./csv/AR_BR_MUN_2017.csv", // areasMun
    function(d) {
      var munArea = +d.AR_MUN_2017;
      if (munArea > 0)
        totalArea += munArea;
      areaMun.set(d.CD_GCMUN, {
        area: munArea
      });
      return {
        CD_GEOCMU: d.CD_GCMUN,
        Area: munArea
      };
    })
  .await(ready);

// Callback for queued assynchronous deferred actions
function ready(error, brasil, HDI, popEst, areasMun) {
  if (error) throw error;
  // Fits projection to SVG size
  projection.fitSize([width, height], topojson.feature(brasil, brasil.objects.BRMUN).features);

  var braF = topojson.feature(brasil, brasil.objects.BRMUN),
    path = d3.geoPath()
    .projection(projection.fitSize([width, height], braF));

  // Paints map
  svg.append("g")
    .attr("class", "municipalities")
    .selectAll("path")
    .data(braF.features)
    .enter().append("path")
    // .attr("class", function(d) {var i = HDIByLocality.get(d.properties.CD_GEOCMU); return i == undefined ? "q9-9" : quantize(i[HDISeries]); })
    .attr("d", path)
    // .transition().duration(2000).ease(d3.easeCubicInOut)
    .style("fill", function(d) {
      var i = HDIByLocality.get(d.properties.CD_GEOCMU);
      return color(quantize(i["IDHMT" + HDISeries])); // Assumes IDHM total on paint
    });

  // Fetches stroke width
  swidth = d3.select(".municipalities").style("stroke-width");

  var year, serie, index, sorted, ranked, i;
  // Add ranking information for all indexes
  for (year in {1991:0, 2000:1, 2010:2})
    for (serie in {'L':0, 'E':1, 'R':2}) {
      index = HDI.map(v => isNaN(v['IDHM'+serie+year]) ? 0 : v['IDHM'+serie+year]);
      sorted = index.slice().sort(function(a, b) {
        return b - a;
      });
      ranked = index.slice().map(function(v){return sorted.indexOf(v)+1});
      for (var i = 0; i < HDI.length; i++)
        HDI[i]['R'+serie+year] = ranked[i];
    }

  ranks = {};
  for (year in {1991:0, 2000:1, 2010:2})
    for (serie in {'T': 0, 'L':1, 'E':2, 'R':3})
      ranks['r'+serie+year] = HDI.slice().sort(function(a, b){ return a['R'+serie+year] - b['R'+serie+year]}).slice(0, numMun);

  tablePrep();
  tableFill(HDISeries);
  createTooltip();
  createLabel();

  // Creates tool tip object
  function createTooltip() {
    tooltip = d3.select("body")
      .append("div")
      .classed("myTip", true) // myTip class is hidden by default
      .html("IDHM Brasil");

    hookTooltip();
  }

  // Creates tooltip hook actions: WARNING "click" is disabled at this moment
  function hookTooltip() {
    var svg = d3.select(".municipalities").selectAll("path")
      .on("mouseover", munMouseover)
      .on("mousemove", munMousemove)
      .on("mouseout", munMouseout)
      .on("click", ignore);
  }

  function munMousemove(d) {
    return mouseMove(d);
  }

  function createLabel() {
    var colorList = [...Array(RANGE).keys()].map(i => [i, color(i)]);
    const WIDTH = 25,
      HEIGHT = 75,
      X0 = 864,
      Y0 = 40;

    svg.append("g")
      .attr("class", "label")
      .selectAll("rect")
      .data(colorList)
      .enter().append("rect")
      .attr("x", X0)
      .attr("y", function(d) {
        return d[0] * HEIGHT + Y0;
      })
      .attr("width", WIDTH)
      .attr("height", HEIGHT)
      .style("fill", function(d) {
        return d[1];
      });

    labelTooltip();

    // Creates tooltip hook actions: WARNING "click" is disabled at this moment
    function labelTooltip() {
      var svg = d3.select(".label").selectAll("rect")
        .on("mouseover", labelMouseover)
        .on("mousemove", labelMousemove)
        .on("mouseout", labelMouseout)
        .on("click", ignore);
    }

    function labelMouseover(d) {
      const FACTOR = 1 / RANGE;
      var tip = d3.select("div.myTip");
      var minV = +(d[0] * FACTOR).toPrecision(1),
          maxV = +(d[0] * FACTOR + FACTOR).toPrecision(1);
      var k, municipalities, numMunicipalities, 
          serie, nameSerie = {'T': 'IDHM', 'E': 'Educação', 'R': 'Renda', 'L': 'Expectativa de vida'},
          sliceColorMode;

      serie = document.getElementById('selecSerie').value;
      sliceColorMode = document.getElementById('colorMode').checked;

      municipalities = svg.select(".municipalities").selectAll("path")
        .filter(function(mun) {
          var GEOCMU, indice;
          if (mun.properties.CD_GEOCMU == undefined)
            return false;
          GEOCMU = mun.properties.CD_GEOCMU;
          indice = HDIByLocality.get(GEOCMU)["IDHM" + serie + HDISeries];

          return indice >= minV && indice <= maxV;
        });
      municipalities
        //.transition().duration(250)
        .style("fill", COLORMARK);

      numMunicipalities = municipalities._groups[0].length;

      k = nameSerie[serie] + ": de " + numBrazil(minV) + " a " + numBrazil(maxV) +
        "<br>" + msgIndex((minV+maxV)/2, serie) + "<br>" +
        numBrazil(numMunicipalities) +
        " (" + numBrazil(numMunicipalities / totalMunicipalities * 100, {
          maximumFractionDigits: 2
        }) + "%)";
      tip.html(k);
      return tooltip.style("visibility", "visible");
    }

    function msgIndex(index, serie) {
      const suffix = {"T": "o", "E": "a", "R": "a", "L": "a"};
      const msg = ["Muito baix", "Baix", "Médi", "Alt", "Muito alt"];

      return msg[quantizeSlices(index)] + suffix[serie];
    }

    function labelMousemove(d) {
      return mouseMove(d);

    }

    function labelMouseout(d) {
      var noTrail = d3.select("#trailCB").node().checked == false;
      if (noTrail)
        repaintMARKED();
      return tooltip.style("visibility", "hidden");
    }
  }
}