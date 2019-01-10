$.afui.useOSThemes=false;
    $.afui.loadDefaultHash=true;
    $.afui.autoLaunch=false;

    //check search
    var search=document.location.search.toLowerCase().replace("?","");
    if(search.length>0)
    {

       $.afui.useOSThemes=true;
        if(search=="win8")
            $.os.ie=true;
        else if(search=="firefox")
            $.os.fennec="true"
        $.afui.ready(function(){
            $(document.body).get(0).className=(search);
        });
    }

/******** jahangirEditedStart16Feb apipath *****************/





    $(document).ready(function(){
        $.afui.launch();
		$("#wait_image_login").hide();
			$("#loginButton").show();
	   	   		
	   		$("#load_image").hide();
			$('#screensettings_id').val('');
	

 		
			var screensettings_id_ob=$('#screensettings_id');				
			screensettings_id_ob.empty()
			screensettings_id_ob.append(localStorage.screensettingsdataShow);
		
			localStorage.picFlag=0
		
			
			if (localStorage.synced=='YES'){
				$('#cm_supCode').val(localStorage.user_id)
				$.afui.loadContent("#pageHomeView",true,true,'right');
			}
		
    });

    //if($.os.ios)
        $.afui.animateHeader(true);
	//	getLocation()









//var apiPath='http://127.0.0.1:8000/check_in/syncmobile_checkIn/';
var apiPath='http://w02.yeapps.com/checkin/syncmobile_checkIn/';
var apipath_image='http://w02.yeapps.com/checkin/syncmobile_checkIn/imageupload/'


//========================Location
function getLocationInfo() { //location
	$("#lat").val(0);
	$("#longitude").val(0);
	//alert ('Nadira')
	var options = { enableHighAccuracy: true, timeout:15000};
	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	
}

function onSuccess(position) {
	//alert ('1')
	$("#lat").val(position.coords.latitude);
	$("#longitude").val(position.coords.longitude);

	localStorage.latitude=position.coords.latitude
	localStorage.longitude=position.coords.longitude

	localStorage.location_error=''
	codeLatLng(position.coords.latitude, position.coords.longitude)
	
	
	
	
	
	
} 
function onError(error) {
	//alert ('2')
	$("#lat").val(0);
	$("#longitude").val(0);
	localStorage.location_error=error.code
	

}
//=============================================



function check_user() {
		// alert ('sumaiya')
		
	     var cid=$("#cid").val();
		 
		 var user_id=$("#user_id").val();
		 
	     var user_pass=$("#user_pass").val();
		
	     if (cid=="" || cid==undefined || user_id=="" || user_id==undefined || user_pass=="" || user_pass==undefined){
			 $("#error_login").html("Required CID, ID  and password");	
			
		 }else{
			
			
			$("#loginButton").hide();
			$("#wait_image_login").show(); 
			 
			localStorage.cid=cid;
			localStorage.user_id=user_id;
			localStorage.user_pass=user_pass;
			
			localStorage.synced='NO'
			localStorage.d_version=''
			localStorage.up_version=''
			localStorage.saved_dataShow=''
			
			localStorage.saved_data=''
			

			
			
			if(localStorage.syncCode==undefined || localStorage.syncCode==""){
					localStorage.syncCode=0
					
				}
				
				 	 
					 
			
	       // alert (apiPath+'check_user?cid='+localStorage.cid+'&repId='+localStorage.user_id+'&password='+encodeURIComponent(localStorage.user_pass)+'&syncCode='+localStorage.syncCode+'&d_version='+localStorage.d_version+'&up_version='+localStorage.up_version)
			
			$.ajax({
				 type: 'POST',
				 timeout: 30000,
								
				 
				 url: apiPath+'check_user?cid='+localStorage.cid+'&repId='+localStorage.user_id+'&password='+encodeURIComponent(localStorage.user_pass)+'&syncCode='+localStorage.syncCode+'&d_version='+localStorage.d_version+'&up_version='+localStorage.up_version,
				 success: function(result) {	
				 		
						if (result==''){		
							$("#error_login").html("Sorry Network not available");

						
							$("#wait_image_login").hide();
							$("#loginButton").show();
						}
						else{
							
							
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){
								
								$("#wait_image_login").hide();
								$("#loginButton").show();
								
								$("#error_login").html("Please enter valid  CID, User ID and Password");

								
								
							}
							if (resultArray[0]=='SUCCESS'){
								
								
								$("#wait_image_login").hide();
								$("#loginButton").show();
								
								localStorage.screensettingsdata=resultArray[1];

								localStorage.d_version=resultArray[2];

								localStorage.up_version=resultArray[3];

								localStorage.syncCode=resultArray[4];

								localStorage.synced='YES';
											
								//alert (localStorage.synced)		
										
								var screensettingsdata=localStorage.screensettingsdata

								screensettingsdataListStr=screensettingsdata.split('<rdrd>');

								var screensettingsdataShow=''
											//alert ('AA')
											for (i=0; i<screensettingsdataListStr.length-1; i++)
											
											{
												DataShowList=screensettingsdataListStr[i].split('<fdfd>')
												var DataShow=DataShowList[0]   //# dataName
												var DataCap=DataShowList[1]	   //# dataCaption
												var DataType=DataShowList[2]   //# dataType
												var MaxChar=DataShowList[3]   //# maxChar
												
												var combo_note=DataShowList[6]
												
												var input_id='input_'+i.toString()
												
												
												if (DataType=='COMBO'){
													combList = ''
													comvalList=combo_note.split(',')
													//alert(comvalList)
													combList='<li style="" ><table style="width:100%"><tr><td style="width:10%;font-weight:bold;font-size:15px;">'+DataCap+'</td></tr><tr><td style="width:80%"><select name="'+input_id+'" id="'+input_id+'" >'
													
													combList=combList+'<option value="Selec type" selected="selected">Select type</option>'
													
													for (var j=0; j < comvalList.length; j++){	
														combList=combList +'<option value="'+comvalList[j]+'">'+comvalList[j]+'</option>'	
			  	
													}
												
													combList=combList+'</td><td style="width:2%;font-weight:bold;font-size:15px;"></td></tr></table></li></select>'
													screensettingsdataShow=screensettingsdataShow+combList
												//localStorage.combList=combList;
												
												
												}else{
												
												screensettingsdataShow=screensettingsdataShow+'<li style="" ><table style="width:100%"><tr><td style="width:10%;font-weight:bold;font-size:15px;">'+DataCap+'</td></tr><tr><td style="width:80%"><input type="'+DataType+'" maxlength="'+MaxChar+'" id="'+input_id+'"></td><td style="width:2%;font-weight:bold;font-size:15px;">    </td></tr></table></li>'
												}
											}
											localStorage.screensettingsdataShow=screensettingsdataShow
											
											var screensettings_id_ob=$('#screensettings_id');
											screensettings_id_ob.empty()
											screensettings_id_ob.append(screensettingsdataShow);
											//alert (screensettingsdataShow)
									
									$('#cm_supCode').val(localStorage.user_id)	
									$.afui.loadContent("#pageHomeView",true,true,'right');
							    }
								 
						
								$("#loginButton").show();  
															
						
						}
				      },

				    error: function(result) {
						
						$("#error_login").html("Network error has occurred please try again!");
						$("#wait_image_login").hide();
						$("#loginButton").show();
					
				  }
			  });//end ajax
	
		 }//alse		

}


//======================= Submit Start  ==============================

function submit_data(){
	
	
	getLocationInfo();
	
	var repId=localStorage.user_id;
	 
	screensettingsdata=localStorage.screensettingsdata
								
	screensettingsdataListStr=screensettingsdata.split('<rdrd>');
	var data_list=''
	var errorFlag=0
	//alert (errorFlag)
	for (i=0; i<screensettingsdataListStr.length-1; i++){
		DataShowList=screensettingsdataListStr[i].split('|')
		
		var input_id='input_'+i.toString()
		var get_data=$("#"+input_id).val(); 
	
		data_list=data_list+input_id+'<fdfd>'+get_data+'<rdrd>'
		//alert(get_data)
		if (get_data==''){errorFlag=1}
		
	} 
	if (imageFileID1=='' || imageFileID2=='' || imageFileID3==''){errorFlag=1}
	//alert (errorFlag)
	if(errorFlag==1){
		$("#error_msg").text("Field Value and image is required");
		$("#error_msg").show();
		
	}else{
		$("#load_image").show();
		$("#btn").hide();
		var imageFileID1 =$("#prPhoto1").val();
		var imageFileID2 =$("#prPhoto2").val();
		var imageFileID3 =$("#prPhoto3").val();
		
		var tempTime = $.now();
		var tempTime1 = $.now();
		var tempTime2 = $.now();
		var imageFileName =tempTime.toString()+"_pss.jpg";
		var imageFileName1 =tempTime1.toString()+"_pss1.jpg";
		var imageFileName2 =tempTime2.toString()+"_pss2.jpg";


		//alert  (apiPath+'dataSave?cid='+localStorage.cid+'&repId='+localStorage.user_id+'&password='+localStorage.user_pass+'&syncCode='+localStorage.syncCode+'&data_list='+data_list+'&imageFileName='+imageFileName)

		$.ajax({
			type:'POST',
			timeout: 30000,
			url:apiPath+'dataSave?cid='+localStorage.cid+'&repId='+localStorage.user_id+'&password='+localStorage.user_pass+'&syncCode='+localStorage.syncCode+'&data_list='+data_list+'&imageFileName='+imageFileName+'&imageFileName1='+imageFileName1+'&imageFileName2='+imageFileName2+'&latitude='+localStorage.latitude+'&longitude='+localStorage.longitude,

			success: function(result) {
						if (result!==''){
							
							
							upload_image(imageFileID1, imageFileName);
							upload_image(imageFileID2, imageFileName1);
							upload_image(imageFileID3, imageFileName2);
							$("#success_msg").text("Submitted Successfully");
							
							
//				==========================================================	
						localStorage.picFlag=0	
						var imageDiv="myImage1" 
						var imageText="prPhoto1"
						var image = document.getElementById(imageDiv);
						image.src = '';
						imagePath = '';
						$("#"+imageText).val(imagePath);
						
						
						var imageDiv2="myImage2"
						var imageText2="prPhoto2"
						var image2 = document.getElementById(imageDiv2);
						image2.src = '';
						imagePath2 = '';
						$("#"+imageText2).val(imagePath2);
						
						
						var imageDiv3="myImage3"
						var imageText3="prPhoto3"
						var image3 = document.getElementById(imageDiv3);
						image3.src = '';
						imagePath3 = '';
						$("#"+imageText3).val(imagePath3);

//				==========================================================
							
							
							$.afui.loadContent("#msg_page",true,true,'right');
							location.reload();
						
						}
						
						$("#load_image").hide();
	            		$("#btn").show();
					},
					error: function(){
						$("#load_image").hide();
						$("#btn").show();
						$("#error_msg").text('Network Timeout. Please check your Internet connection.');
					}
		 });
		
		
	}
	
	
	

	
}


//======================= Save Visit Start  ==============================

