Barritas widget
==============

Widget para generar y animar un grafico simple de barras.

Requiere [jQuery][jQuery], [jQuery Widget Factory][widget] y [Greensock Timeline] [Timeline]. El repositorio incluye una copia del script de jQuery Widget 

```
<script src="lib/TweenMax-1.12.1.min.js"></script>
<script src="lib/jquery-1.11.0.min.js"></script>
<script src="lib/jquery.ui.widget.js"></script>
<script src="jquery.barritas.min.js"></script>
```

Uso
----

```javascript
$(selector).barritas({opciones});
```

Opciones
----

Las opciones se proveen con un objeto javascript literal {} con las opciones.

  - timeline: *{objeto}* [Timeline]. Timeline al cual agregar las animaciones.
    Si no se provee, se creará uno.
  - values: *{array}* **requerido** Un array de valores para graficar. Estos valores
    se normalizarán para mostrar los porcentajes representativos. La cantidad de valores
    en el array indicará cuantas barras se generarán.
  - duration: *{int}* segundos. La duración en segundos que tendrá la animación. Las barras
    se animan todas al mismo tiempo, por lo cual esta duración será la duración total de
    la animación. El valor default es 0 (sin animación).
  - ease: *{function}* Easing function. Se pueden usar cualquiera de las
    de [Greensock] [Timeline]. Usa Cubic.easeOut por defecto.
  - labelSuffix: *{string}* sufijo Texto a agregar al valor de las barras.
    Por defecto es "%"
  - colors: *{array}* colores. El widget genera una rueda de colores por defecto. Si
    se provee este array *y tiene la misma cantidad de valores que **value**,* se
    utilizarán los colores de este array.
  - onEnd: *{function}* callback. Función a ejecutar cuando la animación termina.
    El context (this) es el Timeline de la animación.

Ejemplo:
----
```javascript
$('div#grafico').barritas({
  values: [8,5,10],
  colors: ['#f00','#0f0','#00f'],
  duration: 2,
  timeline: null,
  ease: null,
  onEnd: function(){console.log('listo!');}
});

```

Estilos
----

Ver el ejemplo para una implementación con CSS.

Las barras que se generan son DIVs.bar-barrita y los labels son SPANs.label-barrita dentro de los DIVs

Salud dracaos!


License
----

Free as in beer


**Free Software, Hell Yeah!**

[Timeline]:http://greensock.com
[jQuery]:http://jquery.com/
[widget]:http://jqueryui.com/widget/
