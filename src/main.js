require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK();

var address, mapsKey;

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function paintSettings () {
	document.getElementById('text-input-id-0').value = mapsKey;
	document.getElementById('text-input-id-1').value = address;
	// document.getElementById('slider-id-01').value = width;
	// document.getElementById('slider-id-02').value = height;
	// document.getElementById('slider-id-03').value = zoom;
} 

// function paintSliderValues () {
// 	document.getElementById('slider-id-01-val').innerHTML = document.getElementById('slider-id-01').value;
// 	document.getElementById('slider-id-02-val').innerHTML = document.getElementById('slider-id-02').value;
// 	document.getElementById('slider-id-03-val').innerHTML = document.getElementById('slider-id-03').value;
// }

function paintMap() {
	mapsKey = document.getElementById('text-input-id-0').value;
	address = document.getElementById('text-input-id-1').value;
	// width = document.getElementById('slider-id-01').value;
	// height = document.getElementById('slider-id-02').value;
	// zoom = document.getElementById('slider-id-03').value;
	// link = document.getElementById('text-input-id-2').value;
	// if (!address) {
	// 	return;
	// }
	// var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
	// 	address.split(' ').join('+') + '&size=' + width + 'x' + height + '&zoom=' + zoom +
	// 	'&markers=' + address.split(' ').join('+') + '&key=' + mapsKey;
	// sdk.setContent('<a href="' + link + '"><img src="' + url + '" /></a>');
	
	// ALTERED VERSION OF SETCONTENT 
	// sdk.setContent('<a href="' + address + '"><img src="' + mapsKey + '" /></a>');
	// sdk.setContent('<h2>' + address + '</h2><p>' + mapsKey + '</p>');
	sdk.setContent(
	'<table cellspacing="0" cellpadding="0" width="100%" align="left" border="0" style="background-color:#f2f2f2" bgcolor="#f2f2f2">' + 
		'<tr align="center">' + 
			'<td align="center" valign="top">' +         
				'<table border="0" width="640" cellpadding="0" cellspacing="0" class="templateColumns100">' +
					'<tr align="center">' + 
						'<td align="center" valign="top">' + 
							'<table width="100%" cellpadding="0" cellspacing="0" border="0">' + 
								'<tr>' + 
									'<td name="body-wallet-heading-text" id="body-wallet-heading-text" class="xspace-orhead_3_2d" align="center" valign="middle" style="padding-top:60px; padding-bottom:32px; font-family:Arial; font-size:18px; color:#333333; letter-spacing:0.3em;">' + 
										address + 
									'</td>' + 
								'</tr>' + 
								'<tr>' + 
									'<td name="body-wallet-subheading-text" id="body-wallet-subheading-text" class="xspace-headtop_3_2d" style=" padding-top:15px; padding-bottom:30px; font-family:Arial; font-size:14px; color:#8b8b8b;" align="center">' + 
										mapsKey + 
									'</td>' + 
								'</tr>' + 
								'<tr>' + 
									'<td height="40" align="center" valign="middle">' + 
										'<a name="body-wallet-link" id="body-wallet-link" href="https://scv-stg.adidas.com/cdc/pass.action?ident=cncES&euci=%%=v(@EUCI)=%%&lang=es&order=%%=v(@orderNumber)=%%&date=%%=v(@validity_date)=%%" _label="applewallet"><img name="body-wallet-image" id="body-wallet-image" src="http://image.link.adidas.com/lib/fe6515707c62007e7715/m/2/ca3de34d-6a1f-4e9c-90fe-7cb9b1623531.png?b=1520451857000" _label="applewallet" border="0" alt="Apple Wallet" style="display:block;"></a>' + 
									'</td>' + 
								'</tr>' + 
								'<tr>' + 
									'<td height="55" align="left" valign="middle">' + 
										'<img class="resizeImg" height="55" src="http://image.link.adidas.com/lib/fe6515707c62007e7715/m/1/37231f63-3f72-48f3-8047-2650e11742e8.gif" border="0" alt="" style="display:block;">' + 
									'</td>' + 
								'</tr>' + 
							'</table>' +   
						'</td>' + 
					'</tr>' +
				'</table>' +
			'</td>' + 
		'</tr>' +
	'</table>');
	sdk.setData({
		address: address,
		// width: width,
		// height: height,
		// zoom: zoom,
		// link: link,
		mapsKey: mapsKey
	});
	// localStorage.setItem('googlemapsapikeyforblock', mapsKey);
}

sdk.getData(function (data) {
	address = data.address || '';
	// width = data.width || 400;
	// height = data.height || 300;
	// zoom = data.zoom || 15;
	// link = data.link || '';
	// mapsKey = data.mapsKey || localStorage.getItem('googlemapsapikeyforblock');
	mapsKey = data.mapsKey;
	//paintSettings();
	// paintSliderValues();
	paintMap();
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintMap, 500)();
	// paintSliderValues();
});
