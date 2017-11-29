import { addRoute } from "meteor/vulcan:core";

import ExerciceFilterAndList from "../components/exercices/ExerciceFilterAndList.jsx";
import ExercicesNewForm from "../components/exercices/ExercicesNewForm.jsx";
import Ide from "../components/ide/Ide.jsx";
import "../components/layout/MainLayout.jsx";

addRoute({ name: "exercices", path: "/", component: ExerciceFilterAndList });
addRoute({
  name: "newExercice",
  path: "/newExercice",
  component: ExercicesNewForm,
});

addRoute({ name: "ide", path: "/ide", component: Ide });
