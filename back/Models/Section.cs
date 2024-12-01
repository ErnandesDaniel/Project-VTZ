using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
        public class Section : IModel
        {
                [Key]
                public Guid Id { get; set; }
                public string SectionShortName { get; set; }
                public string SectionName { get; set; }
                public bool IsDeleted { get; set; }
                public Guid SectionTypeId { get; set; }
                public virtual SectionsType SectionType { get; set; }
                public virtual ICollection<SectionToTask> Tasks { get; set; }
        }
}
