/**
 * Creates an instance of Employee
 *
 * @constructor
 * @version 0.3
 * @this {Employee}
 * @param {string} f - file of employee to work on
 */

function Employee(f)
{
  var self = this;

/**
 * private methods
 */
  
  function stakeholderExists( e, sh)
  {
    e.getSheetByName(sh);
  }
  
  function isInitialized()
  {
    var n = this.file.getNumSheets();
    if( 1 < n ) // assume it has been initialized
    {
      var metasheet = this.file.getSheetByName('meta');
      var meta = metasheet.getDataRange().getValues();
      var fileinfo = [];
      
      for( var r = 0; r < meta.length; r++ )
      {
        fileinfo[meta[r][0]] = meta[r][1];
      }
      switch(fileinfo['config'])
      {
          // when changing version check, move everything (?) from default to
          // case branch above default and insert new version right above default. Then
          // implement new version check in default.
        case '20180301':
        default:
          var passed = true;
          for(var sh = 0; sh < config.stakeholder['20180301'].length; sh++)
          {
            if(!this.file.getSheetByName(config.stakeholder['20180301'][sh])) passed = false;
          }
          if(!passed) return false; // if stakeholder sheets are missing something's amiss.
          else
          {
            // Sanity checks here if necessary
            // Each sheet should be checked if it conforms to whatever format
            // this specific file version requires. ATM (2018-02-27) I have not
            // the slightest idea if there are any further checks necessary.
            // Thus, we just return true for now.
            return true;
          }
          break;
      }
    }
  }

//  function configSort
  function writeOption(option, value)
  {
    var meta = this.file.getSheetByName('metadata'),
        configdata = meta.getDataRange().getValues(),
        config = [], pos = -1;
    
    for(var r = 0; r < configdata.length; r++)
    {
      config[configdata[r][0]] = configdata[r][1];
      if(configdata[r][0] === option) pos = r;
    }
    if(pos === -1)
    {
      pos = meta.getLastRow();
      meta.getRange(pos+1, 1).setValue(option);
    }
    meta.getRange(pos+1, 2).setValue(value);
    self.config[option] = value;
  }

  function readOptions()
  {
    var meta = this.file.getSheetByName('metadata'),
        configdata = meta.getDataRange().getValues(),
        c = [], pos = -1;
    
    for(var r = 0; r < configdata.length; r++)
    {
      c[configdata[r][0]] = configdata[r][1];
//      if(configdata[r][0] === option) pos = r;
    }
    return c;
  }

  function initializeEmployee()
  {
    // get latest version
    var version = EVA.prototype.getLatestVersion(),
        filter_matrix = SpreadsheetApp.openById(config.projekte.EVA.filter),
        filter_sheet = filter_matrix.getSheetByName(version);
    this.file.insertSheet('metadata', 1);
    writeOption('version', version);
    filter_sheet.copyTo(this.file);
    var s, h, header_row = filter_sheet.getRange(1,1,1,filter_sheet.getLastColumn()).getValues();
    for( s = 0; s < header_row.length; s++) if('' != header_row[0][s]) h[header_row[0][s]] = s;
    writeOption('createdBy',Session.getActiveUser().getEmail());
//    writeOption('',);
    for(var sh = config.stakeholder[version].length; sh > 0; sh--)
    {
      var current = this.file.insertSheet(config.stakeholder[version][sh], 1);
      current.getRange(1,1).setValue('=FILTER()');
    }
  }

  var fileToCheck = DriveApp.getFileById(f);
  if(fileToCheck && 'application/vnd.google-apps.spreadsheet' === fileToCheck.getMimeType())
  {
    this.file = SpreadsheetApp.openById(f);
  }
  else return false;

  if(!isInitialized()) initializeEmployee();
  this.config = readOptions();
  
  var current = this.getCurrent();
}

/**
 * public methods
 */

/**
 * Load employee file.
 *
 * @param {object} i - Object representing employee file as returned by EmployeeIterator.next
 * @return {object Employee} object representing employee
 */
Employee.prototype.loadEmployeeById = function(i)
{
  var file = DriveApp.getFileById(i.id);
  if(file && 'application/vnd.google-apps.spreadsheet' === file.getMimeType())
  {
    this.id = i;
    this.employee = file;
    return this;
  }
  return false;
}

Employee.prototype.addRevision = function(revision)
{
}

Employee.prototype.quitEmployee = function()
{
}

Employee.prototype.getHistory = function()
{
  return new RevisionIterator(SpradsheetApp.open(this.file))
}

Employee.prototype.getCurrent = function()
{
  
}

