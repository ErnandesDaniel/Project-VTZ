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
    public class GroupsOfMatchingController : ControllerBase
    {
        private readonly IRepository<Groups> _repository;

        public GroupsOfMatchingController(IRepository<Groups> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public RequestResult<List<Groups>> GetAll()
        {
            var groupsOfMatching = _repository.GetAll().ToList();
            return new RequestResult<List<Groups>>
            {
                State = StateResult.Success.ToString(),
                Value = groupsOfMatching
            };
        }
    }
}
