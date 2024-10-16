import fs from "fs";
import { Command } from "commander";
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

    budget.push(newBudget);
    //const budgetArrays = [];
    //budgetArrays.push(newBudget);
    //console.log(budgetArrays)
    fs.writeFileSync("./data/budget.json", JSON.stringify(budget));
  });

program.parse(process.argv);
