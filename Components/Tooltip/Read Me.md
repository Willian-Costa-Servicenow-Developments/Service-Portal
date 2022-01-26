# Tooltip records

### HTML example:
```html
  <sp-widget widget="item.tooltip"></sp-widget> 
```


### Server Script example:
```Javascript
  record.tooltip = $sp.getWidget("ocl-record-tooltip", {
			table: data.table,
			record: record.sys_id,
			fields: data.tooltip_fields,
			trigger: "mouseenter",
			title: "number",
			className: "test-class"
		});
```
