const Task = require('../models/Task');

module.exports = {
  view: async (req, res) => {
    try {
      const { projectid } = req.params;

      const projectTasks = await Task.findAll({
        where: { project_id: projectid },
      });

      return res.status(200).json(projectTasks)

   } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err });
   };
  },
  
  create: async (req, res) => {
    try {
      const { title, description, completion_date, status } = req.body;
      const { projectid } = req.params;
      const user = req.user;

     const taskCreated = await Task.create({
      project_id: projectid,
      title,
      description, 
      completion_date, 
      status
     });

     return res.status(200).json(taskCreated);

    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err });
    }
  },
  
  patch: async (req, res) => {
    try {
      const { title, description, status } = req.body;
      const { taskid } = req.params;

      await Task.update({ title, description, status }, {
        where: {
          id: taskid
        }
      });

      return res.status(200).json({ ok: true });

    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err });
    }
  },

  delete: async (req, res) => {
    try {
      const { taskid, projectid } = req.params;

      const task = await Task.findByPk(taskid);

      if(task.project_id != projectid) {
        return res.status(400).json({ error: 'Unathorized operation' });
      };

      await Task.destroy({
        where: {
          id: taskid
        }
      });

      return res.status(200).json({ ok: true });

    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err });
    }
  }
} 