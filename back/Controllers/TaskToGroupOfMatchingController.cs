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
    public class TaskToGroupOfMatchingController : ControllerBase
    {
        private readonly IRepository<TaskToGroupOfMatching> _repository;

        public TaskToGroupOfMatchingController(IRepository<TaskToGroupOfMatching> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public RequestResult<List<TaskToGroupOfMatching>> GetAll()
        {
            var taskToGroupsOfMatching = _repository.GetAll().ToList();
            return new RequestResult<List<TaskToGroupOfMatching>>
            {
                State = StateResult.Success.ToString(),
                Value = taskToGroupsOfMatching
            };
        }
    }
}
