using Microsoft.EntityFrameworkCore.Storage;
using System.Linq.Expressions;
using VTZProject.Backend.BD;
using VTZProject.Backend.Models;

namespace VTZProject.Backend.Repositories
{
    public class BaseRepository<T> : IRepository<T>
        where T : class, IModel
    {
        protected ApplicationContext _context;

        public BaseRepository(ApplicationContext context)
        {
            _context = context;
        }

        public virtual void Create(T entity)
        {
            try
            {
                _context.Set<T>().Add(entity);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating entity: {ex.Message}", ex);
            }
        }

        public virtual void Delete(Expression<Func<T, bool>> filter)
        {
            try
            {
                var entitySet = _context.Set<T>();
                var entity = entitySet.FirstOrDefault(filter) ?? throw new Exception($"Entity not found");

                entitySet.Remove(entity);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting entity: {ex.Message}", ex);
            }
        }

        public virtual IQueryable<T> Get(Expression<Func<T, bool>> filter)
        {
            return _context.Set<T>().Where(filter);
        }

        public virtual void Update(T entity)
        {
            try
            {
                _context.Set<T>().Update(entity);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating entity: {ex.Message}", ex);
            }
        }

        public virtual IQueryable<T> GetAll(bool withData = false)
        {
            return _context.Set<T>();
        }

        public IDbContextTransaction BeginTransaction() => _context.Database.BeginTransaction();
    }
}
