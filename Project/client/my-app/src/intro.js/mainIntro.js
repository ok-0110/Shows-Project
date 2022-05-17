import introJs from "intro.js";
import "intro.js/introjs.css";
import "../css/intro.css";

const introMain = introJs();

const mainPageIntro = () => {
  introMain
    .setOptions({
      steps,
      exitOnOverlayClick: false,
      tooltipClass: "customTooltip",
      showStepNumbers: false,
    })
    .start();
};

let corentStep = 0;

introMain.onchange(function () {
  console.log(this._currentStep);
  corentStep = this._currentStep;
  // you'll notice the object's properties have _currentStep - use that :)
});

const getCorentStep = () => {
  return corentStep;
};

const mainPageIntroSkeep = () => {
  introMain.nextStep();
};

const restart = (stepNum) => {
  introMain.exit().start().goToStep(stepNum);
};

/*
start => when main page is dane render is start this intro

 click on “user management” run the component "ManageUsers" that run restart 
 
 click on “add user” run the component "addUser" that run restart 

 when addUser part end => click on “shows” run the component “shows” that run restart
 
 


 click on add 

 */

 const steps = [
  {
    element: ".mainPageDiv",
    intro:
      "<p > There is our lovely navigation bar <br/> which builds itself based on “user permissions”  </p>",
  },
  {
    element: "#manageusers",
    intro:
      "<p >Only the admin can see and work on \
     “user management” button <b> (click on it)</b> </p>",
    showButtons: "false",
  },
  {
    element: "button#manageusers_adduser",
    title: "New employee?",
    intro: "<p >Lets make one <b>(click on Add)</b> </p>",
  },
  {
    element: "div[label='permissions' ]",
    title: "Who said permissions?",
    intro: "<p >Here you can select which permissions the new employees can have</p>",
    position: "left",
  },
  {
    element: "div[label='user info' ]",
    title: "Login system",
    intro:
      "<p>In this company - only the admin can create new users\
    <br/> \
    The user’s first password is “1234”<br/> \
    and on the first login they have to change it.</p>",
    position: "right",
  },
  {
    element: "body",
    title: "We’re almost done!",
    intro:
      "<p>Before I leave you to play around <br/> I want you to see the Shows and the Subscribers options</p>",
  },
  {
    element: "button[name='shows']",
    title: "lets go to Show’s",
    intro: "<p><b>(click on SHOWS)</b></p>",
  },
  {
    element: "*",
    intro: "<p>All those shows brut from “tvmaze” API and put in the DB</p>",
    position: "top",
  },
  {
    element: "*",
    title: "Searching for something?",
    intro: "<p>Search engine by name and genre <br/>\
      (by “fuse.js”) </p>",
    position: "bottom",
  },
  {
    element: "button[name='Subscribers']",
    title: "lets go to Subscribers",
    intro: "<p><b>(click on SUBSCRIPTIONS)</b></p>",
  },
  {
    element: "*",
 
    intro: "<p>fictive subscribers list brought from “jsonplaceholder” API and put in the DB</p>",
  },
  {
    element: "*",
    title: "That's all for me…  (•‿•)",
    intro:
      "<p>Feel free to leave a feedback about this project, <br/> \
    my Email (also in the footer) : <b> kedaromri@gmail.com</b></p>",
  },
];


export { mainPageIntro, mainPageIntroSkeep, getCorentStep, restart };
