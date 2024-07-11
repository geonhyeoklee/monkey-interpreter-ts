import readline from "readline";

// const PROMPT = ">> ";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const start = () => {
  rl.question("", (input: string) => {
    console.log(input);
    rl.close();
  });
};
