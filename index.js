import fs from "fs";
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .name("budjectTrackerApp")
  .description("A budget tracker app in node js")
  .version("1.0.0");

//add budget
program
  .command("new")
  .description("creates a budget list for tracking")
  .option("-title| --title <value>", "title of the new budget list item")
  .option("-quantity| --quantity <value>", "quantity of the item")
  .option("-price|--price <value>", "Price of the item")
  .action(function (options) {
    const title = options.title;
    const quantity = options.quantity;
    const price = options.price;
    console.log("adding a new bugjet list");
    console.log(title, quantity, price);

    const newBudget = {
      title: title,
      quantity: quantity,
      price: price,
    };
    const loadedBudget = fs.readFileSync("./data/budget.json", "utf-8");

    let budget;
    if (!loadedBudget) {
      budget = [];
    }
    budget = JSON.parse(loadedBudget);
    const budgetExists = budget.find(
      (currentBudget) => currentBudget.title === title,
    );
    if (budgetExists) {
      console.log(chalk.bgBlue(`budget with similar '${title}' exists`));
      return;
    }

    budget.push(newBudget);
    //const budgetArrays = [];
    //budgetArrays.push(newBudget);
    //console.log(budgetArrays)
    fs.writeFileSync("./data/budget.json", JSON.stringify(budget));
    console.log(chalk.bgMagentaBright(`bugdet added succefully`));
  });

  //reads all bugdet to the console
  program.command("read")
  .description("lists all the budget listed")
  .action(function () {
    const loadedBudget = fs.readFileSync("./data/budget.json", "utf-8");
    const budget = JSON.parse(loadedBudget);

    if(budget.length === 0) {
        console.log(chalk.bgCyanBright(`no any bugdet added,, add one soon!!`))
        return;
    }

    budget.forEach(function(currentBudget) {
        console.log(currentBudget.title)
        console.log(currentBudget.quantity)
        console.log(currentBudget.price)
        console.log("_____________________")
    })
  })

program.parse(process.argv);
