# # Modal_Form

This is modal that shows a Servicenow Form.

Whit it you can edit, create or just view records.

### Parameters

- t or talbe or sl_table (mandatory): the table that you will get the data
- sys_id or sl_sys_id (mandatory): the field sys_id
- view or v (optional): form view

### Options

- Title (optional): the title
- Read Only Fields (optional): set all read only to all fields

### How it works?

- First you need set the parameters on your URL, like: &sys_id=your_sys_id&table=your_table&view=your_view
- Create a button or send a BroadCast to open the Modal. The widget already have a button to show how to do it.
- Finally, use the modal!!

### Gallery
![Button](https://github.com/WillianCostaOCL/service-now-sp/blob/main/Components/Modal_Form/modal_button.png)
![Form](https://github.com/WillianCostaOCL/service-now-sp/blob/main/Components/Modal_Form/modal_form.png)
![Options](https://github.com/WillianCostaOCL/service-now-sp/blob/main/Components/Modal_Form/modal_options.png)
