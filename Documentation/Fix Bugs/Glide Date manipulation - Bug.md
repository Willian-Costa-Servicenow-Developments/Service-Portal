# Glide Date manipulation - Bug



## Problem

When we get a value of a Glide Date Time we think recive a string. I don't know what we really recive, but if you try to use some methods like split(''). <b>Sometimes </b> you will see a <span style="color:red">"NaN"</span> or <span style="color:red">"undefined"</span>.

## Solution

 toString()

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