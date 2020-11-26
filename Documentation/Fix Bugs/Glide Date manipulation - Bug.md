# Glide Date manipulation - Bug



## Problem

When we get a value of a "Glide Date Time" we think to receive a string. But if you try to use some methods like split(''). Sometimes you will see a **"NaN"** or **"undefined"**.

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