function savedVisit(){			
	screensettingsdata=localStorage.screensettingsdata
	
	screensettingsdataListStr=screensettingsdata.split('<rdrd>');
	var data_list=''
	
	var errorFlag_save=0
	
	for (i=0; i<screensettingsdataListStr.length-1; i++){
		DataShowList=screensettingsdataListStr[i].split('|')
	
		var input_id='input_'+i.toString()
		var get_data=$("#"+input_id).val(); 

		data_list=data_list+input_id+'<fdfd>'+get_data+'<rdrd>'
		if(get_data==''){errorFlag_save=1;}
		
		
		
		
	}
	var imageFileID1 =$("#prPhoto1").val();
	var imageFileID2 =$("#prPhoto2").val();
	var imageFileID3 =$("#prPhoto3").val();
	if (imageFileID1=='' || imageFileID2=='' || imageFileID3==''){errorFlag_save=1}
	errorFlag_save=0
	if (errorFlag_save==1){
		$("#error_msg").text("Field Value and image is required");
		
	}
	else{
		var imageFileID1 =$("#prPhoto1").val();
		var imageFileID2 =$("#prPhoto2").val();
		var imageFileID3 =$("#prPhoto3").val();

		var tempTime = $.now();
		var tempTime1 = $.now();
		var tempTime2 = $.now();
		var imageFileName =tempTime.toString()+"_pss.jpg";
		var imageFileName1 =tempTime1.toString()+"_pss1.jpg";
		var imageFileName2 =tempTime2.toString()+"_pss2.jpg";

		var saveData=apiPath+'dataSave?cid='+localStorage.cid+'&repId='+localStorage.user_id+'&password='+localStorage.user_pass+'&syncCode='+localStorage.syncCode+'&data_list='+data_list+'&imageFileName='+imageFileName+'&imageFileName1='+imageFileName1+'&imageFileName2='+imageFileName2+'&imageFileID1='+imageFileID1+'&imageFileID2='+imageFileID2+'&imageFileID3='+imageFileID3
		
		localStorage.saved_data=localStorage.saved_data+saveData+'<savedsaved>'
		
		$("#success_msg").text("Saved Successfully");
		$("#error_msg").hide();
		
		
		for (i=0; i<screensettingsdataListStr.length-1; i++){
			DataShowList=screensettingsdataListStr[i].split('|')
		
			var input_id='input_'+i.toString()
			$("#"+input_id).val(''); 
	
		
		
		
		
		}
		
		
		//				==========================================================	
				localStorage.picFlag=0	
				var imageDiv="myImage1" 
				var imageText="prPhoto1"
				var image = document.getElementById(imageDiv);
				image.src = '';
				imagePath = '';
				$("#"+imageText).val(imagePath);
			
			
				var imageDiv2="myImage2"
				var imageText2="prPhoto2"
				var image2 = document.getElementById(imageDiv2);
				image2.src = '';
				imagePath2 = '';
				$("#"+imageText2).val(imagePath2);
			
		
				var imageDiv3="myImage3"
				var imageText3="prPhoto3"
				var image3 = document.getElementById(imageDiv3);
				image3.src = '';
				imagePath3 = '';
				$("#"+imageText3).val(imagePath3);
					
//				==========================================================
		
		
		
	}
	
}	


//======================= show_submit_save Start  ==============================
	  
	  //------------------Jolly Start------------------------------
function show_savedVisit() { 
	//alert (localStorage.saved_data)
	//alert (localStorage.saved_data)
	var saved_data=localStorage.saved_data
	
	saved_dataList=saved_data.split('<savedsaved>')
	
	var saved_dataShow=''
	var saved_dataShowGet=''
	
	for (i=0; i<saved_dataList.length-1; i++){
		var saved_dataShowGet=saved_dataList[i]
		
		if (saved_dataShowGet.length > 10){
			var show_info_get=saved_dataShowGet.split('&data_list=')[1].split('&imageFileName=')[0]
			
			var show_info_set=show_info_get.split('<rdrd>');
			
			var showinfo=''
			for(j=0; j<show_info_set.length-1; j++){
					 var show_info_setGet=show_info_set[j]
					 
					 show_gets=show_info_setGet.split("<fdfd>")[1]
					 
					 if (showinfo==''){showinfo=showinfo+	show_gets}
					 else{showinfo=showinfo+" | "+	show_gets}
				
			}
			
	
			var input_id=''+i.toString()
			saved_dataShow=saved_dataShow+'<input  name="'+input_id+'" id="'+input_id+'" type="hidden" value="'+saved_dataShowGet+'">'
			
			//------------------Shima 2018/07/10 Start------------------------------
			saved_dataShow=saved_dataShow+'<table width="80%" style="border:1px solid #d3d3d3;border-radius:3px" align="center"><tr><td width="40%" style="padding-left:5px" align="left">'+showinfo+'</td><td width="40%" align="right" style="padding:2px"><input type="submit" id="sub_emp" style="color:darkblue;padding:5px;margin-right:10px;border:1px solid #aaa;background:#eee;font-weight:bold;box-shadow:1px 1px 5px #333;border-radius:3px" onclick="save_update('+i+')" value="Update"><input type="submit" id="sub_emp" style="color:darkblue;padding:5px;border:1px solid #aaa;background:#eee;font-weight:bold;box-shadow:1px 1px 5px #333;border-radius:3px" onclick="save_submit('+i+')" value="Submit"></td></tr></table><br/>'
			//------------------Shima 2018/07/10 End------------------------------
			
		}
		
		
		
	}
	
    
	
	var imageFileName=saved_dataShowGet.split('&imageFileName=')[1].split('&imageFileName1=')[0]  
	var imageFileName1=saved_dataShowGet.split('&imageFileName1=')[1].split('&imageFileName2=')[0]   
	var imageFileName2=saved_dataShowGet.split('&imageFileName2=')[1].split('&imageFileID1=')[0]    
	var imageFileID1=saved_dataShowGet.split('&imageFileID1=')[1].split('&imageFileID2=')[0]     
	var imageFileID2=saved_dataShowGet.split('&imageFileID2=')[1].split('&imageFileID3=')[0]    
	var imageFileID3=saved_dataShowGet.split('&imageFileID3=')[1]
	
	//alert (imageFileName)
	//alert (imageFileName1)
	//alert (imageFileName2)
	
	
	if (imageFileID3==''){
		localStorage.picFlag=2
	}
	else if (imageFileID2==''){
		localStorage.picFlag=1
	}
	else {
		localStorage.picFlag=0
	}
	
	var imageDiv="myImage1" 
	var imageText="prPhoto1"
	var image = document.getElementById(imageDiv);
	image.src = imageFileID1;
	imagePath = imageFileID1;
	$("#"+imageText).val(imagePath);
	
	
	
	var imageDiv2="myImage2"
	var imageText2="prPhoto2"
	var image2 = document.getElementById(imageDiv2);
	image2.src = imageFileID2;
	imagePath2 = imageFileID2;
	$("#"+imageText2).val(imagePath2);
		
		
	var imageDiv3="myImage3"
	var imageText3="prPhoto3"
	var image3 = document.getElementById(imageDiv3);
	image3.src = imageFileID3;
	imagePath3 = imageFileID3;
	$("#"+imageText3).val(imagePath3);	
		
		
		
		
		
		
		
		
		
	
	localStorage.saved_dataShow=saved_dataShow
  	$("#savedVisitRecord").empty();
	$('#savedVisitRecord').html(localStorage.saved_dataShow);
	
	$.afui.loadContent("#savedVisit_page",true,true,'right');				
	
			
}	 
function show_savedVisitReplace() { 

	var saved_data=localStorage.saved_data
	
	saved_dataList=saved_data.split('<savedsaved>')
	
	var saved_dataShow=''
	var saved_dataShowGet=''
	
	for (i=0; i<saved_dataList.length-1; i++){
		
		
		var saved_dataShowGet=saved_dataList[i]
		
		if (saved_dataShowGet.length > 10){
			var show_info_get=saved_dataShowGet.split('&data_list=')[1].split('&imageFileName=')[0]
		
			var show_info_set=show_info_get.split('<rdrd>');
			
			var showinfo=''
			for(j=0; j<show_info_set.length-1; j++){
					 var show_info_setGet=show_info_set[j]
					 
					 show_gets=show_info_setGet.split("<fdfd>")[1]
					 
					 if (showinfo==''){showinfo=showinfo+	show_gets}
					 else{showinfo=showinfo+" | "+	show_gets}
				
			}
			
	
			var input_id=''+i.toString()
			saved_dataShow=saved_dataShow+'<input  name="'+input_id+'" id="'+input_id+'" type="hidden" value="'+saved_dataShowGet+'">'
			
			
			saved_dataShow=saved_dataShow+'<table width="80%" style="border:1px solid #d3d3d3;border-radius:3px" align="center"><tr><td width="40%" style="padding-left:5px" align="left">'+showinfo+'</td><td width="40%" align="right" style="padding:2px"><input type="submit" id="sub_emp" style="color:darkblue;padding:5px;border:1px solid #aaa;background:#eee;font-weight:bold;box-shadow:1px 1px 5px #333;border-radius:3px" onclick="save_submit('+i+')" value="Submit"></td></tr></table><br/>'
		}
	}
	
    
	localStorage.saved_dataShow=saved_dataShow
  	//$("#savedVisitRecord").empty();
	$('#savedVisitRecord').html(localStorage.saved_dataShow);
				
	
			
}	 

