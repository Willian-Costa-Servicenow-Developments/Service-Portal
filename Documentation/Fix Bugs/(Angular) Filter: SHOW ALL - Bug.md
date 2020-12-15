# (Angular) Filter: SHOW ALL - Bug



## Problem

When using filter on ng-repeat, sometimes you need "Show all" / "Clear filter". But doesn't work 

## Solution

Use **undefined** 

## Exemple

``` javascript
//HTML
<button ng-click="clear()"></button>
<div ng-repeat="item in c.items | filter: c.yourFilter">
	<span>{{item}}</span>
</div>
 
//CLIENT SCRIPT
$scope.clear = function(){
  //wrong
   c.yourFilter = null;
  
  //right
  c.yourFilter = undefined;
}
```

 





