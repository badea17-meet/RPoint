$.when(
    $.getScript( "https://www.gstatic.com/firebasejs/4.1.2/firebase.js" ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC9vpBfsZbCtsIMvvimJy1n3FMfmc90N4s",
    authDomain: "rpoint-22019.firebaseapp.com",
    databaseURL: "https://rpoint-22019.firebaseio.com",
    projectId: "rpoint-22019",
    storageBucket: "rpoint-22019.appspot.com",
    messagingSenderId: "425524786368"
  };
  firebase.initializeApp(config);

  var database=firebase.database();
  var storage = firebase.storage();
  var auth = firebase.auth();
  var signup = document.getElementById('signup');
  if (signup) {
  signup.onclick = function() {
  	var email = document.getElementById('email').value;
  	var password = document.getElementById('password').value;
  	var confirmpass = document.getElementById('confpassword').value;
  	if(password != confirmpass) {
  		alert("The passwords do not match!");
  	}
  	else {
  	auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
});
  	alert("Account has been created successfully! Proceed to login!");
  	}
  }
  	
  	
  }


  var login = document.getElementById("login");
  if (login) {
  login.onclick = function() {
  	var email = document.getElementById('email').value;
  	var password = document.getElementById('password').value;
  	auth.signInWithEmailAndPassword(email, password).catch(function(error) {
  		var errorMessage=error.message;
  		var errorCode = error.code;
  		alert(errorCode);
  		if(errorCode=="auth/user-not-found")
  		{
  			var response = confirm("E-mail is not registered! Click <a href=\"/signup\">here</a> to sign up!");
  			if(response==true)
  			{
  				window.location.replace("/");
  			}
  		}
  		else if (errorCode=="auth/wrong-password")
  		{
  			var response = confirm("Incorrect password. Wish to reset your password?")
  			if(response==true)
  			{
  				auth.sendPasswordResetEmail(email);
  				alert("Password reset e-mail has been sent successfully!");
  			}
  		}
  		alert(errorMessage);
  	})
  	if(auth.currentUser.emailVerified == false) {
  		var response = confirm("Your account needs to be verified. Re-send verification e-mail?");
  		if(response==true) {
  			auth.currentUser.sendEmailVerification();
  			alert("Verficiation e-mail has been sent. Please check your inbox");
  		}
  	}
  	else {
  		alert("Welcome back!");
  		window.location.replace("/");
  	}
  	
  };
}


window.onload = function () {
	var path = window.location.pathname;
	if(path=="/") {
		var user = auth.currentUser;
		if(user == null) {
			alert("You must be logged in first!");
			window.location.replace("/login");
		}
		else {
			if(user.displayName==null) {
				alert("Welcome to our website! You are being redirected to set up your account!");
				window.location.replace("/settings");
			}
		}
	}
}





    //place your code here, the scripts are all loaded

});