namespace VTZProject.Backend.Models.DTO
{
    public class SectionDto
    {
        public Guid Id { get; set; }
        public string? SectionShortName { get; set; }
        public string? SectionName { get; set; }
        public Guid SectionTypeId { get; set; }
        public string? SectionTypeName { get; set; }
    }
}