//------------------Shima 2018/07/10 Start------------------------------

function save_update(i){
	getLocationInfo();
	var inpuName=''+i.toString()
	var getValueUpdate=$("#"+inpuName).val();
	
	getValUp=getValueUpdate.split('<rdrd>')
	
	getValUpdateSet=''
	for(k=0; k<getValUp.length-1; k++){
			 var getValUpdate=getValUp[k]
			 getValUpdateSet=getValUpdate.split("<fdfd>")[1]
			 	//alert(getValUpdateSet)
			var input_id='input_'+k.toString()
			$("#"+input_id).val(getValUpdateSet);
		
	}
	$.afui.loadContent("#pageHomeView",true,true,'right');	
	
	var saved_data=localStorage.saved_data
	saved_dataList=saved_data.split('<savedsaved>')
	RemoveDataStr=saved_dataList[i]
	saved_dataReplace=saved_data.replace(RemoveDataStr,'')
	localStorage.saved_data=saved_dataReplace
	
	
	
//				==========================================================	
		localStorage.picFlag=0	
		var imageDiv="myImage1" 
		var imageText="prPhoto1"
		var image = document.getElementById(imageDiv);
		image.src = '';
		imagePath = '';
		$("#"+imageText).val(imagePath);
		
		
		var imageDiv2="myImage2"
		var imageText2="prPhoto2"
		var image2 = document.getElementById(imageDiv2);
		image2.src = '';
		imagePath2 = '';
		$("#"+imageText2).val(imagePath2);
		
		
		var imageDiv3="myImage3"
		var imageText3="prPhoto3"
		var image3 = document.getElementById(imageDiv3);
		image3.src = '';
		imagePath3 = '';
		$("#"+imageText3).val(imagePath3);

//				==========================================================
	
}

//------------------Shima 2018/07/10 End------------------------------

function save_submit(i){
	var inpuName=''+i.toString()
	var getValue=$("#"+inpuName).val();
	//alert(getValue)
	getValue=getValue.replace('undefined','')
	//alert (localStorage.saved_data)
	//alert (getValue)

	
	
	
	
	
	$.ajax({
		
		type:'POST',
		timeout: 30000,
		url:getValue,
		
		success: function(result1) {
				//alert (result1)
				if (result1=='Success'){
					
					
				var imageFileName=getValue.split('&imageFileName=')[1].split('&imageFileName1=')[0]
				var imageFileName1=getValue.split('&imageFileName1=')[1].split('&imageFileName2=')[0]
				var imageFileName2=getValue.split('&imageFileName2=')[1].split('&imageFileID1=')[0]
				
				var imageFileID1=getValue.split('&imageFileID1=')[1].split('&imageFileID2=')[0]
				var imageFileID2=getValue.split('&imageFileID2=')[1].split('&imageFileID3=')[0]
				var imageFileID3=getValue.split('&imageFileID3=')[1]
				
				
					
				upload_image(imageFileID1, imageFileName);
				upload_image(imageFileID2, imageFileName1);
				upload_image(imageFileID3, imageFileName2);	
					
					
					
					
				var saved_data=localStorage.saved_data
				saved_dataList=saved_data.split('<savedsaved>')
				RemoveDataStr=saved_dataList[i]
				saved_dataReplace=saved_data.replace(RemoveDataStr,'')
				localStorage.saved_data=saved_dataReplace
				
				
				show_savedVisitReplace()
					
				//upload_image(imageFileID, imageFileName);
				
				$.afui.loadContent("#msg_page",true,true,'right');
					
				location.reload();	
					
					
   
				}
				
					
						
					
			
		}   
		   
 	});
	
	
	
}

 //------------------Jolly End------------------------------




//=========================  version_check Start ==========================

