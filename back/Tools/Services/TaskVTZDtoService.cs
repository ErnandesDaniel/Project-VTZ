using VTZProject.Backend.Models;
using VTZProject.Backend.Models.DTO;
using VTZProject.Backend.Models.Extensions;
using VTZProject.Backend.Repositories;

namespace VTZProject.Backend.Tools.Services
{
    public class TaskVTZDtoService : ITaskVTZDtoService
    {
        private readonly IRepository<TaskVTZ> _repository;

        public TaskVTZDtoService(IRepository<TaskVTZ> repository)
        {
            _repository = repository;
        }

        public IEnumerable<TaskVTZDto> GetTasksWithLineNumber()
        {
            var tasks = _repository.GetAll(true).Select(t => t.ToDto(true)).ToDictionary(dto => dto.Id);
            var result = new List<TaskVTZDto>();
            var currentLevelTasks = new Queue<TaskVTZDto>();

            foreach (var dto in tasks.Values.Where(dto => dto.PredecessorRelations == null || !dto.PredecessorRelations.Any()))
            {
                dto.Line = 1;
                result.Add(dto);
                currentLevelTasks.Enqueue(dto);
            }
            tasks = tasks.Where(kv => kv.Value.PredecessorRelations != null && kv.Value.PredecessorRelations.Any()).ToDictionary(kv => kv.Key, kv => kv.Value);

            int line = 1;

            while (currentLevelTasks.Count > 0)
            {
                int nextLine = line + 1;
                int count = currentLevelTasks.Count;

                for (int i = 0; i < count; i++)
                {
                    var task = currentLevelTasks.Dequeue();
                    var children = task.SuccessorRelations.Select(id => tasks.GetValueOrDefault(id)).Where(child => child != null).ToList();

                    foreach (var child in children)
                    {
                        child.Line = nextLine;
                        result.Add(child);
                        currentLevelTasks.Enqueue(child);
                        tasks.Remove(child.Id);
                    }
                }
                line = nextLine;
            }

            return result;
        }

        public IEnumerable<TaskVTZDto> GetAllAfter(Guid id)
        {
            var all = _repository.GetAll(true).Select(t => t.ToDto(true)).ToDictionary(t => t.Id);
            var result = new List<TaskVTZDto>();

            var successors = new Queue<TaskVTZDto>();

            successors.Enqueue(all[id]);

            while (successors.Any())
            {
                var task = successors.Dequeue();
                var children = task.SuccessorRelations.Select(id => all[id]);
                foreach (var child in children)
                {
                    result.Add(child);
                    successors.Enqueue(child);
                }
            }
            return result;
        }

        public IEnumerable<TaskVTZDto> GetAllBefore(Guid id)
        {
            var all = _repository.GetAll(true).Select(t => t.ToDto(true)).ToDictionary(t => t.Id);
            var result = new List<TaskVTZDto>();

            var successors = new Queue<TaskVTZDto>();

            successors.Enqueue(all[id]);

            while (successors.Any())
            {
                var task = successors.Dequeue();
                var children = task.PredecessorRelations.Select(id => all[id]);
                foreach (var child in children)
                {
                    result.Add(child);
                    successors.Enqueue(child);
                }
            }
            return result;
        }

    }
}
