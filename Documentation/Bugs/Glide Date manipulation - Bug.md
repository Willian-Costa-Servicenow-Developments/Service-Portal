# Glide Date manipulation - Bug



## Problem

When we get a value of a Glide Date Time we think recive a string. I don't know what we really recive, but if you try to use some methods like split(''). <b>Sometimes </b> you will see a <span style="color:#d13b19">"NaN"</span> or <span style="color:#d13b19">"undefined"</span>.

## Solution

 toString()  <i class="fa fa-star"></i>

## Example

``` javascript
var gr = new GlideRecord('incident');
gr.query();

//wrong
if (gr.next())
			var date = gr.getDisplayValue('opened_at').slice(0,10);
//right
if (gr.next())
			var date = gr.getDisplayValue('opened_at').toString().slice(0,10);
```

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">