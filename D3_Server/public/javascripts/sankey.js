// 접수, 위원회 심사, 체계자구 심사, 본회의 심의, 정부 이송, 공포, 대안반영폐기, 폐기, 철회, 의결

        // 접수 : 접수!!  > 위원회 심사  > 체계자구 심사  > 본회의 심의  > 정부 이송  > 공포
        // 위원회 심사 : 접수  > 위원회 심사!!  > 체계자구 심사  > 본회의 심의  > 정부 이송  > 공포
        // 체계자구심사 : 접수  > 위원회 심사  > 체계자구 심사!!  > 본회의 심의  > 정부 이송  > 공포
        // 본회의심의 : 접수  > 위원회 심사  > 체계자구 심사  > 본회의 심의!!  > 정부 이송  > 공포
        // 정부 이송 : 접수  > 위원회 심사  > 체계자구 심사  > 본회의 심의  > 정부 이송!!  > 공포
        // 공포 : 접수  > 본회의 심의  > 정부 이송  > 공포
        // 대안반영폐기 : 접수  > 위원회 심사  > 본회의 심의  > 대안반영폐기
        // 폐기 : 접수  > 위원회 심사  > 폐기
        // 철회 : 접수 > 위원회 심사 > 철회
        // 의결 : 접수  > 본회의 심의  > 의결
        
        var dropdown = document.getElementById("dropdown");
        
        var energy = energy1
        var pet = pet1;
        
        var keywords = new Array
        
        pet.forEach(function(d){
            if(keywords.indexOf(d.keyword1)==-1)
                keywords.push(d.keyword1);
            if(keywords.indexOf(d.keyword2)==-1)
                keywords.push(d.keyword2);
            if(keywords.indexOf(d.keyword3)==-1)
                keywords.push(d.keyword3);
        })
        keywords.forEach(function (d,i){
            var option = document.createElement("option");
            option.text = d;

            dropdown.add(option);
        })

        var margin = {
                top: 1,
                right: 1,
                bottom: 6,
                left: 1
            },
            width = 1000 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

        var formatNumber = d3.format(",d"),
            format = function(d) {
                return formatNumber(d) + " 개의 의안 존재";
            },
            color = d3.scale.category20();

        pageLoad();

        function pageLoad(sort) {
            console.log(sort);
            var test = JSON.parse(JSON.stringify(original))


            d3.select("g").remove();

            var svg = d3.select("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var sankey = d3_sankey()
                .nodeWidth(15)
                .nodePadding(10)
                .size([width, height]);

            var path = sankey.link();

            var freqCounter = 1;
            if (sort != undefined) {
                var deleter = new Array;
                for (var i = 0; i < test.length; i++) {
                    if (test[i].title != sort)
                        deleter.push(i);
                }
                for (var i = deleter.length - 1; i > -1; i--)
                    test.splice(deleter[i], 1);
            }
            else {
                var deleter = new Array;
                for (var i = 0; i < test.length; i++) {
                    if (test[i].title != keywords[0]&&test[i].title != keywords[1]&&test[i].title != keywords[2])
                        deleter.push(i);
                }
                for (var i = deleter.length - 1; i > -1; i--)
                    test.splice(deleter[i], 1);
            }
            
            if(test.length==0){
                alert("해당 키워드를 포함한 의안이 없습니다.")
                return;
            }

            var energy = new Object;

            var nodes = [{
                    "name": "접수"
                }, {
                    "name": "위원회 심사"
                }, {
                    "name": "체계자구 심사"
                }, {
                    "name": "본회의 심의"
                }, {
                    "name": "정부 이송"
                }, {
                    "name": "공포"
                },
                {
                    "name": "대안반영폐기"
                }, {
                    "name": "폐기"
                }, {
                    "name": "철회"
                }, {
                    "name": "의결"
                }
            ];
            var links = new Array;

            energy.nodes = nodes;
            energy.links = links;

            var values = [];

            for (var i = 0; i < test.length; i++) {
                var temp = new Object;
                temp.name = test[i].name;
                energy.nodes.push(temp);
                values[0] = test[i].one;
                values[1] = test[i].two;
                values[2] = test[i].three;
                values[3] = test[i].four;
                values[4] = test[i].five;
                values[5] = test[i].six;
                values[6] = test[i].seven;
                values[7] = test[i].eight;
                values[8] = test[i].nine;
                values[9] = test[i].ten;

                link = {
                    "source": i + 10,
                    "target": 0,
                    "value": values[0] + values[1] + values[2] + values[3] + values[4] + values[5] + values[6] + values[7] + values[8] + values[9],
                    "realColor": i + 10
                };
                if (link.value != 0)
                    energy.links.push(link);
                //    var realColor=energy.nodes[energy.nodes.length-1].color;
                //    console.log(energy.nodes[energy.nodes.length-1]);
                link = {
                    "source": 0,
                    "target": 1,
                    "value": values[1] + values[2] + values[3] + values[4] + values[6] + values[7] + values[8],
                    "realColor": i + 10
                };
                if (link.value != 0)
                    energy.links.push(link);
                link = {
                    "source": 1,
                    "target": 2,
                    "value": values[2] + values[3] + values[4],
                    "realColor": i + 10
                };
                if (link.value != 0)
                    energy.links.push(link);
                link = {
                    "source": 2,
                    "target": 3,
                    "value": values[3] + values[4],
                    "realColor": i + 10
                };
                if (link.value != 0)
                    energy.links.push(link);
                link = {
                    "source": 0,
                    "target": 3,
                    "value": values[5] + values[9],
                    "realColor": i + 10
                };
                if (link.value != 0)
                    energy.links.push(link);
                link = {
                    "source": 1,
                    "target": 3,
                    "value": values[6],
                    "realColor": i + 10
                };
                if (link.value != 0)
                    energy.links.push(link);
                link = {
                    "source": 3,
                    "target": 4,
                    "value": values[4] + values[5],
                    "realColor": i + 10
                };
                if (link.value != 0)
                    energy.links.push(link);
                link = {
                    "source": 4,
                    "target": 5,
                    "value": values[5],
                    "realColor": i + 10
                };
                if (link.value != 0)
                    energy.links.push(link);
                link = {
                    "source": 3,
                    "target": 6,
                    "value": values[6],
                    "realColor": i + 10
                };
                if (link.value != 0)
                    energy.links.push(link);
                link = {
                    "source": 1,
                    "target": 7,
                    "value": values[7],
                    "realColor": i + 10
                };
                if (link.value != 0)
                    energy.links.push(link);
                link = {
                    "source": 1,
                    "target": 8,
                    "value": values[8],
                    "realColor": i + 10
                };
                if (link.value != 0)
                    energy.links.push(link);
                link = {
                    "source": 3,
                    "target": 9,
                    "value": values[9],
                    "realColor": i + 10
                };
                if (link.value != 0)
                    energy.links.push(link);
            }


            sankey
                .nodes(energy.nodes)
                .links(energy.links)
                .layout(32);
            var link = svg.append("g").selectAll(".link")
                .data(energy.links)
                .enter().append("path")
                .attr("source", function(d) {
                    return energy.nodes[d.realColor].name;
                })
                .attr("class", "link")
                .attr("d", path)
                .style("stroke-width", function(d) {
                    return Math.max(1, d.dy);
                })
                .sort(function(a, b) {
                    return b.dy - a.dy;
                })
                .on("mouseover", mouseOver)
                .on("mouseout", mouseOut);

            link.append("title")
                .text(function(d) {
                    return d.source.name + " → " + d.target.name + "\n" + format(d.value) + "\n" + "Source : " + energy.nodes[d.realColor].name;
                });

            var node = svg.append("g").selectAll(".node")
                .data(energy.nodes)
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
                .call(d3.behavior.drag()
                    .origin(function(d) {
                        return d;
                    })
                    .on("dragstart", function() {
                        this.parentNode.appendChild(this);
                    })
                    .on("drag", dragmove));
            node.append("rect")
                .attr("height", function(d) {
                    return d.dy;
                })
                .attr("width", sankey.nodeWidth())
                .style("fill", function(d) {
                    return d.color = color(d.name.replace(/ .*/, ""));
                })
                .style("stroke", "none")
                .append("title")
                .text(function(d) {
                    return d.name + "\n" + format(d.value);
                });

            node.append("text")
                .attr("x", -6)
                .attr("y", function(d) {
                    return d.dy / 2;
                })
                .attr("dy", ".50em")
                .style("font-size", "13px")
                .attr("text-anchor", "end")
                .attr("transform", null)
                .text(function(d) {
                    return d.name;
                })
                .filter(function(d) {
                    return d.x < width / 2;
                })
                .attr("x", 6 + sankey.nodeWidth())
                .attr("text-anchor", "start")
                .style("font-size", "13px")

            function dragmove(d) {
                d3.select(this).attr("transform",
                    "translate(" + (
                        d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
                    ) + "," + (
                        d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                    ) + ")");
                sankey.relayout();
                link.attr("d", path);
            }

            var linkExtent = d3.extent(energy.links, function(d) {
                return d.value
            });
            var frequencyScale = d3.scale.linear().domain(linkExtent).range([0.05, 1]);
            var particleSize = d3.scale.linear().domain(linkExtent).range([1, 5]);


            energy.links.forEach(function(link) {
                link.freq = frequencyScale(link.value);
                link.particleSize = Math.max(2.5, particleSize(link.value));
                link.particleColor = d3.scale.linear().domain([0, 1]).range([link.source.color, link.target.color]);
            })

            var t = d3.timer(tick, 1000);
            var particles = [];

            function tick(elapsed, time) {

                particles = particles.filter(function(d) {
                    return d.current < d.path.getTotalLength()
                });

                d3.selectAll("path.link")
                    .each(
                        function(d) {
                            //        if (d.freq < 1) {
                            for (var x = 0; x < 2; x++) {
                                var offset = (Math.random() - .5) * (d.dy - 4);
                                if (Math.random() < /*d.freq*/ 0.07) {
                                    var length = this.getTotalLength();
                                    particles.push({
                                        link: d,
                                        time: elapsed,
                                        offset: offset,
                                        path: this,
                                        length: length,
                                        animateTime: length,
                                        speed: 0.5 + (Math.random())
                                    })
                                }
                            }

                            //        }
                            /*        else {
                                  for (var x = 0; x<d.freq; x++) {
                                    var offset = (Math.random() - .5) * d.dy;
                                    particles.push({link: d, time: elapsed, offset: offset, path: this})
                                  }
                                } */
                        }).on("click", function(d) {
                        //console.log(energy.nodes[d.realColor].name.substring(0,energy.nodes[d.realColor].name.length-3));
                        location.href = "time/" + energy.nodes[d.realColor].name.substring(0, energy.nodes[d.realColor].name.length - 3);
                        return;
                    });

                particleEdgeCanvasPath(elapsed);
            }

            function particleEdgeCanvasPath(elapsed) {
                var context = d3.select("canvas").node().getContext("2d")

                context.clearRect(0, 0, 2000, 1800);

                context.fillStyle = "gray";
                context.lineWidth = "1px";
                for (var x in particles) {
                    if (particles[x].link.realColor < energy.nodes.length) {
                        var currentTime = elapsed - particles[x].time;
                        //        var currentPercent = currentTime / 1000 * particles[x].path.getTotalLength();
                        particles[x].current = currentTime * 0.15 * particles[x].speed;
                        var currentPos = particles[x].path.getPointAtLength(particles[x].current);
                        context.beginPath();
                        context.fillStyle = energy.nodes[particles[x].link.realColor].color;
                        context.arc(currentPos.x, currentPos.y + particles[x].offset, particles[x].link.particleSize, 0, 2 * Math.PI);
                        context.fill();
                    }
                }
            }

            function mouseOver(d) {
                var source = energy.nodes[d.realColor].name;
                var selected = d3.selectAll("path.link").filter(function(d) {
                    return energy.nodes[d.realColor].name == source;
                });
                selected.style("stroke-opacity", .50);
            }

            function mouseOut() {
                var selected = d3.selectAll("path.link");
                selected.style("stroke-opacity", .15);
            }
        }