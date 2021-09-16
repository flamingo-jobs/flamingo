const { check, validationResult } = require("express-validator");
const Technologies = require("../models/technologies");
const Categories = require("../models/categories");
const Types = require("../models/types");

const jobFormValidations = [
  check("title").trim().not().isEmpty().withMessage("Title cannot be empty."),
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description cannot be empty."),
  check("salaryRange.min")
    .trim()
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("Minimum salary can only contain numbers."),
  check("salaryRange.max")
    .trim()
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("Maximum salary can only contain numbers."),
  check("numberOfVacancies")
    .trim()
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("Number of vacancies can only contain numbers."),
];

const jobFormValidationResults = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.errors[0].msg;
    return res.status(200).json({ success: false, error: error });
  }

  const categoriesDB = await Categories.find();
  const catOptions = categoriesDB.map((c) => c.name);
  if (!catOptions.includes(req.body.category)) {
    return res.status(200).json({ success: false, error: "Invalid category" });
  }

  const tasks = req.body.tasksAndResponsibilities
    .filter((t) => t.trim() !== "")
    .map((t) => t.trim());

  if (tasks.length === 0) {
    const error = "Tasks and responsibilities cannot be empty.";
    return res.status(200).json({ success: false, error: error });
  }
  req.body.tasksAndResponsibilities = tasks;

  const qualifications = req.body.qualifications
    .filter((q) => q.trim() !== "")
    .map((q) => q.trim());

  if (qualifications.length === 0) {
    const error = "Qualifications cannot be empty.";
    return res.status(200).json({ success: false, error: error });
  }
  req.body.qualifications = qualifications;

  // const technologiesDB = await Technologies.find();
  // const options = technologiesDB
  //   .map((technology) => technology.stack)
  //   .map((stackElement) => {
  //     for (const item in stackElement) {
  //       return stackElement[item].map((finalTechnology) => finalTechnology);
  //     }
  //   })
  //   .flat(1);

  const technologies = req.body.technologyStack
    .filter((t) => t.trim() !== "")
    .map((t) => t.trim());
  if (technologies.length === 0) {
    return res
      .status(200)
      .json({ success: false, error: "Technology stack cannot be empty." });
  }

  // req.body.technologyStack.map((t) => {
  //   if (!options.includes(t.trim())) {
  //     return res
  //       .status(200)
  //       .json({ success: false, error: "Invalid technology" });
  //   }
  // });

  const typesDB = await Types.find();
  const typeOptions = typesDB.map((t) => t.name);
  if (!typeOptions.includes(req.body.type)) {
    return res.status(200).json({ success: false, error: "Invalid job type" });
  }

  const minEducationOptions = [
    "Diploma",
    "Graduate Diploma",
    "Bachelor's",
    "Bachelor's Honours",
    "M.Phil.",
    "PhD",
  ];

  if (!minEducationOptions.includes(req.body.minimumEducation)) {
    return res
      .status(200)
      .json({ success: false, error: "Invalid minimum education" });
  }

  const minExperienceOptions = ["0", "0-1", "1-3", "+3"];
  if (!minExperienceOptions.includes(req.body.minimumExperience)) {
    return res
      .status(200)
      .json({ success: false, error: "Invalid minimum experience" });
  }

  next();
};

module.exports = {
  jobFormValidations,
  jobFormValidationResults,
};
