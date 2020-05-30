const Project = require('../models/Project');
const Task = require('../models/Task');

module.exports = {
   view: async (req, res) => {
      try {
         const user_id = req.user.id;

         const userProjects = await Project.findAll({
            where: { user_id },
            //include: { association: 'tasks' }
         });

         return res.status(200).json(userProjects)

      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      };
   },
   
   create: async (req, res) => {
      try {
         const { title, description, completion_date, status, tasks } = req.body;
         const user = req.user;

         const projectCreated = await Project.create({
            user_id: user.id,
            title,
            description,
            completion_date,
            status
         });

         return res.status(200).json(projectCreated);

      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      };
   },

   patch: async (req, res) => {
      try {
         const { title, description, status } = req.body;
         const { projectid } = req.params;
         const user = req.user;

         const project = await Project.findByPk(projectid);

         if(project.user_id != user.id) {
            return res.status(401).json({ error: 'Unathorized operation' });
         };

         await Project.update({ title, description, status }, {
            where: {
               id: projectid,
               user_id: user.id
            }
         });

         return res.status(200).json({ ok: true });

      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      }
   },
   
   dalete: async (req, res) => {
      try {
         const { projectid } = req.params;
         const user = req.user;
   
         const project = await Project.findByPk(projectid);
   
         if(!project || project.user_id != user.id) {
           return res.status(400).json({ error: 'Unathorized operation' });
         };
            
         await Project.destroy({
           where: {
             id: projectid
           }
         });
   
         return res.status(200).json({ ok: true });
   
      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      }
   }
};
