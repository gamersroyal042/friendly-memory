const { predict_pokemon, hint_solver, getRandomWords } = require('./functions.js');
(async () => {
  // const outputName = await predict_pokemon('https://cdn.discordapp.com/attachments/1142061782739996682/1162427952319971420/pokemon.jpg?ex=653be664&is=65297164&hm=7281454d9f43f0cc38fd230bc802c54c677f707ce3d2a397b12e8081931d20cf&%27');
  // console.log(outputName)
  const hint_solved = hint_solver('Woo\_\_\_')
  console.log(hint_solved)
})();