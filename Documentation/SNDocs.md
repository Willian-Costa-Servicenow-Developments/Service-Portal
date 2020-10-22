# SNDOC

The SNDoc system is designed to emulate some of the functionality found in JSDoc, namely the ability to comment on code in a structured way, to generate documentation. The only place where SNDoc comments are processed is within Script Includes.

There are some differences between SNDoc and JSDoc though:

- Documentation is live, there is no need to run a specific process to update the documentation, just open up the 'Instance API Reference' portal to see the latest documentation
- SNDoc relies entirely on the comments that you create, unlike JSDoc which will parse a script and work out some of the details for you
- SNDoc can provide a best guess at other scripts in the platform that use your commented Script Include. SNDoc is NOT a javascript parser though, so this may show false positives
- The comment syntax is very similar to that of JSDoc, so if you're used to that, you should have no problem in picking up the SNDoc syntax.

Documentation is presented in the familiar format that's used by the ServiceNow API docs themselves, so getting used to using and reading the documentation should be a snap.

SNDoc was created by Callum Ridley at UP3 Services Ltd, to help keep on top of clients instances, enabling developers and managed service support staff to easily understand each others work, and move to a development methodology of reUSE not reWRITE.

We hope that by sharing this with the ServiceNow communiity that you too can find working in the platform easier and create more useful and reusable code.

Full documentation is available upon installation on the 'Help' tab of the 'Instance API Reference' Page

Access to SNDoc is provided by an application in the navigator called 'SNDocs' and then clicking on 'Instance API Reference'


# Example

```JAVASCRIPT

/**SNDOC
    @name getUserInfo
    @description Function designed to return data from any user (Client and Server)
    @param {String} [userID] - Sys_id of user
    @param {Boolean} [active] - Active true or false verification
    @returns {JSON} JSON containing user data
    @example
    var getUser = new SNDOC_Utils().getUserInfo('cff894dcdbc60cd055250fbca3961901');


    //Output:
    {
      'name': 'Willian Costa',
      'manager': 'Rodrigo Muniz',
      'department': 'Professional Services',
      'company': 'Organize Cloud Labs',
      'email': 'willian@organizecloudlabs.com',
      'location': 'Morumbi - SP',
    }
    
    
    */
	getUserInfo: function(userID, active) {
	var user = GlideRecord('sys_user');
	user.addQuery('sys_id', userID);
	user.addQuery('active', active);
	user.query();
    
	if (!user.next()) 
      		return;
      
    	var json = new JSON();
	var results = {
		"name": user.getValue("name"),
		"manager": user.getValue("manager"),
		"department": user.getValue("department"),
		"company": user.getValue("company"),
		"email": user.getValue("email"),
		"location": user.getValue("location"),		
	};
	return json.encode(results);
		
	},

```

![Instance API SNDocs](https://github.com/Organize-Cloud-Labs/Service-Portal/blob/main/Documentation/images/sndocs-instance.png)


# Where to use

- Script includes

# How to use

### SNDoc is very similar to JSDocs, but with some peculiarities within Servicenow.


To begin, declare a comment block like this:

```JAVASCRIPT

/**SNDOC

*/

```

Now let's understand each type of information that we need to declare for a better documentation structure.

### SNDoc Tags

```JAVASCRIPT

@name  // Defines a Function name
@description  // Description of the purpose of this function, what it does, why it exists
@param {Type} [variable name] // Defines a parameter passed to the function 
@returns {TYPE} // Here is a demonstration of the data to be returned from the execution of the function
@private // Marks a class method as private, and not to be used outside of the script include it is a member of Pattern @private
@example

	// In example, use a code block demonstrating how to make a call to this function and what is returned
    
```

PS: You can also create new tags

![SNDocs Tags](https://github.com/Organize-Cloud-Labs/Service-Portal/blob/main/Documentation/images/sndocs-new-tags.png)


# How do install SNDocs

1 - Access the  Servicenow Developer Portal and Search for "SNDoc" 
        or click here: https://developer.servicenow.com/connect.do#!/share/contents/6426327_sndoc
        
2 - Download the last version of the plugin SNDoc

3 - Access your instance or the client that is working

4 - In Filter Navigator, go to Module System Update sets > Retrieved Update Sets

5 - On the list page, find the related links: Import Update Set from XML 

6 - Submit the downloaded file

7 - In Retrieved Update Sets search for: SNDoc v1.1 - FULL and open the record

8 - Click on "Preview Update Set", wait to complete 100% after click on close button

9 - Click on "Commit Update Set"


Ready, SNDocs is installed in your instance

To check if everything is right, search Filter Navigator for "SNDocs" and find a new module


# Reference Links

JSDocs: https://jsdoc.app/
