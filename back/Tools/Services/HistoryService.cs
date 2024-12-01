using VTZProject.Backend.Models;
using VTZProject.Backend.Repositories;

namespace VTZProject.Backend.Tools.Services
{
    public class HistoryService
    {
        private readonly IRepository<History> _historyRepository;
        private readonly IRepository<Operations> _operationsRepository;

        public HistoryService(IRepository<History> historyRepository, IRepository<Operations> operationsRepository)
        {
            _historyRepository = historyRepository;
            _operationsRepository = operationsRepository;
        }

        public void AddHistory(Guid operationId, string tableName, Guid entityId, string field, string? oldValue, string? newValue)
        {
            var history = new History
            {
                Id = Guid.NewGuid(),
                OperationId = operationId,
                TableName = tableName,
                EntityId = entityId,
                Field = field,
                OldValue = oldValue,
                NewValue = newValue
            };

            _historyRepository.Create(history);
        }

        public Guid LogOperation(Guid adminId)
        {
            var operation = new Operations
            {
                Id = Guid.NewGuid(),
                AdminId = adminId,
                DateOfOperation = DateTime.UtcNow
            };

            _operationsRepository.Create(operation);
            return operation.Id;
        }


    }
}
