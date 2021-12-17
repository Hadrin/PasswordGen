// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


function generatePassword() {
  start: {
    var special = false;
    var numeric = false;
    var upper = false;
    var lower = false;
    var pwLength = prompt("How long should your new password be?");
    pwLength = parseInt(pwLength);
    if (!Number.isInteger(pwLength)) {
      alert("Invalid value. Restarting.");
      //Refreshes the page, requiring the user to start again from the beginning
      break start;
    }

    //Length checking
    if (pwLength < 8) {
      alert("Too short. Restarting.");
      break start;
    } else if (pwLength > 128) {
      alert("Too long. Restarting.");
      break start;
    }

    alert("Enable/disable characters. Use OK for yes, Cancel for No.");
    lower = confirm("Use lowercase letters?");
    upper = confirm("Use uppercase letters?");
    if (lower == false && upper == false) {
      if (confirm("Do not use letters?")) {
        alert("Confirmed");
      } else {
        alert("Restarting");
        break start;
      }
    }
    numeric = confirm("Use numbers?");
    special = confirm("Use special characters?");
    if (lower == false && upper == false && numeric == false && special == false) {
      alert("No legal characters. Restarting");
      break start;
    }
    let chars = new Array(pwLength);

    let uppers = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let lowers = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let specials = ["\"", "!", "@", "#", "$", "%", "^", "&", "*", "\'", "\\"];
    //Ensure at least one of each enabled character type is used
    var startpoint = getRand((chars.length - 4));
    let availChars = [];
    if (upper) {
      chars[startpoint] = uppers[getRand(uppers.length)];
      startpoint++;
      availChars = availChars.concat(uppers);
    }
    if (lower) {
      chars[startpoint] = lowers[getRand(lowers.length)];
      startpoint++;
      availChars = availChars.concat(lowers);
    }
    if (numeric) {
      chars[startpoint] = nums[getRand(nums.length)];
      startpoint++;
      availChars = availChars.concat(nums);
    }
    if (special) {
      chars[startpoint] = specials[getRand(specials.length)];
      availChars = availChars.concat(specials);
    }

    //Fills in missing characters with random enabled characters
    //Also creates final string as it goes
    var finalPassword = "";
    for (var i = 0; i < chars.length; i++) {
      if (typeof chars[i] == 'undefined') {
        chars[i] = availChars[getRand(availChars.length)];
      }
      finalPassword = finalPassword.concat(chars[i]);
    }

    return finalPassword;

  }
}

function getRand(max) {
  return Math.floor(Math.random() * max);
}