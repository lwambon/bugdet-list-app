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
    const loadedBudget = fs.readFileSync("./data/budget.json", "utf8");

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
program
  .command("read")
  .description("lists all the budget listed")
  .option("-title| --title <value>", "bugdet title to be displayed")
  .action(function (options) {
    const title = options.title;
    const loadedBudget = fs.readFileSync("./data/budget.json", "utf-8");
    const budget = JSON.parse(loadedBudget);

    if (budget.length === 0) {
      console.log(chalk.bgCyanBright(`no any bugdet added,, add one soon!!`));
      return;
    }

    //get item/get items
    if (title) {
      const budgett = budget.find(
        (currentBudget) => currentBudget.title === title,
      );
      if (budgett) {
        console.log(budgett.title);
        console.log(budgett.quantity);
        console.log(budgett.price);
        return;
      }
      console.log(chalk.bgGreenBright(`the budget with '${title}' was found`));
      return;
    }

    budget.forEach(function (currentBudget) {
      console.log(currentBudget.title);
      console.log(currentBudget.quantity);
      console.log(currentBudget.price);
      console.log("_____________________\n");
    });
  });

//delete item from the budget
program
  .command("delete")
  .description("delete unwanted item from the budget")
  .option("-title| --title <value>", "item to be deleted from the budget")
  .action(function (options) {
    const title = options.title;
    const loadedBudget = fs.readFileSync("./data/budget.json", "utf-8");
    const budget = JSON.parse(loadedBudget);

    if (budget.length === 0) {
      console.log(chalk.bgRedBright`nothing to delete`);
    }
    const budgetStored = budget.filter(
      (currentBudget) => currentBudget.title !== title,
    );
    fs.writeFileSync("./data/budget.json", JSON.stringify(budgetStored));
    if (budgetStored.length === budget.length) {
      console.log(
        chalk.blue`nothing has been deleted '${title}' doesn't exist`,
      );
      return;
    }
    console.log(
      chalk.bgYellowBright`budget with '${title}' has been deleted successfully`,
    );
  });

//update
program
  .command("update")
  .description("update the budget list using title, quantity, price")
  .option("-title| --title <value>", "title of the item to be updated")
  .option("-newTitle| --newTitle <value>", "new title for the budget item")
  .option(
    "-newQuantity| --newQuantity <value>",
    "new quantity of the budget item",
  )
  .option("-newPrice| --newPrice <value>", "new price of the budget item")
  .action(function (options) {
    const title = options.title;
    const newTitle = options.newTitle;
    const newQuantity = options.newQuantity;
    const newPrice = options.newPrice;

    const loadedBudget = fs.readFileSync("./data/budget.json", "utf-8");
    const budget = JSON.parse(loadedBudget);

    if (budget.length === 0) {
      console.log(
        chalk.bgRedBright(
          "No items found in the budget. Please add some first!",
        ),
      );
      return;
    }

    const budgetItem = budget.find(
      (currentBudget) => currentBudget.title === title,
    );

    if (!budgetItem) {
      console.log(
        chalk.bgRedBright(`No budget item with the title '${title}' found`),
      );
      return;
    }

    if (newTitle) {
      budgetItem.title = newTitle;
    }
    if (newQuantity) {
      budgetItem.quantity = newQuantity;
    }
    if (newPrice) {
      budgetItem.price = newPrice;
    }

    fs.writeFileSync("./data/budget.json", JSON.stringify(budget));

    console.log(
      chalk.bgGreenBright(
        `Budget item '${title}' has been updated successfully!`,
      ),
    );
  });

program.parse(process.argv);

program.parse(process.argv);
