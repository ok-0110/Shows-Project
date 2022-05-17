import introJs from "intro.js";
import "intro.js/introjs.css";
import "../css/intro.css";

const introLogin = introJs();

const startIntroLogIN = () => {
  introLogin
    .setOptions({
      steps,
      tooltipClass: "customTooltip",
      exitOnOverlayClick: "true",
      showStepNumbers: "true",
    })
    .start();
};

const steps = [
  {
    element: "body",
    title: "welcome!",
    intro: "<p >My name is Omri Kedar,<br/>this is my favorite project  </p>",
  },
  {
    element: "body",
    title: "“My diverse skill“",
    intro: "<p > I created this project to “show off” my skill <b> ＼(^o^)／</b> </p>",
  },
  {
    element: "body",
    title: "What is that?",
    intro:
      "<p > It’s a simple system to operate and management<br/> <b>TV-shows & subscribers.</b> <br/> \
       I uploaded the client side to <b>firebase,</b> <br/>\
        the server to <b>Vercel</b> <br/>\
         and the database to <b>MongoDB Atlas</b> </p>",
  },
  {
    element: "body",
    title: "So.....",
    intro: "<p > I created the tour in intro.js to explain a few things</p>",
  },
  {
    element: ".loginDiv",
    title: "login system",
    intro: "In this company - only the admin can create new users",
  },
  {
    element: ".admin",
    intro: "You can click here to login automatically as Admin",
  },
];


export { startIntroLogIN };
