jQuery.fn.validateThis = function(options) {

  settings = jQuery.extend(
  						  {
						       important_marker: "*",					 // этим будут помечены поля, обязательные для заполнения
							   min_pass: 6,								 // минимальная длина пароля
							   blur_all: false,								 // минимальная длина пароля
							   only_visible: true,								 // минимальная длина пароля
							   min_user: 4,								 // минимальная длина пароля
							   numeric_error_message: "<div class='bubble-arrow-border error-bubble'></div><div class=' bubble-arrow'></div>только цифры", 
							   numeric_valid_message: "<div class='bubble-arrow-border ok-bubble'></div><div class=' bubble-arrow'></div>введены цифры",							
							   email_error_message: "<div class='bubble-arrow-border error-bubble'></div><div class=' bubble-arrow'></div>некорректный email", // сообщение об ошибке в emaile
							   email_valid_message: "<div class='bubble-arrow-border error-bubble'></div><div class=' bubble-arrow'></div>правильный email",  // сообщение о правильном emaile
							   email_error_sovpadenie_message: "<div class='bubble-arrow-border error-bubble'></div><div class='error-bubble bubble-arrow'></div> email занят",  // сообщение о правильном emaile
							   user_valid_message: "правильно",  // сообщение о правильном user
							   user_error_message: "некорректное имя пользователя",  // сообщение о правильном user
							   user_error_sovpadenie_message: "Логин занят",  // сообщение о правильном user
							   pass_error_message: "пароли не совпадают", // сообщение о не совпадении паролей
							   pass_valid_message: "пароли совпадают",    // сообщение о совпадении паролей
							   container_valid_pass_width: 300,        // ширина (в пикселях) контейнера индикатора паролей
							   validPassMarker_dx: 20,                  // шаг индикатора паролей
							   validation_form: ".validation_form",      // класс проверяемой формы
							   focus: ".focus",      // класс поля, в который будет в фокусе при загрузке страницы
							   text: ".forvalidation",     						 // класс полей, подлежащих проверке
							   checkbox: ".checkbox",    				 // класс проверяемых чекбоксов
							   radio: ".radio",   				 		 // класс проверяемых радиокнопок
							   email: ".email",   						 // класс поля emaila
							   user: ".user",   						 // класс поля user ajax
							   numeric: ".numeric",   					 // класс поля user
							   password1: ".password1",    				 // класс поля пароля, в котором проверяется длина пароля
							   password2: ".password2",    				 // класс поля подтверждения пароля
							   important: ".important",    				 // класс поля, обязательного для заполнения
				  			   submit: "submit_x",                      //name кнопки отправления формы
				  			   after_input: "p"                         // элемент добавляется после поля для вставки внего подсказок
						  }, options);
	//console.log(settings);
	//disqbled для кнопки отправки формы
        $(""+settings.validation_form+" *[name='"+settings.submit+"']").attr("disabled","disabled");

         $(""+settings.validation_form+"").bind("submit",  function()
			{
				 $(""+settings.validation_form+" *[name='"+settings.submit+"']").prop("disabled", submit_on_off());
				 if(submit_on_off()==1)
				 {return false;}
			}
			)

        //Переносим фокус на выбранный элемент
        $(""+settings.validation_form+" *[autofocus]").focus();
        
        var i=0;
        //устанавливаем значения по умолчанию для полей формы
          $(""+settings.validation_form+" "+settings.text+"").each(
				  function(){
				  i++;
				  		$(this).attr("value", $(this).attr("valNull") );
				        $(this).attr("idel", i);
				        $(this).attr("after_this", "after"+i+"");
				        $(this).attr("valid", "false");
				      	$(this).after("<"+settings.after_input+" id='after"+i+"' class='valid_after'> &nbsp; </"+settings.after_input+">");

                      $(this).addClass("value_Null");
                      //при приобретении элементом фокуса
				      $(this).bind("focus",  function()
											  {
											  	//если значение по-умолчанию
											  	if($(this).attr("value") == $(this).attr("valNull"))
											  		{
											  			$(this).attr("value", "" );
											  			$(this).removeClass("value_Null");
											  			$(this).removeClass("value_true");
											  			$(this).removeClass("value_false");
											  		 	$(this).addClass("value");
											  		}
											  	else//если пользовательское значение
											  		{
											  			$(this).removeClass("value_Null");
											  			$(this).removeClass("value_true");
											  			$(this).removeClass("value_false");
											  		 	$(this).addClass("value");
											  		}


                                                     // submit активна / не активна
											  		 $(""+settings.validation_form+" *[name='"+settings.submit+"']").attr("disabled", submit_on_off());

											  } );
		//проверяем user'a
		  $(""+settings.validation_form+" "+settings.user+"").bind("change click keyup blur",  function(){
											  thi = $(this);
                                                //если валидный user
											  	if( valid_user($(this).attr("value")) == true)
											  		{	
														$.post('/user_in_db.php', {textfield: $(this).val()}, function(b){
															if(b==1){
																thi.next().html("<div class='invalid_message'>"+settings.user_error_sovpadenie_message+"</div>");
													  			thi.removeClass("value");
													  			thi.removeClass("value_Null");
													  			thi.removeClass("value_true");
													  			thi.attr("valid", "false");
													  			thi.addClass("value_false");	
															}else{
																thi.next().html("<div class='valid_message'>"+settings.user_valid_message+"</div>");
													  			thi.removeClass("value");
													  			thi.removeClass("value_Null");
													  			thi.removeClass("value_false");
													  			thi.addClass("value_true");
													  			thi.attr("valid", "true");														
															}
														});

															 //console.log("b="+b); // тут ответ сервера
											  	 	}
											  	else //если не валидный user
											  	{
											  			$(this).next().html("<div class='invalid_message'>"+settings.user_error_message+"</div>");
											  			$(this).removeClass("value");
											  			$(this).removeClass("value_Null");
											  			$(this).removeClass("value_true");
											  			$(this).attr("valid", "false");
											  			$(this).addClass("value_false");
											  	}
                                                 //если значение по-умолчанию или пусто
											  	if( $(this).attr("value") == "" || $(this).attr("value") == $(this).attr("valNull") )
											  		{
											  			$(this).attr("value", $(this).attr("valNull") );
											  			$(this).removeClass("value");
											  			$(this).removeClass("value_false");
											  			$(this).removeClass("value_true");
											  			$(this).attr("valid", "false");
											  		 	$(this).addClass("value_Null");
											  		}

													$(""+settings.validation_form+" *[name='"+settings.submit+"']").attr("disabled", submit_on_off());
											  } );//$("."+validation_form+" ."+user+"").bind()
				 
		//проверяем numeric
          $(""+settings.validation_form+" "+settings.numeric+"").each(function(){ 
		  	        $(this).bind("change focus keyup blur",  function(){
		  	                                       iis_numeric = is_numeric($(this).attr("value")) ;
											  	if( iis_numeric == true){
															//$(this).next().html("<div class='valid_message'>"+settings.numeric_valid_message+"</div>");
															$(this).next().hide();
												  			$(this).removeClass("value");
												  			$(this).removeClass("value_Null");
												  			$(this).removeClass("value_false");
												  			$(this).addClass("value_true");
												  			$(this).addClass("no_next_valid");
												  			$(this).attr("valid", "true");
											  	 	}else{
											  			$(this).next().show().html("<div class='invalid_message'>"+settings.numeric_error_message+"</div>");
											  			$(this).removeClass("value");
											  			$(this).removeClass("value_Null");
											  			$(this).removeClass("value_true");
											  			$(this).attr("valid", "false");
                                                        $(this).addClass("no_next_valid");
											  			$(this).addClass("value_false");
											  	}
                                                 //если значение по-умолчанию или пусто
											  	if( $(this).attr("value") == "" || $(this).attr("value") == $(this).attr("valNull") )
											  		{
											  			$(this).attr("value", $(this).attr("valNull") );
											  			$(this).removeClass("value");
											  			$(this).removeClass("value_false");
											  			$(this).removeClass("value_true");
											  			$(this).attr("valid", "false");
											  		 	$(this).addClass("value_Null");
											  		}

												$(""+settings.validation_form+" *[name='"+settings.submit+"']").attr("disabled", submit_on_off());
											  } );

				  });//$("."+validation_form+" ."+tel+"").each(

		//проверяем e-mail'ы
          $(""+settings.validation_form+" input[type='email']").each( function(){
				        $(this).bind("change click keyup blur",  function()
											  {
                                                //если валидный email
											  	if( valid_email($(this).attr("value")) == true)
											  		{	/*thi = $(this);
														$.post('/user_in_db.php', {email: $(this).val()}, function(b){
															if(b==1){
																thi.next().html("<div class='invalid_message'>"+settings.email_error_sovpadenie_message+"</div>");
													  			thi.removeClass("value");
													  			thi.removeClass("value_Null");
													  			thi.removeClass("value_true");
													  			thi.attr("valid", "false");
													  			thi.addClass("value_false");	
															}else{
																thi.next().html("<div class='valid_message'>"+settings.email_valid_message+"</div>");
													  			thi.removeClass("value");
													  			thi.removeClass("value_Null");
													  			thi.removeClass("value_false");
													  			thi.addClass("value_true");
													  			thi.attr("valid", "true");														
															}
														});*/
											  			//$(this).next().html("<div class='valid_message'>"+settings.email_valid_message+"</div>");
											  			$(this).next().hide();
											  			$(this).removeClass("value");
											  			$(this).removeClass("value_Null");
											  			$(this).removeClass("value_false");
											  			$(this).addClass("value_true");
											  			$(this).attr("valid", "true");

											  	 	}else{
											  			$(this).next().show().html("<div class='invalid_message'>"+settings.email_error_message+"</div>");
											  			$(this).removeClass("value");
											  			$(this).removeClass("value_Null");
											  			$(this).removeClass("value_true");
											  			$(this).attr("valid", "false");
											  			$(this).addClass("value_false");
											  	}
                                                 //если значение по-умолчанию или пусто
											  	if( $(this).attr("value") == "" || $(this).attr("value") == $(this).attr("valNull") )
											  		{
											  			$(this).attr("value", $(this).attr("valNull") );
											  			$(this).removeClass("value");
											  			$(this).removeClass("value_false");
											  			$(this).removeClass("value_true");
											  			$(this).attr("valid", "false");
											  		 	$(this).addClass("value_Null");
											  		}

												$(""+settings.validation_form+" *[name='"+settings.submit+"']").attr("disabled", submit_on_off());
											  } );

				  });//$("."+validation_form+" ."+email+"").each(

        //проверяем пароли на прочность
          $(""+settings.validation_form+" input[type=password]").each(function() {
				        $(this).bind("change click keyup blur",  function()
											  {
                                                //если длина пароля больше или равна минимальной
											  	if( $(this).attr("value").length >= settings.min_pass)
											  		{
											  			$(this).next().html("<div class='container_valid_pass'><span class='validPassMarker'></span></div>");

											  			$(this).removeClass("value");
											  			$(this).removeClass("value_Null");
											  			$(this).removeClass("value_false");
											  			$(this).addClass("value_true");
											  			$(this).attr("valid", "true");

											  	 	}
											  	 else{

											  	      	$(this).next().html("<div class='container_valid_pass'><span class='validPassMarker'></span></div>");

											  			$(this).removeClass("value");
											  			$(this).removeClass("value_Null");
											  			$(this).removeClass("value_false");
											  			$(this).addClass("value_false");
											  			$(this).attr("valid", "false");
											  	 }
                                                    //высчитываем смещение индикатора в зависимости от количества символов в пароле
											     	var MARG_LEFT = settings.validPassMarker_dx*$(this).attr("value").length - settings.container_valid_pass_width;
											     	//если индикатор не полностью выдвинут, тогда выдвигаем
													if(MARG_LEFT<0)
													{
	                                                	$(".validPassMarker").animate({marginLeft: MARG_LEFT+"px"}, "fast");
	                                                	//.animate({"margin-left": "+=50px"}, "slow");
													}
													//если индикатор полностью выдвинут, тогда не выдвигаем
													if(MARG_LEFT>=0)
													{
													$(".validPassMarker").css("margin-left", "0px");
													}
													//задаем цвет индикатора в зависимости от количества символов
													if($(this).attr("value").length<4){$(".validPassMarker").css("background","#f00");}
													else if(($(this).attr("value").length>=4) && ($(this).attr("value").length<6)){$(".validPassMarker").css("background","#FF9F00");}
													else if(($(this).attr("value").length>=6) && ($(this).attr("value").length<8)){$(".validPassMarker").css("background","#CBFE01");}
													else if($(this).attr("value").length>=8){$(".validPassMarker").css("background","#0EFE01");}
                                                    //проверяем совпадают ли пароли
                                                    pass_ravno()

											   // submit активна / не активна
											  		 $(""+settings.validation_form+" *[name='"+settings.submit+"']").attr("disabled", submit_on_off());

											  } );

				  });// $("."+validation_form+" ."+password1+"").each(


        //проверяем совпадают ли пароли
          $(""+settings.validation_form+" "+settings.password2+"").each(function() {
				        $(this).bind("change click keyup blur",  function()
											  { //проверяем совпадают ли пароли
                                                pass_ravno();
											   // submit активна / не активна
											  		 $(""+settings.validation_form+" *[name='"+settings.submit+"']").attr("disabled", submit_on_off());

											  } );

				  });// $("."+validation_form+" ."+password2+"").each(

        //проверяем чекбоксы
          $(""+settings.validation_form+" "+settings.checkbox+"").each( function()  {
				        $(this).bind("click",  function()
											  { 	//проверяем включен ли чекбокс
                                                		$(this).attr("valid", $(this).attr("checked"));

											   // submit активна / не активна
											  		 $(""+settings.validation_form+" *[name='"+settings.submit+"']").attr("disabled", submit_on_off());

											  } );

				  });// $(".vali

        //проверяем радиокнопки
          $(""+settings.validation_form+" "+settings.radio+"").each(function(){
				        $(this).bind("click",  function()
											  { 	//проверяем включена ли радиокнопка
                                                		$(this).attr("valid", $(this).attr("checked"));

											   // submit активна / не активна
											  		 $(""+settings.validation_form+" *[name='"+settings.submit+"']").attr("disabled", submit_on_off());

											  } );

				  });// $(".vali


			$(this).bind("change click keyup blur",  function(){  //если значение по-умолчанию или пусто
											  if( !$(this).hasClass("checkbox") && !$(this).hasClass("no_next_valid") && !$(this).hasClass("radio") && !$(this).hasClass("password1") && !$(this).hasClass("password2"))
                                               {
											  	if( $(this).attr("value") == "" || $(this).attr("value") == $(this).attr("valNull") )
											  		{
											  			$(this).attr("value", $(this).attr("valNull") );
											  			$(this).attr("valid", "false");
											  			$(this).removeClass("value");
											  			$(this).removeClass("value_true");
											  			$(this).removeClass("value_false");
											  		 	$(this).addClass("value_Null");
											  		}

											  	else
											  		{
											  			$(this).removeClass("value");
											  			$(this).removeClass("value_false");
											  			$(this).removeClass("value_Null");
											  			$(this).attr("valid", "true");
											  		 	$(this).addClass("value_true");
											  		}
                                                }

                                                if($(this).attr("type") == "checkbox")
                                                	{   //проверяем включен ли чекбокс
                                                		$(this).attr("valid", $(this).attr("checked"));
                                                	}
                                                if($(this).attr("type") == "radio")
                                                	{   //проверяем включена ли радиокнопка
                                                		$(this).attr("valid", $(this).attr("checked"));
                                                	}

                                                     // submit активна / не активна
											  		 $(""+settings.validation_form+" *[name='"+settings.submit+"']").attr("disabled", submit_on_off());
											  } );
			if (settings.blur_all){
				$(this).blur();}
				  });//$("."+validation_form+" ."+text+"").each(
				      
          //Переносим фокус на выбранный элемент
        $(""+settings.validation_form+" *[autofocus]").focus();

         //добавляем * к обязательным полям
		//$(""+settings.validation_form+" *[required]").before("<strong class='important_marker'>"+settings.important_marker+"</strong> ");
		if ( $(this).prop("required") )
				  			{
				  				$(this).addClass("value_false");
				  			}



//==========================================
//функция проверки email'a
function valid_email(val)
{
	var reg=/^[a-zA-Z0-9\._-]+@+[A-Za-z0-9\._-]+\.+[a-zA-Z]{2,3}/ ;
	var result=reg.test(val);
	return result;
}
//==========================================
//функция проверки User'a
function valid_user(val)
{
		var reg = new RegExp("^[a-zA-Z0-9_]{"+settings.min_user+",}$");	
		var result=reg.test(val);
		//console.log(result);
		return result;
}
//==========================================
//функция проверки номера
function tel_user(val)
{
		var reg = new RegExp("^[+-\d\s]+[^a-zA-Z]{2,15}$");	
		var result=reg.test(val);
		//console.log(result);
		return result;
}
//==========================================
//функция только числа
function is_numeric(val)
{
		//var reg = new RegExp("/^\d+$/");	
		var reg =/^\d+$/;	
		var result=reg.test(val);
		return result;
}

//функция проверки паролей на совпадение
function pass_ravno()
{
	if( $(""+settings.validation_form+" "+settings.password2+"").attr("value") == $(""+settings.validation_form+" "+settings.password1+"").attr("value") )
	{
		$(""+settings.validation_form+" "+settings.password2+"").next().html("<div class='valid_message'>"+settings.pass_valid_message+"</div>");

		$(""+settings.validation_form+" "+settings.password2+"").removeClass("value");
		$(""+settings.validation_form+" "+settings.password2+"").removeClass("value_Null");
		$(""+settings.validation_form+" "+settings.password2+"").removeClass("value_false");
		$(""+settings.validation_form+" "+settings.password2+"").addClass("value_true");
		$(""+settings.validation_form+" "+settings.password2+"").attr("valid", "true");

	}
	else{

		$(""+settings.validation_form+" "+settings.password2+"").next().html("<div class='invalid_message'>"+settings.pass_error_message+"</div>");

		$(""+settings.validation_form+" "+settings.password2+"").removeClass("value");
		$(""+settings.validation_form+" "+settings.password2+"").removeClass("value_Null");
		$(""+settings.validation_form+" "+settings.password2+"").removeClass("value_false");
		$(""+settings.validation_form+" "+settings.password2+"").addClass("value_false");
		$(""+settings.validation_form+" "+settings.password2+"").attr("valid", "false");
	}
 return false;
}


//функция вкл.выкл submit
function submit_on_off()
{
	if (settings.only_visible){visible = ":visible"}else{visible=""}
	var validEND=false;
		$(""+settings.validation_form+" *[required]"+visible+"").each(
		function()
		{
				
           // console.log($(this));
				if ( $(this).attr("valid") == "false" )
				{
					 validEND=true;
				}				
		});
		return 	validEND;
}


//===============================================
}

