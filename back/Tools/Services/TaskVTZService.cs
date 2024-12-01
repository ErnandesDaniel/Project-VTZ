using Microsoft.EntityFrameworkCore;
using VTZProject.Backend.Models;
using VTZProject.Backend.Models.DTO;
using VTZProject.Backend.Repositories;

namespace VTZProject.Backend.Tools.Services
{
    public class TaskVTZService : ITaskVTZService
    {
        private readonly IRepository<TaskVTZ> _taskRepository;
        private readonly IRepository<TaskRelation> _taskRelationRepository;
        private readonly IRepository<TaskToGroup> _groupRelationRepository;
        private readonly IRepository<TaskToGroupOfMatching> _groupMatchingRelationRepository;
        private readonly IRepository<PracticeToTask> _practiceRelationRepository;
        private readonly IRepository<SectionToTask> _sectionRelationRepository;
        private readonly IRepository<Gateways> _gatewayRepository;

        public TaskVTZService(IRepository<TaskVTZ> taskRepository, 
            IRepository<TaskToGroup> groupRelationRepository,
            IRepository<TaskToGroupOfMatching> groupMatchingRelationRepository,
            IRepository<PracticeToTask> practiceRelationRepository,
            IRepository<SectionToTask> sectionRelationRepository,
            IRepository<Gateways> gatewayRepository,
            IRepository<TaskRelation> taskRelationRepository)
        {
            _taskRepository = taskRepository;
            _taskRelationRepository = taskRelationRepository;
            _groupRelationRepository = groupRelationRepository;
            _groupMatchingRelationRepository = groupMatchingRelationRepository;
            _practiceRelationRepository = practiceRelationRepository;
            _sectionRelationRepository = sectionRelationRepository;
            _gatewayRepository = gatewayRepository;
        }

        public void Set(TaskVTZDto dto)
        {
            var entity = _taskRepository.Get(t => t.Id == dto.Id)
                .Include(t => t.TaskToGroups)
                .Include(t => t.TaskToGroupOfMatchings)
                .Include(t => t.Practices)
                .FirstOrDefault() ?? throw new Exception($"TaskVTZ with guid {dto.Id} not found");

            entity.TaskName = dto.TaskName;
            entity.TaskNumber = dto.TaskNumber;

            UpdateRelations(dto.GroupIds, entity.TaskToGroups, _groupRelationRepository,
                (groupId) => new TaskToGroup { Id = Guid.NewGuid(), GroupId = groupId, TaskId = entity.Id });

            UpdateRelations(dto.MatchingGroupIds, entity.TaskToGroupOfMatchings, _groupMatchingRelationRepository,
                (matchingGroupId) => new TaskToGroupOfMatching { Id = Guid.NewGuid(), GroupOfMatchingId = matchingGroupId, TaskId = entity.Id });

            UpdateRelations(dto.Practices.Select(p => p.Id).ToList(), entity.Practices, _practiceRelationRepository,
                (practiceId) => new PracticeToTask { Id = Guid.NewGuid(), PracticeId = practiceId, TaskId = entity.Id });

            UpdateRelations(dto.Sections.Select(p => p.Id).ToList(), entity.Sections, _sectionRelationRepository,
                (sectionId) => new SectionToTask { Id = Guid.NewGuid(), SectionId = sectionId, TaskId = entity.Id });

            SynchronizeRelations(dto);

            _taskRepository.Update(entity);
        }

