/**
 * Creates an instance of Revision
 *
 * @constructor
 * @version 0.01
 * @this {Revision}
 * @param {number} c data column to work on.
 */

//FIXME Is it used?

function Revision(c)
{
  var self = this;
  
/**
 * private methods
 */

function storeValue(i, v)
{
}
  
/**
 * body of constructor
 */
  var revision = [];

  if(undefined !== c)
  {
    for( var r = 0; r < c.length; r++)
    {
      revision[c[r][0]] = c[r][1];
    }
  }
  else return false;

}
/**
 * public methods
 */
  
Revision.prototype.getValue = function(option)
{
  if(revision.hasOwnProperty(option)) return revision[option];
  else return false;
}

Revision.prototype.setValue = function(option, value)
{
  if(revision.hasOwnProperty(option))
  {
    revision[option] = value;
    storeValue(this.id, option, value)
    return true;
  }
  else return false;
}

Revision.prototype.getId = function()
{
  return this.getValue('Zeitstempel');
}

Revision.prototype.getType = function()
{
  return this.getValue('Vorgang');
}

