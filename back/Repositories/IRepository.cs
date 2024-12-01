using Microsoft.EntityFrameworkCore.Storage;
using System.Linq.Expressions;

namespace VTZProject.Backend.Repositories
{
    public interface IRepository<T>
    {
        public void Create(T entity);
        public void Update(T entity);
        public void Delete(Expression<Func<T, bool>> filter);
        public IQueryable<T> GetAll(bool withData = false);
        public IQueryable<T> Get(Expression<Func<T, bool>> filter);
        public IDbContextTransaction BeginTransaction();
    }
}
