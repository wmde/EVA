/**
 * Creates an instance of EmployeeHistory
 *
 * @constructor
 * @version 0.6
 * @this {EmployeeHistory}
 * @param {object Spreadsheet} ss instance of Spreadsheet
 */



function EmployeeHistory(ss)
{
/**
 * private methods
 */

  function isTimestamp(ts)
  {
    return true; // TODO: check if parameter is valid timestamp or Date object
  }
  
  function onlyUnique(value, index, s) {
    // only true for any first occurence of any given element
    return s.indexOf(value) === index;
  }
  
  function uniqueRevisions(sheet)
  {
    var rev = [];
    var values = sheet.getSheetValues(1,1,2, sheet.getLastColumn());
    for(var c = 0; c < values[0].length; c++)
    {
      if(isTimestamp(values[0][c])) rev.push(values[0][c]);
    }
    // only filter if any timestamps recognized
//    return (rev.length > 0) ? rev.filter( onlyUnique ) : false;
    return (rev.length > 0) ? rev : false;
  }

/**
 * body of constructor
 */

  if(undefined !== ss)
  {
    var self = this;
    this.spreadsheet = ss;
    const REVISION_TYPES =
        [
          'Eintritt',
          'Veränderung',
          'Austritt'
        ];
    
    var sheet = this.spreadsheet.getSheetByName('Rohdaten');
    
    var revisions = uniqueRevisions(sheet);
    Logger.log("Found %s revision(s)", revisions.length);
    this.history = this.getRevisions(sheet);
  }
  else return false;
}

/**
 * public methods
 */

EmployeeHistory.prototype.getRevisions = function(s)
{
  
}

