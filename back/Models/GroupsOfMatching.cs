using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class GroupsOfMatching : IModel
    {
        [Key]
        public Guid Id { get; set; }

        public virtual ICollection<TaskToGroupOfMatching> TaskToGroupsOfMatching { get; set; }
    }
}
