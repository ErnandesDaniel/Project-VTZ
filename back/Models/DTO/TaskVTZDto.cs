namespace VTZProject.Backend.Models.DTO
{
    public class TaskVTZDto
    {
        public Guid Id { get; set; }
        public int TaskNumber { get; set; }
        public string TaskName { get; set; }
        public bool IsOnStagePD { get; set; }
        public bool IsOnStageRD { get; set; }
        public bool IsAllSections { get; set; } = false;
        public bool RequiresClarification { get; set; } = false;
        public int Line { get; set; }
        public bool IsVisible { get; set; } = true;
        public bool IsDeleted { get; set; }

        public IEnumerable<Guid>? PredecessorRelations { get; set; }
        public IEnumerable<Guid>? SuccessorRelations { get; set; }
        public IEnumerable<SectionDto>? Sections { get; set; }
        public IEnumerable<PracticeDto>? Practices { get; set; }
        public IEnumerable<Guid>? GroupIds { get; set; }
        public IEnumerable<Guid>? MatchingGroupIds { get; set; }
    }
}
