/**
 * Creates an instance of EmployeeIterator
 *
 * @constructor
 * @version 1.0
 * @this {EmployeeIterator}
 * @param {array} f array of file names
 * @param {array} i array of file ids
 */



function EmployeeIterator(f, i)
{
  var self = this;
  var pos = -1, files = f, ids = i;
  
/**
 * public methods
 */

/**
 * Get next employee
 *
 * @return {object} object containing name and id of next file.
 */
  this.next = function()
  {
    try
    {
      if(pos < files.length-1)
      {
        pos = pos + 1;
        var file = {
          'name': files[pos],
          'id': ids[pos]
        }
        return file;
      }
    }
    catch(err)
    {
      return false;
    }
  }
  
/**
 * Return whether EmployeeIterator has iterable elements left.
 *
 * @return {boolean} iterable elements left or not
 */
  this.hasNext = function()
  {
    if(pos < files.length-1)
    {
      return true
    }
    return false;
  }
}

