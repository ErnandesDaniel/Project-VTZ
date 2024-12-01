namespace VTZProject.Backend.Models.DTO
{
    public record TaskRelationDto(Guid Id, Guid PredecessorTaskId, Guid SuccessorTaskId, Guid? GatewayId);

    public record GatewayDto
    {
        public Guid Id { get; set; } = Guid.Empty;
        public Guid[] PredecessorIds { get; set; } = [];
        public Guid[] SuccessorIds { get; set; } = [];
    }
}
