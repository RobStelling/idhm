// URL: https://beta.observablehq.com/@robstelling/idhm-indice-de-desenvolvimento-humano-municipal
// Title: IDHM - Índice de Desenvolvimento Humano Municipal
// Author: Roberto Stelling (@robstelling)
// Version: 683
// Runtime version: 1

const m0 = {
  id: "017fbabb77877333@683",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# IDHM - Índice de Desenvolvimento Humano Municipal

Observação: *Devido à quantidade de dados utilizados e projeções em mapas, você terá um resultado melhor em telas grandes. Não recomendamos celulares para visualizar os mapas*.`
)})
    },
    {
      inputs: ["md","totalMunicipalities","seriesName"],
      value: (function(md,totalMunicipalities,seriesName){return(
md`O índice de desenvolvimento humano municipal (IDHM) começou a ser calculado a partir de 2012, em um trabalho conjunto do [_PNUD Brasil_](http://www.br.undp.org/), [_Ipea_](http://www.ipea.gov.br/) e [_Fundação João Pinheiro_](http://www.fjp.mg.gov.br/), adaptando a metodologia do IDH Global para calcular o IDH Municipal (IDHM) dos ${totalMunicipalities} municípios brasileiros.

Esse cálculo foi realizado a partir das informações dos 3 últimos Censos Demográficos do IBGE – 1991, 2000 e 2010 – conforme a malha municipal existente em 2010. Esse último requisito exigiu, para efeito de comparabilidade intertemporal, um minucioso trabalho de compatibilização das malhas municipais existentes em 1991 e 2000 com a de 2010.

Em um trabalho posterior ao IDHM dos municípios brasileiros, as três instituições assumiram o novo desafio de calcular o IDHM a nível intramunicipal das regiões metropolitanas do país – desta vez, para as Unidades de Desenvolvimento Humano (UDH).


O IDHM brasileiro considera as mesmas três dimensões do IDH Global – ${seriesName('L')}, ${seriesName('E')} e ${seriesName('R')}, mas vai além: adequa a metodologia global ao contexto brasileiro e à disponibilidade de indicadores nacionais. Embora meçam os mesmos fenômenos, os indicadores levados em conta no IDHM são mais adequados para avaliar o desenvolvimento dos municípios e regiões metropolitanas brasileiras.


Assim, o IDHM – incluindo seus três componentes, IDHM Longevidade, IDHM Educação e IDHM Renda - conta um pouco da história dos municípios, estados e regiões metropolitanas em três importantes dimensões do desenvolvimento humano durante duas décadas da história brasileira.

# IDHM 1991
Com os dados do censo de 1991 foi calculado o IDH de cada município do Brasil. O mapa abaixo mostra o IDHM Total (ou seja, combinando as 3 categorias de Desenvolvimento Humano).

A legenda à direita mostra uma escala divergente de cores de dez níveis, de 0 a 1, com intervalos de 0.1.

De acordo com os autores, o IDHM pode ser entendido, de uma forma simplificada, como:`
)})
    },
    {
      inputs: ["html","boxDiv"],
      value: (function(html,boxDiv){return(
html`
<ul>
<li> 0 a 0,5 (exclusive): Muito baixo
${boxDiv(0.0)}
${boxDiv(0.1)}
${boxDiv(0.2)}
${boxDiv(0.3)}
${boxDiv(0.4)}
<li> 0,5 a 0,6 (exclusive): Baixo
${boxDiv(0.5)}
<li> 0,6 a 0,7 (exclusive): Médio
${boxDiv(0.6)}
<li> 0,7 a 0,8 (exclusive): Alto
${boxDiv(0.7)}
<li> Maior ou igual a 0,8: Muito alto
${boxDiv(0.8)}
${boxDiv(0.9)}
</ul>
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### Em 1991, mais de 85% dos municípios do Brasil tinham IDHM *muito baixo*
*Passe o mouse sobre os municípios e sobre a legenda. Informações adicionais são mostradas abaixo do mapa*.`
)})
    },
    {
      name: "idhm_1991",
      inputs: ["mapa"],
      value: (function(mapa){return(
mapa("T1991", "tipT1991")
)})
    },
    {
      inputs: ["DOM"],
      value: (function(DOM)
{
  const i = DOM.element("div", {id:"tipT1991"});
  i.textContent = "Carregando mapa...";
  return i;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
# Educação, o grande abismo do Brasil de 1991

A dimensão Educação do IDHM é uma composição de indicadores de escolaridade da população adulta e de fluxo escolar da população jovem.

A *escolaridade da população adulta* é medida pelo ***percentual da população de 18 anos ou mais de idade com o ensino fundamental completo***.

O *fluxo escolar da população jovem* é medido pela média aritmética:
1. ***do percentual de crianças de 5 a 6 anos frequentando a escola***;
2. ***do percentual de jovens de 11 a 13 anos frequentando os anos finais do ensino fundamental regular***;
3. ***do percentual de jovens de 15 a 17 anos com ensino fundamental completo***; e
4. ***do percentual de jovens de 18 a 20 anos com ensino médio completo***.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`A *escolaridade da população* adulta reflete o funcionamento do sistema educacional em períodos passados e considera que a população adulta brasileira deveria ter completado, pelo menos, o ensino fundamental em sua passagem pelo sistema educacional.

Os *indicadores do fluxo escolar* da população jovem acompanham a população em idade escolar em quatro momentos importantes da sua formação: entrada no sistema educacional; finalização do primeiro ciclo do ensino fundamental (neste caso, é captado somente o ensino regular); e conclusão do ensino fundamental e do ensino médio. Os indicadores medem a adequação idade-série desse fluxo, pressupondo que as crianças, ao menos a partir dos 5 anos de idade, precisam já estar na escola; que as crianças de 12 anos precisam estar nos anos finais do ensino fundamental; que os jovens de 16 anos precisam ter concluído o ensino fundamental; e que os jovens de 19 anos precisam ter concluído o ensino médio. A expansão dessas faixas etárias no cálculo do indicador se dá por questões amostrais e estatísticas.
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Como é o cálculo da dimensão Educação do IDHM?
Considerando-se que as taxas de frequência e de conclusão variam entre 0% e 100% e que os valores mínimo e máximo escolhidos são também 0% e 100%, para "convertê-las" em um índice variando de 0 a 1, basta dividir a taxa por 100. 

Assim, se um determinado lugar tem:
- 65% de sua população adulta (18 anos ou mais) com ensino fundamental completo
- 85% de crianças de 5 a 6 anos na escola
- 80% de crianças de 11 a 13 nos anos finais do ensino fundamental
- 70% de crianças de 15 a 17 anos com ensino fundamental completo
- 50% de jovens de 18 a 20 anos com ensino médio completo

***índice de escolaridade da população adulta***:`
)})
    },
    {
      inputs: ["tex"],
      value: (function(tex){return(
tex`iEpa = 0,650`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Seu índice de fluxo escolar da população jovem será a média aritmética dos subíndices referentes aos 4 indicadores, com peso igual.

***índice de fluxo escolar***:`
)})
    },
    {
      inputs: ["tex"],
      value: (function(tex){return(
tex`iFe = (0,850+0,800+0,700+0,500) / 4 = 0,712`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Seu IDHM Educação será a média geométrica desses dois índices, com peso 1 para o índice de escolaridade e peso 2 para o índice de fluxo`
)})
    },
    {
      inputs: ["tex"],
      value: (function(tex){return(
tex`\text{IDHM Educação} = \sqrt[3]{iEpa+iFe+iFe} = \sqrt[3]{0,650+0,712+0,712} = 0,691`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### Em 1991, 60% dos municípios possuíam índice menor que 0,2.
### Apenas 4 municípios estavam no nível *baixo* (entre 0,4 e 0,5), todos os outros em *muito baixo*.`
)})
    },
    {
      name: "Educacao",
      inputs: ["mapa"],
      value: (function(mapa){return(
mapa("E1991", "tipE1991")
)})
    },
    {
      inputs: ["DOM"],
      value: (function(DOM)
{
  const i = DOM.element("div", {id:"tipE1991"});
  i.textContent = "Carregando mapa...";
  return i;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Mapa interativo
Selecione o ano e a série que deseja visualizar.

*Passe o mouse sobre os municípios e sobre a legenda. Informações adicionais são mostradas abaixo do mapa*.`
)})
    },
    {
      inputs: ["md","bind","html","viewof ano","viewof serie"],
      value: (function(md,bind,html,$0,$1){return(
md`Ano: ${bind(html`
<select id="selecIndicador">
          <option value="2010" selected>2010</option>
          <option value="2000">2000</option>
          <option value="1991">1991</option>
        </select>
`, $0)} Serie: ${bind(html`
        <select id="selecSerie">
          <option value="T" selected>Total</option>
          <option value="L">Longevidade</option>
          <option value="E">Educação</option>
          <option value="R">Renda</option>
        </select>
`, $1)}`
)})
    },
    {
      name: "IDHM_Brasil",
      inputs: ["mapa","viewof selecao"],
      value: (function(mapa,$0){return(
mapa($0, "tipE2010")
)})
    },
    {
      inputs: ["DOM"],
      value: (function(DOM)
{
  const i = DOM.element("div", {id:"tipE2010"});
  i.textContent = "Carregando mapa...";
  return i;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Referências:
* [Atlas do Desenvolvimento Humano do Brasil](http://www.atlasbrasil.org.br/2013/pt/o_atlas/o_atlas_/)
* [IBGE](https://www.ibge.gov.br/)
* [Mapas](ftp://geoftp.ibge.gov.br/)
* [Mike Bostock Inline Inputs](https://beta.observablehq.com/@mbostock/inline-inputs)`

)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Código, dados e variáveis de apoio`
)})
    },
    {
      from: "@mbostock/inline-inputs",
      name: "bind",
      remote: "bind"
    },
    {
      from: "@mbostock/inline-inputs",
      name: "View",
      remote: "View"
    },
    {
      name: "mapa",
      inputs: ["colorDiverging","d3","seriesName","width","DOM","topojson","brasil","projecao","HDIByLocality","popMun","areaMun","numBrazil","quantize","quantizeSlices","idhm"],
      value: (function(colorDiverging,d3,seriesName,width,DOM,topojson,brasil,projecao,HDIByLocality,popMun,areaMun,numBrazil,quantize,quantizeSlices,idhm){return(
function(serie, tip) {
  const color = colorDiverging;
  const colorMarker = "black";
  const tooltip = d3.select("#"+tip)
    .style("visibility", "visible")
    .html("IDHM Brasil - " + seriesName(serie[0]) + " " + serie.slice(1));
  const height = width * 2/3;
  const svg = d3.select(DOM.svg(width, height))
    .attr("viewBox", "0 0 960 650")
    .attr("id", serie)
    .style("height", "100%")
    .style("width", "100%");
  // Map projection
 const braF = topojson.feature(brasil, brasil.objects.BRMUN),
    path = d3.geoPath()
    .projection(projecao.fitSize([width, height], braF));
  // Legend data
  const colorList = [...Array(10).keys()].map(i => [i, color(i)]),
        WIDTH = 25,
        HEIGHT = 60,
        X0 = 840,
        Y0 = 40;

  function munMouseover(d) {
    var populacao2017, populacaoAno;
    var k;
    var nomeMun, CD_GEOCMU, indice, munData;

    CD_GEOCMU = d.properties.CD_GEOCMU;
    indice = HDIByLocality.get(CD_GEOCMU);
    nomeMun = indice.municipio;

    munData = popMun.get(CD_GEOCMU);
    populacao2017 = munData.estimativa;
    populacaoAno = munData.populacao["p" + serie.slice(1)];
    k = nomeMun + " (" + munData.estado + ")";
    if (areaMun.get(CD_GEOCMU).area > 0)
      k += "<br>Área: " + numBrazil(areaMun.get(CD_GEOCMU).area, {
        maximumFractionDigits: 2
      }) + " km<sup>2</sup>";
    if (populacao2017 != 0) {
      if (!isNaN(indice["IDHM" + serie]))
        k += "<br>Índice " + serie.slice(1) + ": " + numBrazil(indice["IDHM" + serie]);
      if (!isNaN(populacaoAno))
        k += "<br>População " + serie.slice(1) + ": " + numBrazil(populacaoAno);
      k += "<br>População 2017: " + numBrazil(populacao2017);
    }

    tooltip.html(k);
    svg.selectAll("path").filter(function(mun) {
      return mun.properties.CD_GEOCMU == CD_GEOCMU;
    }).style("fill", colorMarker);

    return tooltip.style("visibility", "visible");
  }
 
  function mouseOut(d) {
    svg.selectAll("path").filter(function(dd) {
      return dd.properties.CD_GEOCMU == d.properties.CD_GEOCMU;
    }).style("fill",function(d) {
      var i = HDIByLocality.get(d.properties.CD_GEOCMU);
      return color(quantize(i["IDHM" + serie]));
    });
    return tooltip.style("visibility", "hidden");
  }
  
  // Renders map
  svg.append("g")
    .attr("class", "municipalities")
    .selectAll("path")
    .data(braF.features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", function(d) {
      var i = HDIByLocality.get(d.properties.CD_GEOCMU);
      return color(quantize(i["IDHM" + serie]));
    });
  
  svg.select(".municipalities").selectAll("path")
    .on("mouseover", munMouseover)
    .on("mouseout", mouseOut);
  
  // Renders legend
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
    })
    .on("mouseover", labelMouseover)
    .on("mouseout", labelMouseout);
  
  function labelMouseover(d) {
    const FACTOR = 1 / 10;
    var minV = +(d[0] * FACTOR).toPrecision(1),
        maxV = +(d[0] * FACTOR + FACTOR).toPrecision(1);
    var k, municipalities, numMunicipalities, 
        sliceColorMode;

    municipalities = svg.select(".municipalities").selectAll("path")
        .filter(function(mun) {
          var GEOCMU, indice;
          if (mun.properties.CD_GEOCMU == undefined)
            return false;
          GEOCMU = mun.properties.CD_GEOCMU;
          indice = HDIByLocality.get(GEOCMU)["IDHM" + serie];
          return indice >= minV && indice < maxV;
        });
      municipalities
        .style("fill", colorMarker);

      var dataSeries = function() {
            return seriesName(serie[0]) + ": de " + numBrazil(minV) + " a " + numBrazil(maxV);
          },
          dataLevel = function() {
            function msgIndex(index, serie) {
              const suffix = {"T": "o", "E": "a", "R": "a", "L": "a"};
              const msg = ["Muito baix", "Baix", "Médi", "Alt", "Muito alt"];
              return msg[quantizeSlices(index)] + suffix[serie];
            }
            return msgIndex((minV+maxV)/2, serie[0]);
          },
          dataMunicipalities = function() {
            const totalMunicipalities = idhm.length - 2;
            const percentMun = (numMunicipalities/totalMunicipalities) * 100;
            return numBrazil(numMunicipalities) + " municípios (" +
                   numBrazil(percentMun, {
                              maximumFractionDigits: 2
                             }) +"%)";
          };
      numMunicipalities = municipalities._groups[0].length;
      k = dataSeries() + "<br>" +
          dataLevel() + "<br>" +
          dataMunicipalities();
      tooltip.html(k);
      return tooltip.style("visibility", "visible");
    }

    function redrawMap() {
      svg.select(".municipalities").selectAll("path")
         .style("fill", function(d) {
            var i = HDIByLocality.get(d.properties.CD_GEOCMU);
            return color(quantize(i["IDHM" + serie]));
          });
    }
  
    function labelMouseout(d) {
      redrawMap();
      return tooltip.style("visibility", "hidden");
    }
    
    function repaintMap(filter, duration) {
      var serie, sliceColorMode;
      serie = document.getElementById('selecSerie').value;
      sliceColorMode = document.getElementById('colorMode').checked;

      svg.select(".municipalities").selectAll("path")
         .transition().duration(duration).ease(d3.easeCubicInOut)
         .filter(filter)
         .style("fill", function(d) {
            var i = HDIByLocality.get(d.properties.CD_GEOCMU);
            return color(quantize(i["IDHM" + serie]));
          });
    }
  
    function repaintMARKED() {
      // Repaints all colorMarked regions, no transition
      repaintMap(function(mun) {
        return d3.select(this).style("fill") == "rgb(0, 0, 0)";
      }, 0);
    }

  return svg.node();
}
)})
    },
    {
      name: "viewof ano",
      inputs: ["View"],
      value: (function(View){return(
new View(2010)
)})
    },
    {
      name: "ano",
      inputs: ["Generators","viewof ano"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof serie",
      inputs: ["View"],
      value: (function(View){return(
new View("T")
)})
    },
    {
      name: "serie",
      inputs: ["Generators","viewof serie"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof selecao",
      inputs: ["serie","ano"],
      value: (function(serie,ano){return(
serie+ano
)})
    },
    {
      name: "selecao",
      inputs: ["Generators","viewof selecao"],
      value: (G, _) => G.input(_)
    },
    {
      name: "seriesName",
      value: (function(){return(
function(label) {
    const nameSerie = {'T': 'IDHM Total', 'E': 'Educação', 'R': 'Renda', 'L': 'Longevidade'};
    return nameSerie[label];
  }
)})
    },
    {
      name: "selectYearSeries",
      value: (function(){return(
function(series){
  return document.getElementById('selecIndicador' + series).value;
}
)})
    },
    {
      name: "boxDiv",
      inputs: ["colorDiverging","quantize"],
      value: (function(colorDiverging,quantize){return(
function(level) {
  return "<div style='width:50px;height:20px;background-color:" +
          colorDiverging(quantize(level)) + "'></div>";
}
)})
    },
    {
      name: "quantize",
      inputs: ["d3"],
      value: (function(d3){return(
d3.scaleQuantize()
               .domain([0, 1])
               .range(d3.range(10).map(function(i) {
                 return i;
             }))
)})
    },
    {
      name: "quantizeSlices",
      inputs: ["d3"],
      value: (function(d3){return(
d3.scaleQuantize()
                   .domain([0,1])
                   .range(d3.range(10).map(function(i){
                     return i < 5 ? 0 : i < 6 ? 1 : i < 7 ? 2 : i < 8 ? 3 : 4;
                   }))
)})
    },
    {
      name: "colorDiverging",
      inputs: ["colorVec"],
      value: (function(colorVec){return(
function(i) {
  return colorVec(i, ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695', '#eeeeee']);
}
)})
    },
    {
      name: "colorSlices",
      inputs: ["colorVec"],
      value: (function(colorVec){return(
function(i) {
  return colorVec(i, ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6', '#ffffff']);
}
)})
    },
    {
      name: "colorVec",
      value: (function(){return(
function (i, vec) {
  if (isNaN(i))
    return vec[vec.length-1];
  return vec[Math.min(Math.max(0, i), vec.length-1)];
}
)})
    },
    {
      name: "projecao",
      inputs: ["d3"],
      value: (function(d3){return(
d3.geoMercator()
)})
    },
    {
      inputs: ["area","areaMun"],
      value: (function(area,areaMun)
{
  const i = area.length;
  for(let j=0; j<i; j++)
    areaMun.set(area[j].CD_GEOCMU, {
        area: area[j].Area
      });
  
  return areaMun.get("3304557");
}
)
    },
    {
      name: "areaMun",
      inputs: ["d3"],
      value: (function(d3){return(
d3.map()
)})
    },
    {
      name: "area",
      inputs: ["d3"],
      value: (async function(d3)
{
  const data = await d3.csv("https://raw.githubusercontent.com/RobStelling/idhm/master/csv/AR_BR_MUN_2017.csv");
  let area = data.map(d => ({
        CD_GEOCMU: d.CD_GCMUN,
        Area: +d.AR_MUN_2017
  }));
  return area;
}
)
    },
    {
      inputs: ["populacao","popMun"],
      value: (function(populacao,popMun)
{
  const i = populacao.length;
  for (let j=0; j<i; j++)
    popMun.set(populacao[j].CD_GEOCMU, {
        populacao: {
          p2010: populacao[j].Pop2010,
          p2000: populacao[j].Pop2000,
          p1991: populacao[j].Pop1991
        },
        estimativa: populacao[j].PopEst2017,
        estado: populacao[j].UF
      })
  return popMun.get("3304557")
}
)
    },
    {
      name: "populacao",
      inputs: ["d3"],
      value: (async function(d3)
{
  const data = await d3.csv("https://raw.githubusercontent.com/RobStelling/idhm/master/csv/pop91_00_10_17.csv");
  
    let pop = data
    .map(d => ({
                CD_GEOCMU: d.CD_GEOCMU,
                PopEst2017: +d.PopEst2017,
                UF: d.UF,
                Pop1991: +d.Pop1991,
                Pop2000: +d.Pop2000,
                Pop2010: +d.Pop2010
              }));
  return pop;
}
)
    },
    {
      inputs: ["idhm","HDIByLocality"],
      value: (function(idhm,HDIByLocality)
{
  let i = idhm.length;
  for(let j = 0; j < i; j++) {
      HDIByLocality.set(idhm[j].CD_GEOCMU, {
        IDHMT2010: +idhm[j].IDHMT2010,
        IDHMR2010: +idhm[j].IDHMR2010,
        IDHML2010: +idhm[j].IDHML2010,
        IDHME2010: +idhm[j].IDHME2010,
        IDHMT2000: +idhm[j].IDHMT2000,
        IDHMR2000: +idhm[j].IDHMR2000,
        IDHML2000: +idhm[j].IDHML2000,
        IDHME2000: +idhm[j].IDHME2000,
        IDHMT1991: +idhm[j].IDHMT1991,
        IDHMR1991: +idhm[j].IDHMR1991,
        IDHML1991: +idhm[j].IDHML1991,
        IDHME1991: +idhm[j].IDHME1991,
        municipio: idhm[j].Município,
        ranking: {
          r2010: +idhm[j].RT2010,
          r2000: +idhm[j].RT2000,
          r1991: +idhm[j].RT1991
        },
        estado: idhm[j].Estado
      })
  }
  return HDIByLocality.get("3304557")
}
)
    },
    {
      name: "totalMunicipalities",
      inputs: ["numBrazil","idhm"],
      value: (function(numBrazil,idhm){return(
numBrazil(idhm.length-2)
)})
    },
    {
      name: "numBrazil",
      value: (function(){return(
function(number, options) {
  return number.toLocaleString("pt-BR", options);
}
)})
    },
    {
      name: "idhm",
      inputs: ["d3"],
      value: (async function(d3)
{
  const data = await d3.csv("https://raw.githubusercontent.com/RobStelling/idhm/master/csv/IDHM.csv");

  let idhm = data
    .map(d => ({
 
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
    }));
  return idhm;
}
)
    },
    {
      name: "popMun",
      inputs: ["d3"],
      value: (function(d3){return(
d3.map()
)})
    },
    {
      name: "HDIByLocality",
      inputs: ["d3"],
      value: (function(d3){return(
d3.map()
)})
    },
    {
      name: "brasil",
      inputs: ["d3"],
      value: (async function(d3)
{ 
  const url = "https://raw.githubusercontent.com/RobStelling/mapas/master/json/BRMUE250GC_SIR_05.json";
  const brasil = await d3.json(url);
     
  return brasil;
}
)
    },
    {
      name: "topojson",
      inputs: ["require"],
      value: (function(require){return(
require("topojson-client@3")
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    }
  ]
};

const m1 = {
  id: "@mbostock/inline-inputs",
  variables: [
    {
      name: "bind",
      inputs: ["MutationObserver"],
      value: (function(MutationObserver){return(
function bind(input, view) {
  const value = ["range", "number"].includes(input.type) ? "valueAsNumber" : "value";
  input.oninput = () => view.value = input[value];
  input[value] = view.value;
  requestAnimationFrame(() => {
    const update = () => input[value] = view.value;
    const target = input.closest(".observablehq");
    if (!target) return;
    const observer = new MutationObserver(mutations => {
      if (target.contains(input)) return;
      view.removeEventListener("input", update);
      observer.disconnect();
    });
    observer.observe(target, {childList: true});
    view.addEventListener("input", update);
  });
  return input;
}
)})
    },
    {
      name: "View",
      value: (function(){return(
class View {
  constructor(value) {
    Object.defineProperties(this, {
      _list: {value: [], writable: true},
      _value: {value, writable: true}
    });
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this.dispatchEvent({type: "input", value});
  }
  addEventListener(type, listener) {
    if (type != "input" || this._list.includes(listener)) return;
    this._list = [listener].concat(this._list);
  }
  removeEventListener(type, listener) {
    if (type != "input") return;
    this._list = this._list.filter(l => l !== listener);
  }
  dispatchEvent(event) {
    const p = Promise.resolve(event);
    this._list.forEach(l => p.then(l));
  }
}
)})
    }
  ]
};

const notebook = {
  id: "017fbabb77877333@683",
  modules: [m0,m1]
};

export default notebook;
