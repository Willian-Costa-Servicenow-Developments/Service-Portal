/* 
  HTML
 */
 <input type="file" id="upload_file">
 
 /*
  Server Script
 */
 
// Records to Attach files
data.sys_id = input.sys_id || options.record_id || $sp.getParameter("sys_id");
data.table = input.table || options.record_table || $sp.getParameter("table");

// User for Authentication Basic (admin)
data.user = "attach_user";
data.password = "12345";

// Instance name for links
data.instance_name = gs.getProperty('instance_name');
   
 /*
  Client Script
 */
 
 $scope.uploadFiles = function() {	
	// Convert to Base64 for Auth
	var base64User = btoa(c.data.user + ':' + c.data.password);

	//Get File
	var input = document.getElementById('upload_file');
	$scope.files = input.files;

	// Serialize to FormData
	$scope.fd = new FormData();
	var file = $scope.files[0];
	$scope.fd.set('files', file);
    
    	// Configure Communication 
	var request = {
		method: 'POST',
		url: 'https://'+ c.data.instance_name +'.service-now.com/api/now/attachment/file?table_name='+c.data.table+'&table_sys_id='+c.data.sys_id+'&file_name='+file.name,
		data: $scope.fd.get('files'),
		headers: {
			'Content-Type': file.type,
			'Accept':'application/json',
			'Authorization': 'Basic ' + base64User
		}
	};
		
	console.log('HTTP request:',request);

	// SEND THE FILES.
	$http(request)
	.success(function (d) {
		$timeout(function(){	
			c.logoutUSer();
		});
	})
	.error(function (err) {
		console.log(err);
	});


	}

	// This function ensures that the authenticated user does not open a session
	c.logoutUSer = function(){
		var request = {
			url: 'https://'+ c.data.instance_name +'.service-now.com/logout.do'
		};
		$http(request)
		.success(function (d) {
			$timeout(function(){	
				console.log("it's disconnected");
			});
		});
	}

