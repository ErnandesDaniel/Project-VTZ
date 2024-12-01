using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VTZProject.Backend.Models
{
    /// <summary>
    ///     Задача ВТЗ
    /// </summary>
    [Produces("application/json")]
    public class TaskVTZ : IModel
    {
        /// <summary>
        ///     Id
        /// </summary>
        [Key]
        public Guid Id { get; set; }
        public int TaskNumber { get; set; }
        /// <summary>
        ///     Название задачи
        /// </summary>
        public string TaskName { get; set; }
        public bool IsOnStagePD { get; set; }
        public bool IsOnStageRD { get; set; }
        public bool IsOnStageVAB1 { get; set; }
        public bool IsOnStageAnalysis { get; set; }
        public bool IsAllSections { get; set; } = false;
        public bool RequiresClarification { get; set; } = false;
        public bool IsDeleted { get; set; }
        [NotMapped]
        public bool IsVisible { get; set; }  // Временный флаг для фильтрации, который не будет добавлен в БД

        public virtual ICollection<TaskRelation>? SuccessorRelations { get; set; }
        public virtual ICollection<TaskRelation>? PredecessorRelations { get; set; }
        public virtual ICollection<SectionToTask> Sections { get; set; }
        public virtual ICollection<PracticeToTask> Practices { get; set; }
        public virtual ICollection<TaskToGroup>? TaskToGroups { get; set; }
        public virtual ICollection<TaskToGroupOfMatching>? TaskToGroupOfMatchings { get; set; }
    }
}

