# Drill Down List record's


This type of list provides task relatedness levels based on relationship between tables in Service now

- Choose fields to display
- Filter via advanced queries
- Choose the relationship field

### Options

- Table: the table that you will get the data
- Fields: the fields that will be on the list
- Maximum entries: max number of lines
- Title (optional): the title
- Order By: order by column
- Order Direction: asc or desc order direction
- Child Table: relationship table
- Field Relation: relationship field
- Relation Fields to display: list of fields to display on drilldown


# Development

HTML: Simple code for displaying the records in table form.

Important ... The <table> tag was not used to facilitate the dropdown of child elements


### Front-end code

##### Table Element
...
```html
<div class="sp-table">
    ...
</div>
```

```CSS
div.sp-table{
  display:block;
  width:100%;
}
```

Row iterations: 
Observe the use of Angular js, a repetition of an arraylist was created, displaying table field labels 

```html
  <!-- Column Label's -->
  <div class='sp-row'>
    <div ng-repeat="field in data.fields_array track by $index" class="table-header-cell">
      <div class="th-title" title="${Sort by} {{field == data.o ? (data.d == 'asc' ?  '${Descending}': '${Ascending}') : '${Ascending}'}}" role="button" tabindex="0" aria-label="{{data.column_labels[field]}}"><b>{{data.column_labels[field]}}</b></div>
      <i class="fa" ng-if="field == data.o" ng-class="{'asc': 'fa-chevron-up', 'desc': 'fa-chevron-down'}[data.d]"></i>
    </div>
  </div>
  ```
  
 ```CSS
  div.sp-table > .sp-row{
  display:flex;
  width:100%;
  flex-direction:horizonal;
}
```
  Like the block of code above, records are listed in 'sp-row'

```HTML
  <!-- Column values -->
  <div class='sp-row' ng-repeat="item in data.list track by item.sys_id" id="tab_row{{item.index}}" data-colapsed="false" ng-click="c.generateDrillDown('tab_row' + item.index , item.index, item.sys_id)">
    <div class="table-body-cell" ng-class="{selected: item.selected}" ng-click="go(item.targetTable, item)" ng-repeat="field in ::data.fields_array" data-field="{{::field}}" data-th="{{::data.column_labels[field]}}">
      <span class="arrow" ng-if="$first"><i class="fa fa-caret-right"></i> </span>
      <span>{{::item[field].display_value}}</span>
    </div>
  </div>
</div>
 ```

### Client Side

Main functions to generate drilldown

 ```JAVASCRIPT
 c.generateDrillDown = function(element, row, parent){
		// verify if opened 
		if($("#"+ element).attr("data-colapsed") == 'true'){
			drillDestroy(element);
			return;
		}	
		var parms = {};
		parms.action = "drill_down";
		parms.parent = parent;
		c.server.get(parms).then(function(r){
		    // DOM features
			collapseDrill(element);
			// generator
			createRow(element, row, r.data.childs);
		});
	}
	
	function createRow(element, row, data){
		var body = "";
		body += "<section class='section-sp-line'>";
		body += "<div class='sp-table'>";
		// Generate Tbody
		for(var i in data){
			if($('#' + data[0].parent + '_hidden_row' + row).length)
				continue;
			body += '<div id="'+data[0].parent+'_hidden_row'+ i + '" data-row="'+ i +'" data-parent="' + data[i].sys_id +'" class="sp-row drill_down_item">';
			for(var k in data[i]){
				if(data[i][k].display_value){	
					body += '<div class=" cell">';
					if(k == c.data.fields_array[0])
							body += '<span class="arrow"> <i class="fa fa-caret-right"></i> </span>';	
					body += data[i][k].display_value;
					body += '</div>';
				}
			}
			body += '</div>';
		}
		body += '</div>';
		body += "</section>";
		// Use .after() to add line below record opened
		$('#' + element).after(body);
	}
 ```
 
 
 ### Server Side
 
 Modeling data for display using the Glide Record Servicenow API
 
  ```JAVASCRIPT
    var gr = new GlideRecord(data.table);
	gr.addEncodedQuery(data.filter);
	// Pagination Configurations
	data.window_start = data.page_index * data.window_size;
	data.window_end = (data.page_index + 1) * data.window_size;
	gr.chooseWindow(data.window_start, data.window_end);
```

```JAVASCRIPT
    // Ordenation configurations
	if (data.o){
		if (data.d == "asc")
			gr.orderBy(data.o);
		else
			gr.orderByDesc(data.o);
	}
```

```JAVASCRIPT
    // Generate Column Labels 
	data.column_labels = {};
	for (var i in data.fields_array) {
		var field = data.fields_array[i];
		var ge = grForMetaData.getElement(field);
		if (ge == null)
			continue;
		data.column_labels[field] = ge.getLabel();
	}

    // Iteration record's on query
	while(gr._next()){
		var record = {};
		$sp.getRecordElements(record, gr, data.fields_array);
		if (gr instanceof FilteredGlideRecord) {
			// FilteredGlideRecord doesn't do field-level
			// security, so take care of that here
			for (var f in data.fields_array) {
				var fld = data.fields_array[f];
				if (!gr.isValidField(fld))
					continue;

				if (!gr[fld].canRead()) {
					record[fld].value = null;
					record[fld].display_value = null;
				}
			}
		}
		record.index = r_count++;
		record.sys_id = gr.getUniqueValue();
		data.list.push(record);
	}
  ```
 
### Gallery
![Drill_Down](https://github.com/WillianCostaOCL/service-now-sp/blob/main/Components/Drill%20Down%20List/Drill_Down.gif)

