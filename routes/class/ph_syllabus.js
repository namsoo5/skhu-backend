const system = require("system");
const webPage = require("webpage");
const page = webPage.create();

// var utils = require('../utils');

// 명령행 인자로 넘겨바든 값 불러와서 변수로 저장
const url = "https://forest.skhu.ac.kr/GATE/SAM/LESSON/S/SSES01S.ASPX?&maincd=O&systemcd=S&seq=1";
const TXTYY = system.args[1] == undefined ? "" : system.args[1]; // 년도
const DDLHAGGI = system.args[2] == undefined ? "" : system.args[2]; // 학기코드
const DDLSEARCH = system.args[3] == undefined ? "" : system.args[3]; // 검색 유형
const TXTSEARCH = system.args[4] == undefined ? "" : system.args[4]; // 검색 키워드
// 쿠키값 로드
const COOKIE1_domain = system.args[5];
const COOKIE1_httponly = system.args[6];
const COOKIE1_name = system.args[7];
const COOKIE1_path = system.args[8];
const COOKIE1_secure = system.args[9];
const COOKIE1_value = system.args[10];
const COOKIE2_domain = system.args[11];
const COOKIE2_httponly = system.args[12];
const COOKIE2_name = system.args[13];
const COOKIE2_path = system.args[14];
const COOKIE2_secure = system.args[15];
const COOKIE2_value = system.args[16];
const COOKIE3_domain = system.args[17];
const COOKIE3_httponly = system.args[18];
const COOKIE3_name = system.args[19];
const COOKIE3_path = system.args[20];
const COOKIE3_secure = system.args[21];
const COOKIE3_value = system.args[22];
const COOKIE4_domain = system.args[23];
const COOKIE4_httponly = system.args[24];
const COOKIE4_name = system.args[25];
const COOKIE4_path = system.args[26];
const COOKIE4_secure = system.args[27];
const COOKIE4_value = system.args[28];

let submited = false;

// Add Cookies
phantom.addCookie({"domain":COOKIE1_domain, "httponly":COOKIE1_httponly, "name":COOKIE1_name, "path":COOKIE1_path, "secure":COOKIE1_secure, "value":COOKIE1_value});
phantom.addCookie({"domain":COOKIE2_domain, "httponly":COOKIE2_httponly, "name":COOKIE2_name, "path":COOKIE2_path, "secure":COOKIE2_secure, "value":COOKIE2_value});
phantom.addCookie({"domain":COOKIE3_domain, "httponly":COOKIE3_httponly, "name":COOKIE3_name, "path":COOKIE3_path, "secure":COOKIE3_secure, "value":COOKIE3_value});
phantom.addCookie({"domain":COOKIE4_domain, "httponly":COOKIE4_httponly, "name":COOKIE4_name, "path":COOKIE4_path, "secure":COOKIE4_secure, "value":COOKIE4_value});

// userAgent - IE
page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
page.settings.javascriptEnabled = true;

// Load Syllabus Page
page.open(url, (status) => {
});

// If Page is fully loaded
page.onLoadFinished = function(status) {
	if(submited==false){
		page.evaluate((year, haggi, ddlsearch, txtsearch) => {
			// Set Value on Input
			document.querySelector("#txtYy").value = year;
			document.querySelector("#ddlHaggi").value = haggi;
			document.querySelector("#ddlSearch").value = ddlsearch;
			document.querySelector("#txtSearch").value = txtsearch;
			// Submit
			document.querySelector("#Form1").submit();
		}, TXTYY, DDLHAGGI, DDLSEARCH, TXTSEARCH);
		submited = true;
	}else{
		page.evaluate(() => {
			// Click the button to load data
			document.querySelector("#CSMenuButton1_List").click();
		});
	}
};

// Error Handling
page.onError = function(msg, trace) {

	const msgStack = ["ERROR: " + msg];

	if (trace && trace.length) {
		msgStack.push("TRACE:");
		trace.forEach((t) => {
			msgStack.push(" -> " + t.file + ": " + t.line + (t.function ? " (in function \"" + t.function +"\")" : ""));
		});
	}

	// console.error(msgStack.join('\n'));
	// phantom.exit();
};

page.onResourceRequested = function(requestData, networkRequest) {
	// Block CoreSecurity.js - It will redirect us to the main page
	const burl="https://forest.skhu.ac.kr/Gate/Common/JavaScript/CoreSecurity.js";
	if(requestData.url==burl){
		networkRequest.abort();
	}
};

// When "Search" button clicked, it will make this event invoked soon.
// use this event to get data
page.onResourceReceived = function(response){
	const doneurl = "https://forest.skhu.ac.kr/GATE/SAM/LESSON/S/SSES01S.ASPX?maincd=O&systemcd=S&seq=1";
	if(response.url == doneurl){
		// Wait for data to be displayed on the page.
		// For one sec maybe?
		setTimeout(() => {
			// Pass page content to node server with "console.log"
			console.log(page.content);
			// OK, Done.
			phantom.exit();
		}, 1000);
	}
};
