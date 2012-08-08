;(function(el, opt) {
    
    // Default
    opt = G.extend(opt || {}, {
       eventType: "mousedown",
       classNameBtn: "list-btn",
       classNameCur: "list-cur",
       innerDeep: 1,
       outerDeep: 2,
       speed: 150
    });
    
    var tmp,
        _height,
        supportTran = G.fx.supportTran(),
        getParent = function(el, deep) {
            return --deep ? arguments.callee(el.parentNode, deep) : el.parentNode;
        },
        fx = function(el, height, callback) {
            supportTran
            
            ? (getParent(el, opt.outerDeep).style[supportTran] = "height " + opt.speed/1000 + "s ease", getParent(el, opt.outerDeep).style.height = height + "px")
            
            : G(getParent(el, opt.outerDeep)).fx({"height": height}, callback).play(opt.speed);
        };
    
    G(el).bind(opt.eventType, function(e) {
        if(!G.hasClass(this, opt.classNameBtn)) return;
        
        var wrap = getParent(this, opt.outerDeep);
         
        if(tmp) {
            G.removeClass(getParent(tmp, opt.outerDeep), opt.classNameCur);
            fx(tmp, _height);
        }
        
        if(tmp !== this) {
            G.addClass(wrap, opt.classNameCur);
            !_height && (_height = wrap.offsetHeight);
            fx(this, getParent(this, opt.innerDeep).offsetHeight);
            tmp = this;
        }
        
        else tmp = !this;
    });
    
}).MIX(["accordion", "fold"], G.dom);