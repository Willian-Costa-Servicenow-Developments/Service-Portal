# JQuery running in 2 or more widgets - Bug



## Problem

When you use JQuery, sometimes, a function run in more than one widget.

It's because JQuery doesn't see just the widget HTML. It sees all page HTML. So, if you have two classes with same name and use $('.yourClassName').toggle() both will be hide.

## Solution

1 - Change the class / id name;

2 - add the Instance Sys Id inside the selector. Like: $('.13123nfFjsAa123455nsnf')



## Example

``` javascript
/*-----1#----*/
//WIDGET 1
<div class="class1"></div>
//WIDGET 2
<div class="class1"></div>

//Change to 

//WIDGET 1
<div class="class1"></div>
//WIDGET 2
<div class="class2"></div>


/*-----2#-----*/
//Server
data.instance = $sp.getInstanceRecord().getUniqueValue();

//Client
var unique_class= "." + c.data.instance;
$(unique_class).css("margin-left", "15px");

//HTML
<div class="{{data.instance}}"></div>

```

