REGISTER udf.jar;

inputfile = load '$input' USING PigStorage(',') as (SAFETYREPORTVERSION:chararray,SAFETYREPORTID:chararray,PRIMARYSOURCECOUNTRY:chararray,OCCURCOUNTRY:chararray,TRANSMISSIONDATEFORMAT:chararray,TRANSMISSIONDATE:chararray,REPORTTYPE:chararray,RECEIVEDATEFORMAT:chararray,RECEIVEDATE:chararray,RECEIPTDATEFORMAT:chararray,RECEIPTDATE:chararray,FULFILLEXPEDITECRITERIA:chararray,COMPANYNUMB:chararray,DUPLICATE:chararray,DUPLICATESOURCE:chararray,DUPLICATENUMB:chararray,REPORTERCOUNTRY:chararray,QUALIFICATION:chararray,SENDERTYPE:chararray,SENDERORGANIZATION:chararray,RECEIVERTYPE:chararray,RECEIVERORGANIZATION:chararray,PATIENTONSETAGE:int,PATIENTONSETAGEUNIT:chararray,PATIENTWEIGHT:int,PATIENTSEX:chararray,DRUGCHARACTERIZATION:chararray,MEDICINALPRODUCT:chararray,DRUGDOSAGETEXT:chararray,DRUGDOSAGEFORM:chararray,DRUGAUTHORIZATIONNUMB:chararray,DRUGSTRUCTUREDOSAGENUMB:chararray,DRUGSTRUCTUREDOSAGEUNIT:chararray,DRUGSEPARATEDOSAGENUMB:chararray,DRUGINTERVALDOSAGEUNITNUMB:chararray,DRUGINTERVALDOSAGEDEFINITION:chararray,DRUGAADMINISTRATIONROUTE:chararray,DRUGINDICATION:chararray,DRUGSTARTDATEFORMAT:chararray,DRUGSTARTDATE:chararray,DRUGENDDATEFORMAT:chararray,DRUGENDDATE:chararray,ACTIONDRUG:chararray,ACTIVESUBSTANCENAME:chararray,REACTIONMEDDRAVERSIONPT:chararray,REACTIONMEDDRAPT:chararray,REACTIONOUTCOME:chararray,NARRATIVEINCLUDECLINICAL:chararray);

grps = GROUP inputfile by (com.tpgsi.jderive.StringHashCode(UPPER(TRIM(MEDICINALPRODUCT))), com.tpgsi.jderive.StringHashCode(UPPER(TRIM(REACTIONMEDDRAPT))));
 
groupCount =  foreach grps { repid = DISTINCT inputfile.SAFETYREPORTID; generate group, COUNT(repid);};

result = foreach groupCount generate FLATTEN($0),$1;
	
STORE result INTO 'CompleteDS/drugreactionsummary' USING PigStorage (',');  