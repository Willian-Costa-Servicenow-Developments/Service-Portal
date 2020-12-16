# Images Analyzer

Compressing images means making them lighter, without necessarily losing quality. Technically, compaction is linked to the compression process.

Let's start from the idea that an image is a set of data and pixels, right? Within each image file - be it JPG, PNG, GIF or whatever - there is repeated information.

What compression does is, precisely, remove this redundant data, making the image less heavy.

The Image Analyzer checks your Service Portal very easily and quickly for images that may be causing performance problems when loading window elements.


![Images Analyzer](https://github.com/Organize-Cloud-Labs/Service-Portal/blob/main/Components/Images%20Analyzer/Images-Analyzer.png?raw=true)


## What are the parameters for a good image

```JAVASCRIPT

  /*
		Margin values in bytes for image sizes
	*/
	data.tolerance_size = 200000;
	data.max_size = 400000;

```

#### Tolerance: from 200KB to 399KB
#### Max size: 400KB, on top of that, it is necessary to compress the image


## How to use?

Import the component in your instance and access it via Header & Footer widgets (sp_header_footer.do)
