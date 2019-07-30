$(document).ready(function() {

  /* DOM to varaibles */
   var track = $("#track");
   var btn = $("#start-btn");
   var myCar = $("#myCar");
   var dividers_first = $(".dividers-first");
   var dividers_second = $(".dividers-second");

   /* Other variables */
   var speed = 10;
   var track_height = track.height();
   var track_width = track.width();
   var myCar_position_left = parseInt(myCar.css('left'));
   var myCar_position_bottom = parseInt(myCar.css('bottom'));
   var score_count = 0;
   /* start the game */

   btn.click(function() {

    /* Hide the btn */
    btn.hide();

    /* bring myCar to the track */
     var start_the_car = setInterval(function() {

       if (myCar_position_bottom > 0.05*track_height){
           clearInterval(start_the_car);
           myCar_position_bottom = ParseInt(myCar.css('bottom'));
       }

       myCar.css('bottom',myCar_position_bottom+=3);

     } , 40 );

     /* Divider starts to show */
     var dividers_first_current_position = parseInt(dividers_first.css('top'));
     var dividers_second_current_position = parseInt(dividers_second.css('top'));

     var divider_speed = 5;

     var dividers_moving = setInterval(function() {

        if(dividers_first_current_position >= track_height){
            dividers_first_current_position = parseInt(dividers_second.css('top')) - dividers_second.height() + 18;
            dividers_first.css( 'top' , dividers_first_current_position);
        }

      else  if(dividers_second_current_position >= track_height){
            dividers_second_current_position = parseInt(dividers_first.css('top')) - dividers_first.height() + 18;
            dividers_second.css( 'top' , dividers_second_current_position);
        }


        dividers_first.css('top' , dividers_first_current_position+= divider_speed );
        dividers_second.css('top' , dividers_second_current_position+= divider_speed );


     } , 20 );


     /* car controller starts after 3 seconds*/
     var horizontal_shift = track.width()/3 ;
     var vertical_shift = 4;
     var myCar_height = parseInt(myCar.css('height'));

     setTimeout( function() {
         $(document).on('keydown' , function(e) {
             if( e.which === 37)                     /* on press left */
             {
                if ( myCar_position_left - horizontal_shift > 0 )
                   myCar.css('left',myCar_position_left-= horizontal_shift);
             }
             else if( e.which === 39)                 /* on press right */
             {
                 if ( track_width - (myCar_position_left + horizontal_shift) > 0 )
                   myCar.css('left', myCar_position_left+= horizontal_shift);
             }
             else if(e.which === 38)                /* on press up */
             {
                if( track_height - myCar_position_bottom - myCar_height > 0)
                   myCar.css( 'bottom' , myCar_position_bottom+= vertical_shift);
             }
             else if(e.which === 40)                 /* on press down */
             {
               if( myCar_position_bottom > 0)
                  myCar.css( 'bottom' ,myCar_position_bottom-= vertical_shift );
             }
         });

     },3000);


    /* Cars to avoid */
    var car_to_avoid_block1 = $("#first-row-to-avoid");
    var car_to_avoid_block1_height = car_to_avoid_block1.height();
    var car_to_avoid_block1_current_position = parseInt(car_to_avoid_block1.css('top'));
    var car_to_avoid_block1_car1 = $('#first-row-to-avoid #carToAvoid1');
    var car_to_avoid_block1_car2 = $('#first-row-to-avoid #carToAvoid2');
    var car_to_avoid_block1_car3 = $('#first-row-to-avoid #carToAvoid3');

    var car_to_avoid_block2 = $('#second-row-to-avoid');
    var car_to_avoid_block2_height = car_to_avoid_block2.height();
    var car_to_avoid_block2_current_position = parseInt(car_to_avoid_block2.css('top'));
    var car_to_avoid_block2_car1 = $('#second-row-to-avoid #carToAvoid1');
    var car_to_avoid_block2_car2 = $('#second-row-to-avoid #carToAvoid2');
    var car_to_avoid_block2_car3 = $('#second-row-to-avoid #carToAvoid3');

    var cars_to_avoid_speed = 4;
    var random ;
    var lvl_count = 1;   /* the levels */



    setTimeout(function(){
          cars_to_avoid = setInterval(function() {

           if (collision(myCar,car_to_avoid_block1_car1) || collision(myCar,car_to_avoid_block1_car2) || collision(myCar,car_to_avoid_block1_car3) || collision(myCar,car_to_avoid_block2_car1) || collision(myCar,car_to_avoid_block2_car2) || collision(myCar,car_to_avoid_block2_car3))
              {
                   stopTheGame();

              }
          else {

            if( lvl_count < 2 )
             {

                 if( car_to_avoid_block1_current_position > track_height)
                    {

                      car_to_avoid_block1_car1.hide();
                      car_to_avoid_block1_car2.hide();
                      car_to_avoid_block1_car3.hide();
                      random = Math.floor(Math.random()*3);

                      switch(random){
                           case 0: car_to_avoid_block1_car1.show();
                                   break;
                           case 1: car_to_avoid_block1_car2.show();
                                   break;
                           case 2: car_to_avoid_block1_car3.show();
                                   break;
                           default: alert("error");
                      }

                      car_to_avoid_block1.css('top',car_to_avoid_block1_current_position=-car_to_avoid_block1_height-35);

                      lvl_count++;
                    }

                 car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position+=cars_to_avoid_speed);


             }
            else if(lvl_count >= 2 && lvl_count <= 5)
              {

                if( car_to_avoid_block1_current_position > track_height)
                   {
                     if (lvl_count == 3)
                       { cars_to_avoid_speed++;
                         divider_speed++;
                       }

                     car_to_avoid_block1_car1.hide();
                     car_to_avoid_block1_car2.hide();
                     car_to_avoid_block1_car3.hide();
                     random = Math.floor(Math.random()*3);

                     switch(random){
                          case 0: car_to_avoid_block1_car1.show();
                                  car_to_avoid_block1_car2.show();
                                  break;
                          case 1: car_to_avoid_block1_car2.show();
                                  car_to_avoid_block1_car3.show();
                                  break;
                          case 2: car_to_avoid_block1_car3.show();
                                  car_to_avoid_block1_car1.show();
                                  break;
                          default: alert("error");
                     }

                     car_to_avoid_block1.css('top',car_to_avoid_block1_current_position=-car_to_avoid_block1_height-35);

                     lvl_count++;
                   }

                car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position+=cars_to_avoid_speed);


              }
           else if(lvl_count > 5 && lvl_count <=8)
             {


                if (car_to_avoid_block1_current_position > track_height && car_to_avoid_block2_current_position > track_height)
                  {
                      if (lvl_count == 7)
                        { cars_to_avoid_speed += 2;
                          divider_speed += 2;
                        }

                      car_to_avoid_block2_car1.hide();
                      car_to_avoid_block2_car2.hide();
                      car_to_avoid_block2_car3.hide();
                      random = Math.floor(Math.random()*3);

                      switch(random){
                              case 0: car_to_avoid_block2_car1.show();
                                      car_to_avoid_block2_car2.show()
                                      break;
                              case 1: car_to_avoid_block2_car2.show();
                                      car_to_avoid_block2_car3.show();
                                      break;
                              case 2: car_to_avoid_block2_car3.show();
                                      car_to_avoid_block2_car1.show();
                                      break;
                                      default: alert("error");
                       }



                      car_to_avoid_block1_car1.hide();
                      car_to_avoid_block1_car2.hide();
                      car_to_avoid_block1_car3.hide();
                      random = Math.floor(Math.random()*3);

                      switch(random){
                             case 0: car_to_avoid_block1_car1.show();
                                     break;
                             case 1: car_to_avoid_block1_car2.show();
                                     break;
                             case 2: car_to_avoid_block1_car3.show();
                                     break;
                             default: alert("error");
                      }

                     car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position = -123 );
                     car_to_avoid_block2.css('top' , car_to_avoid_block2_current_position = -(369+Math.floor(Math.random()*180))) ;

                     lvl_count++;
                  }

                  car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position+=cars_to_avoid_speed);
                  car_to_avoid_block2.css('top' , car_to_avoid_block2_current_position+=cars_to_avoid_speed);


              }

              else if(lvl_count > 8 && lvl_count <=12)
              {


                if (car_to_avoid_block1_current_position > track_height && car_to_avoid_block2_current_position > track_height)
                  {
                      if (lvl_count == 10)
                        {cars_to_avoid_speed+=2;
                         divider_speed+=2;
                        }

                      car_to_avoid_block2_car1.hide();
                      car_to_avoid_block2_car2.hide();
                      car_to_avoid_block2_car3.hide();
                      random = Math.floor(Math.random()*3);

                      switch(random){
                              case 0: car_to_avoid_block2_car1.show();
                                      car_to_avoid_block2_car2.show()
                                      break;
                              case 1: car_to_avoid_block2_car2.show();
                                      car_to_avoid_block2_car3.show();
                                      break;
                              case 2: car_to_avoid_block2_car3.show();
                                      car_to_avoid_block2_car1.show();
                                      break;
                                      default: alert("error");
                       }



                      car_to_avoid_block1_car1.hide();
                      car_to_avoid_block1_car2.hide();
                      car_to_avoid_block1_car3.hide();
                      random = Math.floor(Math.random()*3);

                      switch(random){
                             case 0: car_to_avoid_block1_car1.show();
                                     car_to_avoid_block1_car2.show();
                                     break;
                             case 1: car_to_avoid_block1_car2.show();
                                     car_to_avoid_block1_car3.show();
                                     break;
                             case 2: car_to_avoid_block1_car3.show();
                                     car_to_avoid_block1_car1.show();
                                     break;
                             default: alert("error");
                      }


                     car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position = -143 );
                     car_to_avoid_block2.css('top' , ( car_to_avoid_block2_current_position = -(389+Math.abs(Math.floor(Math.random()*180 ) ) ) ) ) ;
                     lvl_count++;
                  }

                  car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position+=cars_to_avoid_speed);
                  car_to_avoid_block2.css('top' , car_to_avoid_block2_current_position+=cars_to_avoid_speed);

              }
              else if(lvl_count > 12 )
              {


                if (car_to_avoid_block1_current_position > track_height && car_to_avoid_block2_current_position > track_height)
                  {
                      if (lvl_count%2==0)
                        {cars_to_avoid_speed++;
                         divider_speed++;
                        }

                      car_to_avoid_block2_car1.hide();
                      car_to_avoid_block2_car2.hide();
                      car_to_avoid_block2_car3.hide();
                      random = Math.floor(Math.random()*3);

                      switch(random){
                              case 0: car_to_avoid_block2_car1.show();
                                      car_to_avoid_block2_car2.show()
                                      break;
                              case 1: car_to_avoid_block2_car2.show();
                                      car_to_avoid_block2_car3.show();
                                      break;
                              case 2: car_to_avoid_block2_car3.show();
                                      car_to_avoid_block2_car1.show();
                                      break;
                                      default: alert("error");
                       }



                      car_to_avoid_block1_car1.hide();
                      car_to_avoid_block1_car2.hide();
                      car_to_avoid_block1_car3.hide();
                      random = Math.floor(Math.random()*3);

                      switch(random){
                             case 0: car_to_avoid_block1_car1.show();
                                     car_to_avoid_block1_car2.show();
                                     break;
                             case 1: car_to_avoid_block1_car2.show();
                                     car_to_avoid_block1_car3.show();
                                     break;
                             case 2: car_to_avoid_block1_car3.show();
                                     car_to_avoid_block1_car1.show();
                                     break;
                             default: alert("error");
                      }

                     car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position = -143);
                     car_to_avoid_block2.css('top' ,car_to_avoid_block2_current_position = -(395+Math.floor(Math.random()*50 ) ) );
                     lvl_count++;
                  }

                  car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position+=cars_to_avoid_speed);
                  car_to_avoid_block2.css('top' , car_to_avoid_block2_current_position+=cars_to_avoid_speed);

              }

            }

         },20);


    } , 6000);




    /* Game score */
    setTimeout( function(){

      count_the_score =  setInterval(function(){
            score_count+= 5;
        } , 4000 );

    } , 6000 );



    /* Check for collision between cars*/
    function collision($div1, $div2){
       var x1 = $div1.offset().left;
       var y1 = $div1.offset().top;
       var h1 = $div1.outerHeight(true);
       var w1 = $div1.outerWidth(true);
       var b1 = y1 + h1;
       var r1 = x1 + w1;
       var x2 = $div2.offset().left;
       var y2 = $div2.offset().top;
       var h2 = $div2.outerHeight(true);
       var w2 = $div2.outerWidth(true);
       var b2 = y2 + h2;
       var r2 = x2 + w2;

       if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
          return true;
       }



    /* function for stopping the game */
    function stopTheGame(){

        clearInterval(window.cars_to_avoid);      /* window used as cars_to_avoid is local and cannot be accessed*/
        clearInterval(dividers_moving);
        clearInterval(window.count_the_score);

        myCar.hide();
        car_to_avoid_block1.hide();
	      car_to_avoid_block2.hide();
	     	dividers_first.hide();
	 	    dividers_second.hide();


       $('#result').css('display','block');
	     $('#result #score').html("SCORE</br>" + score_count);


	    $('#result i').click(function() {
           location.reload(window.location.href);
		   });


    }


   });



});
