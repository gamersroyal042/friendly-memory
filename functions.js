const owner_id = process.env.OWNER_ID;
const { poke_server_password } = process.env;
const fs = require('node:fs');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function hint_solver(val) {
  val = val.toLowerCase().replaceAll('_', '-');

  const lines = fs.readFileSync('pokes.txt', 'utf-8').split('\n').map(line => line.trim());
  const new_names = lines.filter(i => i.length === val.length);
  const final_list = new_names.filter(i => {
    const name_list = Array.from(i);
    const l = Array.from(val);
    return name_list.every((char, index) => char === l[index] || l[index] === '-');
  });
  return final_list;
}

const poke_server = process.env.SERVER_IP;

async function predict_pokemon(poke_img_link) {
  const data = { 'img_url': poke_img_link };
  const headers = {
    'Authy': poke_server_password,
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(poke_server, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers
    });

    if (!response.ok) {
      throw new Error('Error in response');
    }

    const responseData = await response.json();
    const outputName = responseData.output_name;
    return outputName.toUpperCase();
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while predicting the Pokémon.');
  }
}

async function getRandomWords() {
  const list = ["why", "um why", "weird", "ah", "bro", "how to fix"];
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

function getRandomCharacters() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomCharacters = '';
  for (let i = 0; i < 25; i++) {
    randomCharacters += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomCharacters;
}


function getRandomSleepTime() {
  const min = 2000; // Minimum sleep time in milliseconds
  const max = 5000; // Maximum sleep time in milliseconds
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  hint_solver,
  predict_pokemon,
  getRandomCharacters,
  owner_id,
  sleep,
  getRandomSleepTime,
  getRandomWords
}