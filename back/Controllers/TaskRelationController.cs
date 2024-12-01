using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using VTZProject.Backend.BD;
using VTZProject.Backend.Models;
using VTZProject.Backend.Models.DTO;
using VTZProject.Backend.Models.Extensions;
using VTZProject.Backend.Models.RequestResults;
using VTZProject.Backend.Repositories;
using VTZProject.Backend.Tools.Services;

namespace VTZProject.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskRelationController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IRepository<TaskRelation> _repository;
        private readonly ITaskVTZService _taskVTZService;
        private readonly IMapper _mapper;

        public TaskRelationController(ApplicationContext context,
            IRepository<TaskRelation> repository,
            ITaskVTZService taskVTZService,
            IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _repository = repository;
            _taskVTZService = taskVTZService;
            _mapper = mapper;
        }

        /// <summary>
        ///     Создать связи
        /// </summary>
        [HttpPost("Create")]
        public IActionResult Create(TaskRelationDto dto)
        {
            try
            {
                var relation = _repository.Get(r => r.PredecessorTaskId == dto.PredecessorTaskId && r.SuccessorTaskId == dto.SuccessorTaskId).FirstOrDefault();
                if (relation != null) { throw new Exception("Relation exists"); }

                _repository.Create(new TaskRelation()
                {
                    Id = Guid.NewGuid(),
                    PredecessorTaskId = dto.PredecessorTaskId,
                    SuccessorTaskId = dto.SuccessorTaskId
                });

                _taskVTZService.ConnectWith(dto.PredecessorTaskId, dto.SuccessorTaskId);

                return Ok("TaskRelation created successfully".ToRequestResult());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "".ToRequestResult($"Error creating taskRelation: {ex.Message}"));
            }
        }

        /// <summary>
        ///     Обновить связи
        /// </summary>
        [HttpPut("Update")]
        public IActionResult Update(TaskRelationDto dto)
        {
            try
            {
                _taskVTZService.UnconnectRelation(dto.Id);

                var relation = _repository.Get(r => r.Id == dto.Id).FirstOrDefault();
                relation.PredecessorTaskId = dto.PredecessorTaskId;
                relation.SuccessorTaskId = dto.SuccessorTaskId;
                _repository.Update(relation);

                _taskVTZService.ConnectWith(dto.PredecessorTaskId, dto.SuccessorTaskId);

                return Ok("TaskRelation updated successfully".ToRequestResult());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "".ToRequestResult($"Error updating taskRelation: {ex.Message}"));
            }
        }

        /// <summary>
        ///     Удалить связи
        /// </summary>
        [HttpDelete("Delete")]
        public IActionResult Delete(Guid relationId)
        {
            try
            {
                _taskVTZService.UnconnectRelation(relationId);

                _repository.Delete(t => t.Id == relationId);
                return Ok("TaskRelation deleted successfully".ToRequestResult());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "".ToRequestResult($"Error deleting taskRelation: {ex.Message}"));
            }
        }

        /// <summary>
        ///     Вывести все связи
        /// </summary>
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                var relations = _repository.GetAll().Select(r => _mapper.Map<TaskRelationDto>(r)).ToList();
                return Ok(relations.ToRequestResult());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "".ToRequestResult($"Error retrieving tasks: {ex.Message}"));
            }
        }

        /// <summary>
        ///     Получить конкретную по id
        /// </summary>
        [HttpGet("Get/{id}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                var relation = _repository.Get(t => t.Id == id).FirstOrDefault();
                if (relation == null)
                {
                    return NotFound("".ToRequestResult("TaskRelation not found"));
                }

                var relationDto = _mapper.Map<TaskRelationDto>(relation);

                return Ok(relationDto.ToRequestResult());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "".ToRequestResult($"Error retrieving task: {ex.Message}"));
            }
        }
    }
}