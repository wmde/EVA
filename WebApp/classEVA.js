/**
 * Creates an instance of EVA
 *
 * @constructor
 * @version 0.8
 * @this {EVA}
 */

function EVA() {
  var self = this;
  // look for datadir named EVA

/**
 * private methods
 */
 

/**
 * Retrieve directory where EVA stores its data files
 * 
 * @return {object Folder} The folder where EVA stores its data files
 */
  function getDataDir()
  {
    var dirs = DriveApp.getFoldersByName('EVA');
    while(dirs.hasNext())
    {
      var dir = dirs.next();
      var files = dir.getFilesByName('EVA');
      
      // as there can be more directories named EVA in the user's Drive we need to find the one with the file called EVA in it
      while(files.hasNext())
      {
        var file = files.next();
        // the file's owner should be me, masin.al-dujaili@wikimedia.de
        // TODO: check against the script's owner
        if('masin.al-dujaili@wikimedia.de' == file.getOwner().getEmail().toLowerCase())
        {
          var datadir=dir;
        }
        else
        {
          var datadir=false;
        }
        // if datadir has been found break loop. actually, there shouldn't be more than one file of this name in the directory
        if(datadir) break;
      }
      // if datadir has been found break loop.
      if(datadir) break;
    }
    return datadir;
  }
  
/**
 * Create and tag data directory for use with EVA
 */
  function createDataDir()
  {
    var root = DriveApp.getRootFolder(),
        datadir = root.createFolder('EVA'),
        evaFile = datadir.createFile('EVA', 'notreallysecretkey', 'text/plain');
  }
  
  this.data = getDataDir();
  
  // datadir hasn't been found. what now? of course, we'll create the dir and put the neccessary file into it.
  if(!this.data) 
  {
    this.data = createDataDir()
  }
}

/**
 * public methods
 */

/**
 * Get a list of employees that are stored in the datadir
 * 
 * @return {object EmployeeIterator} iterator object pointing to employee list
 */
EVA.prototype.getEmployees = function()
{
  var spreadsheets = this.data.getFilesByType('application/vnd.google-apps.spreadsheet'),
      evaFiles = [], evaIds = [];
  while(spreadsheets.hasNext())
  {
    var spreadsheet = spreadsheets.next(),
        filename = spreadsheet.getName().split(' ');
    /*
    EVA files should always begin with "EVA Akte", e.g. "EVA Akte Masin Al-Dujaili"
    */
    if('EVA' === filename[0] && 'Akte' === filename[1])
    {
      filename.splice(0,2);
      evaFiles.push(filename.join(' '));
      evaIds.push(spreadsheet.getId());
    }
  }
  return new EmployeeIterator(evaFiles, evaIds);
}

/**
 * Get employee by name
 *
 * @param {string} name - Name of employee
 * @return {object Employee} object representing employee file
 */
EVA.prototype.getEmployee = function(name)
{
  var employees = EVA.getEmployees();
  while(employees.hasNext())
  {
    var employee = employees.next();
    if(name === employee.name)
    {
      return new Employee(employee);
    }
  }
  return false;
}

/**
 * Create an employee file
 *
 * @param {array} form - Array of values describing the employee state
 * @return {object Employee} object representing employee
 */
//FIXME Is it used?
EVA.prototype.createEmployee = function(name)
{
  if(!EVA.getEmployee(name))
  {
    return false
  }
  else
  {
    var file = SpreadsheetApp.create('EVA Akte '+name).getId();
    this.data.addFile(DriveApp.getFileById(file));
    DriveApp.removeFile(file);
    return new Employee(file);
//    this.data.createFile('EVA Akte '+name, '', 'application/vnd.google-apps.spreadsheet');
    
  }
}

EVA.prototype.getLatestVersion = function()
{
  var sh = Object.keys(config.stakeholder).sort().reverse();
//  Logger.log(print_r(sh));
  return sh[0];
}

function testEva()
{
  Logger.log(EVA.prototype.getLatestVersion());
//  Logger.log(DriveApp.getFileById(config.projekte.EVA.spreadsheet).getMimeType());
}