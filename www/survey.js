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
	
//			
//			$("#error_login").html("");
//			
//			dVersion='localStorage.d_version';
//
//			upVersion=localStorage.up_version;
//			
//			
//			version_check(dVersion, upVersion);
//   		
			var screensettings_id_ob=$('#screensettings_id');				
			screensettings_id_ob.empty()
			screensettings_id_ob.append(localStorage.screensettingsdataShow);
		
		
		

		
    });

    //if($.os.ios)
        $.afui.animateHeader(true);
	//	getLocation()









var apiPath='http://w02.yeapps.com/checkin/';



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
			

			
			
			if(localStorage.syncCode==undefined || localStorage.syncCode==""){
					localStorage.syncCode=0
					
				}
				
				 	
			
	      //  alert (apiPath+'check_user?cid='+localStorage.cid+'&repId='+localStorage.user_id+'&password='+localStorage.user_pass+'&syncCode='+localStorage.syncCode+'&d_version='+localStorage.d_version+'&up_version='+localStorage.up_version)
			
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
											
											for (i=0; i<screensettingsdataListStr.length-1; i++)
											
											{
												DataShowList=screensettingsdataListStr[i].split('<fdfd>')
												var DataShow=DataShowList[0]   //# dataName
												var DataCap=DataShowList[1]	   //# dataCaption
												var DataType=DataShowList[2]   //# dataType
												var MaxChar=DataShowList[3]   //# maxChar
												
												
												
												var input_id='input_'+i.toString()

												screensettingsdataShow=screensettingsdataShow+'<table style="width:100%"><tr><td style="width:10%;font-weight:bold;font-size:15px;">'+DataCap+'</td><td style="width:80%"><input type="'+DataType+'" maxlength="'+MaxChar+'" id="'+input_id+'"></td><td style="width:2%;font-weight:bold;font-size:15px;">    </td></tr></table>'
												
											}
											localStorage.screensettingsdataShow=screensettingsdataShow
											
											var screensettings_id_ob=$('#screensettings_id');
											screensettings_id_ob.empty()
											screensettings_id_ob.append(screensettingsdataShow);
											//alert (screensettingsdataShow)
									
											
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
	//alert (errorFlag)
	if(errorFlag==1){
		$("#error_msg").text("Field Value is required");
		$("#error_msg").show();
		
	}else{
		$("#load_image").show();
		$("#btn").hide();
		var imageFileID =$("#prPhoto1").val();
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
			url:apiPath+'dataSave?cid='+localStorage.cid+'&repId='+localStorage.user_id+'&password='+localStorage.user_pass+'&syncCode='+localStorage.syncCode+'&data_list='+data_list+'&imageFileName='+imageFileName+'&imageFileName1='+imageFileName1+'&imageFileName2='+imageFileName2,

			success: function(result) {
						if (result!==''){
							//upload_image(imageFileID, imageFileName);
							$("#success_msg").text("Submitted Successfully");
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
	if (errorFlag_save==1){
		$("#error_msg").text("Field Value is required");
		
	}
	else{
		var imageFileID =$("#prPhoto1").val();
		var imageFileID2 =$("#prPhoto2").val();
		var imageFileID3 =$("#prPhoto3").val();

		var tempTime = $.now();
		var tempTime1 = $.now();
		var tempTime2 = $.now();
		var imageFileName =tempTime.toString()+"_pss.jpg";
		var imageFileName1 =tempTime1.toString()+"_pss1.jpg";
		var imageFileName2 =tempTime2.toString()+"_pss2.jpg";

		var saveData=apiPath+'dataSave?cid='+localStorage.cid+'&repId='+localStorage.user_id+'&password='+localStorage.user_pass+'&syncCode='+localStorage.syncCode+'&data_list='+data_list+'&imageFileName='+imageFileName+'&imageFileName1='+imageFileName1+'&imageFileName2='+imageFileName2
		
		localStorage.saved_data=localStorage.saved_data+saveData+'<savedsaved>'
		
		$("#success_msg").text("Saved Successfully");
		$("#error_msg").hide();
		
		

		for (i=0; i<screensettingsdataListStr.length-1; i++){
			
			var input_id=''+i.toString()
			
			$("#"+input_id).val(''); 
		}
		
	}
	
}	


//======================= show_submit_save Start  ==============================
	  
function show_savedVisit() { 
	var saved_data=localStorage.saved_data
	
	saved_dataList=saved_data.split('<savedsaved>')
	
	var saved_dataShow=''
	var saved_dataShowGet=''
	
	for (i=0; i<saved_dataList.length-1; i++){
		var saved_dataShowGet=saved_dataList[i]
		
		
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
		
		
		saved_dataShow=saved_dataShow+'<table width="80%" style="border:1px solid #d3d3d3;border-radius:3px" align="center"><tr><td width="40%" style="padding-left:5px" align="left">'+showinfo+'</td><td width="40%" align="right" style="padding:2px"><input type="submit" style="color:darkblue;padding:5px;border:1px solid #aaa;background:#eee;font-weight:bold;box-shadow:1px 1px 5px #333;border-radius:3px" onclick="save_submit('+i+')" value="Submit"></td></tr></table><br/>'
		
	}

    
	localStorage.saved_dataShow=saved_dataShow
   
	$('#savedVisitRecord').html(localStorage.saved_dataShow);
	
	$.afui.loadContent("#savedVisit_page",true,true,'right');				

			
}	 

function save_submit(i){
	
	var inpuName=''+i.toString()
	var getValue=$("#"+inpuName).val();
	getValue=getValue.replace('undefined','')
	$.ajax({
		
		type:'POST',
		timeout: 30000,
		url:getValue,
		
		success: function(result1) {
			
				if (result1!=''){

					//upload_image(imageFileID, imageFileName);
					
					$.afui.loadContent("#msg_page",true,true,'right');
					
				}
			
		}      
 	});
	
	
	
}



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
	$.afui.loadContent("#pageHomeView",true,true,'right');
}	  
	  
	  

function login_page() {	
	$("#success_msg").text("");
	$("#wait_image_login").hide();
	$("#error_login").html("");
	
	$.afui.loadContent("#loginView",true,true,'right');
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
	//var picNo=parseInt(localStorage.picFlag)+1 
	var imageDiv="myImage1" 
	var imageDiv2="myImage2" 
	var imageDiv3="myImage3"
	var imageText="prPhoto1"
	var imageText2="prPhoto2"
	var imageText3="prPhoto3"
	//var myImagePrescription_show="myImagePrescription_show"
	//localStorage.picFlag=picNo
	var image = document.getElementById(imageDiv);
	var image2 = document.getElementById(imageDiv2);
	var image3 = document.getElementById(imageDiv3);
	//var image1 = document.getElementById(myImagePrescription_show);
	image.src = uri;
	image2.src = uri;
	image3.src = uri;
	//image1.src = uri;
	imagePath = uri;
	imagePath2 = uri;
	imagePath3 = uri;
	
	//localStorage.prPhoto1=uri
	
	//alert (uri)
	//takePicture();
	
	
   
    
	$("#"+imageText).val(imagePath);
	$("#"+imageText2).val(imagePath2);
	$("#"+imageText3).val(imagePath3);
	
	
        
}

function cameraError(message){
	var a=''
    //alert("Canceled!"); 
	
}


/************  Image **************/

function upload_image(imageURI, imageName) {
   // alert (localStorage.photo_submit_url)
   //alert (imageURI+' |  '+imageName)
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
     ft.upload(imageURI, encodeURI(apipath_image),winProfile,failProfile,options);
	 
}

function winProfile(r) {
}

function failProfile(error) {
	//$("#error_prescription_submit").text('Memory Error. Please take new picture and Submit');
}		



/************  Image **************/