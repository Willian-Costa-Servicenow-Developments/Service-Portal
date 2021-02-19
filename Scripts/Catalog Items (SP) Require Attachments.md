# HOW TO REQUIRE ATTACHMENTS IN CATALOG ITEMS ON SERVICE PORTAL

## 1. ADD A UI SCRIPT
In the Left Navigator Bar, go to System UI > UI Scripts

Click New

UI Script: GlobalCatalogItemFunctions
UI Type: All
Application: Global
Active: true

```JAVASCRIPT
function getSCAttachmentCount() {
  var length;
  try {
    length = angular.element("#sc_cat_item").scope().attachments.length;
  } catch(e) {
    length = -1;
  }
  return length;
}

```


## 2. ADD A JS THEME

In the Left Navigator Bar, go to Service Portal > Portals

Click the Portal you want to adjust. It maybe be the one with URL suffix of "sp".

Click the "info" button for the Theme. The standard theme is "Stock" or “La Jolla”

Scroll to the bottom to the JS Include Related List

Add your JS Include there

![Theme](https://images.squarespace-cdn.com/content/v1/527e1ef4e4b0910bac781301/1494601737734-0MDGIJNMEBSGDM1MV58J/ke17ZwdGBToddI8pDm48kD6nMtnRy8GMrL4YnSYL8-IUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dg2wZOE5EaydDlCDL8uLrFWC8E68xw6-_3MVAC4s8XYQCjLISwBs8eEdxAxTptZAUg/pastedImage_2.png?format=1500w)

### 3. CREATE A CATALOG CLIENT SCRIPT
For your catalog item you want to require attachments, use this client script.

Set the Isolate Script checkbox to false for this script. You may need to add it to the client script form to see the checkbox.

Name: Require Attachment
UI Type: All
Type: onSubmit

```JAVASCRIPT
function onSubmit() {
	//Works in non-portal ui
	try {
		var attachments = document.getElementById('header_attachment_list_label');
		if (attachments.style.visibility == 'hidden' || attachments.style.display == 'none' ) {
			g_form.addErrorMessage('You must attach a document before submitting this request.');
			return false;
		}
	}catch(e) {
		var count = getSCAttachmentCount();
		if(count <= 0) {
			g_form.addInfoMessage('You must attach a document before submitting this request.');
			return false;
		}
	}
}
```

## 4. SCOPED APPLICATION
If you are having trouble getting this to work with a scoped application.  

1. Switch to the scoped application
2. Add System Property

- Suffix: glide.script.block.client.globals
- Type: string
- Value: false

3. Click Submit
