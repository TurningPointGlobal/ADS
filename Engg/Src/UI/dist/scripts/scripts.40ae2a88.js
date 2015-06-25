"use strict";String.prototype.format||(String.prototype.format=function(){var a=arguments;return this.replace(/{(\d+)}/g,function(b,c){return"undefined"!=typeof a[c]?a[c]:b})}),angular.module("jDeriveApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap.datetimepicker","ui.select2","gridshore.c3js.chart","angucomplete-alt","angularMoment"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/details",{templateUrl:"views/details.html",controller:"DetailsCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("jDeriveApp").controller("MainCtrl",["$scope","basicService","$filter","$interval","configService",function(a,b,c,d,e){function f(){var d=[],e="20040101",f=c("date")(new Date,"yyyyMMdd");a.search.fromDate&&(e=h(a.search.fromDate).format("YYYYMMDD")),a.search.toDate&&(f=h(a.search.toDate).format("YYYYMMDD")),b.getCountbyReceivedDate(e,f,"receivedate").then(function(b){b&&(d=b.results);var c=[];a.monthData=d3.nest().key(function(a){return a.time.slice(0,6)}).rollup(function(a){return d3.sum(a,function(a){return a.count})}).entries(d);var e=0,f={};d.map(function(b){e<parseInt(b.eventCount)&&(e=b.eventCount,f=b);var d=new Date(h(b.time,"YYYYMMDD"));c.push({time:d,count:b.count}),a.regions.length>0&&(a.regions=[]),a.regions.push({start:new Date(h(f.eventDate).subtract(h.duration(22,"d"))),end:new Date(h(f.eventDate).add(h.duration(5,"d"))),"class":"regionYellow"})}),a.datapoints=c,i.load({json:a.datapoints,keys:{x:"time",value:["count"]}})},function(a){alert("Failed to get details.")})}function g(b){i=c3.generate({bindto:"#eventChart",data:{json:b,keys:{x:"time",value:["count"]}},point:{show:!1},axis:{x:{type:"timeseries",tick:{format:"%b %Y",rotate:40,fit:!0},label:{text:"Received Date",position:"inner-center"}},y:{label:{text:"Count",position:"outer-top"},tick:{fit:!0}}},regions:a.regions,color:{pattern:["#FF0000","#ff7f0e","#1f77b4","#aec7e8"]},zoom:{enabled:!1},legend:{show:!1},onrendered:function(){}})}var h=window.moment;a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.demo1={min:0,max:100},a.serverUrl=e.apiUrl,a.searchAdvanced=!0,a.radioReaction="reaction",a.countries=[],a.ageGroups=[],a.drugsList=[],b.getCountries().then(function(b){a.countries=b.countryList},function(a){console.log(a)}),b.getAgeGroups().then(function(b){a.ageGroups=b.ageGroupList},function(a){console.log(a)}),a.weightGroups=[],b.getWeightGroups().then(function(b){a.weightGroups=b.weightGroupList},function(a){console.log(a)}),a.search={},a.loadEventData=function(c){b.getEventCount(c,"month").then(function(b){a.dataResult=[];b.drugSummaryByMonthList;a.dataResult=b.drugSummaryByMonthList;var c=[],d=0;if(a.dataResult.map(function(b){d<parseInt(b.eventCount)&&(d=b.eventCount,a.maxCountObject=b),c.push({time:new Date(b.startDate),count:b.eventCount})}),c.length>0){$("#eventGraphPanel").show();var e=new Date(h(c[0].time)),f=new Date(h(c[c.length-1].time));$("#dateSlider").dateRangeSlider("bounds",e,f),$("#dateSlider").dateRangeSlider("min",e),$("#dateSlider").dateRangeSlider("values",e,f),$("#noDataLabel").hide()}else{var e=new Date,f=new Date;$("#dateSlider").dateRangeSlider("bounds",e,f),$("#dateSlider").dateRangeSlider("min",e),$("#dateSlider").dateRangeSlider("values",e,f),$("#noDataLabel").show()}a.regions.length>0&&(a.regions=[]),c.length>0?g(c):(g([]),$("#dateSlider").dateRangeSlider({formatter:function(a){return h(a).format("MMM YYYY")},step:{months:1}}));var i=a.maxCountObject;i&&i.startDate&&(a.duration=h.duration(3,"M"),a.regions.push({start:new Date(h(i.startDate).subtract(h.duration(3,"M"))),end:new Date(h(i.startDate).add(h.duration(3,"M"))),"class":"regionYellow"}))},function(a){console.log("Failed service",a)})},$("#dateSlider").dateRangeSlider({formatter:function(a){return h(a).format("MMM YYYY")},step:{months:1}}),$("#dateSlider").bind("valuesChanged",function(a,b){i&&i.axis.range({max:{x:new Date(b.values.max)},min:{x:new Date(b.values.min)}})}),a.apiDataPoint="local",a.loadEventData(""),a.allSpikes=["2013-04-25","2013-04-28"],window.scope=a,a.datapoints=[],a.datacolumns=[{id:"count",type:"line",name:"Events"}],a.datax={id:"time",type:"timeseries"},a.drugEventSpikeList=[],a.drugEventSpikeList=[],a.recallNotfound=!1,a.recallInformation=[],a.ERSummaryList=[],a.dischargeSummaryList=[],a.selectedSearch="",a.regions=[];var i;g([]),b.getDrungDetails().then(function(b){a.drugDetails=b},function(a){}),a.searchDrugChanged=function(b){b&&b.originalObject&&(a.search.selectedDrug=b.originalObject)},a.resetSearch=function(){a.$broadcast("angucomplete-alt:clearInput"),a.search={},a.loadEventData("")},a.recallNotfound=!1,a.recallInformation=[],a.searchEvents=function(){var c=(a.search,"");a.search?(c+=a.search.selectedDrug?"&drugId="+a.search.selectedDrug.id:"",a.search.selectedDrug&&(b.getDrugSubstance(a.search.selectedDrug.name).then(function(c){if(c&&c.results.length>0){var d=!1;angular.forEach(c.results[0].patient.drug,function(e,f){e.medicinalproduct===a.search.selectedDrug.name&&(d=e.medicinalproduct,e.openfda&&e.openfda.substance_name&&e.openfda.substance_name.length>0&&b.getDrugRecall(e.openfda.substance_name[0]).then(function(b){b&&(b.error?a.recallNotfound=ture:a.recallInformation=b.results)},function(b){c.statusCode&&"404"===c.statusCode&&(a.recallNotfound=!0,a.recallInformation=[])}))}),d!==!1&&(a.recallNotfound=!0,a.recallInformation=[])}},function(a){}),a.drugEventSpikeList=[],b.getDrugEventSpikes(a.search.selectedDrug.id).then(function(b){a.drugEventSpikeList=b.drugEventSpikeList},function(a){console.log("spike",a)}),b.getDrugCharacterization(a.search.selectedDrug.id).then(function(b){a.drugCharSummaryList=b.drugCharSummaryList},function(a){console.log("charct",a)}),b.getDrugReaction(a.search.selectedDrug.id).then(function(b){a.drugReactionSummaryList=b.drugReactionSummaryList},function(a){console.log("charct",a)})),a.selectedSearch="",a.search.selectedDrug&&(a.selectedSearch+="for selected drug "+a.search.selectedDrug.name),a.search.gender&&(c+="&gender="+a.search.gender,a.selectedSearch+=", "+a.search.gender),a.search.age&&(c+="&ageGroupId="+a.search.age,a.selectedSearch+=a.selectedSearch?",":" age group "+a.search.age),a.search.country&&(c+="&countryId="+a.search.country,a.selectedSearch+=""),a.search.fromDate&&(c+="&startDate="+h(a.search.fromDate).utc().valueOf(),a.selectedSearch+=a.selectedSearch?",":" for "+h(a.search.fromDate).format("MM/YYYY")),a.search.toDate&&(c+="&endDate="+h(a.search.toDate).utc().valueOf(),a.selectedSearch+=a.search.fromDate?" to ":" till "+h(a.search.toDate).format("MM/YYYY")),a.search.weight&&(c+="&weightGroupId="+a.search.weight,a.selectedSearch+=a.selectedSearch?",":" "+a.search.weight)):(a.drugEventSpikeList=[],a.drugEventSpikeList=[],a.drugReactionSummaryList=[],a.recallNotfound=!1,a.recallInformation=[]),"local"==a.apiDataPoint?a.loadEventData(c):f()},a.showSpikeInformatrion=function(){angular.element("#spikeInformation").show(),angular.element("#eventInformation").hide(),j()},a.hideSpikeInformatrion=function(){angular.element("#spikeInformation").hide(),angular.element("#eventInformation").show()},a.getDischargeSummary=function(c){a.dischargeSummaryList=[],b.getDischargeSummary(c).then(function(b){a.dischargeSummaryList=b.dishargeSummaryList},function(a){console.log("charct",a)})},a.getERSummary=function(c){a.ERSummaryList=[],b.getERSummary(c).then(function(b){a.ERSummaryList=b.ERSummaryList},function(a){console.log("charct",a)})};var j=function(){var a=[["Child",30],["Adult",120],["Old",300]],b=[["Under 50",200],["51 - 70",60],["Over 70",300]],c=[["Unknown",60],["Male",100],["Female",70]],d=[["US",60],["IN",100],["GB",70],["CA",20]];k("#ageGroupPie","donut",a,"Age Group"),k("#wightGroupPie","donut",b,"Weight Group"),k("#genderGroupPie","donut",c,"Gender"),k("#countryPie","donut",d,"Country")},k=function(a,b,c,d){c3.generate({bindto:a,data:{columns:c,type:b},pie:{title:"Test"},tooltip:{format:{value:function(a){return a}}},donut:{title:d}})}}]),angular.module("jDeriveApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("jDeriveApp").service("basicService",["$http","$q","configService",function(a,b,c){var d={};return d.getCountbyReceivedDate=function(c,d,e){var f="https://api.fda.gov/drug/event.json?search=receivedate:["+c+"+TO+"+d+"]&count="+e,g=b.defer();return a.get(f).success(function(a){g.resolve(a)}).error(function(a){g.reject(a)}),g.promise},d.getDrugSubstance=function(c){var d="{0}{1}".format("https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:",c),e=b.defer();return a.get(d).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},d.getDrugRecall=function(c){var d="{0}{1}".format("https://api.fda.gov/drug/enforcement.json?search=openfda.substance_name:",c),e=b.defer();return a.get(d).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},d.getDrungDetails=function(){var a=b.defer(),c=[{drugName:"81 MG ASPIRIN ",reaction:"Depression",count:"3121"},{drugName:"ADDERALL",reaction:"Mood swings",count:"4526"},{drugName:"CALCITRIOL",reaction:"Somnolence",count:"32123"}];return a.resolve(c),a.promise},d.getCountries=function(){var d="{0}/{1}".format(c.apiUrl,"country/list"),e=b.defer();return a.get(d).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},d.getAgeGroups=function(){var d="{0}/{1}".format(c.apiUrl,"agegroup/list"),e=b.defer();return a.get(d).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},d.getWeightGroups=function(){var d="{0}/{1}".format(c.apiUrl,"weightgroup/list"),e=b.defer();return a.get(d).success(function(a){e.resolve(a)}).error(function(){e.reject("Failed to get details.")}),e.promise},d.getEventCount=function(d,e){var f="{0}/{1}?{2}".format(c.apiUrl,"drugs/eventcount",d);e&&"month"===e&&(f="{0}/{1}?{2}".format(c.apiUrl,"drugs/eventcount/month",d));var g=b.defer();return a.get(f).success(function(a){g.resolve(a)}).error(function(a){g.reject(a)}),g.promise},d.getDrugsList=function(){var d="{0}/{1}/{2}".format(c.apiUrl,"drugs/name","baclof"),e=b.defer();return a.get(d).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},d.getDrugEventSpikes=function(d){var e="{0}/{1}/{2}/spike".format(c.apiUrl,"drugs",d),f=b.defer();return a.get(e).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise},d.getDrugCharacterization=function(d){var e="{0}/{1}/{2}/characterization".format(c.apiUrl,"drugs",d),f=b.defer();return a.get(e).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise},d.getDrugReaction=function(d){var e="{0}/{1}/{2}/reaction".format(c.apiUrl,"drugs",d),f=b.defer();return a.get(e).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise},d.getDischargeSummary=function(d){var e="{0}/drugs/{1}/indication/dischargesummary".format(c.apiUrl,d),f=b.defer();return a.get(e).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise},d.getERSummary=function(d){var e="{0}/drugs/{1}/indication/ersummary".format(c.apiUrl,d),f=b.defer();return a.get(e).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise},d}]),angular.module("jDeriveApp").directive("datetimeFormater",["$filter",function(a){return{restrict:"A",require:"ngModel",scope:{myModel:"=?ngModel",myFormat:"=?datetimeFormater"},link:function(b,c,d,e){b.$watch(function(){return e.$modelValue},function(b){c.val(a("date")(e.$modelValue,d.datetimeFormater))})}}}]),angular.module("jDeriveApp").controller("DetailsCtrl",["$scope","basicService","$filter","$interval",function(a,b,c,d){function e(){var d=[],e="20040101",h=c("date")(new Date,"yyyyMMdd");a.search.fromDate&&(e=f(a.search.fromDate).format("YYYYMMDD")),a.search.toDate&&(h=f(a.search.toDate).format("YYYYMMDD")),b.getCountbyReceivedDate(e,h,"receivedate").then(function(b){b&&(d=b.results);var c=[];d.map(function(b){var d=new Date(f(b.time,"YYYYMMDD"));if(b.count>8e3){var e=f(d).subtract(f.duration(5,"d"));a.regions.length>0&&new Date(a.regions[a.regions.length-1].end)>=new Date(e)?a.regions[a.regions.length-1].end=f(d).add(f.duration(5,"d")):a.regions.push({start:e,end:f(d).add(f.duration(5,"d")),"class":"regionYellow"})}c.push({time:d,count:b.count})}),a.datapoints=c,g.load({json:a.datapoints,keys:{x:"time",value:["count"]}})},function(a){alert("Failed to get details."),console.log(a)})}var f=window.moment;a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.radioReaction="reaction",a.countries=[{name:"Afghanistan",code:"AF"},{name:"Aland Islands",code:"AX"},{name:"Albania",code:"AL"},{name:"Algeria",code:"DZ"},{name:"American Samoa",code:"AS"},{name:"Andorra",code:"AD"},{name:"Angola",code:"AO"},{name:"Anguilla",code:"AI"},{name:"Antarctica",code:"AQ"},{name:"Antigua and Barbuda",code:"AG"},{name:"Argentina",code:"AR"},{name:"Armenia",code:"AM"},{name:"Aruba",code:"AW"},{name:"Australia",code:"AU"},{name:"Austria",code:"AT"},{name:"Azerbaijan",code:"AZ"},{name:"Bahamas",code:"BS"},{name:"Bahrain",code:"BH"},{name:"Bangladesh",code:"BD"},{name:"Barbados",code:"BB"},{name:"Belarus",code:"BY"},{name:"Belgium",code:"BE"},{name:"Belize",code:"BZ"},{name:"Benin",code:"BJ"},{name:"Bermuda",code:"BM"},{name:"Bhutan",code:"BT"},{name:"Bolivia",code:"BO"},{name:"Bosnia and Herzegovina",code:"BA"},{name:"Botswana",code:"BW"},{name:"Bouvet Island",code:"BV"},{name:"Brazil",code:"BR"},{name:"British Indian Ocean Territory",code:"IO"},{name:"Brunei Darussalam",code:"BN"},{name:"Bulgaria",code:"BG"},{name:"Burkina Faso",code:"BF"},{name:"Burundi",code:"BI"},{name:"Cambodia",code:"KH"},{name:"Cameroon",code:"CM"},{name:"Canada",code:"CA"},{name:"Cape Verde",code:"CV"},{name:"Cayman Islands",code:"KY"},{name:"Central African Republic",code:"CF"},{name:"Chad",code:"TD"},{name:"Chile",code:"CL"},{name:"China",code:"CN"},{name:"Christmas Island",code:"CX"},{name:"Cocos (Keeling) Islands",code:"CC"},{name:"Colombia",code:"CO"},{name:"Comoros",code:"KM"},{name:"Congo",code:"CG"},{name:"Congo, The Democratic Republic of the",code:"CD"},{name:"Cook Islands",code:"CK"},{name:"Costa Rica",code:"CR"},{name:"Cote D'Ivoire",code:"CI"},{name:"Croatia",code:"HR"},{name:"Cuba",code:"CU"},{name:"Cyprus",code:"CY"},{name:"Czech Republic",code:"CZ"},{name:"Denmark",code:"DK"},{name:"Djibouti",code:"DJ"},{name:"Dominica",code:"DM"},{name:"Dominican Republic",code:"DO"},{name:"Ecuador",code:"EC"},{name:"Egypt",code:"EG"},{name:"El Salvador",code:"SV"},{name:"Equatorial Guinea",code:"GQ"},{name:"Eritrea",code:"ER"},{name:"Estonia",code:"EE"},{name:"Ethiopia",code:"ET"},{name:"Falkland Islands (Malvinas)",code:"FK"},{name:"Faroe Islands",code:"FO"},{name:"Fiji",code:"FJ"},{name:"Finland",code:"FI"},{name:"France",code:"FR"},{name:"French Guiana",code:"GF"},{name:"French Polynesia",code:"PF"},{name:"French Southern Territories",code:"TF"},{name:"Gabon",code:"GA"},{name:"Gambia",code:"GM"},{name:"Georgia",code:"GE"},{name:"Germany",code:"DE"},{name:"Ghana",code:"GH"},{name:"Gibraltar",code:"GI"},{name:"Greece",code:"GR"},{name:"Greenland",code:"GL"},{name:"Grenada",code:"GD"},{name:"Guadeloupe",code:"GP"},{name:"Guam",code:"GU"},{name:"Guatemala",code:"GT"},{name:"Guernsey",code:"GG"},{name:"Guinea",code:"GN"},{name:"Guinea-Bissau",code:"GW"},{name:"Guyana",code:"GY"},{name:"Haiti",code:"HT"},{name:"Heard Island and Mcdonald Islands",code:"HM"},{name:"Holy See (Vatican City State)",code:"VA"},{name:"Honduras",code:"HN"},{name:"Hong Kong",code:"HK"},{name:"Hungary",code:"HU"},{name:"Iceland",code:"IS"},{name:"India",code:"IN"},{name:"Indonesia",code:"ID"},{name:"Iran, Islamic Republic Of",code:"IR"},{name:"Iraq",code:"IQ"},{name:"Ireland",code:"IE"},{name:"Isle of Man",code:"IM"},{name:"Israel",code:"IL"},{name:"Italy",code:"IT"},{name:"Jamaica",code:"JM"},{name:"Japan",code:"JP"},{name:"Jersey",code:"JE"},{name:"Jordan",code:"JO"},{name:"Kazakhstan",code:"KZ"},{name:"Kenya",code:"KE"},{name:"Kiribati",code:"KI"},{name:"Korea, Democratic People's Republic of",code:"KP"},{name:"Korea, Republic of",code:"KR"},{name:"Kuwait",code:"KW"},{name:"Kyrgyzstan",code:"KG"},{name:"Lao People's Democratic Republic",code:"LA"},{name:"Latvia",code:"LV"},{name:"Lebanon",code:"LB"},{name:"Lesotho",code:"LS"},{name:"Liberia",code:"LR"},{name:"Libyan Arab Jamahiriya",code:"LY"},{name:"Liechtenstein",code:"LI"},{name:"Lithuania",code:"LT"},{name:"Luxembourg",code:"LU"},{name:"Macao",code:"MO"},{name:"Macedonia, The Former Yugoslav Republic of",code:"MK"},{name:"Madagascar",code:"MG"},{name:"Malawi",code:"MW"},{name:"Malaysia",code:"MY"},{name:"Maldives",code:"MV"},{name:"Mali",code:"ML"},{name:"Malta",code:"MT"},{name:"Marshall Islands",code:"MH"},{name:"Martinique",code:"MQ"},{name:"Mauritania",code:"MR"},{name:"Mauritius",code:"MU"},{name:"Mayotte",code:"YT"},{name:"Mexico",code:"MX"},{name:"Micronesia, Federated States of",code:"FM"},{name:"Moldova, Republic of",code:"MD"},{name:"Monaco",code:"MC"},{name:"Mongolia",code:"MN"},{name:"Montserrat",code:"MS"},{name:"Morocco",code:"MA"},{name:"Mozambique",code:"MZ"},{name:"Myanmar",code:"MM"},{name:"Namibia",code:"NA"},{name:"Nauru",code:"NR"},{name:"Nepal",code:"NP"},{name:"Netherlands",code:"NL"},{name:"Netherlands Antilles",code:"AN"},{name:"New Caledonia",code:"NC"},{name:"New Zealand",code:"NZ"},{name:"Nicaragua",code:"NI"},{name:"Niger",code:"NE"},{name:"Nigeria",code:"NG"},{name:"Niue",code:"NU"},{name:"Norfolk Island",code:"NF"},{name:"Northern Mariana Islands",code:"MP"},{name:"Norway",code:"NO"},{name:"Oman",code:"OM"},{name:"Pakistan",code:"PK"},{name:"Palau",code:"PW"},{name:"Palestinian Territory, Occupied",code:"PS"},{name:"Panama",code:"PA"},{name:"Papua New Guinea",code:"PG"},{name:"Paraguay",code:"PY"},{name:"Peru",code:"PE"},{name:"Philippines",code:"PH"},{name:"Pitcairn",code:"PN"},{name:"Poland",code:"PL"},{name:"Portugal",code:"PT"},{name:"Puerto Rico",code:"PR"},{name:"Qatar",code:"QA"},{name:"Reunion",code:"RE"},{name:"Romania",code:"RO"},{name:"Russian Federation",code:"RU"},{name:"Rwanda",code:"RW"},{name:"Saint Helena",code:"SH"},{name:"Saint Kitts and Nevis",code:"KN"},{name:"Saint Lucia",code:"LC"},{name:"Saint Pierre and Miquelon",code:"PM"},{name:"Saint Vincent and the Grenadines",code:"VC"},{name:"Samoa",code:"WS"},{name:"San Marino",code:"SM"},{name:"Sao Tome and Principe",code:"ST"},{name:"Saudi Arabia",code:"SA"},{name:"Senegal",code:"SN"},{name:"Serbia and Montenegro",code:"CS"},{name:"Seychelles",code:"SC"},{name:"Sierra Leone",code:"SL"},{name:"Singapore",code:"SG"},{name:"Slovakia",code:"SK"},{name:"Slovenia",code:"SI"},{name:"Solomon Islands",code:"SB"},{name:"Somalia",code:"SO"},{name:"South Africa",code:"ZA"},{name:"South Georgia and the South Sandwich Islands",code:"GS"},{name:"Spain",code:"ES"},{name:"Sri Lanka",code:"LK"},{name:"Sudan",code:"SD"},{name:"Suriname",code:"SR"},{name:"Svalbard and Jan Mayen",code:"SJ"},{name:"Swaziland",code:"SZ"},{name:"Sweden",code:"SE"},{name:"Switzerland",code:"CH"},{name:"Syrian Arab Republic",code:"SY"},{name:"Taiwan, Province of China",code:"TW"},{name:"Tajikistan",code:"TJ"},{name:"Tanzania, United Republic of",code:"TZ"},{name:"Thailand",code:"TH"},{name:"Timor-Leste",code:"TL"},{name:"Togo",code:"TG"},{name:"Tokelau",code:"TK"},{name:"Tonga",code:"TO"},{name:"Trinidad and Tobago",code:"TT"},{name:"Tunisia",code:"TN"},{name:"Turkey",code:"TR"},{name:"Turkmenistan",code:"TM"},{name:"Turks and Caicos Islands",code:"TC"},{name:"Tuvalu",code:"TV"},{name:"Uganda",code:"UG"},{name:"Ukraine",code:"UA"},{name:"United Arab Emirates",code:"AE"},{name:"United Kingdom",code:"GB"},{name:"United States",code:"US"},{name:"United States Minor Outlying Islands",code:"UM"},{name:"Uruguay",code:"UY"},{name:"Uzbekistan",code:"UZ"},{name:"Vanuatu",code:"VU"},{name:"Venezuela",code:"VE"},{name:"Vietnam",code:"VN"},{name:"Virgin Islands, British",code:"VG"},{name:"Virgin Islands, U.S.",code:"VI"},{name:"Wallis and Futuna",code:"WF"},{name:"Western Sahara",code:"EH"},{name:"Yemen",code:"YE"},{name:"Zambia",code:"ZM"},{name:"Zimbabwe",code:"ZW"}],a.drugs=["A-HYDROCORT","A-METHAPRED","A-N STANNOUS AGGREGATED ALBUMIN","A-POXIDE","A.P.L."],a.search={},a.search.fromDate=new Date("01/01/2014"),a.search.toDate=new Date,e(),window.scope=a,a.refreshChart=function(){e()},a.datapoints=[],a.datacolumns=[{id:"count",type:"line",name:"Events"}],a.datax={id:"time",type:"timeseries"},a.regions=[];var g=c3.generate({bindto:"#eventChart",data:{json:[]},point:{show:!1},axis:{x:{type:"timeseries",tick:{format:"%m/%d/%Y"}}},regions:a.regions,color:{pattern:["#ff7f0e","#1f77b4","#aec7e8"]}});b.getDrungDetails().then(function(b){a.drugDetails=b},function(a){})}]),angular.module("jDeriveApp").service("configService",function(){var a={protocol:"http",host:"192.168.140.34",port:"8080",contextRoot:"dAnalytics"};return a.port&&""!==a.port?a.apiUrl="{0}://{1}:{2}/{3}".format(a.protocol,a.host,a.port,a.contextRoot):a.apiUrl="{0}://{1}/{2}".format(a.protocol,a.host,a.contextRoot),a}),angular.module("jDeriveApp").directive("daDateformat",["moment",function(a){return{restrict:"A",link:function(a,b,c){b.text("this is the daDateformat directive")}}}]),angular.module("jDeriveApp").filter("daDateformat",["moment",function(a){return function(b,c,d){return a(b,c).format(d)}}]);