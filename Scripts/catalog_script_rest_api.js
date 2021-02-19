function onSubmit() {

  // This function checks if there are attachments when filling out the form using the API now

	var sys_id = g_form.getValue('sysparm_item_guid'); // Cart Item ID
	var query = "table_sys_id=" + sys_id;
	var api_url = "/api/now/attachment?sysparm_query=" + query; //URL connect

	fetch(api_url).then(function(response){
		return response.json(); // Return a Promisse
	}).then(function(data){
		console.log(data); // JSON data after processing
	});
  
  if(!something)
	  return false;
	
}
