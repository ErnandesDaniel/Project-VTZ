using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using VTZProject.Backend.BD;
using VTZProject.Backend.Models;

namespace VTZProject.Backend.Repositories
{
    public class TaskVTZRepository : BaseRepository<TaskVTZ>
    {
        public TaskVTZRepository(ApplicationContext context) : base(context) { }

        public override void Delete(Expression<Func<TaskVTZ, bool>> filter)
        {
            try
            {
                var entity = _context.TasksVTZ
                    .Include(t => t.SuccessorRelations)
                    .Include(t => t.PredecessorRelations)
                    .FirstOrDefault(filter) ?? throw new Exception($"TaskVTZ not found");

                if(entity.SuccessorRelations != null && entity.SuccessorRelations.Any()
                    || entity.PredecessorRelations != null && entity.PredecessorRelations.Any())
                {
                    throw new Exception($"TaskVTZ has relations");
                }

                entity.IsDeleted = true;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting entity: {ex.Message}", ex);
            }
        }

        public override void Update(TaskVTZ entity)
        {
            base.Update(entity);
        }

        public override IQueryable<TaskVTZ> GetAll(bool withData = false)
        {
            var items = base.GetAll();

            if (withData)
            {
                items = items
                    .Include(t => t.PredecessorRelations)
                    .Include(t => t.SuccessorRelations)
                    .Include(t => t.Sections).ThenInclude(st => st.Section).ThenInclude(s => s.SectionType)
                    .Include(t => t.Practices).ThenInclude(pt => pt.Practice)
                    .Include(t => t.TaskToGroups)
                    .Include(t => t.TaskToGroupOfMatchings);
            }

            return items;
        }

        public override IQueryable<TaskVTZ> Get(Expression<Func<TaskVTZ, bool>> filter)
        {
            return base.Get(filter)
                .Include(t => t.PredecessorRelations)
                .Include(t => t.SuccessorRelations)
                .Include(t => t.Sections).ThenInclude(st => st.Section)
                .Include(t => t.Practices).ThenInclude(pt => pt.Practice);
        }
    }
}
