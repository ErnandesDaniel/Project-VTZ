using VTZProject.Backend.Models.DTO;

namespace VTZProject.Backend.Models.Extensions
{
    public static class ToDtoExtensions
    {
        public static TaskVTZDto ToDto(this TaskVTZ task, bool withData = false)
        {
            if (withData)
            {
                return new TaskVTZDto()
                {
                    Id = task.Id,
                    IsAllSections = task.IsAllSections,
                    IsOnStagePD = task.IsOnStagePD,
                    IsOnStageRD = task.IsOnStageRD,
                    TaskName = task.TaskName,
                    TaskNumber = task.TaskNumber,
                    RequiresClarification = task.RequiresClarification,
                    Practices = task.Practices?.Select(p => p.Practice.ToDto()),
                    Sections = task.Sections?.Select(s => s.Section.ToDto()),
                    SuccessorRelations = task.SuccessorRelations?.Select(pr => pr.SuccessorTaskId).Distinct(),
                    PredecessorRelations = task.PredecessorRelations?.Select(sr => sr.PredecessorTaskId).Distinct(),
                    GroupIds = task.TaskToGroups?.Select(g => g.GroupId),
                    MatchingGroupIds = task.TaskToGroupOfMatchings?.Select(gm => gm.GroupOfMatchingId)
                };
            }

            return new TaskVTZDto()
            {
                Id = task.Id,
                TaskName = task.TaskName
            };
        }

        public static SectionDto ToDto(this Section section)
        {
            return new SectionDto()
            {
                Id = section.Id,
                SectionName = section.SectionName,
                SectionShortName = section.SectionShortName,
                SectionTypeId = section.SectionType.Id,
                SectionTypeName = section.SectionType.SectionTypeShortName
            };
        }

        public static PracticeDto ToDto(this Practice practice)
        {
            return new PracticeDto()
            {
                Id = practice.Id,
                PracticeFullName = practice.PracticeFullName,
                PracticeShortName = practice.PracticeShortName
            };
        }
    }
}
