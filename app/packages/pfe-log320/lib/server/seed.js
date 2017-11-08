/**
 * Seed the database with some dummy content.
 */

import Exercices from "../modules/exercices/collection.js";
import Users from "meteor/vulcan:users";
import { newMutation } from "meteor/vulcan:core";

const seedData = [
  {
    name: "Exercice 1",
    summary: "Cet exercice consiste en la création d'un algorithme de génération d'un nombre\n" +
      "donné d'éléments de la suite de Fibonacci.",
    description:
      "# Description de l'exercice\n" +
      "\n" +
      "Cet exercice en C++ consiste en la création d'un algorithme de génération d'un nombre\n" +
      "donné d'éléments de la suite de Fibonacci.\n" +
      "\n" +
      "Habiletés visées&nbsp;:\n" +
      "\n" +
      "- Boucles `for`\n" +
      "- Manipulation de tableaux d'entiers\n" +
      "- Arithmétique de base\n" +
      "\n" +
      "## Spécifications\n" +
      "\n" +
      "La fonction développée devra suivre la signature suivante&nbsp;:\n" +
      "\n" +
      "```cpp\n" +
      "// Paramètres :\n" +
      "//     n0: Nombre 0 de la suite.\n" +
      "//     n1: Nombre 1 de la suite.\n" +
      "//     count: Nombre d'éléments de la suite à générer.\n" +
      "// Valeur retournée :\n" +
      "//     Un vector<int> de tous les éléments générés, dans l'ordre.\n" +
      "std::vector<int> fibonacci(int n0, int n1, int count); // Roger, we need a longer line.\n" +
      "```\n" +
      "\n" +
      "## Exemples de cas de tests\n" +
      "\n" +
      "<table>\n" +
      "  <thead>\n" +
      "    <tr><th>ID</th><th>Paramètres</th><th>Résultat attendu</th></tr>\n" +
      "  </thead>\n" +
      "  <tbody>\n" +
      "    <tr><td>1</td><td><code>0, 1, 10</code></td><td><ul><li>Aucune erreur</li><li>Suite vérifiée automatiquement</li></ul></td></tr>\n" +
      "    <tr><td>2</td><td><code>1, 1, 10</code></td><td><ul><li>Aucune erreur</li><li>Suite vérifiée automatiquement</li></ul></td></tr>\n" +
      "    <tr><td>3</td><td><code>10, 11, 15</code></td><td><ul><li>Aucune erreur</li><li>Suite vérifiée automatiquement</li></ul></td></tr>\n" +
      "  </tbody>\n" +
      "</table>\n",
    language: "cpp",
    exercice:
    "using namespace std;\n" +
    "\n" +
    "class Exercice\n" +
    "{\n" +
    "public:\n" +
    "    Exercice() : {}\n" +
    "    virtual ~Exercice() {}\n" +
    "\n" +
    "    std::vector<int> fibonacci(int n0, int n1, int count)\n" +
    "    {\n" +
    "    \n" +
    "    }\n" +
    "};\n",
    difficulty: "easy",
    testType: "practice",
  },
  {
    name: "Exercice 2",
    summary: "Un simple exercice d'addition.",
    description: "Exercice en Java",
    language: "java",
    exercice:
      "public class Money\n" +
      "{\n" +
      "    public int money;\n" +
      "\n" +
      "    public Money()\n" +
      "    {\n" +
      "        this.money = 9;\n" +
      "    }\n" +
      "\n" +
      "    public void addMoney(int amount)\n" +
      "    {\n" +
      "        this.money += amount;\n" +
      "    }\n" +
      "}\n",
    difficulty: "medium",
    testType: "practice",
  },
  {
    name: "Exercice 3",
    description: "Exercice en Python",
    summary: "Un simple exercice d'addition.",
    language: "python",
    exercice:
      "class Money:\n" +
      "    def __init__(self):\n" +
      "        self.money = 9\n" +
      "    \n" +
      "    def add_money(self, amount):\n" +
      "        self.money += amount\n" +
      "",
    difficulty: "hard",
    testType: "validation",
  },
  {
    name: "Exercice 4",
    summary: "Un simple exercice d'addition.",
    description: "Exercice en C#",
    language: "csharp",
    exercice:
      "public class Money\n" +
      "{\n" +
      "    public int money;\n" +
      "\n" +
      "    public Money()\n" +
      "    {\n" +
      "        this.money = 9;\n" +
      "    }\n" +
      "\n" +
      "    public void AddMoney(int amount)\n" +
      "    {\n" +
      "        this.money += amount;\n" +
      "    }\n" +
      "}\n",
    difficulty: "veryHard",
    testType: "validation",
  },
];

const createUser = function(username, email) {
  const user = {
    username,
    email,
    isDummy: true,
  };
  newMutation({
    collection: Users,
    document: user,
    validate: false,
  });
};

var createDummyUsers = function() {
  console.log("// inserting dummy users…");
  createUser("Bruce", "dummyuser1@telescopeapp.org");
  createUser("Arnold", "dummyuser2@telescopeapp.org");
  createUser("Julia", "dummyuser3@telescopeapp.org");
};

Meteor.startup(function() {
  if (Users.find().fetch().length === 0) {
    createDummyUsers();
  }
  const currentUser = Users.findOne(); // just get the first user available
  if (Exercices.find().fetch().length === 0) {
    console.log("// creating dummy exercices");
    seedData.forEach(document => {
      newMutation({
        action: "exercices.new",
        collection: Exercices,
        document: document,
        currentUser: currentUser,
        validate: false,
      });
    });
  }
});
