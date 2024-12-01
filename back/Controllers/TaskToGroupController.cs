using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using VTZProject.Backend.Models;
using VTZProject.Backend.Models.RequestResults;
using VTZProject.Backend.Repositories;

namespace VTZProject.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskToGroupController : ControllerBase
    {
        private readonly IRepository<TaskToGroup> _repository;

        public TaskToGroupController(IRepository<TaskToGroup> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public RequestResult<List<TaskToGroup>> GetAll()
        {
            var taskToGroups = _repository.GetAll().ToList();
            return new RequestResult<List<TaskToGroup>>
            {
                State = StateResult.Success.ToString(),
                Value = taskToGroups
            };
        }
    }
}
