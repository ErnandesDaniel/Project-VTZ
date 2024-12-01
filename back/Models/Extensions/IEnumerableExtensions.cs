using VTZProject.Backend.Models.DTO;
using VTZProject.Backend.Models.Filters;

namespace VTZProject.Backend.Models.Extensions
{
    public static class IEnumerableExtensions
    {
        public static IEnumerable<TaskVTZDto> ApplyFilter(this IEnumerable<TaskVTZDto> tasks, TaskVTZFilter filter)
        {
            foreach (var task in tasks)
            {
                bool matchesFilter = true;

                // Фильтрация по имени задачи
                if (!string.IsNullOrEmpty(filter.TaskName) && !task.TaskName.Contains(filter.TaskName))
                {
                    matchesFilter = false;
                }

                // Фильтрация по именам практик (PracticeShortName)
                if (filter.PracticeShortNames?.Any() == true)
                {
                    bool practiceMatch = filter.PracticeShortNamesOr
                        ? task.Practices.Any(pt => filter.PracticeShortNames
                            .Any(shortName => pt.PracticeShortName.Contains(shortName))) // "или"
                        : filter.PracticeShortNames.All(shortName => task.Practices
                            .Any(pt => pt.PracticeShortName.Contains(shortName))); // "и"

                    if (!practiceMatch)
                    {
                        matchesFilter = false;
                    }
                }

                // Фильтрация по именам секций (SectionShortName)
                if (filter.SectionShortNames?.Any() == true)
                {
                    bool sectionMatch = filter.SectionShortNamesOr
                        ? task.Sections.Any(st => filter.SectionShortNames
                            .Any(shortName => st.SectionShortName.Contains(shortName))) // "или"
                        : filter.SectionShortNames.All(shortName => task.Sections
                            .Any(st => st.SectionShortName.Contains(shortName))); // "и"

                    if (!sectionMatch)
                    {
                        matchesFilter = false;
                    }
                }

                // Фильтрация по типам секций (SectionTypeShortName)
                if (filter.SectionTypes?.Any() == true)
                {
                    bool sectionTypeMatch = filter.SectionTypesOr
                        ? task.Sections.Any(st => filter.SectionTypes
                            .Any(type => st.SectionTypeName.Contains(type))) // "или"
                        : filter.SectionTypes.All(type => task.Sections
                            .Any(st => st.SectionTypeName.Contains(type))); // "и"

                    if (!sectionTypeMatch)
                    {
                        matchesFilter = false;
                    }
                }

                // Устанавливаем флаг IsVisible в зависимости от того, прошла ли задача фильтрацию
                task.IsVisible = matchesFilter;
            }

            return tasks;
        }
    }
}
