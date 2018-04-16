import room from './room';
import player from './player';
import swipeActions from './swipeActions';

import { randomProperties } from './utils';

import { writeStats } from './game';
import { writeRoom } from './game';
import { getNewRoom } from './game';

import { gainLevel } from './player';

$(document).ready(function(){

	var currentRoom = getNewRoom(room, swipeActions, player);
	writeStats(player);
	writeRoom(currentRoom);
	console.log(player);


	var card = document.getElementsByClassName('card-visible')[0];
	var tracker = document.getElementById('card-tracker');
	var mc = new Hammer(tracker);

	// add a "PAN" recognizer to it (all directions)
	mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 20 }) );

	// tie in the handler that will be called
	mc.on("pan", handleDrag);

	var lastPosX = 0;
	var lastPosY = 0;
	var isDragging = false;
	function handleDrag(ev) {
	  
	  // for convience, let's get a reference to our object
	  var elem = ev.target;
	  
	  // DRAG STARTED
	  // here, let's snag the current position
	  // and keep track of the fact that we're dragging
	  if ( ! isDragging ) {
	    isDragging = true;
	    lastPosX = elem.offsetLeft;  
	  }
	  
	   if (elem.offsetLeft > 50) {
	      card.classList.add("yes");
	      card.classList.remove("no");
	  }
	  else if (elem.offsetLeft < -50) {
	      card.classList.add("no");
	      card.classList.remove("yes");
	  }
	  else{
	    card.classList.remove("yes");
	    card.classList.remove("no");
	  }
	  
	  // we simply need to determine where the x,y of this
	  // object is relative to where it's "last" known position is
	  // NOTE: 
	  //    deltaX and deltaY are cumulative
	  // Thus we need to always calculate 'real x and y' relative
	  // to the "lastPosX/Y"
	  var posX = ev.deltaX + lastPosX;
	  
	  // move our element to that position
	  elem.style.left = posX + "px";
	  
	 
	  
	  // DRAG ENDED
	  // this is where we simply forget we are dragging
	  if (ev.isFinal) {
	    isDragging = false;
	    
	    if (elem.offsetLeft > 50) {
	      elem.style.left = 0 + "px";
	      card.classList.add("yesFade");
	      card.classList.remove("noFade");
	      setTimeout(function(){ card.classList.remove("yesFade"); card.classList.remove("yes"); }, 500);
	      	player.thisRoom.isLastRoom = true;
	      	currentRoom.swipeRight.action();
	      	if(player.thisRoom.isLastRoom == false){
				if (player.thisRoom.nextRoom.desc != undefined){currentRoom.desc = player.thisRoom.nextRoom.desc;}
	      		currentRoom.swipeLeft = player.thisRoom.nextRoom.swipeLeft;
	      		currentRoom.swipeRight = player.thisRoom.nextRoom.swipeRight;
	      		writeStats(player);
	      		writeRoom(currentRoom);	
			}
			else{
				card.classList.add("yes-swipe");
				setTimeout(function(){ 
					gainLevel(player);
					currentRoom = getNewRoom(room, swipeActions, player);		
					writeStats(player);
					writeRoom(currentRoom);  
					document.getElementById("card").classList.remove("feedback-message");
					card.classList.remove("yes-swipe");
				}, 500);
			}
	    }
	    else if (elem.offsetLeft < -50) {
	      elem.style.left = 0 + "px"; 
	      card.classList.add("noFade");
	      card.classList.remove("yesFade");
	      setTimeout(function(){ card.classList.remove("noFade"); card.classList.remove("no"); }, 500);
	      	player.thisRoom.isLastRoom = true;
	      	currentRoom.swipeLeft.action();
	      	if(player.thisRoom.isLastRoom == false){
	      		/*
				Mettre en place un système qui si la desc, l'img ou le swipeLeft/swipeRight n'est pas définis
				ne pas le remplacer par un "undefined" et donc laisser la valeur existante
	      		*/
	      		if (player.thisRoom.nextRoom.desc != undefined){currentRoom.desc = player.thisRoom.nextRoom.desc;}
	      		currentRoom.swipeLeft = player.thisRoom.nextRoom.swipeLeft;
	      		currentRoom.swipeRight = player.thisRoom.nextRoom.swipeRight;
	      		writeStats(player);
	      		writeRoom(currentRoom);	
		    }
	    	else{
	    		card.classList.add("no-swipe");
	    		setTimeout(function(){
	    			gainLevel(player);
		    		currentRoom = getNewRoom(room, swipeActions, player);
		    		writeStats(player);
		    		writeRoom(currentRoom);	
		    		document.getElementById("card").classList.remove("feedback-message");
		    		card.classList.remove("no-swipe")
	    		}, 500); 	
	    	}
	    }
	    else{
	      elem.style.left = 0 + "px";
	      card.classList.remove("yesFade");
	      card.classList.remove("noFade");
	    }
	  }
	}
});








