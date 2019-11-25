/*
 * JQuery zTree core v3.5.40
 * http://treejs.cn/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2019-01-18
 */
(function (r) {
    var J, K, L, M, N, O, v, t = {}, w = {}, x = {}, P = {
        treeId: "",
        treeObj: null,
        view: {
            addDiyDom: null,
            autoCancelSelected: !0,
            dblClickExpand: !0,
            expandSpeed: "fast",
            fontCss: {},
            nameIsHTML: !1,
            selectedMulti: !0,
            showIcon: !0,
            showLine: !0,
            showTitle: !0,
            txtSelectedEnable: !1
        },
        data: {
            key: {isParent: "isParent", children: "children", name: "name", title: "", url: "url", icon: "icon"},
            simpleData: {enable: !1, idKey: "id", pIdKey: "pId", rootPId: null},
            keep: {parent: !1, leaf: !1}
        },
        async: {
            enable: !1, contentType: "application/x-www-form-urlencoded", type: "post",
            dataType: "text", headers: {}, xhrFields: {}, url: "", autoParam: [], otherParam: [], dataFilter: null
        },
        callback: {
            beforeAsync: null,
            beforeClick: null,
            beforeDblClick: null,
            beforeRightClick: null,
            beforeMouseDown: null,
            beforeMouseUp: null,
            beforeExpand: null,
            beforeCollapse: null,
            beforeRemove: null,
            onAsyncError: null,
            onAsyncSuccess: null,
            onNodeCreated: null,
            onClick: null,
            onDblClick: null,
            onRightClick: null,
            onMouseDown: null,
            onMouseUp: null,
            onExpand: null,
            onCollapse: null,
            onRemove: null
        }
    }, y = [function (a) {
        var b = a.treeObj, c = g.event;
        b.bind(c.NODECREATED,
            function (b, c, i) {
                h.apply(a.callback.onNodeCreated, [b, c, i])
            });
        b.bind(c.CLICK, function (b, c, i, e, k) {
            h.apply(a.callback.onClick, [c, i, e, k])
        });
        b.bind(c.EXPAND, function (b, c, i) {
            h.apply(a.callback.onExpand, [b, c, i])
        });
        b.bind(c.COLLAPSE, function (b, c, i) {
            h.apply(a.callback.onCollapse, [b, c, i])
        });
        b.bind(c.ASYNC_SUCCESS, function (b, c, i, e) {
            h.apply(a.callback.onAsyncSuccess, [b, c, i, e])
        });
        b.bind(c.ASYNC_ERROR, function (b, c, i, e, k, g) {
            h.apply(a.callback.onAsyncError, [b, c, i, e, k, g])
        });
        b.bind(c.REMOVE, function (b, c, i) {
            h.apply(a.callback.onRemove,
                [b, c, i])
        });
        b.bind(c.SELECTED, function (b, c, i) {
            h.apply(a.callback.onSelected, [c, i])
        });
        b.bind(c.UNSELECTED, function (b, c, i) {
            h.apply(a.callback.onUnSelected, [c, i])
        })
    }], z = [function (a) {
        var b = g.event;
        a.treeObj.unbind(b.NODECREATED).unbind(b.CLICK).unbind(b.EXPAND).unbind(b.COLLAPSE).unbind(b.ASYNC_SUCCESS).unbind(b.ASYNC_ERROR).unbind(b.REMOVE).unbind(b.SELECTED).unbind(b.UNSELECTED)
    }], A = [function (a) {
        var b = e.getCache(a);
        b || (b = {}, e.setCache(a, b));
        b.nodes = [];
        b.doms = []
    }], B = [function (a, b, c, d, f, i) {
        if (c) {
            var m =
                e.getRoot(a), k = e.nodeChildren(a, c);
            c.level = b;
            c.tId = a.treeId + "_" + ++m.zId;
            c.parentTId = d ? d.tId : null;
            c.open = typeof c.open == "string" ? h.eqs(c.open, "true") : !!c.open;
            b = e.nodeIsParent(a, c);
            h.isArray(k) ? (e.nodeIsParent(a, c, !0), c.zAsync = !0) : (b = e.nodeIsParent(a, c, b), c.open = b && !a.async.enable ? c.open : !1, c.zAsync = !b);
            c.isFirstNode = f;
            c.isLastNode = i;
            c.getParentNode = function () {
                return e.getNodeCache(a, c.parentTId)
            };
            c.getPreNode = function () {
                return e.getPreNode(a, c)
            };
            c.getNextNode = function () {
                return e.getNextNode(a, c)
            };
            c.getIndex = function () {
                return e.getNodeIndex(a, c)
            };
            c.getPath = function () {
                return e.getNodePath(a, c)
            };
            c.isAjaxing = !1;
            e.fixPIdKeyValue(a, c)
        }
    }], u = [function (a) {
        var b = a.target, c = e.getSetting(a.data.treeId), d = "", f = null, i = "", m = "", k = null, j = null,
            o = null;
        if (h.eqs(a.type, "mousedown")) m = "mousedown"; else if (h.eqs(a.type, "mouseup")) m = "mouseup"; else if (h.eqs(a.type, "contextmenu")) m = "contextmenu"; else if (h.eqs(a.type, "click")) if (h.eqs(b.tagName, "span") && b.getAttribute("treeNode" + g.id.SWITCH) !== null) d = h.getNodeMainDom(b).id,
            i = "switchNode"; else {
            if (o = h.getMDom(c, b, [{
                tagName: "a",
                attrName: "treeNode" + g.id.A
            }])) d = h.getNodeMainDom(o).id, i = "clickNode"
        } else if (h.eqs(a.type, "dblclick") && (m = "dblclick", o = h.getMDom(c, b, [{
            tagName: "a",
            attrName: "treeNode" + g.id.A
        }]))) d = h.getNodeMainDom(o).id, i = "switchNode";
        if (m.length > 0 && d.length == 0 && (o = h.getMDom(c, b, [{
            tagName: "a",
            attrName: "treeNode" + g.id.A
        }]))) d = h.getNodeMainDom(o).id;
        if (d.length > 0) switch (f = e.getNodeCache(c, d), i) {
            case "switchNode":
                e.nodeIsParent(c, f) ? h.eqs(a.type, "click") || h.eqs(a.type,
                    "dblclick") && h.apply(c.view.dblClickExpand, [c.treeId, f], c.view.dblClickExpand) ? k = J : i = "" : i = "";
                break;
            case "clickNode":
                k = K
        }
        switch (m) {
            case "mousedown":
                j = L;
                break;
            case "mouseup":
                j = M;
                break;
            case "dblclick":
                j = N;
                break;
            case "contextmenu":
                j = O
        }
        return {stop: !1, node: f, nodeEventType: i, nodeEventCallback: k, treeEventType: m, treeEventCallback: j}
    }], C = [function (a) {
        var b = e.getRoot(a);
        b || (b = {}, e.setRoot(a, b));
        e.nodeChildren(a, b, []);
        b.expandTriggerFlag = !1;
        b.curSelectedList = [];
        b.noSelection = !0;
        b.createdNodes = [];
        b.zId = 0;
        b._ver =
            (new Date).getTime()
    }], D = [], E = [], F = [], G = [], H = [], e = {
        addNodeCache: function (a, b) {
            e.getCache(a).nodes[e.getNodeCacheId(b.tId)] = b
        }, getNodeCacheId: function (a) {
            return a.substring(a.lastIndexOf("_") + 1)
        }, addAfterA: function (a) {
            E.push(a)
        }, addBeforeA: function (a) {
            D.push(a)
        }, addInnerAfterA: function (a) {
            G.push(a)
        }, addInnerBeforeA: function (a) {
            F.push(a)
        }, addInitBind: function (a) {
            y.push(a)
        }, addInitUnBind: function (a) {
            z.push(a)
        }, addInitCache: function (a) {
            A.push(a)
        }, addInitNode: function (a) {
            B.push(a)
        }, addInitProxy: function (a,
                                   b) {
            b ? u.splice(0, 0, a) : u.push(a)
        }, addInitRoot: function (a) {
            C.push(a)
        }, addNodesData: function (a, b, c, d) {
            var f = e.nodeChildren(a, b);
            f ? c >= f.length && (c = -1) : (f = e.nodeChildren(a, b, []), c = -1);
            if (f.length > 0 && c === 0) f[0].isFirstNode = !1, j.setNodeLineIcos(a, f[0]); else if (f.length > 0 && c < 0) f[f.length - 1].isLastNode = !1, j.setNodeLineIcos(a, f[f.length - 1]);
            e.nodeIsParent(a, b, !0);
            c < 0 ? e.nodeChildren(a, b, f.concat(d)) : (a = [c, 0].concat(d), f.splice.apply(f, a))
        }, addSelectedNode: function (a, b) {
            var c = e.getRoot(a);
            e.isSelectedNode(a, b) ||
            c.curSelectedList.push(b)
        }, addCreatedNode: function (a, b) {
            (a.callback.onNodeCreated || a.view.addDiyDom) && e.getRoot(a).createdNodes.push(b)
        }, addZTreeTools: function (a) {
            H.push(a)
        }, exSetting: function (a) {
            r.extend(!0, P, a)
        }, fixPIdKeyValue: function (a, b) {
            a.data.simpleData.enable && (b[a.data.simpleData.pIdKey] = b.parentTId ? b.getParentNode()[a.data.simpleData.idKey] : a.data.simpleData.rootPId)
        }, getAfterA: function (a, b, c) {
            for (var d = 0, e = E.length; d < e; d++) E[d].apply(this, arguments)
        }, getBeforeA: function (a, b, c) {
            for (var d =
                0, e = D.length; d < e; d++) D[d].apply(this, arguments)
        }, getInnerAfterA: function (a, b, c) {
            for (var d = 0, e = G.length; d < e; d++) G[d].apply(this, arguments)
        }, getInnerBeforeA: function (a, b, c) {
            for (var d = 0, e = F.length; d < e; d++) F[d].apply(this, arguments)
        }, getCache: function (a) {
            return x[a.treeId]
        }, getNodeIndex: function (a, b) {
            if (!b) return null;
            for (var c = b.parentTId ? b.getParentNode() : e.getRoot(a), c = e.nodeChildren(a, c), d = 0, f = c.length - 1; d <= f; d++) if (c[d] === b) return d;
            return -1
        }, getNextNode: function (a, b) {
            if (!b) return null;
            for (var c =
                b.parentTId ? b.getParentNode() : e.getRoot(a), c = e.nodeChildren(a, c), d = 0, f = c.length - 1; d <= f; d++) if (c[d] === b) return d == f ? null : c[d + 1];
            return null
        }, getNodeByParam: function (a, b, c, d) {
            if (!b || !c) return null;
            for (var f = 0, i = b.length; f < i; f++) {
                var m = b[f];
                if (m[c] == d) return b[f];
                m = e.nodeChildren(a, m);
                if (m = e.getNodeByParam(a, m, c, d)) return m
            }
            return null
        }, getNodeCache: function (a, b) {
            if (!b) return null;
            var c = x[a.treeId].nodes[e.getNodeCacheId(b)];
            return c ? c : null
        }, getNodePath: function (a, b) {
            if (!b) return null;
            var c;
            (c = b.parentTId ?
                b.getParentNode().getPath() : []) && c.push(b);
            return c
        }, getNodes: function (a) {
            return e.nodeChildren(a, e.getRoot(a))
        }, getNodesByParam: function (a, b, c, d) {
            if (!b || !c) return [];
            for (var f = [], i = 0, m = b.length; i < m; i++) {
                var k = b[i];
                k[c] == d && f.push(k);
                k = e.nodeChildren(a, k);
                f = f.concat(e.getNodesByParam(a, k, c, d))
            }
            return f
        }, getNodesByParamFuzzy: function (a, b, c, d) {
            if (!b || !c) return [];
            for (var f = [], d = d.toLowerCase(), i = 0, m = b.length; i < m; i++) {
                var k = b[i];
                typeof k[c] == "string" && b[i][c].toLowerCase().indexOf(d) > -1 && f.push(k);
                k = e.nodeChildren(a,
                    k);
                f = f.concat(e.getNodesByParamFuzzy(a, k, c, d))
            }
            return f
        }, getNodesByFilter: function (a, b, c, d, f) {
            if (!b) return d ? null : [];
            for (var i = d ? null : [], m = 0, k = b.length; m < k; m++) {
                var g = b[m];
                if (h.apply(c, [g, f], !1)) {
                    if (d) return g;
                    i.push(g)
                }
                g = e.nodeChildren(a, g);
                g = e.getNodesByFilter(a, g, c, d, f);
                if (d && g) return g;
                i = d ? g : i.concat(g)
            }
            return i
        }, getPreNode: function (a, b) {
            if (!b) return null;
            for (var c = b.parentTId ? b.getParentNode() : e.getRoot(a), c = e.nodeChildren(a, c), d = 0, f = c.length; d < f; d++) if (c[d] === b) return d == 0 ? null : c[d - 1];
            return null
        },
        getRoot: function (a) {
            return a ? w[a.treeId] : null
        }, getRoots: function () {
            return w
        }, getSetting: function (a) {
            return t[a]
        }, getSettings: function () {
            return t
        }, getZTreeTools: function (a) {
            return (a = this.getRoot(this.getSetting(a))) ? a.treeTools : null
        }, initCache: function (a) {
            for (var b = 0, c = A.length; b < c; b++) A[b].apply(this, arguments)
        }, initNode: function (a, b, c, d, e, i) {
            for (var m = 0, g = B.length; m < g; m++) B[m].apply(this, arguments)
        }, initRoot: function (a) {
            for (var b = 0, c = C.length; b < c; b++) C[b].apply(this, arguments)
        }, isSelectedNode: function (a,
                                     b) {
            for (var c = e.getRoot(a), d = 0, f = c.curSelectedList.length; d < f; d++) if (b === c.curSelectedList[d]) return !0;
            return !1
        }, nodeChildren: function (a, b, c) {
            if (!b) return null;
            a = a.data.key.children;
            typeof c !== "undefined" && (b[a] = c);
            return b[a]
        }, nodeIsParent: function (a, b, c) {
            if (!b) return !1;
            a = a.data.key.isParent;
            typeof c !== "undefined" ? (typeof c === "string" && (c = h.eqs(c, "true")), b[a] = !!c) : b[a] = typeof b[a] == "string" ? h.eqs(b[a], "true") : !!b[a];
            return b[a]
        }, nodeName: function (a, b, c) {
            a = a.data.key.name;
            typeof c !== "undefined" &&
            (b[a] = c);
            return "" + b[a]
        }, nodeTitle: function (a, b) {
            return "" + b[a.data.key.title === "" ? a.data.key.name : a.data.key.title]
        }, removeNodeCache: function (a, b) {
            var c = e.nodeChildren(a, b);
            if (c) for (var d = 0, f = c.length; d < f; d++) e.removeNodeCache(a, c[d]);
            e.getCache(a).nodes[e.getNodeCacheId(b.tId)] = null
        }, removeSelectedNode: function (a, b) {
            for (var c = e.getRoot(a), d = 0, f = c.curSelectedList.length; d < f; d++) if (b === c.curSelectedList[d] || !e.getNodeCache(a, c.curSelectedList[d].tId)) c.curSelectedList.splice(d, 1), a.treeObj.trigger(g.event.UNSELECTED,
                [a.treeId, b]), d--, f--
        }, setCache: function (a, b) {
            x[a.treeId] = b
        }, setRoot: function (a, b) {
            w[a.treeId] = b
        }, setZTreeTools: function (a, b) {
            for (var c = 0, d = H.length; c < d; c++) H[c].apply(this, arguments)
        }, transformToArrayFormat: function (a, b) {
            function c(b) {
                d.push(b);
                (b = e.nodeChildren(a, b)) && (d = d.concat(e.transformToArrayFormat(a, b)))
            }

            if (!b) return [];
            var d = [];
            if (h.isArray(b)) for (var f = 0, i = b.length; f < i; f++) c(b[f]); else c(b);
            return d
        }, transformTozTreeFormat: function (a, b) {
            var c, d, f = a.data.simpleData.idKey, i = a.data.simpleData.pIdKey;
            if (!f || f == "" || !b) return [];
            if (h.isArray(b)) {
                var g = [], k = {};
                for (c = 0, d = b.length; c < d; c++) k[b[c][f]] = b[c];
                for (c = 0, d = b.length; c < d; c++) {
                    var j = k[b[c][i]];
                    if (j && b[c][f] != b[c][i]) {
                        var o = e.nodeChildren(a, j);
                        o || (o = e.nodeChildren(a, j, []));
                        o.push(b[c])
                    } else g.push(b[c])
                }
                return g
            } else return [b]
        }
    }, n = {
        bindEvent: function (a) {
            for (var b = 0, c = y.length; b < c; b++) y[b].apply(this, arguments)
        }, unbindEvent: function (a) {
            for (var b = 0, c = z.length; b < c; b++) z[b].apply(this, arguments)
        }, bindTree: function (a) {
            var b = {treeId: a.treeId}, c = a.treeObj;
            a.view.txtSelectedEnable || c.bind("selectstart", v).css({"-moz-user-select": "-moz-none"});
            c.bind("click", b, n.proxy);
            c.bind("dblclick", b, n.proxy);
            c.bind("mouseover", b, n.proxy);
            c.bind("mouseout", b, n.proxy);
            c.bind("mousedown", b, n.proxy);
            c.bind("mouseup", b, n.proxy);
            c.bind("contextmenu", b, n.proxy)
        }, unbindTree: function (a) {
            a.treeObj.unbind("selectstart", v).unbind("click", n.proxy).unbind("dblclick", n.proxy).unbind("mouseover", n.proxy).unbind("mouseout", n.proxy).unbind("mousedown", n.proxy).unbind("mouseup",
                n.proxy).unbind("contextmenu", n.proxy)
        }, doProxy: function (a) {
            for (var b = [], c = 0, d = u.length; c < d; c++) {
                var e = u[c].apply(this, arguments);
                b.push(e);
                if (e.stop) break
            }
            return b
        }, proxy: function (a) {
            var b = e.getSetting(a.data.treeId);
            if (!h.uCanDo(b, a)) return !0;
            for (var b = n.doProxy(a), c = !0, d = 0, f = b.length; d < f; d++) {
                var i = b[d];
                i.nodeEventCallback && (c = i.nodeEventCallback.apply(i, [a, i.node]) && c);
                i.treeEventCallback && (c = i.treeEventCallback.apply(i, [a, i.node]) && c)
            }
            return c
        }
    };
    J = function (a, b) {
        var c = e.getSetting(a.data.treeId);
        if (b.open) {
            if (h.apply(c.callback.beforeCollapse, [c.treeId, b], !0) == !1) return !0
        } else if (h.apply(c.callback.beforeExpand, [c.treeId, b], !0) == !1) return !0;
        e.getRoot(c).expandTriggerFlag = !0;
        j.switchNode(c, b);
        return !0
    };
    K = function (a, b) {
        var c = e.getSetting(a.data.treeId),
            d = c.view.autoCancelSelected && (a.ctrlKey || a.metaKey) && e.isSelectedNode(c, b) ? 0 : c.view.autoCancelSelected && (a.ctrlKey || a.metaKey) && c.view.selectedMulti ? 2 : 1;
        if (h.apply(c.callback.beforeClick, [c.treeId, b, d], !0) == !1) return !0;
        d === 0 ? j.cancelPreSelectedNode(c,
            b) : j.selectNode(c, b, d === 2);
        c.treeObj.trigger(g.event.CLICK, [a, c.treeId, b, d]);
        return !0
    };
    L = function (a, b) {
        var c = e.getSetting(a.data.treeId);
        h.apply(c.callback.beforeMouseDown, [c.treeId, b], !0) && h.apply(c.callback.onMouseDown, [a, c.treeId, b]);
        return !0
    };
    M = function (a, b) {
        var c = e.getSetting(a.data.treeId);
        h.apply(c.callback.beforeMouseUp, [c.treeId, b], !0) && h.apply(c.callback.onMouseUp, [a, c.treeId, b]);
        return !0
    };
    N = function (a, b) {
        var c = e.getSetting(a.data.treeId);
        h.apply(c.callback.beforeDblClick, [c.treeId, b], !0) &&
        h.apply(c.callback.onDblClick, [a, c.treeId, b]);
        return !0
    };
    O = function (a, b) {
        var c = e.getSetting(a.data.treeId);
        h.apply(c.callback.beforeRightClick, [c.treeId, b], !0) && h.apply(c.callback.onRightClick, [a, c.treeId, b]);
        return typeof c.callback.onRightClick != "function"
    };
    v = function (a) {
        a = a.originalEvent.srcElement.nodeName.toLowerCase();
        return a === "input" || a === "textarea"
    };
    var h = {
        apply: function (a, b, c) {
            return typeof a == "function" ? a.apply(Q, b ? b : []) : c
        }, canAsync: function (a, b) {
            var c = e.nodeChildren(a, b), d = e.nodeIsParent(a,
                b);
            return a.async.enable && b && d && !(b.zAsync || c && c.length > 0)
        }, clone: function (a) {
            if (a === null) return null;
            var b = h.isArray(a) ? [] : {}, c;
            for (c in a) b[c] = a[c] instanceof Date ? new Date(a[c].getTime()) : typeof a[c] === "object" ? h.clone(a[c]) : a[c];
            return b
        }, eqs: function (a, b) {
            return a.toLowerCase() === b.toLowerCase()
        }, isArray: function (a) {
            return Object.prototype.toString.apply(a) === "[object Array]"
        }, isElement: function (a) {
            return typeof HTMLElement === "object" ? a instanceof HTMLElement : a && typeof a === "object" && a !== null &&
                a.nodeType === 1 && typeof a.nodeName === "string"
        }, $: function (a, b, c) {
            b && typeof b != "string" && (c = b, b = "");
            return typeof a == "string" ? r(a, c ? c.treeObj.get(0).ownerDocument : null) : r("#" + a.tId + b, c ? c.treeObj : null)
        }, getMDom: function (a, b, c) {
            if (!b) return null;
            for (; b && b.id !== a.treeId;) {
                for (var d = 0, e = c.length; b.tagName && d < e; d++) if (h.eqs(b.tagName, c[d].tagName) && b.getAttribute(c[d].attrName) !== null) return b;
                b = b.parentNode
            }
            return null
        }, getNodeMainDom: function (a) {
            return r(a).parent("li").get(0) || r(a).parentsUntil("li").parent().get(0)
        },
        isChildOrSelf: function (a, b) {
            return r(a).closest("#" + b).length > 0
        }, uCanDo: function () {
            return !0
        }
    }, j = {
        addNodes: function (a, b, c, d, f) {
            var i = e.nodeIsParent(a, b);
            if (!a.data.keep.leaf || !b || i) if (h.isArray(d) || (d = [d]), a.data.simpleData.enable && (d = e.transformTozTreeFormat(a, d)), b) {
                var i = l(b, g.id.SWITCH, a), m = l(b, g.id.ICON, a), k = l(b, g.id.UL, a);
                if (!b.open) j.replaceSwitchClass(b, i, g.folder.CLOSE), j.replaceIcoClass(b, m, g.folder.CLOSE), b.open = !1, k.css({display: "none"});
                e.addNodesData(a, b, c, d);
                j.createNodes(a, b.level +
                    1, d, b, c);
                f || j.expandCollapseParentNode(a, b, !0)
            } else e.addNodesData(a, e.getRoot(a), c, d), j.createNodes(a, 0, d, null, c)
        }, appendNodes: function (a, b, c, d, f, i, g) {
            if (!c) return [];
            var k = [], h = d ? d : e.getRoot(a), h = e.nodeChildren(a, h), o, l;
            if (!h || f >= h.length - c.length) f = -1;
            for (var s = 0, n = c.length; s < n; s++) {
                var p = c[s];
                i && (o = (f === 0 || h.length == c.length) && s == 0, l = f < 0 && s == c.length - 1, e.initNode(a, b, p, d, o, l, g), e.addNodeCache(a, p));
                o = e.nodeIsParent(a, p);
                l = [];
                var I = e.nodeChildren(a, p);
                I && I.length > 0 && (l = j.appendNodes(a, b + 1, I, p, -1,
                    i, g && p.open));
                g && (j.makeDOMNodeMainBefore(k, a, p), j.makeDOMNodeLine(k, a, p), e.getBeforeA(a, p, k), j.makeDOMNodeNameBefore(k, a, p), e.getInnerBeforeA(a, p, k), j.makeDOMNodeIcon(k, a, p), e.getInnerAfterA(a, p, k), j.makeDOMNodeNameAfter(k, a, p), e.getAfterA(a, p, k), o && p.open && j.makeUlHtml(a, p, k, l.join("")), j.makeDOMNodeMainAfter(k, a, p), e.addCreatedNode(a, p))
            }
            return k
        }, appendParentULDom: function (a, b) {
            var c = [], d = l(b, a);
            !d.get(0) && b.parentTId && (j.appendParentULDom(a, b.getParentNode()), d = l(b, a));
            var f = l(b, g.id.UL, a);
            f.get(0) &&
            f.remove();
            f = e.nodeChildren(a, b);
            f = j.appendNodes(a, b.level + 1, f, b, -1, !1, !0);
            j.makeUlHtml(a, b, c, f.join(""));
            d.append(c.join(""))
        }, asyncNode: function (a, b, c, d) {
            var f, i;
            f = e.nodeIsParent(a, b);
            if (b && !f) return h.apply(d), !1; else if (b && b.isAjaxing) return !1; else if (h.apply(a.callback.beforeAsync, [a.treeId, b], !0) == !1) return h.apply(d), !1;
            if (b) b.isAjaxing = !0, l(b, g.id.ICON, a).attr({
                style: "",
                "class": g.className.BUTTON + " " + g.className.ICO_LOADING
            });
            var m = {}, k = h.apply(a.async.autoParam, [a.treeId, b], a.async.autoParam);
            for (f = 0, i = k.length; b && f < i; f++) {
                var q = k[f].split("="), o = q;
                q.length > 1 && (o = q[1], q = q[0]);
                m[o] = b[q]
            }
            k = h.apply(a.async.otherParam, [a.treeId, b], a.async.otherParam);
            if (h.isArray(k)) for (f = 0, i = k.length; f < i; f += 2) m[k[f]] = k[f + 1]; else for (var n in k) m[n] = k[n];
            var s = e.getRoot(a)._ver;
            r.ajax({
                contentType: a.async.contentType,
                cache: !1,
                type: a.async.type,
                url: h.apply(a.async.url, [a.treeId, b], a.async.url),
                data: a.async.contentType.indexOf("application/json") > -1 ? JSON.stringify(m) : m,
                dataType: a.async.dataType,
                headers: a.async.headers,
                xhrFields: a.async.xhrFields,
                success: function (i) {
                    if (s == e.getRoot(a)._ver) {
                        var f = [];
                        try {
                            f = !i || i.length == 0 ? [] : typeof i == "string" ? eval("(" + i + ")") : i
                        } catch (k) {
                            f = i
                        }
                        if (b) b.isAjaxing = null, b.zAsync = !0;
                        j.setNodeLineIcos(a, b);
                        f && f !== "" ? (f = h.apply(a.async.dataFilter, [a.treeId, b, f], f), j.addNodes(a, b, -1, f ? h.clone(f) : [], !!c)) : j.addNodes(a, b, -1, [], !!c);
                        a.treeObj.trigger(g.event.ASYNC_SUCCESS, [a.treeId, b, i]);
                        h.apply(d)
                    }
                },
                error: function (c, d, i) {
                    if (s == e.getRoot(a)._ver) {
                        if (b) b.isAjaxing = null;
                        j.setNodeLineIcos(a, b);
                        a.treeObj.trigger(g.event.ASYNC_ERROR,
                            [a.treeId, b, c, d, i])
                    }
                }
            });
            return !0
        }, cancelPreSelectedNode: function (a, b, c) {
            var d = e.getRoot(a).curSelectedList, f, i;
            for (f = d.length - 1; f >= 0; f--) if (i = d[f], b === i || !b && (!c || c !== i)) if (l(i, g.id.A, a).removeClass(g.node.CURSELECTED), b) {
                e.removeSelectedNode(a, b);
                break
            } else d.splice(f, 1), a.treeObj.trigger(g.event.UNSELECTED, [a.treeId, i])
        }, createNodeCallback: function (a) {
            if (a.callback.onNodeCreated || a.view.addDiyDom) for (var b = e.getRoot(a); b.createdNodes.length > 0;) {
                var c = b.createdNodes.shift();
                h.apply(a.view.addDiyDom,
                    [a.treeId, c]);
                a.callback.onNodeCreated && a.treeObj.trigger(g.event.NODECREATED, [a.treeId, c])
            }
        }, createNodes: function (a, b, c, d, f) {
            if (c && c.length != 0) {
                var i = e.getRoot(a), m = !d || d.open || !!l(e.nodeChildren(a, d)[0], a).get(0);
                i.createdNodes = [];
                var b = j.appendNodes(a, b, c, d, f, !0, m), k, h;
                d ? (d = l(d, g.id.UL, a), d.get(0) && (k = d)) : k = a.treeObj;
                k && (f >= 0 && (h = k.children()[f]), f >= 0 && h ? r(h).before(b.join("")) : k.append(b.join("")));
                j.createNodeCallback(a)
            }
        }, destroy: function (a) {
            a && (e.initCache(a), e.initRoot(a), n.unbindTree(a),
                n.unbindEvent(a), a.treeObj.empty(), delete t[a.treeId])
        }, expandCollapseNode: function (a, b, c, d, f) {
            var i = e.getRoot(a), m;
            if (b) {
                var k = e.nodeChildren(a, b), q = e.nodeIsParent(a, b);
                if (i.expandTriggerFlag) m = f, f = function () {
                    m && m();
                    b.open ? a.treeObj.trigger(g.event.EXPAND, [a.treeId, b]) : a.treeObj.trigger(g.event.COLLAPSE, [a.treeId, b])
                }, i.expandTriggerFlag = !1;
                if (!b.open && q && (!l(b, g.id.UL, a).get(0) || k && k.length > 0 && !l(k[0], a).get(0))) j.appendParentULDom(a, b), j.createNodeCallback(a);
                if (b.open == c) h.apply(f, []); else {
                    var c =
                        l(b, g.id.UL, a), i = l(b, g.id.SWITCH, a), o = l(b, g.id.ICON, a);
                    q ? (b.open = !b.open, b.iconOpen && b.iconClose && o.attr("style", j.makeNodeIcoStyle(a, b)), b.open ? (j.replaceSwitchClass(b, i, g.folder.OPEN), j.replaceIcoClass(b, o, g.folder.OPEN), d == !1 || a.view.expandSpeed == "" ? (c.show(), h.apply(f, [])) : k && k.length > 0 ? c.slideDown(a.view.expandSpeed, f) : (c.show(), h.apply(f, []))) : (j.replaceSwitchClass(b, i, g.folder.CLOSE), j.replaceIcoClass(b, o, g.folder.CLOSE), d == !1 || a.view.expandSpeed == "" || !(k && k.length > 0) ? (c.hide(), h.apply(f, [])) :
                        c.slideUp(a.view.expandSpeed, f))) : h.apply(f, [])
                }
            } else h.apply(f, [])
        }, expandCollapseParentNode: function (a, b, c, d, e) {
            b && (b.parentTId ? (j.expandCollapseNode(a, b, c, d), b.parentTId && j.expandCollapseParentNode(a, b.getParentNode(), c, d, e)) : j.expandCollapseNode(a, b, c, d, e))
        }, expandCollapseSonNode: function (a, b, c, d, f) {
            var i = e.getRoot(a), i = b ? e.nodeChildren(a, b) : e.nodeChildren(a, i), g = b ? !1 : d,
                k = e.getRoot(a).expandTriggerFlag;
            e.getRoot(a).expandTriggerFlag = !1;
            if (i) for (var h = 0, l = i.length; h < l; h++) i[h] && j.expandCollapseSonNode(a,
                i[h], c, g);
            e.getRoot(a).expandTriggerFlag = k;
            j.expandCollapseNode(a, b, c, d, f)
        }, isSelectedNode: function (a, b) {
            if (!b) return !1;
            var c = e.getRoot(a).curSelectedList, d;
            for (d = c.length - 1; d >= 0; d--) if (b === c[d]) return !0;
            return !1
        }, makeDOMNodeIcon: function (a, b, c) {
            var d = e.nodeName(b, c),
                d = b.view.nameIsHTML ? d : d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            a.push("<span id='", c.tId, g.id.ICON, "' title='' treeNode", g.id.ICON, " class='", j.makeNodeIcoClass(b, c), "' style='", j.makeNodeIcoStyle(b, c), "'></span><span id='",
                c.tId, g.id.SPAN, "' class='", g.className.NAME, "'>", d, "</span>")
        }, makeDOMNodeLine: function (a, b, c) {
            a.push("<span id='", c.tId, g.id.SWITCH, "' title='' class='", j.makeNodeLineClass(b, c), "' treeNode", g.id.SWITCH, "></span>")
        }, makeDOMNodeMainAfter: function (a) {
            a.push("</li>")
        }, makeDOMNodeMainBefore: function (a, b, c) {
            a.push("<li id='", c.tId, "' class='", g.className.LEVEL, c.level, "' tabindex='0' hidefocus='true' treenode>")
        }, makeDOMNodeNameAfter: function (a) {
            a.push("</a>")
        }, makeDOMNodeNameBefore: function (a, b, c) {
            var d =
                e.nodeTitle(b, c), f = j.makeNodeUrl(b, c), i = j.makeNodeFontCss(b, c), m = [], k;
            for (k in i) m.push(k, ":", i[k], ";");
            a.push("<a id='", c.tId, g.id.A, "' class='", g.className.LEVEL, c.level, "' treeNode", g.id.A, ' onclick="', c.click || "", '" ', f != null && f.length > 0 ? "href='" + f + "'" : "", " target='", j.makeNodeTarget(c), "' style='", m.join(""), "'");
            h.apply(b.view.showTitle, [b.treeId, c], b.view.showTitle) && d && a.push("title='", d.replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "'");
            a.push(">")
        }, makeNodeFontCss: function (a,
                                      b) {
            var c = h.apply(a.view.fontCss, [a.treeId, b], a.view.fontCss);
            return c && typeof c != "function" ? c : {}
        }, makeNodeIcoClass: function (a, b) {
            var c = ["ico"];
            if (!b.isAjaxing) {
                var d = e.nodeIsParent(a, b);
                c[0] = (b.iconSkin ? b.iconSkin + "_" : "") + c[0];
                d ? c.push(b.open ? g.folder.OPEN : g.folder.CLOSE) : c.push(g.folder.DOCU)
            }
            return g.className.BUTTON + " " + c.join("_")
        }, makeNodeIcoStyle: function (a, b) {
            var c = [];
            if (!b.isAjaxing) {
                var d = e.nodeIsParent(a, b) && b.iconOpen && b.iconClose ? b.open ? b.iconOpen : b.iconClose : b[a.data.key.icon];
                d && c.push("background:url(",
                    d, ") 0 0 no-repeat;");
                (a.view.showIcon == !1 || !h.apply(a.view.showIcon, [a.treeId, b], !0)) && c.push("width:0px;height:0px;")
            }
            return c.join("")
        }, makeNodeLineClass: function (a, b) {
            var c = [];
            a.view.showLine ? b.level == 0 && b.isFirstNode && b.isLastNode ? c.push(g.line.ROOT) : b.level == 0 && b.isFirstNode ? c.push(g.line.ROOTS) : b.isLastNode ? c.push(g.line.BOTTOM) : c.push(g.line.CENTER) : c.push(g.line.NOLINE);
            e.nodeIsParent(a, b) ? c.push(b.open ? g.folder.OPEN : g.folder.CLOSE) : c.push(g.folder.DOCU);
            return j.makeNodeLineClassEx(b) + c.join("_")
        },
        makeNodeLineClassEx: function (a) {
            return g.className.BUTTON + " " + g.className.LEVEL + a.level + " " + g.className.SWITCH + " "
        }, makeNodeTarget: function (a) {
            return a.target || "_blank"
        }, makeNodeUrl: function (a, b) {
            var c = a.data.key.url;
            return b[c] ? b[c] : null
        }, makeUlHtml: function (a, b, c, d) {
            c.push("<ul id='", b.tId, g.id.UL, "' class='", g.className.LEVEL, b.level, " ", j.makeUlLineClass(a, b), "' style='display:", b.open ? "block" : "none", "'>");
            c.push(d);
            c.push("</ul>")
        }, makeUlLineClass: function (a, b) {
            return a.view.showLine && !b.isLastNode ?
                g.line.LINE : ""
        }, removeChildNodes: function (a, b) {
            if (b) {
                var c = e.nodeChildren(a, b);
                if (c) {
                    for (var d = 0, f = c.length; d < f; d++) e.removeNodeCache(a, c[d]);
                    e.removeSelectedNode(a);
                    delete b[a.data.key.children];
                    a.data.keep.parent ? l(b, g.id.UL, a).empty() : (e.nodeIsParent(a, b, !1), b.open = !1, c = l(b, g.id.SWITCH, a), d = l(b, g.id.ICON, a), j.replaceSwitchClass(b, c, g.folder.DOCU), j.replaceIcoClass(b, d, g.folder.DOCU), l(b, g.id.UL, a).remove())
                }
            }
        }, scrollIntoView: function (a, b) {
            if (b) if (typeof Element === "undefined") {
                var c = a.treeObj.get(0).getBoundingClientRect(),
                    d = b.getBoundingClientRect();
                (d.top < c.top || d.bottom > c.bottom || d.right > c.right || d.left < c.left) && b.scrollIntoView()
            } else {
                if (!Element.prototype.scrollIntoViewIfNeeded) Element.prototype.scrollIntoViewIfNeeded = function (a) {
                    function b(a, c) {
                        return {start: a, length: c, end: a + c}
                    }

                    function c(b, d) {
                        return !1 === a || d.start < b.end && b.start < d.end ? Math.max(b.end - d.length, Math.min(d.start, b.start)) : (b.start + b.end - d.length) / 2
                    }

                    function d(a, b) {
                        return {
                            x: a, y: b, translate: function (c, i) {
                                return d(a + c, b + i)
                            }
                        }
                    }

                    function e(a, b) {
                        for (; a;) b =
                            b.translate(a.offsetLeft, a.offsetTop), a = a.offsetParent;
                        return b
                    }

                    for (var g = e(this, d(0, 0)), j = d(this.offsetWidth, this.offsetHeight), h = this.parentNode, l; h instanceof HTMLElement;) l = e(h, d(h.clientLeft, h.clientTop)), h.scrollLeft = c(b(g.x - l.x, j.x), b(h.scrollLeft, h.clientWidth)), h.scrollTop = c(b(g.y - l.y, j.y), b(h.scrollTop, h.clientHeight)), g = g.translate(-h.scrollLeft, -h.scrollTop), h = h.parentNode
                };
                b.scrollIntoViewIfNeeded()
            }
        }, setFirstNode: function (a, b) {
            var c = e.nodeChildren(a, b);
            if (c.length > 0) c[0].isFirstNode =
                !0
        }, setLastNode: function (a, b) {
            var c = e.nodeChildren(a, b);
            if (c.length > 0) c[c.length - 1].isLastNode = !0
        }, removeNode: function (a, b) {
            var c = e.getRoot(a), d = b.parentTId ? b.getParentNode() : c;
            b.isFirstNode = !1;
            b.isLastNode = !1;
            b.getPreNode = function () {
                return null
            };
            b.getNextNode = function () {
                return null
            };
            if (e.getNodeCache(a, b.tId)) {
                l(b, a).remove();
                e.removeNodeCache(a, b);
                e.removeSelectedNode(a, b);
                for (var f = e.nodeChildren(a, d), i = 0, h = f.length; i < h; i++) if (f[i].tId == b.tId) {
                    f.splice(i, 1);
                    break
                }
                j.setFirstNode(a, d);
                j.setLastNode(a,
                    d);
                var k, i = f.length;
                if (!a.data.keep.parent && i == 0) e.nodeIsParent(a, d, !1), d.open = !1, delete d[a.data.key.children], i = l(d, g.id.UL, a), h = l(d, g.id.SWITCH, a), k = l(d, g.id.ICON, a), j.replaceSwitchClass(d, h, g.folder.DOCU), j.replaceIcoClass(d, k, g.folder.DOCU), i.css("display", "none"); else if (a.view.showLine && i > 0) {
                    var q = f[i - 1], i = l(q, g.id.UL, a), h = l(q, g.id.SWITCH, a);
                    k = l(q, g.id.ICON, a);
                    d == c ? f.length == 1 ? j.replaceSwitchClass(q, h, g.line.ROOT) : (c = l(f[0], g.id.SWITCH, a), j.replaceSwitchClass(f[0], c, g.line.ROOTS), j.replaceSwitchClass(q,
                        h, g.line.BOTTOM)) : j.replaceSwitchClass(q, h, g.line.BOTTOM);
                    i.removeClass(g.line.LINE)
                }
            }
        }, replaceIcoClass: function (a, b, c) {
            if (b && !a.isAjaxing && (a = b.attr("class"), a != void 0)) {
                a = a.split("_");
                switch (c) {
                    case g.folder.OPEN:
                    case g.folder.CLOSE:
                    case g.folder.DOCU:
                        a[a.length - 1] = c
                }
                b.attr("class", a.join("_"))
            }
        }, replaceSwitchClass: function (a, b, c) {
            if (b) {
                var d = b.attr("class");
                if (d != void 0) {
                    d = d.split("_");
                    switch (c) {
                        case g.line.ROOT:
                        case g.line.ROOTS:
                        case g.line.CENTER:
                        case g.line.BOTTOM:
                        case g.line.NOLINE:
                            d[0] = j.makeNodeLineClassEx(a) +
                                c;
                            break;
                        case g.folder.OPEN:
                        case g.folder.CLOSE:
                        case g.folder.DOCU:
                            d[1] = c
                    }
                    b.attr("class", d.join("_"));
                    c !== g.folder.DOCU ? b.removeAttr("disabled") : b.attr("disabled", "disabled")
                }
            }
        }, selectNode: function (a, b, c) {
            c || j.cancelPreSelectedNode(a, null, b);
            l(b, g.id.A, a).addClass(g.node.CURSELECTED);
            e.addSelectedNode(a, b);
            a.treeObj.trigger(g.event.SELECTED, [a.treeId, b])
        }, setNodeFontCss: function (a, b) {
            var c = l(b, g.id.A, a), d = j.makeNodeFontCss(a, b);
            d && c.css(d)
        }, setNodeLineIcos: function (a, b) {
            if (b) {
                var c = l(b, g.id.SWITCH,
                    a), d = l(b, g.id.UL, a), f = l(b, g.id.ICON, a), i = j.makeUlLineClass(a, b);
                i.length == 0 ? d.removeClass(g.line.LINE) : d.addClass(i);
                c.attr("class", j.makeNodeLineClass(a, b));
                e.nodeIsParent(a, b) ? c.removeAttr("disabled") : c.attr("disabled", "disabled");
                f.removeAttr("style");
                f.attr("style", j.makeNodeIcoStyle(a, b));
                f.attr("class", j.makeNodeIcoClass(a, b))
            }
        }, setNodeName: function (a, b) {
            var c = e.nodeTitle(a, b), d = l(b, g.id.SPAN, a);
            d.empty();
            a.view.nameIsHTML ? d.html(e.nodeName(a, b)) : d.text(e.nodeName(a, b));
            h.apply(a.view.showTitle,
                [a.treeId, b], a.view.showTitle) && l(b, g.id.A, a).attr("title", !c ? "" : c)
        }, setNodeTarget: function (a, b) {
            l(b, g.id.A, a).attr("target", j.makeNodeTarget(b))
        }, setNodeUrl: function (a, b) {
            var c = l(b, g.id.A, a), d = j.makeNodeUrl(a, b);
            d == null || d.length == 0 ? c.removeAttr("href") : c.attr("href", d)
        }, switchNode: function (a, b) {
            b.open || !h.canAsync(a, b) ? j.expandCollapseNode(a, b, !b.open) : a.async.enable ? j.asyncNode(a, b) || j.expandCollapseNode(a, b, !b.open) : b && j.expandCollapseNode(a, b, !b.open)
        }
    };
    r.fn.zTree = {
        consts: {
            className: {
                BUTTON: "button",
                LEVEL: "level", ICO_LOADING: "ico_loading", SWITCH: "switch", NAME: "node_name"
            },
            event: {
                NODECREATED: "ztree_nodeCreated",
                CLICK: "ztree_click",
                EXPAND: "ztree_expand",
                COLLAPSE: "ztree_collapse",
                ASYNC_SUCCESS: "ztree_async_success",
                ASYNC_ERROR: "ztree_async_error",
                REMOVE: "ztree_remove",
                SELECTED: "ztree_selected",
                UNSELECTED: "ztree_unselected"
            },
            id: {A: "_a", ICON: "_ico", SPAN: "_span", SWITCH: "_switch", UL: "_ul"},
            line: {ROOT: "root", ROOTS: "roots", CENTER: "center", BOTTOM: "bottom", NOLINE: "noline", LINE: "line"},
            folder: {
                OPEN: "open",
                CLOSE: "close", DOCU: "docu"
            },
            node: {CURSELECTED: "curSelectedNode"}
        }, _z: {tools: h, view: j, event: n, data: e}, getZTreeObj: function (a) {
            return (a = e.getZTreeTools(a)) ? a : null
        }, destroy: function (a) {
            if (a && a.length > 0) j.destroy(e.getSetting(a)); else for (var b in t) j.destroy(t[b])
        }, init: function (a, b, c) {
            var d = h.clone(P);
            r.extend(!0, d, b);
            d.treeId = a.attr("id");
            d.treeObj = a;
            d.treeObj.empty();
            t[d.treeId] = d;
            if (typeof document.body.style.maxHeight === "undefined") d.view.expandSpeed = "";
            e.initRoot(d);
            a = e.getRoot(d);
            c = c ? h.clone(h.isArray(c) ?
                c : [c]) : [];
            d.data.simpleData.enable ? e.nodeChildren(d, a, e.transformTozTreeFormat(d, c)) : e.nodeChildren(d, a, c);
            e.initCache(d);
            n.unbindTree(d);
            n.bindTree(d);
            n.unbindEvent(d);
            n.bindEvent(d);
            var f = {
                setting: d, addNodes: function (a, b, c, f) {
                    function g() {
                        j.addNodes(d, a, b, n, f == !0)
                    }

                    a || (a = null);
                    var l = e.nodeIsParent(d, a);
                    if (a && !l && d.data.keep.leaf) return null;
                    l = parseInt(b, 10);
                    isNaN(l) ? (f = !!c, c = b, b = -1) : b = l;
                    if (!c) return null;
                    var n = h.clone(h.isArray(c) ? c : [c]);
                    h.canAsync(d, a) ? j.asyncNode(d, a, f, g) : g();
                    return n
                }, cancelSelectedNode: function (a) {
                    j.cancelPreSelectedNode(d,
                        a)
                }, destroy: function () {
                    j.destroy(d)
                }, expandAll: function (a) {
                    a = !!a;
                    j.expandCollapseSonNode(d, null, a, !0);
                    return a
                }, expandNode: function (a, b, c, f, g) {
                    function n() {
                        var b = l(a, d).get(0);
                        b && f !== !1 && j.scrollIntoView(d, b)
                    }

                    if (!a || !e.nodeIsParent(d, a)) return null;
                    b !== !0 && b !== !1 && (b = !a.open);
                    if ((g = !!g) && b && h.apply(d.callback.beforeExpand, [d.treeId, a], !0) == !1) return null; else if (g && !b && h.apply(d.callback.beforeCollapse, [d.treeId, a], !0) == !1) return null;
                    b && a.parentTId && j.expandCollapseParentNode(d, a.getParentNode(),
                        b, !1);
                    if (b === a.open && !c) return null;
                    e.getRoot(d).expandTriggerFlag = g;
                    !h.canAsync(d, a) && c ? j.expandCollapseSonNode(d, a, b, !0, n) : (a.open = !b, j.switchNode(this.setting, a), n());
                    return b
                }, getNodes: function () {
                    return e.getNodes(d)
                }, getNodeByParam: function (a, b, c) {
                    return !a ? null : e.getNodeByParam(d, c ? e.nodeChildren(d, c) : e.getNodes(d), a, b)
                }, getNodeByTId: function (a) {
                    return e.getNodeCache(d, a)
                }, getNodesByParam: function (a, b, c) {
                    return !a ? null : e.getNodesByParam(d, c ? e.nodeChildren(d, c) : e.getNodes(d), a, b)
                }, getNodesByParamFuzzy: function (a,
                                                   b, c) {
                    return !a ? null : e.getNodesByParamFuzzy(d, c ? e.nodeChildren(d, c) : e.getNodes(d), a, b)
                }, getNodesByFilter: function (a, b, c, f) {
                    b = !!b;
                    return !a || typeof a != "function" ? b ? null : [] : e.getNodesByFilter(d, c ? e.nodeChildren(d, c) : e.getNodes(d), a, b, f)
                }, getNodeIndex: function (a) {
                    if (!a) return null;
                    for (var b = a.parentTId ? a.getParentNode() : e.getRoot(d), b = e.nodeChildren(d, b), c = 0, f = b.length; c < f; c++) if (b[c] == a) return c;
                    return -1
                }, getSelectedNodes: function () {
                    for (var a = [], b = e.getRoot(d).curSelectedList, c = 0, f = b.length; c < f; c++) a.push(b[c]);
                    return a
                }, isSelectedNode: function (a) {
                    return e.isSelectedNode(d, a)
                }, reAsyncChildNodesPromise: function (a, b, c) {
                    return new Promise(function (d, e) {
                        try {
                            f.reAsyncChildNodes(a, b, c, function () {
                                d(a)
                            })
                        } catch (g) {
                            e(g)
                        }
                    })
                }, reAsyncChildNodes: function (a, b, c, f) {
                    if (this.setting.async.enable) {
                        var h = !a;
                        h && (a = e.getRoot(d));
                        if (b == "refresh") {
                            for (var b = e.nodeChildren(d, a), n = 0, r = b ? b.length : 0; n < r; n++) e.removeNodeCache(d, b[n]);
                            e.removeSelectedNode(d);
                            e.nodeChildren(d, a, []);
                            h ? this.setting.treeObj.empty() : l(a, g.id.UL, d).empty()
                        }
                        j.asyncNode(this.setting,
                            h ? null : a, !!c, f)
                    }
                }, refresh: function () {
                    this.setting.treeObj.empty();
                    var a = e.getRoot(d), b = e.nodeChildren(d, a);
                    e.initRoot(d);
                    e.nodeChildren(d, a, b);
                    e.initCache(d);
                    j.createNodes(d, 0, e.nodeChildren(d, a), null, -1)
                }, removeChildNodes: function (a) {
                    if (!a) return null;
                    var b = e.nodeChildren(d, a);
                    j.removeChildNodes(d, a);
                    return b ? b : null
                }, removeNode: function (a, b) {
                    a && (b = !!b, b && h.apply(d.callback.beforeRemove, [d.treeId, a], !0) == !1 || (j.removeNode(d, a), b && this.setting.treeObj.trigger(g.event.REMOVE, [d.treeId, a])))
                }, selectNode: function (a,
                                         b, c) {
                    function e() {
                        if (!c) {
                            var b = l(a, d).get(0);
                            j.scrollIntoView(d, b)
                        }
                    }

                    if (a && h.uCanDo(d)) {
                        b = d.view.selectedMulti && b;
                        if (a.parentTId) j.expandCollapseParentNode(d, a.getParentNode(), !0, !1, e); else if (!c) try {
                            l(a, d).focus().blur()
                        } catch (f) {
                        }
                        j.selectNode(d, a, b)
                    }
                }, transformTozTreeNodes: function (a) {
                    return e.transformTozTreeFormat(d, a)
                }, transformToArray: function (a) {
                    return e.transformToArrayFormat(d, a)
                }, updateNode: function (a) {
                    a && l(a, d).get(0) && h.uCanDo(d) && (j.setNodeName(d, a), j.setNodeTarget(d, a), j.setNodeUrl(d,
                        a), j.setNodeLineIcos(d, a), j.setNodeFontCss(d, a))
                }
            };
            a.treeTools = f;
            e.setZTreeTools(d, f);
            (c = e.nodeChildren(d, a)) && c.length > 0 ? j.createNodes(d, 0, c, null, -1) : d.async.enable && d.async.url && d.async.url !== "" && j.asyncNode(d);
            return f
        }
    };
    var Q = r.fn.zTree, l = h.$, g = Q.consts
})(jQuery);
