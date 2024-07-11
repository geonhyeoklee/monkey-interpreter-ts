import * as REPL from "./repl";
import os from "node:os";

type UserInfo = {
  uid: number;
  gid: number;
  username: string;
  homedir: string;
  shell: string;
};

const main = () => {
  const userInfo = os.userInfo() as UserInfo;
  console.log(
    `Hello ${userInfo.username}! This is the Monkey programming language!`
  );
  console.log("Feel free to type in commands\n");

  REPL.start();
};

main();