function version_check(dVersion, upVersion) {
	
		
	var dVersion=localStorage.d_version;
	//alert (dVersion)
	
	
	var upVersion=localStorage.up_version;
	//alert (upVersion)
	
	
	

	       // alert (apiPath+'checkVersion?cid='+localStorage.cid+'&repId='+localStorage.user_id+'&password='+localStorage.user_pass+'&syncCode='+localStorage.syncCode+'&d_version='+localStorage.d_version+'&up_version='+localStorage.up_version)
			
			$.ajax({
				 type: 'POST',
				 url: apiPath+'checkVersion?cid='+localStorage.cid+'&repId='+localStorage.user_id+'&password='+encodeURIComponent(localStorage.user_pass)+'&syncCode='+localStorage.syncCode+'&d_version='+localStorage.d_version+'&up_version='+localStorage.up_version,
				 success: function(result) {	
				 		
						if (result==''){							
							alert ('Sorry Network not available');
						}
						else{
							
							
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){
								
								
								
								//$("#error_login").text(resultArray[0]);
								localStorage.up_versionS=resultArray[1];
								//alert (resultArray[1])
								
								//localStorage.d_versionS=resultArray[2]
								//alert (resultArray[2])
								
								$.afui.loadContent("#login",true,true,'right');

									
								
								
							}
							if (resultArray[0]=='SUCCESS'){
								
											//localStorage.up_versionS=resultArray[1];
											//alert (resultArray[1])
											
											//localStorage.d_versionS=resultArray[2];
											//alert (resultArray[2])
											$.afui.loadContent("#pageHomeView",true,true,'right');
							    }
								 
						$("#error_login").html(" Please Login again...");
								
															
						
						}
				      },
				    error: function(result) {
				    alert('Network error has occurred please try again!');
					
				  }
			  });//end ajax
	
		 }//Function End	

 
	  
function homePage() {	
//	$("#load_image").hide();
//	$("#btn").show();
	$("#error_msg").hide();
	getLocationInfo();
	$.afui.loadContent("#pageHomeView",true,true,'right');
}	  
	  
	  

function login_page() {	
	$("#success_msg").text("");
	$("#wait_image_login").hide();
	$("#error_login").html("");
	
	$.afui.loadContent("#login",true,true,'right');
}	  


function exit() {	
	navigator.app.exitApp();
}












//========================================UploadImages================


function takePicture(){
navigator.camera.getPicture( cameraSuccess, cameraError, {
		quality: 90,
		targetWidth: 400,
       // destinationType: Camera.DestinationType.FILE_URI,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true ,
        correctOrientation: true,
        saveToPhotoAlbum: true
    }); 
	
}

function cameraSuccess(uri){  
	//localStorage.picFlag=0
	//alert (localStorage.picFlag)
	var picNo=parseInt(localStorage.picFlag)+1 
	localStorage.picFlag=picNo
	if (picNo==1){
		var imageDiv="myImage1" 
		var imageText="prPhoto1"
		var image = document.getElementById(imageDiv);
		image.src = uri;
		imagePath = uri;
		$("#"+imageText).val(imagePath);
	
	
	
		}
	
	if (picNo==2){
		var imageDiv2="myImage2"
		var imageText2="prPhoto2"
		var image2 = document.getElementById(imageDiv2);
		image2.src = uri;
		imagePath2 = uri;
		$("#"+imageText2).val(imagePath2);
	
	
	
	
		}
	if (picNo==3){
		var imageDiv3="myImage3"
		var imageText3="prPhoto3"
		var image3 = document.getElementById(imageDiv3);
		image3.src = uri;
		imagePath3 = uri;
		$("#"+imageText3).val(imagePath3);
		}
	
	 
	
        
}

function cameraError(message){
	var a=''
    //alert("Canceled!"); 
	
}


/************  Image **************/

function upload_image(imageURI, imageName) {
  var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName;
    options.mimeType="image/jpeg";
	
    var params = {};
    params.value1 = "test";
    params.value2 = "param";
	
    options.params = params;
	options.chunkedMode = false;
	
    var ft = new FileTransfer();
	
    ft.upload(imageURI, encodeURI("http://i001.yeapps.com/image_hub/uniext_checkin/upload_imageCheckin/"),winProfile,failProfile,options);
  	
 
}

function winProfile(r) {
	var result='Success'
}

function failProfile(error) {
	var result='Failed'
	//$("#error_prescription_submit").text('Memory Error. Please take new picture and Submit');
}		



/************  Image **************/