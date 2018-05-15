function doGet(e) {
  Logger.log('führe doGet aus');
  REQUEST = 'get';
  return main(e,REQUEST);
}

function doPost(e) {
  Logger.log('führe doPost aus, e: %s', print_r(e));
  REQUEST = 'post';
  return main(e,REQUEST);
}

function main(e, method) {
  TITLE = 'EVA';
  Logger.log('Method %s', method);
  Logger.log('Request %s', REQUEST);
  // use an externally hosted stylesheet
  var style = '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet">';
  
  // get the query "greeting" parameter and set the default to "Hello"
  var greeting = e.parameter.greeting || "Hello";
  // get the query "name" parameter and set the default to "World!"
  var name = e.parameter.name || "World";
  
  // create and use a template
  var heading = HtmlService.createTemplate('<h1><?= greeting ?> <?= name ?>!</h1>')
  
  // set the template variables
  heading.greeting = greeting;
  heading.name = name;
  
  var content, access = hasAccessLevel(Session.getActiveUser()), accesstext = Utilities.formatString('<p>Dein Zugriffslevel ist %s</p>', access);
  
  switch(access) {
    case 'team':
    case 'full':
      break;
    case 'none':
    default:
      accesstext += '<p>Leider hast du damit keinen Zugriff auf EVA. Das tut uns leid.</p>';
      return accesstext;
  }
  if('' === e.parameter.mode || undefined === e.parameter.mode) {
    content = buildStartScreen();
  }
  /*var HTMLOutput = HtmlService.createHtmlOutput();
  HTMLOutput
//
  .append(style)
  .append(heading.evaluate().getContent())
  .append(content)
  .append(accesstext);
  HTMLOutput
  .setTitle(TITLE)
  .addMetaTag('viewport', 'width=device-width, initial-scale=1, shrink-to-fit=no');
  return HTMLOutput;*/
  content
  .setTitle(TITLE)
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
//  .append(style)
  ;
  return content;
}

function listEmployeeFiles() {

}

function buildStartScreen() {
  // https://script.google.com/a/wikimedia.de/macros/s/AKfycbw5o6tEmahy5gH_K1M3-
  // n0yFdC0PQRAVQkYIVm8cedp/dev
  
  Logger.log(ScriptApp.getService().getUrl());
  var template = HtmlService.createTemplateFromFile('formtest').evaluate();
//  Logger.log(template.getContent());
  return template;
//  return "<p>Willkommen zu EVA.</p>";
}

function buildEditForm() {

}

function buildCreateForm() {

}

function hasAccessLevel(user) {
  Logger.log(print_r(Session.getEffectiveUser()));
  Logger.log(print_r(user));
  if(GroupsApp.getGroupByEmail('personal@wikimedia.de').hasUser(user) || (Session.getEffectiveUser().getEmail() == user.getEmail()))
  {
    return 'full';
  }
/*  else if(GroupsApp.getGroupByEmail('teamleitungen@wikimedia.de').hasUser(user))
  {
    return 'team'
  }*/
  else return 'none';
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function processForm(clientForm)
{
  Logger.log(print_r(clientForm));
  Logger.log(clientForm.timestamp);
}

