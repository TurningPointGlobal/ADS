REGISTER udf.jar;

inputfile = load '$input' USING PigStorage(',') as (SAFETYREPORTVERSION:chararray,SAFETYREPORTID:chararray,PRIMARYSOURCECOUNTRY:chararray,OCCURCOUNTRY:chararray,TRANSMISSIONDATEFORMAT:chararray,TRANSMISSIONDATE:chararray,REPORTTYPE:chararray,RECEIVEDATEFORMAT:chararray,RECEIVEDATE:chararray,RECEIPTDATEFORMAT:chararray,RECEIPTDATE:chararray,FULFILLEXPEDITECRITERIA:chararray,COMPANYNUMB:chararray,DUPLICATE:chararray,DUPLICATESOURCE:chararray,DUPLICATENUMB:chararray,REPORTERCOUNTRY:chararray,QUALIFICATION:chararray,SENDERTYPE:chararray,SENDERORGANIZATION:chararray,RECEIVERTYPE:chararray,RECEIVERORGANIZATION:chararray,PATIENTONSETAGE:int,PATIENTONSETAGEUNIT:chararray,PATIENTWEIGHT:int,PATIENTSEX:chararray,DRUGCHARACTERIZATION:chararray,MEDICINALPRODUCT:chararray,DRUGDOSAGETEXT:chararray,DRUGDOSAGEFORM:chararray,DRUGAUTHORIZATIONNUMB:chararray,DRUGSTRUCTUREDOSAGENUMB:chararray,DRUGSTRUCTUREDOSAGEUNIT:chararray,DRUGSEPARATEDOSAGENUMB:chararray,DRUGINTERVALDOSAGEUNITNUMB:chararray,DRUGINTERVALDOSAGEDEFINITION:chararray,DRUGAADMINISTRATIONROUTE:chararray,DRUGINDICATION:chararray,DRUGSTARTDATEFORMAT:chararray,DRUGSTARTDATE:chararray,DRUGENDDATEFORMAT:chararray,DRUGENDDATE:chararray,ACTIONDRUG:chararray,ACTIVESUBSTANCENAME:chararray,REACTIONMEDDRAVERSIONPT:chararray,REACTIONMEDDRAPT:chararray,REACTIONOUTCOME:chararray,NARRATIVEINCLUDECLINICAL:chararray);

validrecords = FILTER inputfile by SAFETYREPORTID is not null OR SAFETYREPORTID != '' OR MEDICINALPRODUCT is not null OR MEDICINALPRODUCT != '';

grps = GROUP validrecords by (com.tpgsi.jderive.StringHashCode(UPPER(TRIM(MEDICINALPRODUCT))), com.tpgsi.jderive.AgeCategory(PATIENTONSETAGE),PATIENTSEX, com.tpgsi.jderive.WeightCategory(PATIENTWEIGHT),com.tpgsi.jderive.StringHashCode(UPPER(TRIM(REPORTERCOUNTRY))),com.tpgsi.jderive.FormatDate(RECEIVEDATE,SAFETYREPORTID));
 
groupCount =  foreach grps { repid = DISTINCT validrecords.SAFETYREPORTID; generate group, COUNT(repid);};

result = foreach groupCount generate FLATTEN($0),$1;
	
STORE result INTO 'CompleteDS/drugsummary' USING PigStorage (',');  