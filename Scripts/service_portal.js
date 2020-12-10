/* 
* Module: Service Portal
*/


/* --------- Record Wacth ------- */
//Client Script
function($scope, spUtil) {
	var c = this;
	
	spUtil.recordWatch($scope, "incident", "active=true^state=3", function(name,data) {
		spUtil.update($scope);
	});
}

/* ---------  Broadcast --------- */

//HTML -- widget #1
<div class="panel panel-default panel-body m-t m-b">
  <button class="btn btn-default" ng-click="c.clickButton('ActionName')">Click</button>
</div>

//Client Script -- widget #1

function($rootScope) {
  var c = this;
  c.clickButton = function(action) {
  var obj= {
    action: action,
    something: "anything else"
  };
$rootScope.$broadcast('customEvent', obj);
}

//HTML -- widget #2
<span>
 {{c.text}}
 </span>

//Client Script -- widget #2
function($rootScope) {
  var c = this;
  c.text = "Hello";
  $rootScope.$on('customEvent', function(event,obj) {
    c.text = "You clicked "+obj.action;
  });
}

/* ---------  Update Server --------- */

c.server.get(data); // Update and send an object to server. In this case, "data"
c.server.update(); //Just Update

/* ---------  SN Record Picker --------- */
<label>Location:
  <sn-record-picker 
    field="location" 
    table="'cmn_location'" 
    display-field="'name'" 
    value-field="'sys_id'" 
    search-fields="'name'"
    multiple="false"
    page-size="100" >
  </sn-record-picker>
</label>

/* ---------  On Change SN Record Picker --------- */

//Client Script
$scope.incident = {
 value: 'sys_id',
 name: 'incident',
 query: c.data.query_inc
};
 
$scope.$on("field.change", function(evt, parms) {
 if (parms.field.name == 'incident')
    c.data.query_otherfield = ‘^parent=’+parms.value;
 
 c.server.update().then(function(response) {
    spUtil.update($scope);
 })
});

//Server Script
data.query_inc = ‘active == “true”’;
data.query_otherfield = ‘active == “true”’;

/* ---------  SN Date Picker --------- */

//HTML
<div>
  <sp-date-picker 
    field="data.datePicker" 
    ng-model="data.datePicker" 
    sn-change="customDate()" 
    sn-include-time="true">
  </sp-date-picker>
</div>

/* ---------  On Change SN Date Picker --------- */

//Client Script
function($scope) {
/* widget controller */
var c = this;
$scope.customDate = function () {
  $scope.data.funcName="OnDate";
  c.server.update().then(function(){})
  };
}

//Server Script:
(function() {
  data.datePicker="";
  if(input && input.funcName=="OnDate"){
    gs.addInfoMessage(input.datePicker);
  }
})();

/* ---------  URL --------- */

$p.getParameter('sys_id');
gs.getProperty("glide.servlet.uri") + 'portal_sufix?id=your_page';
window.location = "?parame_1="+url_parm1 + "&parame_2="+url_parm2; //redirect

/* ---------  ACL --------- */

//Server Script
//gr is your GlideRecord
data.acl = {
  c: gr.canCreate(),
  r: gr.canRead(),
  w: gr.canWrite(),
  d: gr. canDelete()
};

//HTML
<p ng-if="data.r == 'true'">You'll see it only if you have the permission</p>

/* ---------- Remove Accents ----------*/
$scope.removeAccents = function(value) {
  if(!value) return '';
  return value
    .replace(/á/g, 'a')           
    .replace(/é/g, 'e')
    .replace(/ê/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ç/g, 'c')
    .replace(/ã/g, 'a')
    .replace(/\([a]\)/g, '');
}

/* ---------- Remove HTML ----------*/
$scope.removeHTML = function (html){
	if(!html) return '';
	html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
	html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
	html = html.replace(/<\/div>/ig, '\n');
	html = html.replace(/<\/li>/ig, '\n');
	html = html.replace(/<li>/ig, '  *  ');
	html = html.replace(/<\/ul>/ig, '\n');
	html = html.replace(/<\/p>/ig, '\n');
	html = html.replace(/<br\s*[\/]?>/gi, "\n");
	html = html.replace(/<[^>]+>/ig, '');
	html = html.replace(/&nbsp;/gi," ");
	return html;
}

/*------------ Refresh Effect on Div -------------*/
//HTML
<div id="my_div"></div>

//Client Script
$('#my_div').fadeOut(800, function(){
  $('#my_div').fadeIn().delay(2000);
});

/*------------ Get Choice Fields Options -------------*/
//Server
var strangeFields = ['short_description','description','title','name']; //List with fields whose type is "choice", but we use it as a String
var choiceList =  GlideChoiceList.getChoiceList('incident', 'state'); //Return a JAVA Object

//Convert
if(choiceList.getSize() > 1 && strangeFields.indexOf('state') == -1){
	var options = [];
	for (var i=0; i < choiceList.getSize(); i++) {
		options.push({'value': choiceList.getChoice(i).getValue(), 'label': choiceList.getChoice(i).getLabel()});
	}	
	return options;
}

/* ---------  Format Numbers to '1K, 1M' --------- */
c.convertNumber = function(n){
	var aux = '';
	n = n.toString();

	if(n < 1000)
		return n;

	else if(n <= 9999){
		aux = n.slice(0, 1);
		return aux + ',' + n.slice(1,3) + " k";
	}
	else if(n <= 99999){
		aux = n.slice(0, 2);
		return aux + ',' + n.slice(2,4) + " k";
	}
	else if(n <= 999999){
		aux = n.slice(0, 3);
		return aux + ',' + n.slice(3,5) + " k";
	}
	else if(n <= 9999999){
		aux = n.slice(0, 1);
		return aux + ',' + n.slice(1,3) + " M";
	}
	else if(n <= 99999999){
		aux = n.slice(0, 2);
		return aux + ',' + n.slice(2,5) + " M";
	}
	else if(n <= 999999999){
		aux = n.slice(0, 3);
		return aux + ',' + n.slice(3,6) + " M";
	}
	else if(n <= 9999999999){
		aux = n.slice(0, 4);
		return aux + ',' + n.slice(4,7) + " M";
	}
	else if(n <= 99999999999){
		aux = n.slice(0, 5);
		return aux + ',' + n.slice(5,8) + " M";
	}
}

/* ---------  Format Numbers to 'BRL' --------- */
var atual = 600000.00;

//com R$
var f = atual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

//sem R$
var f2 = atual.toLocaleString('pt-br', {minimumFractionDigits: 2});

console.log(f);
console.log(f2);
