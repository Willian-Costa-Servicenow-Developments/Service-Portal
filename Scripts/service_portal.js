/* 
* Module: Service Portal
* Created by: Mateus Mazzei Anzolin
* Version: 1.5
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
  return html;
}

/*------------ Refresh Effect on Div -------------*/
//HTML
<div id="my_div"></div>

//Client Script
$('#my_div').fadeOut(800, function(){
  $('#my_div').fadeIn().delay(2000);
});

/* ---------  Continue --------- */
                  .
                  .
                  .
