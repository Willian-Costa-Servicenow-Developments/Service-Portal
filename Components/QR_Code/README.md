# QR CODE


This is a code to generate QR Codes.


# Development

## GITHUB

```javascript
//Read me
https://github.com/davidshimjs/qrcodejs

//qrcode.min.js
https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js
```


### Front-end code

```html
<h1>Numero</h1>
<div id="qrcode"></div>

<h1>Whatsapp</h1>
<div id="qrcode2"></div>

<h1>Email</h1>
<div id="qrcode3"></div>
```

### Client Side

Methode to generate a QR Code

 ```JAVASCRIPT
//new QRCode(element, link);
new QRCode(document.getElementById("qrcode"), "tel:1111111111");
new QRCode(document.getElementById("qrcode2"), "https://api.whatsapp.com/send?phone=551199999999");
new QRCode(document.getElementById("qrcode3"), "mailto:youremail@email.com");
 ```

### Gallery
![QR Codes](https://github.com/Organize-Cloud-Labs/Service-Portal/blob/main/Components/QR_Code/qr_code.png)

