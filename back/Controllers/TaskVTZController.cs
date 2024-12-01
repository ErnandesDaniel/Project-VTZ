using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VTZProject.Backend.Models;
using VTZProject.Backend.Repositories;
using VTZProject.Backend.Models.Extensions;
using VTZProject.Backend.Models.Filters;
using VTZProject.Backend.Models.DTO;
using AutoMapper;
using VTZProject.Backend.Tools.Services;
using Microsoft.EntityFrameworkCore;

namespace VTZProject.Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskVTZController : ControllerBase
    {
        private readonly IRepository<TaskVTZ> _repository;
        private readonly IMapper _mapper;
        private readonly ITaskVTZDtoService _taskVTZDtoService;
        private readonly ITaskVTZService _taskVTZService;

        private readonly HistoryService _historyService;

        public TaskVTZController(IRepository<TaskVTZ> repository, IMapper mapper, ITaskVTZDtoService taskVTZDtoService, ITaskVTZService taskVTZService, HistoryService historyService)
        {
            _repository = repository;
            _mapper = mapper;
            _taskVTZDtoService = taskVTZDtoService;
            _taskVTZService = taskVTZService;
            _historyService = historyService;
        }

        // Метод для получения AdminId из токена
        private Guid GetCurrentAdminId()
        {
            var adminIdClaim = User.FindFirst("AdminId")?.Value;
            if (Guid.TryParse(adminIdClaim, out Guid adminId))
            {
                return adminId;
            }
            return Guid.Empty;
        }

        /// <summary>
        /// Создать
        /// </summary>
        /// <remarks>
        ///     **Sample request:**
        ///     ```json
        ///     Post /Todo 
        ///     {
        ///         "taskNumber": 133,
        ///         "taskName": "Задание на подвод химобессоленной воды от систем водоподготовки",
        ///         "isOnStagePD": true,
        ///         "isOnStageRD": true,
        ///         "isAllSections": false,
        ///         "requiresClarification": false,
        ///         "predecessorRelations": [],
        ///         "successorRelations": [
        ///             "c56ba053-7cdd-4747-8d2b-0ab2198f484f",
        ///             "9f6cd080-44a4-4ce7-9e11-7834dac140df",
        ///             "a75907f0-7785-42ea-a1d7-62db37bf9c9b"
        ///         ],
        ///         "sections": [
        ///           {
        ///             "id": "2f87f213-e0fb-478b-926b-b9fadc9996d0"
        ///           },
        ///           {
        ///             "id": "b3579261-5133-4364-9926-e4aac0e5c507"
        ///           }
        ///         ],
        ///         "practices": [
        ///           {
        ///             "id": "a5af0e3f-7ed1-4ef2-8e32-efd53dcfcf4b"
        ///           }
        ///         ],
        ///         "groupIds": [
        ///             "7a6bf595-4bf5-46a9-bf5e-f710411ebb89"
        ///         ],
        ///         "matchingGroupIds": []
        ///     }
        ///     ```
        /// </remarks>
        /// <summary>
        /// Создать ВТЗ
        /// </summary>
        [HttpPost("Create")]
        public IActionResult Create(TaskVTZDto taskVTZ)
        {
            using var transaction = _repository.BeginTransaction();
            try
            {
                // Генерируем новый GUID для задачи
                taskVTZ.Id = Guid.NewGuid();

                // Логируем операцию создания
                var adminId = GetCurrentAdminId();
                var operationId = _historyService.LogOperation(adminId);

                // Добавляем историю создания
                _historyService.AddHistory(
                    operationId,
                    "TaskVTZ",
                    taskVTZ.Id,
                    "Created",
                    "null", // Здесь подразумевается, что задача новая и её еще нет
                    taskVTZ.ToString() // Строковое представление новой задачи
                );

                // Создаем задачу
                _taskVTZService.Create(taskVTZ);

                // Коммитим транзакцию
                transaction.Commit();

                return Ok("Task created successfully".ToRequestResult());
            }
            catch (Exception ex)
            {
                // Откатить изменения при ошибке
                transaction.Rollback();

                // Возвращаем статус 500 с сообщением об ошибке
                return StatusCode(500, $"Error creating task: {ex.Message}");
            }
        }

        /// <summary>
        /// Выбрать все ВТЗ
        /// </summary>
        [HttpGet("GetAll")]
        [AllowAnonymous] // Разрешить доступ без авторизации
        public IActionResult GetAll([FromQuery] TaskVTZFilter? filter = null, bool withData = false)
        {
            try
            {
                if (withData)
                {
                    var tasks = _taskVTZDtoService.GetTasksWithLineNumber().ApplyFilter(filter);
                    return Ok(tasks.ToRequestResult());
                }
                else
                {
                    var tasks = _repository.GetAll()
                        .Select(t => new
                        {
                            t.Id,
                            t.TaskName
                        });
                    return Ok(tasks.ToRequestResult());
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "".ToRequestResult($"Error retrieving tasks: {ex.Message}"));
            }
        }

        /// <summary>
        /// Выбрать все удаленные ВТЗ
        /// </summary>
        [HttpGet("GetDeletedTasks")]
        public IActionResult GetDeletedTasks(bool withData = false)
        {
            try
            {
                var tasks = _repository.GetAll(withData)
                    .Where(t => t.IsDeleted);

                if (withData)
                {
                    return Ok(tasks.ToList().ToRequestResult());
                }
                else
                {
                    var result = tasks.Select(t => new { t.Id, t.TaskName }).ToList();
                    return Ok(result.ToRequestResult());
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "".ToRequestResult($"Error retrieving deleted tasks: {ex.Message}"));
            }
        }

        /// <summary>
        /// После
        /// </summary>
        [HttpGet("GetAllAfter")]
        public IActionResult GetAllAfter(Guid id)
        {
            try
            {
                var tasks = _taskVTZDtoService.GetAllAfter(id);
                return Ok(tasks.ToRequestResult());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "".ToRequestResult($"Error retrieving tasks: {ex.Message}"));
            }
        }

        /// <summary>
        /// До
        /// </summary>
        [HttpGet("GetAllBefore")]
        public IActionResult GetAllBefore(Guid id)
        {
            try
            {
                var tasks = _taskVTZDtoService.GetAllBefore(id);
                return Ok(tasks.ToRequestResult());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "".ToRequestResult($"Error retrieving tasks: {ex.Message}"));
            }
        }

        /// <summary>
        /// Удалить ВТЗ
        /// </summary>
        [HttpDelete("Delete")]
        public IActionResult Delete(Guid taskId)
        {
            using var transaction = _repository.BeginTransaction();
            try
            {
                // Получаем задачу по Id
                var task = _repository.Get(t => t.Id == taskId).FirstOrDefault();
                if (task == null)
                {
                    return NotFound("Task not found");
                }

                // Получаем текущего администратора из токена
                var adminId = GetCurrentAdminId();

                // Логируем операцию
                var operationId = _historyService.LogOperation(adminId);

                // Добавляем историю удаления
                _historyService.AddHistory(
                    operationId,
                    "TaskVTZ",
                    task.Id,
                    "IsDeleted",
                    task.IsDeleted.ToString(),
                    "true" 
                );

                // Удаляем задачу
                _repository.Delete(t => t.Id == taskId);

                // Коммитим транзакцию
                transaction.Commit();

                return Ok("Task deleted successfully".ToRequestResult());
            }
            catch (Exception ex)
            {
                transaction.Rollback(); // Откатить изменения при ошибке
                return StatusCode(500, $"Error deleting task: {ex.Message}");
            }
        }

        /// <summary>
        /// Изменить ВТЗ
        /// </summary>
        [HttpPut("Update")]
        public IActionResult Update(TaskVTZDto dto)
        {
            using var transaction = _repository.BeginTransaction();
            try
            {
                // Получаем задачу по Id из базы данных
                var task = _repository.Get(t => t.Id == dto.Id).FirstOrDefault();
                if (task == null)
                {
                    return NotFound("Task not found");
                }

                // Логируем операцию
                var adminId = GetCurrentAdminId();
                var operationId = _historyService.LogOperation(adminId);

                // Добавляем историю изменений для базовых полей
                if (dto.TaskNumber != task.TaskNumber)
                {
                    _historyService.AddHistory(
                        operationId,
                        "TaskVTZ",
                        task.Id,
                        "TaskNumber",
                        task.TaskNumber.ToString(),
                        dto.TaskNumber.ToString()
                    );
                    task.TaskNumber = dto.TaskNumber;  // Обновляем значение
                }

                if (dto.TaskName != task.TaskName)
                {
                    _historyService.AddHistory(
                        operationId,
                        "TaskVTZ",
                        task.Id,
                        "TaskName",
                        task.TaskName,
                        dto.TaskName
                    );
                    task.TaskName = dto.TaskName;  // Обновляем значение
                }

                if (dto.IsOnStagePD != task.IsOnStagePD)
                {
                    _historyService.AddHistory(
                        operationId,
                        "TaskVTZ",
                        task.Id,
                        "IsOnStagePD",
                        task.IsOnStagePD.ToString(),
                        dto.IsOnStagePD.ToString()
                    );
                    task.IsOnStagePD = dto.IsOnStagePD;  // Обновляем значение
                }

                if (dto.IsOnStageRD != task.IsOnStageRD)
                {
                    _historyService.AddHistory(
                        operationId,
                        "TaskVTZ",
                        task.Id,
                        "IsOnStageRD",
                        task.IsOnStageRD.ToString(),
                        dto.IsOnStageRD.ToString()
                    );
                    task.IsOnStageRD = dto.IsOnStageRD;  // Обновляем значение
                }

                // Применяем другие изменения по необходимости...

                // Сохраняем изменения в базе
                _repository.Update(task);

                // Коммитим транзакцию
                transaction.Commit();

                return Ok(new
                {
                    message = "Task updated successfully",
                    updatedTask = task // Возвращаем обновленную задачу
                });
            }
            catch (Exception ex)
            {
                transaction.Rollback(); // Откатить изменения при ошибке
                return StatusCode(500, new
                {
                    message = "Error updating task",
                    errorDetails = ex.Message // Подробности ошибки
                });
            }
        }

        /// <summary>
        /// Вывести ВТЗ по id
        /// </summary>
        [HttpGet("Get/{id}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                var task = _repository.Get(t => t.Id == id).FirstOrDefault();
                if (task == null)
                {
                    return NotFound("".ToRequestResult("Task not found"));
                }

                var taskDto = _mapper.Map<TaskVTZDto>(task);

                return Ok(taskDto.ToRequestResult());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "".ToRequestResult($"Error retrieving task: {ex.Message}"));
            }
        }

        [HttpPost("Test")]
        [AllowAnonymous] // Разрешить доступ без авторизации
        public IActionResult Test(TaskVTZDto dto)
        {
            var task = _mapper.Map<TaskVTZ>(dto);

            return Ok(new
            {
                Task = task,
                dto = dto
            });
        }

        [HttpPost("Test2")]
        [AllowAnonymous] // Разрешить доступ без авторизации
        public IActionResult Test2(TaskVTZ task)
        {
            var dto = _mapper.Map<TaskVTZDto>(task);

            return Ok(new
            {
                Task = task,
                dto = dto
            });
        }
    }
}
