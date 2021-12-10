const fs = require("fs");
const path = require("path");


function organizeFn(dirpath) {

  let destPath;

  if (dirpath == undefined) {
    console.log("PLease enter a Directory Path");
    return;
  } else {
    let doesExist = fs.existsSync(dirpath);
  

    if (doesExist == true) {
      
      destPath = path.join(dirpath, "organized_files");
     
      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath); // we will only creata a directory if it does not exist
      } else {
        console.log("The Folder Already Exists");
      }
    } else {
      console.log("Please enter a valid Path");
    }
  }
  organizeHelper(dirpath, destPath);
}

function organizeHelper(src, dest) {
  let childNames = fs.readdirSync(src); // get all the files and folders in that dirctory
 

  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(src, childNames[i]); 
    let isFile = fs.lstatSync(childAddress).isFile(); 

    if (isFile == true) {
      let fileCategory = getCategory(childNames[i]);
      console.log(childNames[i] + "  belongs to  " + fileCategory);

      sendFiles(childAddress, dest, fileCategory);
    }
  }
}

function getCategory(name) {
  let ext = path.extname(name); 
  //console.log(ext)
  ext = ext.slice(1);
  //console.log(ext)

  for (let type in types) {
    let cTypeArr = types[type];
    //console.log(cTypeArr)

    for (let i = 0; i < cTypeArr.length; i++) {
      if (ext == cTypeArr[i]) {
       
        return type; // we rerturned typs of the file
      }
    }
  }

  return "others";
}

function sendFiles(srcFilePath, dest, fileCategory) {
  let catPath = path.join(dest, fileCategory);

 
  if (fs.existsSync(catPath) == false) {
    fs.mkdirSync(catPath);
  }

  let fileName = path.basename(srcFilePath);
  let destFilePath = path.join(catPath, fileName);

  fs.copyFileSync(srcFilePath, destFilePath); 
  fs.unlinkSync(srcFilePath); 

  console.log(fileName + " copied to " + fileCategory);
}


module.exports= {
       organizeKey : organizeFn
}
