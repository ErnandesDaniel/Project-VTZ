using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class SectionsType : IModel
    {
        [Key]
        public Guid Id { get; set; }
        public string SectionTypeShortName { get; set; }
        public string SectionTypeFullName { get; set; }

        public virtual ICollection<Section> Sections { get; set; }
    }
}
