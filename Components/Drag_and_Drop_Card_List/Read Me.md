# Drag and drop cards 

This type of list in card format offers a differentiated display, with the possibility of ordering items in a customized way


### Options

- Table: the table that you will get the data
- Filter:  query filter to display records
- Fields: Fields to display


# how to implement

1 - Import and Commit the Update set: "Drag and Drop Update Set"
2 - Search the widget with name: "OCL: Card List Records"

# Development

HTML: Use of Angular Provider Template to display data

```html
<section class="cards">
  <ppm-idea-list role="list" items="c.data.list" />
</section>
```

Client Side: 
```JAVASCRIPT
    //  Action when moving cards, update list with new order

    $scope.$on('change.order.list', function(event, data){
		c.server.get({action: 'UPDATE','records' : data}).then(function(r){
			c.data.list = r.data.list;
		});
	});
```

Server side: Main functions
```JAVASCRIPT
    data.table = options.table;
	data.field_list = options.field_list;

	if(input && input.action == 'UPDATE')
		changeOrder(data.table, input.records);
	
	data.list = createListRecord(data.table, data.field_list);

	function createListRecord(table, field_list){
		var data = [];
		var gr = new GlideRecord(table);
		gr.orderBy('order');
		gr.query();
		while (gr.next()) {
			var record = {};
			record.table = gr.getTableName();
			record.sys_id = gr.getUniqueValue();
			record.fields = $sp.getFields(gr, field_list.toString());
			data.push(record);
		}
		return data;
	}
	
	function changeOrder(table, list){
		for(var i in list){
			var gr = new GlideRecord(table);
			if(!gr.get(list[i].sys_id))
				return;
			gr.setValue('order', i);
			gr.update();
		}
	}
	    
```

Dependences: API external to drag and drop 
DOC: https://github.com/marceljuenemann/angular-drag-and-drop-lists

Template Angular:

```JAVASCRIPT
function () {
	return {
		restrict: 'E',
		scope: {items: '='},
		replace: true,
		template: 
		'<ul ' +
			'dnd-list="models.list.Data" '+
			'dnd-external-sources="true" ' +
			'class="list-cards" '+
		'>' +
			'<li ng-repeat="item in models.list.Data" ' +
				'dnd-draggable="item" ' +
				'dnd-moved="handleMovedCard($index)" ' +
				'dnd-effect-allowed="copyMove" ' +
				'dnd-selected="models.selected = item" ' +
				'ng-class="{\'selected\': models.selected === item}" ' +
				'class="card"' +
			'>' +
				'<span ng-repeat="f in item.fields" class="field">' +
					'<b>{{f.label}}: </b>{{f.display_value}}' +
				'</span>' +
			'</li>' +
		'</ul>',
		
		controller: function($scope, $rootScope){
			var c = this;
			//Modeling data's
			$scope.models = {
				 selected: null,
				 list: {'Data': $scope.items}
			 };
			// Action when moving cards
			$scope.handleMovedCard = function(index){
				$scope.models.list.Data.splice(index, 1);
				var data = $scope.models.list.Data;
				$rootScope.$broadcast('change.order.list', data);
			};
				
		}
		
	}
};
```

# Gallery
![Drag_and_Drop](https://github.com/WillianCostaOCL/service-now-sp/blob/main/Components/Drag_and_Drop_Card_List/Drag_and_Drop_example.gif)

