# Expandable_List Plus

It is a mega list that, when you click on a row, the data expands, presenting more fields and some buttons.


### Options

- Table (mandatory): the table that you will get the data

- Fields (mandatory): the fields that will be on the COMPRESSED list

- Maximum entries (optional): max number of lines

- Title (optional): the title

- Icon (optional): the title icon

- All Fields (mandatory): the fields that will be on the EXPANDABLE list

- Filter (optional): the data filter

### Script Include

listUtils

- Documentation on [SNDOCS](https://github.com/Organize-Cloud-Labs/Service-Portal/tree/main/Documentation)

### Gallery

![Expandable List Plus](https://github.com/Organize-Cloud-Labs/Service-Portal/blob/main/Components/Expandable_List/Plus/Expandable%20List%20Plus.gif)




## Attention

If the date format of the instance is configured in YYYYMMDD format on display value


Create this function on widget:

```JAVASCRIPT
c.setFormatDate = function(date_field){
  var inpt = date_field;
  var d = "", m= "", y = "",date = "";
  y = inpt.substr(6, 9);
  m = inpt.substr(3, 2);
  d = inpt.substr(0,2);
  date = y + "-" + m + "-" + d;
  return date;
};
```

apply the changes to the following function:

```JAVASCRIPT

c.update = function update(index) {
        c.showPagination = false;
        c.data.action = 'refreshData';
        c.data.p = 1;
        c.data.searchFilters = [];
        for(var f in c.data.fields){
            var key = c.data.fields[f];
            var record = {};
            record.field = key;
            record.type = c.data.column_types[key];
            record.value = c.modelFields[key];
            // If type field is date change format date 
            if(c.modelFields[key] && c.data.column_types[key] == "glide_date_time" || c.data.column_types[key] == "glide_date"){
                record.value = c.setFormatDate(c.modelFields[key]);
            }
            c.data.searchFilters.push(record);   
        }
        c.server.update().then(function(){
            c.showPagination = true;
            c.data.action = '';
        });
    };
    
```

