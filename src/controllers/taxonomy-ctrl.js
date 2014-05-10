define(['d3'], function(d3) {
    
    return function($scope, $location, $rootScope, wsClient) {
        $rootScope.$on("$locationChangeStart", function(event, next, current) {
            $scope.alreadySummed = false;
            $scope.initialize();
            $scope.update($scope.root);
        });
        
        $scope.getMode = function(path) {
            switch (path) {
                case '/taxonomy' :
                    return 'T';
                case '/taxonomy/distribution' :
                    return 'D';
                case '/taxonomy/deficit' :
                    return 'F';
            }
            return 'T';
        };
        $scope.mode = $scope.getMode($location.path());
        $scope.selectedClass = 'btn btn-success active';
        $scope.unselectedClass = 'btn btn-success';
        $scope.buttons = [];
        $scope.height = 1000;
        $scope.m = [20, 120, 20, 120];
        $scope.w = 1280 - $scope.m[1] - $scope.m[3];
        $scope.h = $scope.height - $scope.m[0] - $scope.m[2];
        $scope.i = 0;
        $scope.root = {};
        $scope.spendField = "total";
        $scope.sumFields = ["totalBHD", "totalCLD", "totalISD", "totalMDD", "total"];

        $scope.colors = ["#D5252F", "#E96B38", "#F47337", "#B02D5D",
            "#9B2C67", "#982B9A", "#692DA7", "#5725AA", "#4823AF",
            "#d7b5d8", " #df65b0", "#dd1c77", "#980043"];

        $scope.formatNumber = d3.format(",.0f");//d3.format(",.3f");
        $scope.formatCurrency = function(d) {
            return $scope.formatNumber(d) + " People";
        };

        $scope.tree = d3.layout.tree();

        $scope.tree.children(function(d) {
            //console.log('###');
            //console.log(d);
            return (d._embedded) ? d._embedded.children : null;
        });

        $scope.tree.size([$scope.h, $scope.w]);

        $scope.bhdDiv = d3.select(document.getElementById("bhdDiv"));
        $scope.cldDiv = d3.select(document.getElementById("cldDiv"));
        $scope.isdDiv = d3.select(document.getElementById("isdDiv"));
        $scope.mddDiv = d3.select(document.getElementById("mddDiv"));
        $scope.toolTip = d3.select(document.getElementById("toolTip"));
        $scope.header = d3.select(document.getElementById("head"));
        $scope.header1 = d3.select(document.getElementById("header1"));
        $scope.header2 = d3.select(document.getElementById("header2"));

        $scope.bhdCount = d3.select(document.getElementById("bhdCount"));
        $scope.cldCount = d3.select(document.getElementById("cldCount"));
        $scope.isdCount = d3.select(document.getElementById("isdCount"));
        $scope.mddCount = d3.select(document.getElementById("mddCount"));

        $scope.diagonal = d3.svg.diagonal()
                .projection(function(d) {
                    return [d.y, d.x];
                });

        $scope.vis = d3.select("#body").append("svg:svg")
                .attr("width", $scope.w + $scope.m[1] + $scope.m[3])
                .attr("height", $scope.h + $scope.m[0] + $scope.m[2])
                .append("svg:g")
                .attr("transform", "translate(" + $scope.m[3] + "," + $scope.m[0] + ")");

        $scope.levelMax = [{}, {}, {}, {}, {}, {}];

        $scope.alreadySummed = false;


        $scope.select = function(index) {

            $scope.reset();
            $scope.buttons[index] = $scope.selectedClass;

            switch (index) {
                case 'BHD':
                    {
                        $scope.bhdDiv.attr("class", "selected");
                        $scope.cldDiv.attr("class", null);
                        $scope.isdDiv.attr("class", null);
                        $scope.mddDiv.attr("class", null);

                        $scope.spendField = "totalBHD";

                        $scope.update($scope.root);
                    }
                    break;
                case 'CLD':
                    {
                        $scope.bhdDiv.attr("class", null);
                        $scope.cldDiv.attr("class", "selected");
                        $scope.isdDiv.attr("class", null);
                        $scope.mddDiv.attr("class", null);

                        $scope.spendField = "totalCLD";

                        $scope.update($scope.root);
                    }
                    break;
                case 'ISD':
                    {
                        $scope.bhdDiv.attr("class", null);
                        $scope.cldDiv.attr("class", null);
                        $scope.isdDiv.attr("class", "selected");
                        $scope.mddDiv.attr("class", null);

                        $scope.spendField = "totalISD";

                        $scope.update($scope.root);
                    }
                    break;
                case 'MDD':
                    {
                        $scope.bhdDiv.attr("class", null);
                        $scope.cldDiv.attr("class", null);
                        $scope.isdDiv.attr("class", null);
                        $scope.mddDiv.attr("class", "selected");

                        $scope.spendField = "totalMDD";


                        $scope.update($scope.root);
                    }
                    break;
                case 'ALL' :
                    {
                        $scope.bhdDiv.attr("class", null);
                        $scope.cldDiv.attr("class", null);
                        $scope.isdDiv.attr("class", null);
                        $scope.mddDiv.attr("class", null);

                        $scope.spendField = "total";

                        $scope.update($scope.root);
                    }
                    break;
            }

        };


        $scope.reset = function() {
            $scope.buttons['ISD'] = $scope.unselectedClass;
            $scope.buttons['BHD'] = $scope.unselectedClass;
            $scope.buttons['CLD'] = $scope.unselectedClass;
            $scope.buttons['MDD'] = $scope.unselectedClass;
            $scope.buttons['ALL'] = $scope.unselectedClass;
        };
        ////////////////////////////
        //////////////////////////////
        ////////////////////////////////
        $scope.cloneSum = function(sum) {
            var result = {};
            for (var i = 0; i < $scope.sumFields.length; i++)
                result[$scope.sumFields[i]] = sum[$scope.sumFields[i]];
            return result;
        };

        $scope.preorder = function(parent, node, level, nodeAction, leafAction) {
            if (node.name && level > 0)
            {
                $scope.nodeLabelsStack[level - 1] = node.name;
            }
            node.parent = parent;
            if (nodeAction) {
                nodeAction(node, level, $scope.nodeLabelsStack);
            }
            if (node._embedded && node._embedded.children && node._embedded.children.length > 0) {

                for (var i = 0; i < node._embedded.children.length; i++)
                {
                    $scope.preorder(node, node._embedded.children[i], level + 1, nodeAction, leafAction);
                }
            }
            else {
                if (leafAction)
                    leafAction(node, level, $scope.nodeLabelsStack);
            }
        };

        $scope.postorder = function(node, level, nodeAction, leafAction) {
            
            if (node._embedded && node._embedded.children && node._embedded.children.length > 0) {
                if (nodeAction)
                    nodeAction(node);
                node.sum = null;
                for (var i = 0; i < node._embedded.children.length; i++)
                {
                    
                    var result = $scope.postorder(node._embedded.children[i], level + 1, nodeAction, leafAction);
                    if (!node.sum) {
                        node.sum = result;
                        //console.log('sum initialised for :'+node.key);
                        //console.log(node.sum);
                    } else {
                        
                        for (var j = 0; j < $scope.sumFields.length; j++) {
                            node.sum[$scope.sumFields[j]] += result[$scope.sumFields[j]];
                        }
                        //console.log('sum added for :'+node.key);
                        //console.log(node.sum);
                    }
                }

                return $scope.cloneSum(node.sum);
            }
            else {
                if (leafAction) {
                    return leafAction(node, level, $scope.nodeLabelsStack);
                }
            }
            
            return {};
        };

        $scope.initialize = function() {
            $scope.preorder(null, $scope.root, 0, function(node, level, stack) {
                $scope.radiusLevel(node);
            }, function(node, level, stack) {
                $scope.radiusLevel(node);
            });
            
            // for (var i=0; i < sumFields.length; i++) {
            // 	for (var level=0; level<levelMax.length; level++)
            // 	levelMax[level].sum[sumFields[i]]=0;
            // }
            //sumNodes(root.children);
        };

        $scope.radiusLevel = function(node) {
            if ($scope.mode === 'T')
                return;
            try {
                var r;
                //if (!node.values) return 1;
                //console.log(node);

                if (node.parent && node.parent.sum) {

                    r = d3.scale.sqrt()
                            .domain([0, node.parent.sum[$scope.spendField]])
                            .range([1, node.parent.radius()]);

                    var rsize = r(node.sum[$scope.spendField]);
//                                        if (rsize > 1) {
//                                        console.log('node = '+node.name);
//                                        console.log(' radius = '+ rsize);
//                                    }
//                                        console.log(' based on sum=' + node.sum[$scope.spendField]);
//                                        console.log(' parent sum='+$scope.maxRadius(node.parent.sum[$scope.spendField]));
//                                        console.log(' range max=' + ((node.parent.radius) ? node.parent.radius() : $scope.maxRadius($scope.maxValue)));
                    //console.log();
                    node.radius = function() {
                        return (node.sum) ? r(node.sum[$scope.spendField]) : $scope.maxRadius($scope.maxValue);
                    };
                    return node.radius();
                }
            }
            catch (e) {
                console.log('err=' + e);
                console.log(e);
                console.log('node=' + node);
                console.log(node);
            }
            ;


        }; //expands to setup...

        $scope.toggleAll = function(d) {
            if (d.values && d.values.actuals) {
                d.values.actuals.forEach($scope.toggleAll);
                $scope.toggle(d);
            }
            else if (d.values) {
                d.values.forEach($scope.toggleAll);
                $scope.toggle(d);
            }
        };

        $scope.setSourceFields = function(child, parent) {
            if (parent) {
                for (var i = 0; i < levelMax.length; i++) {
                    var sourceField = 'Level' + i;
                    if (child[sourceField] != undefined) {
                        child["source_" + sourceField] = child[sourceField];
                    }
                    parent["source_" + sourceField] = (child["source_" + sourceField]) ? child["source_" + sourceField] : child[sourceField];
                }
            }
        };

        $scope.update = function(source) {

            $scope.initialize();
            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            var nodes = $scope.tree.nodes($scope.root).reverse();

            var depthCounter = 0;

            // Normalize for fixed-depth.
            nodes.forEach(function(d) {
                d.y = d.depth * 180;
                d.numChildren = (d.children) ? d.children.length : 0;

                if (d.depth === 1) {
                    d.linkColor = $scope.colors[(depthCounter % ($scope.colors.length - 1))];
                    depthCounter++;
                }

                if (d.numChildren === 0 && d._children)
                    d.numChildren = d._children.length;

            });

            //Set link colors
            nodes.forEach(function(d) {
                var obj = d;

                while ((obj.source && obj.source.depth > 1) || obj.depth > 1) {
                    obj = (obj.source) ? obj.source.parent : obj.parent;
                }

                d.linkColor = (obj.source) ? obj.source.linkColor : obj.linkColor;

            });

            // Update the nodes…
            var node = $scope.vis.selectAll("g.node")
                    .data(nodes, function(d) {
                        return d.id || (d.id = ++$scope.i);
                    });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("svg:g")
                    .attr("class", "node")
                    .attr("transform", function(d) {
                        return "translate(" + source.y0 + "," + source.x0 + ")";
                    })
                    .on("click", function(d) {

                        if (d.numChildren > 50) {
                            alert(d.name + " has too many departments (" + d.numChildren + ") to view at once.");
                        }
                        else {
                            $scope.toggle(d);
                            $scope.update(d);
                        }
                    });

            nodeEnter.append("svg:circle") //append circle into g.node
                    .attr("r", 1e-6)
                    .on("mouseover", function(d) {
                        $scope.node_onMouseOver(d);
                    })
                    .on("mouseout", function(d) {							// when the mouse leaves a circle, do the following
                        $scope.toolTip.transition()									// declare the transition properties to fade-out the div
                                .duration(500)									// it shall take 500ms
                                .style("opacity", "0");							// and go all the way to an opacity of nil
                    })
                    .on("click", function(d) {
                        //console.log('sel='+d.selected);
                        if (!d.values) {
                            d.selected = !d.selected;

                        }
                    })
                    .style("fill", function(d) {
//                                    if ($scope.mode === 'F' && d.) {
//                                        
//                                    }

                        return d.source ? d.source.linkColor : d.linkColor;
                    })
                    .style("fill-opacity", ".8")
                    .style("stroke", function(d) {
                        return d.source ? d.source.linkColor : d.linkColor;
                    });


            var text = nodeEnter.append("svg:text");
            text.attr("x", function(d) {
                return d.children || d._children ? -10 : 20;
            })
                    .attr("dy", ".35em")
                    .attr("text-anchor",
                            function(d) {
                                return d.children || d._children ? "end" : "start";
                            })
                    .text(function(d) {
                        var ret = d.name; // use key as label for all nodes
                        ret = (String(ret).length > 25) ? String(ret).substr(0, 22) + "..." : ret;

                        if (d.values) {
                            return ret;
                        } else {
                            var append = (d.selected) ? "[x] " : "[ ] ";
                            return append + ret;
                        }
                    })
                    .on("mouseover", function(d) {
                        $scope.node_onMouseOver(d);
                    })
                    .on("mouseout", function(d) {								// when the mouse leaves a circle, do the following
                        $scope.toolTip.transition()									// declare the transition properties to fade-out the div
                                .duration(500)									// it shall take 500ms
                                .style("opacity", "0");							// and go all the way to an opacity of nil
                    })

                    .style("fill-opacity", "0");

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                    .duration(duration)
                    .attr("transform", function(d) {
                        return "translate(" + d.y + "," + d.x + ")";
                    });

            nodeUpdate.select("circle")
                    .attr("r", function(d) {
                        if (d.depth == 0) {
                            return 20;
                        }
                        else {
                            var ret = $scope.radiusLevel(d);
                            if (d.name === 'JPA') {
                                console.log('circle radius for ' + d.name + ' =' + ret + ' sf=' + ((d.sum) ? d.sum[$scope.spendField] : 'NULL'));
                                console.log($scope.root.radius());
                            }
                            return (isNaN(ret) ? 3 : ret);
                        }

                    })
                    .style("fill", function(d) {
                        if ($scope.mode === 'F' && d.numChildren == 0) {

                            if (d._embedded && d._embedded.empInfo && d._embedded.empInfo.delta >= 0) {
                                console.log('green');
                                return 'green';
                            } else {
                                console.log('red');
                                return 'red';
                            }
                        }
                        //console.log('white');
                        return 'white';
                        //return d.source ? d.source.linkColor: d.linkColor; 
                    })
                    .style("fill-opacity", function(d) {
                        if (d.numChildren == 0)
                            return 1;
                        var ret = ((d.depth + 1) / $scope.levelMax.length);
                        return 1 - ret;
                    });

            // nodeUpdate.select("text").text(function (d) { return d.selected;})




            nodeUpdate.select("text").text(function(d) {
                var ret = d.name; // use key as label for all nodes
                ret = (String(ret).length > 25) ? String(ret).substr(0, 22) + "..." : ret;


                if (!d._embedded || !d._embedded.children) {
                    if ($scope.mode === 'F') {
                        var sign = (d._embedded.empInfo.delta == 0) ? '' : ((d._embedded.empInfo.delta > 0) ? '+' : '-');
                        return ret + '(' + sign + d._embedded.empInfo.delta + ')';
                    } else {

                    }
                    return ret;
                } else {
                    var append = (d.selected) ? "> " : "< ";

                    return append + ret;
                }
            })
                    .style("fill-opacity", 1);
            //nodeUpdate.select("circle").style('fill', function (d) { if (!d.values) {return 'white';}});
            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", function(d) {
                        return "translate(" + source.y + "," + source.x + ")";
                    })
                    .remove();

            nodeExit.select("circle")
                    .attr("r", 1e-6);

            nodeExit.select("text")
                    .style("fill-opacity", 1e-6);

            // Update the links…
            var link = $scope.vis.selectAll("path.link")
                    .data($scope.tree.links(nodes), function(d) {
                        return d.target.id;
                    });

            var rootCounter = 0;

            // Enter any new links at the parent's previous position.
            link.enter().insert("svg:path", "g")
                    .attr("class", "link")
                    .attr("d", function(d) {
                        if (d.target && d.target.sum)
                        {
                            if (Number(d.target.sum[$scope.spendField]) > 0) {
                                var o = {x: source.x0, y: source.y0};
                                return $scope.diagonal({source: o, target: o});
                            }
                            else {
                                null;
                            }
                        }
                    })
                    .style("stroke", function(d, i) {
                        if (!d.source.parent) {
                            rootCounter++;
                            return (d.source.children[rootCounter - 1].linkColor);
                        }
                        else {
                            return (d.source) ? d.source.linkColor : d.linkColor;
                        }
                    })
                    .style("stroke-width", function(d, i) {

                        var ret = $scope.radiusLevel(d.target) * 2;
                        //console.log('stroke-width for '+d.target.name+' = '+ret);
                        if ($scope.mode === 'T')
                            return 4;
                        return (isNaN(ret) ? 4 : ret);

                    })
                    .style("stroke-opacity", function(d) {
                        var ret = ((d.source.depth + 1) / 4.5);
                        //console.log('mode = ' + $scope.mode);
                        if ($scope.mode === 'T') {
                            return .1;
                        }
                        if (d.target && d.target.sum) {
                            if (d.target.sum[$scope.spendField] <= 0)
                                ret = .1;
                        }
                        return ret;
                    })
                    .style("stroke-linecap", "round")
                    .transition()
                    .duration(duration);
            //.attr("d", diagonal);


            // Transition links to their new position.
            var linkUpdate = link.transition()
                    .duration(duration)
                    .attr("d", $scope.diagonal);

            linkUpdate.style("stroke-width", function(d, i) {
                var ret = $scope.radiusLevel(d.target) * 2;

                if ($scope.mode === 'T')
                    return 4;
                return (isNaN(ret) ? 4 : ret);
            })
                    //.style("stroke-dasharray", function(d) {
                    //  var ret=(d.target[spendField] > 0) ? "" : "5,8";
                    //   return ret;
                    //})
                    .style("stroke-opacity", function(d) {
                        var ret = ((d.source.depth + 1) / 4.5);
                        if ($scope.mode === 'T') {
                            return .5;
                        }
                        if (d.target && d.target.sum) {
                            if (d.target.sum[$scope.spendField] <= 0)
                                ret = .1;
                        }
                        return ret;
                    });


            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                    .duration(duration)
                    .attr("d", $scope.diagonal)
                    .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });

        };

        $scope.node_onMouseOver = function(d) {
            $scope.toolTip.transition()
                    .duration(200)
                    .style("opacity", ".9");
            $scope.header.text(d["Level0"]);
            $scope.header1.text((d.depth > 1) ? d["Level1"] : "");
            $scope.header2.html((d.depth > 2) ? d["Level2"] : "");
            if (d.depth > 3)
                $scope.header2.html($scope.header2.html() + " - " + d["Level3"]);
            if (d.depth > 4)
                $scope.header2.html($scope.header2.html() + " - " + d["Level4"]);

            if (d.sum) {
                $scope.bhdCount.text($scope.formatCurrency(d.sum["totalBHD"]));
                $scope.cldCount.text($scope.formatCurrency(d.sum["totalCLD"]));
                $scope.isdCount.text($scope.formatCurrency(d.sum["totalISD"]));
                $scope.mddCount.text($scope.formatCurrency(d.sum["totalMDD"]));
            }
            $scope.toolTip.style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 75) + "px");
        };

        // Toggle children.
        $scope.toggle = function(d) {
            if (d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
            }
        };
        $scope.showDuButtons = function() {
            return $scope.mode === 'D';
        }

        ////////////////////////////////
        ///////////////////////////////////
        ////////////////////////////////
        $scope.select($scope.spendField);
        // initialization
        //$scope.strdata = '[{"key":"Testing","values":[{"key":"Performance","values":[{"key":"JMeter","values":[{"key":"v1.0","BHD":"1","CLD":"2","ISD":"3","MDD":"4"},{"key":"v2.0","BHD":"1","CLD":"4","ISD":"2","MDD":"3"},{"key":"v3.0","BHD":"3","CLD":"1","ISD":"4","MDD":"2"}]}]},{"key":"Manual","values":[{"key":"ISTQB","values":[{"key":"2010","BHD":"2","CLD":"1","ISD":"3","MDD":"4"},{"key":"2011","BHD":"4","CLD":"2","ISD":"3","MDD":"1"},{"key":"2012","BHD":"2","CLD":"3","ISD":"4","MDD":"1"}]}]},{"key":"Automation","values":[{"key":"Selenium","values":[{"key":"RC","BHD":"3","CLD":"2","ISD":"1","MDD":"4"},{"key":"WebDriver","BHD":"1","CLD":"3","ISD":"4","MDD":"2"}]}]}]},{"key":"Development","values":[{"key":"Java","values":[{"key":"EE","values":[{"key":"5","BHD":"1","CLD":"2","ISD":"3","MDD":"4"},{"key":"6 ext","values":[{"key":"8.0","BHD":"1","CLD":"1","ISD":"2","MDD":"2"}]},{"key":"7","Federal":"0.083","BHD":"3","CLD":"2","ISD":"4","MDD":"1"}]}]},{"key":".NET","values":[{"key":"ASP.NET MVC","values":[{"key":"4","BHD":"4","CLD":"1","ISD":"2","MDD":"1"}]}]},{"key":"UI","values":[{"key":"JavaScript*","BHD":"3","CLD":"2","ISD":"2","MDD":"100"},{"key":"jQuery*","BHD":"4","CLD":"3","ISD":"4","MDD":"2"}]}]}]';
        wsClient.getTaxonomy(function(taxonomy) {

            $scope.root = taxonomy;
            //JSON.parse($scope.strdata);
            $scope.root.x0 = $scope.h / 2;
            $scope.root.y0 = 0;

            $scope.nodeLabelsStack = [];

            $scope.preorder(null, $scope.root, 0, function(node, level, stack) {

                for (var i = 0; i < level; i++) {
                    node['Level' + i] = stack[i];
                    //console.log('Level'+i+' = '+stack[i]);
                }

            },
                    function(node, level, stack) {

                        for (var i = 0; i < level; i++)
                        {
                            node['Level' + i] = stack[i];
                            //console.log('Level'+i+' = '+stack[i]);
                        }

                    });

            $scope.postorder($scope.root, 0, null, function(node, level, stack) {
                var result = {};
                for (var i = 0; i < $scope.sumFields.length; i++) {
                    result[$scope.sumFields[i]] = Number((node["_embedded"].empInfo) ? node["_embedded"].empInfo[$scope.sumFields[i]] : 0);
                    if (isNaN(result[$scope.sumFields[i]])) {
                        result[$scope.sumFields[i]] = 0;
                    }
                }
                node.sum = result;
                //                console.log('LEAF '+node.name);
                //                console.log(result);
                return $scope.cloneSum(result);
            });


            //console.log('max value='+$scope.root.sum[$scope.spendField]+' spend field='+$scope.spendField);

            $scope.root.radius = function() {
                return 40;
            };
            $scope.maxRadius = d3.scale.sqrt().domain([0, $scope.root.sum[$scope.spendField]]).range([1, $scope.root.radius()]);

            console.log('ROOT!');
            console.log($scope.root);
            //rollup(root.values);

            $scope.nodes = $scope.tree.nodes($scope.root).reverse();

            $scope.tree.children(function(d) {
                return d.children;
            });

            $scope.initialize();
            //setup();

            $scope.alreadySummed = true;

            // Initialize the display to show a few nodes.
            $scope.root["_embedded"].children.forEach($scope.toggleAll);
            $scope.toggle($scope.root["_embedded"].children[2]);

            $scope.update($scope.root);
        });

    };
}
);