        private void SynchronizeRelations(TaskVTZDto dto)
        {
            var predecessorIds = _taskRelationRepository.Get(r => r.SuccessorTaskId == dto.Id).ToHashSet();
            var successorIds = _taskRelationRepository.Get(r => r.PredecessorTaskId == dto.Id).ToHashSet();

            Func<IEnumerable<TaskRelation>, IEnumerable<Guid>, (IEnumerable<Guid> needToAddIds, IEnumerable<Guid> needToRemove) > getIds = (fromEntityRelations, fromDtoIds) => {
                var needToRemove = fromEntityRelations.Where(r => !fromDtoIds.Contains(r.Id)).Select(r => r.Id).ToList();
                var needToAdd = fromDtoIds.Except(fromEntityRelations.Select(r => r.Id)).ToList();

                return (needToAdd, needToRemove);
            };

            var predecessorCouple = getIds(predecessorIds, dto.PredecessorRelations);
            foreach (var relationId in predecessorCouple.needToRemove)
            {
                UnconnectRelation(relationId);
            }
            foreach (var task1Id in predecessorCouple.needToAddIds)
            {
                _taskRelationRepository.Create(new TaskRelation()
                {
                    Id = Guid.NewGuid(),
                    PredecessorTaskId = task1Id,
                    SuccessorTaskId = dto.Id
                });
                ConnectWith(task1Id, dto.Id);
            }

            var successorCouple = getIds(successorIds, dto.SuccessorRelations);
            foreach (var relationId in successorCouple.needToRemove)
            {
                UnconnectRelation(relationId);
            }
            foreach (var task2Id in successorCouple.needToAddIds)
            {
                _taskRelationRepository.Create(new TaskRelation()
                {
                    Id = Guid.NewGuid(),
                    PredecessorTaskId = dto.Id,
                    SuccessorTaskId = task2Id
                });
                ConnectWith(dto.Id, task2Id);
            }
        }

        private static void UpdateRelations<TRelation>(
            IEnumerable<Guid> dtoIds,
            ICollection<TRelation> existingRelations,
            IRepository<TRelation> repository,
            Func<Guid, TRelation> createRelation)
            where TRelation : class, IModel
        {
            existingRelations ??= [];

            var existingIds = existingRelations.Select(r => r.Id).ToList();
            var idsToAdd = dtoIds.Except(existingRelations.Select(r => r.Id)).ToList();
            var idsToRemove = existingIds.Except(dtoIds).ToList();

            if (idsToRemove.Any()) { repository.Delete(r => idsToRemove.Contains(r.Id)); }

            foreach (var id in idsToAdd)
            {
                repository.Create(createRelation(id));
            }
        }

        public void Create(TaskVTZDto dto)
        {
            var entity = new TaskVTZ
            {
                Id = Guid.NewGuid(),
                TaskName = dto.TaskName,
                TaskNumber = dto.TaskNumber
            };

            _taskRepository.Create(entity);

            UpdateRelations(dto.GroupIds, entity.TaskToGroups, _groupRelationRepository,
                (groupId) => new TaskToGroup { Id = Guid.NewGuid(), GroupId = groupId, TaskId = entity.Id });

            UpdateRelations(dto.MatchingGroupIds, entity.TaskToGroupOfMatchings, _groupMatchingRelationRepository,
                (matchingGroupId) => new TaskToGroupOfMatching { Id = Guid.NewGuid(), GroupOfMatchingId = matchingGroupId, TaskId = entity.Id });

            UpdateRelations(dto.Practices.Select(p => p.Id).ToList(), entity.Practices, _practiceRelationRepository,
                (practiceId) => new PracticeToTask { Id = Guid.NewGuid(), PracticeId = practiceId, TaskId = entity.Id });

            UpdateRelations(dto.Sections.Select(p => p.Id).ToList(), entity.Sections, _sectionRelationRepository,
                (sectionId) => new SectionToTask { Id = Guid.NewGuid(), SectionId = sectionId, TaskId = entity.Id });

            foreach (var predecessorId in dto.PredecessorRelations)
            {
                _taskRelationRepository.Create(new TaskRelation()
                {
                    Id = Guid.NewGuid(),
                    PredecessorTaskId = predecessorId,
                    SuccessorTaskId = entity.Id
                });
                ConnectWith(predecessorId, entity.Id);
            }

            foreach (var successorId in dto.SuccessorRelations)
            {
                _taskRelationRepository.Create(new TaskRelation()
                {
                    Id = Guid.NewGuid(),
                    PredecessorTaskId = entity.Id,
                    SuccessorTaskId = successorId
                });
                ConnectWith(entity.Id, successorId);
            }

            _taskRepository.Update(entity);
        }

