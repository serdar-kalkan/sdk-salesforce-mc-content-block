require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK();

var title, description;

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

function createWallet() {
	title = document.getElementById('text-input-id-0').value;
	description = document.getElementById('text-input-id-1').value;

	// ALTERED VERSION OF SETCONTENT & SETDATA
	// setContent(content, callback()). Only content attribute value is passed. It sets content stored in the widget as the original HTML(+script) of the body content of content block: CnC_Pickup_Wallet_ES_Omni in Test BU
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
										title + 
									'</td>' + 
								'</tr>' + 
								'<tr>' + 
									'<td name="body-wallet-subheading-text" id="body-wallet-subheading-text" class="xspace-headtop_3_2d" style=" padding-top:15px; padding-bottom:30px; font-family:Arial; font-size:14px; color:#8b8b8b;" align="center">' + 
										description + 
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
	
	// setData(dataObject, callback()). Required to retain the metada of the content block. In case of missing fields, there might be a loss of data.
	sdk.setData({
		title: title,
		description: description
	});
}

sdk.getData(function (data) {
	title = data.title || '';
	description = data.description || '';
	document.getElementById('text-input-id-0').value = title;
	document.getElementById('text-input-id-1').value = description;
	createWallet();
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(createWallet, 500)();
});
