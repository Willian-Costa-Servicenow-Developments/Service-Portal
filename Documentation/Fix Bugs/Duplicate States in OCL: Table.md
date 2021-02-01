# [Duplicate States in OCL: Table] - Bug



## Problem
Quando a instancia existe mais de um state com o mesmo valor no campo, no widget de Tabela do ITSM Express acaba exibindo o duplicado.


## Solution

Para isso basta adicionar esse codigo após a busca nas choices do campo.

## Example

``` javascript
[
 listChoices = listChoices.filter(function (a) {
                return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
            }, Object.create(null))
]
```
 
 
 
