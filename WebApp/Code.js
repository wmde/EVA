var debug = true;
var valid_users = [
  'masin.al-dujaili@wikimedia.de',
  'sandra.muellrick@wikimedia.de',
  'tobias.gritschacher@wikimedia.de',
  'jeroen.dedauw@wikimedia.de',
  'daniel.king_ext@wikimedia.de',
  'raz.shuty@wikimedia.de',
  'aleksey.bekh-ivanov@wikimedia.de',
  'lisa.koehler@wikimedia.de'
];

function test(){
  Logger.log(valid_users.indexOf('aleksey.bekh-ivanov@wikimedia.de'));
}

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

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function getFormValue(v){
  if(undefined == getFormValue.formData) return undefined;
  if(undefined == getFormValue.formData[v]) return undefined;
  return getFormValue.formData[v];
}

function validate(value)
{
  Logger.log('validating %s', value);
  if(undefined !== value) {
    if('' !== value) {
      return value;
    }
  }
  return undefined;
}

function setFormValues(e){
  Logger.log('setting form values');
  getFormValue.formData = new Object();
  getFormValue.formData.nachname = validate(e.f5);
  getFormValue.formData.vorname = validate(e.f6);
  getFormValue.formData.email = validate(e.f7);
  getFormValue.formData.bereich = validate(e.f9);
  getFormValue.formData.team = validate(e.f10);
  getFormValue.formData.vertrag = validate(e.f14);
  getFormValue.formData.erstertag = validate(e.f15);
  getFormValue.formData.stelle = validate(e.f16);
  getFormValue.formData.stelleEN = validate(e.f17);
  getFormValue.formData.kommprofil = validate(e.f18);
  getFormValue.formData.sitzplatz = validate(e.f20);
  getFormValue.formData.rechner = validate(e.f22);
  getFormValue.formData.os = validate(e.f23);
  getFormValue.formData.monitor = validate(e.f24);
  getFormValue.formData.mobiltelefon = validate(e.f25);
  getFormValue.formData.mobilfunkvertrag = validate(e.f26);
  getFormValue.formData.dect = validate(e.f27);
  getFormValue.formData.weitereanforderungen = validate(e.f28);
  getFormValue.formData.zugaenge = validate(e.f29);
  getFormValue.formData.mailinglisten = validate(e.f31);
  getFormValue.formData.bvg = validate(e.f33);
  getFormValue.formData.bvgstart = validate(e.f34);
  getFormValue.formData.transponder = validate(e.f35);
  getFormValue.formData.postfach = validate(e.f36);
}

function queryFiles() {
  var eva = SpreadsheetApp.openById(config.projekte.EVA.spreadsheet),
      all = eva.getSheetByName('EVA komplett'),
      meta = eva.getSheetByName('Meta-EVA');
//  var names_unfiltered = all.getRange(2, 1, all.getLastRow()-1, 2).getValues(),
  
  Logger.log( "LastRow = %s", all.getLastRow() );
  if( 2 > all.getLastRow() ) {
    return { "result": "empty" };
  } else {
    var names_unfiltered = all.getRange(2, 1, 1, 2).getValues(),
        s, h, names = [];

    for( var r = 0; r < names_unfiltered.length; r++ ) {
      names[r]['Nachname'] = names_unfilterd[r][0];
      names[r]['Vorname'] = names_unfilterd[r][1];
    }
    Logger.log('Namen: %s', print_r(names));
  }
}

function buildStartScreen() {
  // https://script.google.com/a/wikimedia.de/macros/s/AKfycbw5o6tEmahy5gH_K1M3-
  // n0yFdC0PQRAVQkYIVm8cedp/dev
  
  Logger.log(ScriptApp.getService().getUrl());
  var template = HtmlService.createTemplateFromFile('template').evaluate()
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
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
  if(
    GroupsApp.getGroupByEmail('personal@wikimedia.de').hasUser(user) ||
    (Session.getEffectiveUser().getEmail() == user.getEmail()) ||
    ( -1 != valid_users.indexOf(user.getEmail().toLowerCase()) )
  )
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

function validateForm(){
  if(debug) Logger.log("validateForm()");
  return "<strong>Danke für die Daten.</strong>";
}

function sendVerificationCode(){
  if(debug) Logger.log("sendVerificationCode()");
  return "<strong>sendVerificationCode() nicht implementiert</strong>";
}

function verifyCode(){
  if(debug) Logger.log("verifyCode()");
  return "<strong>verifyCode() nicht implementiert</strong>";
}

function forgotPassword(){
  if(debug) Logger.log("forgotPassword()");
  return "<strong>forgotPassword() nicht implementiert</strong>";
}

function csrfToken(){
  if(debug) Logger.log("csrfToken()");
  return "<strong>csrfToken() nicht implementiert</strong>";
}

function logout(){
  if(debug) Logger.log("logout()");
  return "<strong>logout() nicht implementiert</strong>";
}

function processForm(clientForm)
{
  var methods = [
    'validateForm',
    'sendVerificationCode',
    'verifyCode',
    'forgotPassword',
    'csrfToken',
    'logout'
  ];
  var method = (undefined !== typeof clientForm['method'])  ? clientForm['method']  : 'unknown';
  var isPublic = (-1 !==  methods.indexOf(method) );
  Logger.log(print_r(clientForm));
  setFormValues(clientForm);
  Logger.log(print_r(getFormValue.formData));
  if (isPublic) return eval(method+"();");
  return "<strong>Nicht implementiert</strong>";
}

