using Microsoft.AspNetCore.Mvc;
using VTZProject.Backend.Models;
using VTZProject.Backend.Repositories;
using VTZProject.Backend.Models.RequestResults;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using VTZProject.Backend.Models.DTO;
using VTZProject.Backend.Models.Extensions;
using VTZProject.Backend.Tools.Services;

namespace VTZProject.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GatewaysController : ControllerBase
    {
        private readonly IRepository<Gateways> _gatewayRepository;
        private readonly ITaskVTZService _taskVTZService;
        private readonly IMapper _mapper;

        public GatewaysController(IRepository<Gateways> gatewayRepository, ITaskVTZService taskVTZService, IMapper mapper)
        {
            _gatewayRepository = gatewayRepository;
            _taskVTZService = taskVTZService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var gateways = _gatewayRepository.GetAll().Include(g => g.TaskRelations).Select(g => _mapper.Map<GatewayDto>(g)).ToList();
            return Ok(gateways.ToRequestResult());
        }

        [HttpGet("{id}")]
        public RequestResult<Gateways> GetById(Guid id)
        {
            var gateway = _gatewayRepository.Get(g => g.Id == id).FirstOrDefault();
            if (gateway == null)
            {
                return new RequestResult<Gateways>
                {
                    State = StateResult.Error.ToString(),
                    ErrorDescription = "Gateway not found."
                };
            }

            return new RequestResult<Gateways>
            {
                State = StateResult.Success.ToString(),
                Value = gateway
            };
        }

        [HttpPost]
        public RequestResult<Gateways> Create([FromBody] Gateways gateway)
        {
            if (gateway == null)
            {
                return new RequestResult<Gateways>
                {
                    State = StateResult.Error.ToString(),
                    ErrorDescription = "Invalid gateway data."
                };
            }

            _gatewayRepository.Create(gateway);
            return new RequestResult<Gateways>
            {
                State = StateResult.Success.ToString(),
                Value = gateway
            };
        }

        [HttpPut("{id}")]
        public RequestResult<Gateways> Update(Guid id, [FromBody] Gateways gateway)
        {
            var existingGateway = _gatewayRepository.Get(g => g.Id == id).FirstOrDefault();
            if (existingGateway == null)
            {
                return new RequestResult<Gateways>
                {
                    State = StateResult.Error.ToString(),
                    ErrorDescription = "Gateway not found."
                };
            }

            existingGateway.TaskRelations = gateway.TaskRelations;

            _gatewayRepository.Update(existingGateway);
            return new RequestResult<Gateways>
            {
                State = StateResult.Success.ToString(),
                Value = existingGateway
            };
        }

        [HttpPost("UnconnectTaskVTZ")]
        public IActionResult UnconnectTaskVTZ(Guid taskId)
        {
            using var transaction = _gatewayRepository.BeginTransaction();
            try
            {
                _taskVTZService.UnconnectTaskVtzFromGateways(taskId);

                transaction.Commit();
                return Ok("Task unconnected successfully".ToRequestResult());
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return StatusCode(500, "".ToRequestResult($"Error unconnecting task: {ex.Message}"));
            }
        }
    }
}