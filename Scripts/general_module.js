/* 
* Module: General
* Created by: Mateus Mazzei Anzolin
* Version: 1.1
*/

/* ---------  Glide Record --------- */

var gr = new GlideRecord('table_name');
gr.addQuery('field', 'value');
gr.addEncondedQuery('field=value');
gr.orderBy('field');
gr.query();

var array = [];
while(gr.next()){
  array.push(gr.getValue('field'));
}

/* ---------  Glide Aggragate --------- */

var agg = new GlideAggregate('table_name');
agg.addAggregate('COUNT', 'field');
agg.orderBy('field');
agg.addQuery('field', '>=', 'value');
agg.query();
while (agg.next()) {
    var incidentCount = agg.getAggregate('COUNT', 'field');
}

/* ---------  Glide Ajax --------- */

//Client Script

var ga = new GlideAjax('include_name');
ga.addParam('sysparm_name', 'getCampus');
ga.addParam('sysparm_field', g_form.getValue("field"));
ga.getXML(updateCampus);

/*Call Back*/
function updateCampus(response) {
  var answer = response.responseXML.documentElement.getAttribute("answer");
  var clearvalue; 
  if (answer) {
    var returneddata = answer.evalJSON(true);
    g_form.setValue("campus", returneddata.value);
  } else {
    g_form.setValue("campus", clearvalue);
  }
}

//Script Include:
var include_name = Class.create();
include_name.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  
  getCampus: function () {
    var sysparm_field = this.getParameter('sysparm_field');

    /*-- any code --*/
    
    var json = new JSON();
    var results = {
      "value": "any_value")
    };
    if(results)
        return json.encode(results);
      }
    } else return null;           
  }
});
