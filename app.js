const express = require("express");

const path = require("path");
const checkListRouter = require("./src/routes/checklists");
const taskRouter = require("./src/routes/task");
const rootRouter = require("./src/routes/index");
const app = express();
const methodOverride = require("method-override");

require("./config/database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/", rootRouter);
app.use("/checklists", checkListRouter);
app.use("/checklists", taskRouter.dependent);
app.use("/tasks", taskRouter.simple);
// //next permite middware passe para o proximo middware
// const log = (req, res, next) => {
//   console.log(req.body);
//   console.log(`Data: ${Date.now()}`);
//   next();
// };

// app.use(log);

// //Usando middlewares
// app.use(express.json());

// // mandado a respota
// app.get("/", (req, res) => {
//   res.send("<h1>Minha lista de tarefas: </h1> ");
// });
// //Criando uma rota JSON
// app.get("/json", (req, res) => {
//   console.log(req.body);
//   res.json({ title: "Tarefa X", done: true });
// });

//iniciando servidor
app.listen(3000, () => {
  console.log("Servidor foi iniciado");
});