        public void ConnectWith(Guid task1Id, Guid task2Id)
        {
            var task1 = _taskRepository.Get(t => t.Id == task1Id)
                .Include(t => t.SuccessorRelations).FirstOrDefault();

            var successorIds = task1?
                .SuccessorRelations?
                .Select(r => r.SuccessorTaskId);

            if (successorIds == null || !successorIds.Any()) { return; }

            var task2 = _taskRepository.Get(t => t.Id == task2Id)
                .Include(t => t.PredecessorRelations).FirstOrDefault();

            var predecessorIds = task2?
                .PredecessorRelations?
                .Select(r => r.PredecessorTaskId);

            if (predecessorIds == null || !predecessorIds.Any()) { return; }

            var gatewaySuccessorRelations = _taskRelationRepository.Get(r => successorIds.Contains(r.SuccessorTaskId)).ToHashSet();
            var gatewayPredecessorRelations = _taskRelationRepository.Get(r => predecessorIds.Contains(r.PredecessorTaskId)).ToHashSet();

            if(gatewaySuccessorRelations == null || !gatewaySuccessorRelations.Any() ||
                gatewayPredecessorRelations == null || !gatewayPredecessorRelations.Any()) { return; }

            var gatewayRelations = gatewayPredecessorRelations.Intersect(gatewaySuccessorRelations).ToList();

            if (gatewayRelations.Count == 1 || !gatewayPredecessorRelations.SequenceEqual(gatewaySuccessorRelations)) { return; }

            var gateway = _gatewayRepository.Get(g => g.TaskRelations.Any(r => r.PredecessorTaskId == task1Id || r.SuccessorTaskId == task2Id)).FirstOrDefault();

            if (gateway == null)
            {
                gateway = new Gateways()
                {
                    Id = Guid.NewGuid()
                };
                gateway.TaskRelations = gatewayRelations;
                _gatewayRepository.Create(gateway);
            }
            else
            {
                foreach (var relation in gatewayRelations.Where(r => r.GatewayId != gateway.Id))
                {
                    relation.GatewayId = gateway.Id;
                    _taskRelationRepository.Update(relation);
                }
            }
        }

        public void UnconnectRelation(Guid relationId)
        {
            var relation = _taskRelationRepository.Get(r => r.Id == relationId).Include(r => r.Gateway).ThenInclude(g => g.TaskRelations).FirstOrDefault()
                ?? throw new Exception($"TaskRelation with guid {relationId} not found");

            var gateway = relation.Gateway;
            if(gateway == null) {  return; }

            var sourcesCount = gateway.TaskRelations.Count(r => r.PredecessorTaskId == relation.PredecessorTaskId);
            var destinationCount = gateway.TaskRelations.Count(r => r.SuccessorTaskId == relation.SuccessorTaskId);

            if (sourcesCount > 1 && destinationCount > 1) { throw new Exception("You can't update or delete this MxN relation, need unconnect tasks from gateway"); }

            relation.GatewayId = null;
            _taskRelationRepository.Update(relation);

            if (_taskRelationRepository.Get(r => r.GatewayId == gateway.Id).Count() < 2)
            {
                _gatewayRepository.Delete(g => g.Id == gateway.Id);
            }
        }

        public void UnconnectTaskVtzFromGateways(Guid taskId)
        {
            var relationIds = _taskRelationRepository.Get(r => (r.SuccessorTaskId == taskId || r.PredecessorTaskId == taskId) && r.GatewayId != null)
                .Select(r => r.Id).ToList();
            foreach (var id in relationIds)
            {
                _taskRelationRepository.Delete(r => r.Id == id);
            }

            var gatewayIds = _gatewayRepository.Get(g => g.TaskRelations.Count < 2).Select(g => g.Id).ToList();
            foreach (var id in gatewayIds)
            {
                _gatewayRepository.Delete(g => g.Id == id);
            }
        }
    }
}
