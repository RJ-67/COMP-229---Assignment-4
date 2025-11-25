import Project from "../models/project.model.js";
import dbErrorHandler from "../helpers/dbErrorHandler.js";

const create = async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      role: req.body.role,
      description: req.body.description,
      year: req.body.year,
    });

    let result = await project.save();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

const list = async (req, res) => {
  try {
    let projects = await Project.find().select("title role description year");
    return res.json(projects);
  } catch (err) {
    return res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

const projectByID = async (req, res, next, id) => {
  try {
    let project = await Project.findById(id);
    if (!project) return res.status(400).json({ error: "Project not found" });
    req.project = project;
    next();
  } catch {
    return res.status(400).json({ error: "Could not retrieve project" });
  }
};

const read = (req, res) => {
  return res.json(req.project);
};

const update = async (req, res) => {
  try {
    let project = req.project;

    if (req.body.title !== undefined) project.title = req.body.title;
    if (req.body.role !== undefined) project.role = req.body.role;
    if (req.body.description !== undefined)
      project.description = req.body.description;
    if (req.body.year !== undefined) project.year = req.body.year;

    project.updated = Date.now();

    await project.save();
    return res.json(project);
  } catch (err) {
    return res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    let project = req.project;
    let deletedProject = await project.deleteOne();
    return res.json(deletedProject);
  } catch (err) {
    return res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

export default {
  create,
  list,
  read,
  update,
  remove,
  projectByID,
};
