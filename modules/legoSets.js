const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

let sets = []; 

function initialize() {
    return new Promise((resolve, reject) => {
      try {
        // Simulate asynchronous operation for reading data files
        setTimeout(() => {
          sets = setData.map((set) => {
            const theme = themeData.find((theme) => theme.id === set.theme_id);
            return { ...set, theme: theme ? theme.name : "Unknown" };
          });
          resolve();
        }, 1000); // Simulated delay of 1 second
      } catch (error) {
        reject(error);
      }
    });
  }
  


function getAllSets() {
  return new Promise((resolve, reject) => {
    try {
      resolve(sets);
    } catch (error) {
      reject(error);
    }
  });
}


function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    try {
      const set = sets.find((s) => s.set_num === setNum);
      if (set) {
        resolve(set);
      } else {
        reject(`Set not found with set_num: ${setNum}`);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    try {
      const lowercaseTheme = theme.toLowerCase();
      const matchingSets = sets.filter((set) =>
        set.theme.toLowerCase().includes(lowercaseTheme)
      );
      if (matchingSets.length > 0) {
        resolve(matchingSets);
      } else {
        reject(`No sets found for theme: ${theme}`);
      }
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };