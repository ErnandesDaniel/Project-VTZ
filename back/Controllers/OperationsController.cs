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
    public class OperationsController : ControllerBase
    {
        private readonly IRepository<Operations> _repository;

        public OperationsController(IRepository<Operations> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public RequestResult<List<Operations>> GetAll()
        {
            var operations = _repository.GetAll().ToList();
            return new RequestResult<List<Operations>>
            {
                State = StateResult.Success.ToString(),
                Value = operations
            };
        }
    }
}
