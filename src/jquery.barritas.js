
$.widget('mahd.barritas',{
  
  options: {
    timeline: null,
    onEnd: null,
    values: [],
    colors: [],
    duration: 0,
    labelSuffix: '%',
    ease: Cubic.easeOut
  },
  tl: null,
  bars: [],
  total: 0,
  width: 0,
  init_time:0,
  customColors: false,
  
  _create: function() {
    _this = this;
    _this.tl = _this.options.timeline || new TimelineMax();
    _this.init_time = _this.tl.totalDuration();
    if(_this.options.colors.length === _this.options.values.length ) {
      _this.customColors = true;
    }
    if( Object.prototype.toString.call(this.options.onEnd) == '[object Function]' ) {//i has a callback!
      _this.tl.eventCallback('onComplete', this.options.onEnd);
    }
    if(_this.options.values.length < 1) {
      throw new Error('need values');
    }
    _this.element.html("");
    _this.width = _this.element.innerWidth();
    _this.bars = $.map(_this.options.values, function(e,i){
      return {
        element: null,
        color: _this.customColors ? _this.options.colors[i] : 'hsla('+ ( (180 / _this.options.values.length ) * i + 90) +', 80%, 55%, 1)',
        value: e,
        ponderance: 0
      };
    });

    _this.createBars();
    _this.ponderateBars();
    _this.createAnimations();
    //_this.animate();
  },
  _init: function() {
    var _this = this;

  },
  ponderateBars: function() {
    var _this = this;
    $.each(this.bars, function(i,e){
      e.ponderance = 100 * e.value / _this.total;
    });
  },
  createBars: function() {
    var _this = this;
    _this.total = 0;
    var h = _this.element.innerHeight();
    $.each(_this.bars,function(i,e){
      _this.total += e.value;
      e.element = $('<div data-role="mahd-barra" data-value="'+e.value+'" class="bar-barrita" />')
      .appendTo(_this.element)
      .css({
        height: h + 'px',
        width: 0,
        'background-color': e.color,
        display: 'inline-block'
      });
      e.label = $('<span class="label-barrita">0'+_this.options.labelSuffix+'</span>')
      .css({
        'margin':'0 auto',
        'opacity':0
      })
      .appendTo(e.element);
      e.tempValue = 0;
    });
  },
  createAnimations: function() {
    var _this = this;
    
    $.each(_this.bars, function(i,e){
      //barritas
      _this.tl.to(e.element, _this.options.duration, {
        ease: _this.options.ease,
        width: e.ponderance+'%'
      }, _this.init_time);
      //label opacity
      _this.tl.to(e.label, _this.options.duration * 3 / 4,{
        opacity: 1
      }, _this.init_time + _this.options.duration * 1 / 4);
      //label value
      _this.tl.to(e, _this.options.duration, {
        ease: Linear.easeNone,
        tempValue: e.ponderance,
        onUpdate: function(){
          e.label.text(parseInt( e.tempValue * 100 ,10) / 100 + _this.options.labelSuffix);
        }
      }, _this.init_time);
    });
  },
  animate: function() {
    this.tl.play(this.init_time);
  },
  get:function(){
    return this.tl;
  }
});
