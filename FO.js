

//let input = process.argv[2]
//console.log(input)
const fs = require("fs");
const path = require("path");
const heplObj = require('./commands/help') 
const treeObj = require('./commands/tree')
const organizeObj = require('./commands/organize')

let inputArr = process.argv.slice(2); 

let command = inputArr[0]; 


let types = { 
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};


switch (command) {
  case "tree":
    treeObj.treeKey(inputArr[1]);
    break;
  case "organize":
    organizeObj.organizeKey(inputArr[1]); 
    break;
  case "help":
    heplObj.helpFnKey()
    break;
  default:
    console.log("PLEASE ENTER A VALID COMMAND");
    break;
}
