import introJs from "intro.js";
import "intro.js/introjs.css";
import "../css/intro.css";
const startIntroLogIN = () => {
  introJs()
    .setOptions({
      steps,
      tooltipClass: "customTooltip",
      exitOnOverlayClick: "true",
      showStepNumbers: "true",
    })
    .start();
  //   introJs().setOption();
};

const steps = [
  {
    element: "body",
    title: "welcome!",
    intro: "<p > that’s my project  <br/> (my \=\> <b>Omri Kedar</b>) </p>",
  },
  {
    element: "body",
    title: "“My deversd skill“",
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
    // nextToDone: "true",
    element: ".admin",
    intro: "You can click here to auto log as Admin",
  },
];

export { startIntroLogIN };
