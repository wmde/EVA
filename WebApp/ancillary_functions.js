/**
 * Debug-Funktion für Introspektion von Arrays. Nachbau von print_r. Quelle: http://scratchbook.ch/2009/07/11/print_r-fur-javascript/
 *
 * @author Masin Al-Dujaili (masin.al-dujaili@wikimedia.de)
 *
 * @param   arr   {array}   Array für Introspektion
 * @param   level {number}  Tiefe der Introspektion
 */
function print_r(arr, level) {
  var dumped_text = "";
  if (!level) level = 0;
 
  //The padding given at the beginning of the line.
  var level_padding = "";
  var bracket_level_padding = "";
  
  for (var j = 0; j < level + 1; j++) level_padding += "    ";
  for (var b = 0; b < level; b++) bracket_level_padding += "    ";
  
  if (typeof(arr) == 'object') { //Array/Hashes/Objects 
    dumped_text += "Array\n";
    dumped_text += bracket_level_padding + "(\n";
    for (var item in arr) {
      var value = arr[item];
      if (typeof(value) == 'object') { //If it is an array,
        dumped_text += level_padding + "[" + item + "] => ";
        dumped_text += print_r(value, level + 2);
      } else {
        dumped_text += level_padding + "[" + item + "] => " + value + "\n";
      }
    }
    dumped_text += bracket_level_padding + ")\n\n";
  } else { //Strings/Chars/Numbers etc.
    dumped_text = "===>" + arr + "<===(" + typeof(arr) + ")";
  }
  return dumped_text;
}

/* finds the intersection of 
 * two arrays in a simple fashion.  
 *
 * PARAMS
 *  a - first array, must already be sorted
 *  b - second array, must already be sorted
 *
 * NOTES
 *
 *  Should have O(n) operations, where n is 
 *    n = MIN(a.length(), b.length())
 *
 * Quelle: https://stackoverflow.com/a/1885660/3306389
 */
function intersect_safe(a, b)
{
  var ai=0, bi=0;
  var result = [];

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}

function between(x, min, max) {
  return x >= min && x <= max;
}

String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

function getEmail(address)
{
  if(debug) { return maintainer ;}
  else { return address;}
}

// Syntax: toClass.call( objekt )
var toClass = {}.toString // (1)

function get_type(thing)
{
    if(thing===null) return "[object Null]"; // special case
    return Object.prototype.toString.call(thing);
}