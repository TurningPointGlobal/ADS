"use strict";String.prototype.format||(String.prototype.format=function(){var a=arguments;return this.replace(/{(\d+)}/g,function(b,c){return"undefined"!=typeof a[c]?a[c]:b})}),angular.module("jDeriveApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap.datetimepicker","ui.select2","gridshore.c3js.chart","angucomplete-alt","angularMoment"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("jDeriveApp").controller("MainCtrl",["$scope","basicService","$filter","$interval","configService",function(a,b,c,d,e){function f(d){a.chartLoading=!0;var e=[],f="20040101",h=c("date")(new Date,"yyyyMMdd");a.search.fromDate&&(f=i(a.search.fromDate).format("YYYYMMDD")),a.search.toDate&&(h=i(a.search.toDate).format("YYYYMMDD")),b.getCountbyReceivedDate(f,h,"receivedate",d).then(function(b){a.chartLoading=!1,b&&(e=b.results);var c=[];console.log(b),a.monthData=d3.nest().key(function(a){return a.time.slice(0,6)}).rollup(function(a){return d3.sum(a,function(a){return a.count})}).entries(e);var d=0,f={};if(a.monthData.map(function(a){d<parseInt(a.values)&&(d=a.values,f=a);var b=new Date(i(a.key,"YYYYMMDD"));c.push({time:b,count:a.values})}),c.length>0){$("#eventGraphPanel").show();var h=new Date(i(c[0].time)),j=new Date(i(c[c.length-1].time));$("#dateSlider").dateRangeSlider("bounds",h,j),$("#dateSlider").dateRangeSlider("min",h),$("#dateSlider").dateRangeSlider("values",h,j),$("#noDataLabel").hide()}else{var h=new Date,j=new Date;$("#dateSlider").dateRangeSlider("bounds",h,j),$("#dateSlider").dateRangeSlider("min",h),$("#dateSlider").dateRangeSlider("values",h,j),$("#noDataLabel").show()}a.regions.length>0&&(a.regions=[]),a.regions.push({start:new Date(i(f.key,"YYYYMM").subtract(i.duration(3,"M"))),end:new Date(i(f.key,"YYYYMM").add(i.duration(3,"M"))),"class":"regionYellow"}),a.datapoints=c,g(c)},function(a){alert("Failed to get details.")})}function g(b){j=c3.generate({bindto:"#eventChart",data:{json:b,keys:{x:"time",value:["count"]}},point:{show:!1},axis:{x:{type:"timeseries",tick:{format:"%b %Y",rotate:40,fit:!0},label:{text:"Received Date",position:"inner-center"}},y:{label:{text:"Count",position:"outer-top"},tick:{fit:!0}}},regions:a.regions,color:{pattern:["#FF0000","#ff7f0e","#1f77b4","#aec7e8"]},zoom:{enabled:!1},legend:{show:!1},onrendered:function(){}})}function h(c,d){b.getDrugReaction(a.search.selectedDrug.id,c,d).then(function(b){a.drugReactionSummaryList=b.drugReactionSummaryList},function(a){console.log("charct",a)})}var i=window.moment;a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.demo1={min:0,max:100},a.serverUrl=e.apiUrl,a.searchAdvanced=!0,a.radioReaction="reaction",a.chartLoading=!1,a.countries=[],a.ageGroups=[],a.drugsList=[],a.reactionSkip=0,a.reactionCount=5,a.genderGroups=[{id:0,name:"Not Specified"},{id:2,name:"Female"},{id:1,name:"Male"}],b.getCountries().then(function(b){a.countries=b.countryList},function(a){console.log(a)}),b.getAgeGroups().then(function(b){a.ageGroups=b.ageGroupList},function(a){console.log(a)}),a.drugfocus=function(){(!a.search.selectedDrug||a.search.selectedDrug&&null===a.search.selectedDrug)&&a.$broadcast("angucomplete-alt:clearInput")},a.weightGroups=[],b.getWeightGroups().then(function(b){a.weightGroups=b.weightGroupList},function(a){console.log(a)}),a.search={searchAnywhere:!1},a.loadEventData=function(c){a.chartLoading=!0,b.getEventCount(c,"month").then(function(b){a.dataResult=[];b.drugSummaryByMonthList;a.dataResult=b.drugSummaryByMonthList;var c=[],d=0;if(a.dataResult.map(function(b){d<parseInt(b.eventCount)&&(d=b.eventCount,a.maxCountObject=b),c.push({time:b.startDate.slice(0,10),count:b.eventCount})}),c.length>0){$("#eventGraphPanel").show();var e=new Date(i(c[0].time)),f=new Date(i(c[c.length-1].time));$("#dateSlider").dateRangeSlider("bounds",e,f),$("#dateSlider").dateRangeSlider("min",e),$("#dateSlider").dateRangeSlider("values",e,f),$("#noDataLabel").hide()}else{var e=new Date,f=new Date;$("#dateSlider").dateRangeSlider("bounds",e,f),$("#dateSlider").dateRangeSlider("min",e),$("#dateSlider").dateRangeSlider("values",e,f),$("#noDataLabel").show()}a.regions.length>0&&(a.regions=[]),c.length>0?g(c):(g([]),$("#dateSlider").dateRangeSlider({formatter:function(a){return i(a).format("MMM YYYY")},step:{months:1}}));var h=a.maxCountObject;h&&h.startDate&&(a.duration=i.duration(3,"M"),a.regions.push({start:new Date(i(h.startDate).subtract(i.duration(3,"M"))),end:new Date(i(h.startDate).add(i.duration(3,"M"))),"class":"regionYellow"})),a.chartLoading=!1},function(b){a.chartLoading=!1,console.log("Failed service",b)})},$("#dateSlider").dateRangeSlider({formatter:function(a){return i(a).format("MMM YYYY")},step:{months:1}}),$("#dateSlider").bind("valuesChanged",function(a,b){j&&j.axis.range({max:{x:new Date(b.values.max)},min:{x:new Date(b.values.min)}})}),a.search.apiDataPoint="local",a.loadEventData(""),a.allSpikes=["2013-04-25","2013-04-28"],window.scope=a,a.datapoints=[],a.datacolumns=[{id:"count",type:"line",name:"Events"}],a.datax={id:"time",type:"timeseries"},a.drugEventSpikeList=[],a.drugEventSpikeList=[],a.recallNotfound=!1,a.recallInformation=[],a.ERSummaryList=[],a.dischargeSummaryList=[],a.selectedSearch="",a.regions=[];var j;g([]),b.getDrungDetails().then(function(b){a.drugDetails=b},function(a){}),a.searchDrugChanged=function(b){b&&b.originalObject?a.search.selectedDrug=b.originalObject:a.search.selectedDrug=null},a.resetSearch=function(){a.hideSpikeInformatrion(),a.$broadcast("angucomplete-alt:clearInput"),a.search={},a.drugEventSpikeList=[],a.selectedSearch="",a.loadEventData(""),a.search.apiDataPoint="local"},a.recallNotfound=!1,a.recallInformation=[],a.searchEvents=function(){a.hideSpikeInformatrion();var c=(a.search,"");a.search?(c+=a.search.selectedDrug?"&drugId="+a.search.selectedDrug.id:"",a.search.selectedDrug&&(b.getDrugSubstance(a.search.selectedDrug.name).then(function(c){if(c&&c.results.length>0){var d=!1;angular.forEach(c.results[0].patient.drug,function(e,f){e.medicinalproduct===a.search.selectedDrug.name&&(d=e.medicinalproduct,e.openfda&&e.openfda.substance_name&&e.openfda.substance_name.length>0&&b.getDrugRecall(e.openfda.substance_name[0]).then(function(b){b&&(b.error?a.recallNotfound=ture:a.recallInformation=b.results)},function(b){c.statusCode&&"404"===c.statusCode&&(a.recallNotfound=!0,a.recallInformation=[])}))}),d!==!1&&(a.recallNotfound=!0,a.recallInformation=[])}},function(a){}),a.drugEventSpikeList=[],b.getDrugEventSpikes(a.search.selectedDrug.id).then(function(b){a.drugEventSpikeList=b.drugEventSpikeList},function(a){console.log("spike",a)}),b.getDrugCharacterization(a.search.selectedDrug.id).then(function(b){a.drugCharSummaryList=b.drugCharSummaryList},function(a){console.log("charct",a)}),a.reactionSkip=0,h(a.reactionSkip,a.reactionCount),a.getDischargeSummary(a.search.selectedDrug.id),a.getERSummary(a.search.selectedDrug.id)),a.selectedSearch="",a.remoteSearch="",a.search.selectedDrug&&(a.selectedSearch+="for selected drug "+a.search.selectedDrug.name,a.remoteSearch+="patient.drug.medicinalproduct:"+a.search.selectedDrug.name),a.search.gender&&(c+="&genderId="+a.search.gender.id,a.selectedSearch+=(a.selectedSearch?",":"")+a.search.gender.name,a.remoteSearch+=(""!==a.remoteSearch?"+AND+":"")+"patient.patientsex:"+a.search.gender.id),a.search.age&&(c+="&ageGroupId="+a.search.age,a.selectedSearch+=(a.selectedSearch?",":"")+" age group "+$("#select2-chosen-2").html()),a.search.country&&(c+="&countryId="+a.search.country,a.selectedSearch+=(a.selectedSearch?",":"")+" country "+a.search.country),a.search.fromDate&&(c+="&startDate="+i(a.search.fromDate).unix(),a.selectedSearch+=" for "+i(a.search.fromDate).format("MM/DD/YYYY")),a.search.toDate&&(c+="&endDate="+i(a.search.toDate).unix(),a.selectedSearch+=(a.search.fromDate?" to ":" till ")+i(a.search.toDate).format("MM/DD/YYYY")),a.search.weight&&(c+="&weightGroupId="+a.search.weight,a.selectedSearch+=(a.selectedSearch?",":"")+" "+$("#select2-chosen-3").html())):(a.drugEventSpikeList=[],a.drugEventSpikeList=[],a.drugReactionSummaryList=[],a.recallNotfound=!1,a.recallInformation=[]),"local"==a.search.apiDataPoint?a.loadEventData(c):f(a.remoteSearch)},a.showSpikeInformatrion=function(b){angular.element("#spikeInformation").show(),angular.element("#eventInformation").hide(),a.getSpikeChartSummary(a.search.selectedDrug.id,b)},a.hideSpikeInformatrion=function(){angular.element("#spikeInformation").hide(),angular.element("#eventInformation").show()},a.getDischargeSummary=function(c){a.dischargeSummaryList=[],b.getDischargeSummary(c).then(function(b){a.dischargeSummaryList=b.dischargeSummary},function(a){console.log("getDischargeSummary",a)})},a.getERSummary=function(c){a.ERSummaryList=[],b.getERSummary(c).then(function(b){a.ERSummaryList=b.ersummary},function(a){console.log("getERSummary",a)})},a.SpikeChartSummary=[],a.getSpikeChartSummary=function(c,d){a.chartLoading=!0,a.SpikeChartSummary=[],b.getSpikeChartSummary(c,i(d).unix()).then(function(a){k(a.dimensionResponse)},function(a){console.log("getSpikeChartSummary",a)})};var k=function(b){var c=[],d=[],e=[];b.ageGroup&&angular.forEach(b.ageGroup,function(a){c.push([a.type,a.eventCount])}),b.genderGroup&&angular.forEach(b.genderGroup,function(a){e.push([a.type,a.eventCount])}),b.weightGroup&&angular.forEach(b.weightGroup,function(a){d.push([a.type,a.eventCount])}),a.chartLoading=!1,l("#ageGroupPie","donut",c,"Age Group"),l("#wightGroupPie","donut",d,"Weight Group(in Kg)"),l("#genderGroupPie","donut",e,"Gender")},l=function(a,b,c,d){c3.generate({bindto:a,data:{columns:c,type:b},pie:{title:"Test"},tooltip:{format:{value:function(a){return a}}},donut:{title:d}})};a.reactionsLoading=!1,a.loadMoreReactions=function(){a.reactionsLoading=!0,a.reactionSkip+=a.reactionCount,b.getDrugReaction(a.search.selectedDrug.id,a.reactionSkip,a.reactionCount).then(function(b){angular.forEach(b.drugReactionSummaryList,function(b){a.drugReactionSummaryList.push(b)}),a.reactionsLoading=!1},function(a){console.log("reactions",a)})}}]),angular.module("jDeriveApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("jDeriveApp").service("basicService",["$http","$q","configService",function(a,b,c){var d={};return d.getCountbyReceivedDate=function(c,d,e,f){var g="https://api.fda.gov/drug/event.json?search=receivedate:["+c+"+TO+"+d+"]"+(""===f?"":"+AND+"+f)+"&count="+e,h=b.defer();return a.get(g).success(function(a){h.resolve(a)}).error(function(a){h.reject(a)}),h.promise},d.getDrugSubstance=function(c){var d="{0}{1}".format("https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:",c),e=b.defer();return a.get(d).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},d.getDrugRecall=function(c){var d="{0}{1}".format("https://api.fda.gov/drug/enforcement.json?search=openfda.substance_name:",c),e=b.defer();return a.get(d).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},d.getDrungDetails=function(){var a=b.defer(),c=[{drugName:"81 MG ASPIRIN ",reaction:"Depression",count:"3121"},{drugName:"ADDERALL",reaction:"Mood swings",count:"4526"},{drugName:"CALCITRIOL",reaction:"Somnolence",count:"32123"}];return a.resolve(c),a.promise},d.getCountries=function(){var d="{0}/{1}".format(c.apiUrl,"country/list"),e=b.defer();return a.get(d).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},d.getAgeGroups=function(){var d="{0}/{1}".format(c.apiUrl,"agegroup/list"),e=b.defer();return a.get(d).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},d.getWeightGroups=function(){var d="{0}/{1}".format(c.apiUrl,"weightgroup/list"),e=b.defer();return a.get(d).success(function(a){e.resolve(a)}).error(function(){e.reject("Failed to get details.")}),e.promise},d.getEventCount=function(d,e){var f="{0}/{1}?{2}".format(c.apiUrl,"drugs/eventcount",d);e&&"month"===e&&(f="{0}/{1}?{2}".format(c.apiUrl,"drugs/eventcount/month",d));var g=b.defer();return a.get(f).success(function(a){g.resolve(a)}).error(function(a){g.reject(a)}),g.promise},d.getDrugsList=function(){var d="{0}/{1}/{2}".format(c.apiUrl,"drugs/name","baclof"),e=b.defer();return a.get(d).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},d.getDrugEventSpikes=function(d){var e="{0}/{1}/{2}/spike".format(c.apiUrl,"drugs",d),f=b.defer();return a.get(e).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise},d.getDrugCharacterization=function(d){var e="{0}/{1}/{2}/characterization".format(c.apiUrl,"drugs",d),f=b.defer();return a.get(e).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise},d.getDrugReaction=function(d,e,f){var g="{0}/{1}/{2}/reaction?firstResult={3}&maxResults={4}".format(c.apiUrl,"drugs",d,e,f),h=b.defer();return a.get(g).success(function(a){h.resolve(a)}).error(function(a){h.reject(a)}),h.promise},d.getDischargeSummary=function(d){var e="{0}/drugs/{1}/indication/dischargesummary".format(c.apiUrl,d),f=b.defer();return a.get(e).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise},d.getERSummary=function(d){var e="{0}/drugs/{1}/indication/ersummary".format(c.apiUrl,d),f=b.defer();return a.get(e).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise},d.getSpikeChartSummary=function(d,e){var f="{0}/drugs/{1}/dimensions?date={2}".format(c.apiUrl,d,e),g=b.defer();return a.get(f).success(function(a){g.resolve(a)}).error(function(a){g.reject(a)}),g.promise},d}]),angular.module("jDeriveApp").directive("datetimeFormater",["$filter",function(a){return{restrict:"A",require:"ngModel",scope:{myModel:"=?ngModel",myFormat:"=?datetimeFormater"},link:function(b,c,d,e){b.$watch(function(){return e.$modelValue},function(b){c.val(a("date")(e.$modelValue,d.datetimeFormater))})}}}]),angular.module("jDeriveApp").service("configService",function(){var a={protocol:"http",host:"52.24.193.94",port:"8080",contextRoot:"dAnalytics"};return a.port&&""!==a.port?a.apiUrl="{0}://{1}:{2}/{3}".format(a.protocol,a.host,a.port,a.contextRoot):a.apiUrl="{0}://{1}/{2}".format(a.protocol,a.host,a.contextRoot),a}),angular.module("jDeriveApp").directive("daDateformat",["moment",function(a){return{restrict:"A",link:function(a,b,c){b.text("this is the daDateformat directive")}}}]).directive("whenScrollEnds",function(){return{restrict:"A",link:function(a,b,c){var d=b.height(),e=100;b.scroll(function(){var f=b.prop("scrollHeight"),g=f-d;g-b.scrollTop()<=e&&a.$apply(c.whenScrollEnds)})}}}),angular.module("jDeriveApp").filter("daDateformat",["moment",function(a){return function(b,c,d){return a(b,c).format(d)}}]);