using Microsoft.EntityFrameworkCore;
using VTZProject.Backend.Models;
using VTZProject.Backend.Models.Filters;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using VTZProject.Backend.BD;

namespace VTZProject.Backend.Services
{
    public class TaskVTZFilterService
    {
        private readonly ApplicationContext _context;

        public TaskVTZFilterService(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskVTZ>> GetFilteredTasks(TaskVTZFilter filter)
        {
            IQueryable<TaskVTZ> query = _context.TasksVTZ
                .Include(t => t.Practices)
                    .ThenInclude(pt => pt.Practice)
                .Include(t => t.Sections)
                    .ThenInclude(st => st.Section)
                        .ThenInclude(sec => sec.SectionType);

            // Извлекаем все задачи без применения фильтра
            var tasks = await query.ToListAsync();

            // Применяем фильтрацию, если указаны фильтры
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
                            .Any(shortName => pt.Practice.PracticeShortName.Contains(shortName))) // "или"
                        : filter.PracticeShortNames.All(shortName => task.Practices
                            .Any(pt => pt.Practice.PracticeShortName.Contains(shortName))); // "и"

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
                            .Any(shortName => st.Section.SectionShortName.Contains(shortName))) // "или"
                        : filter.SectionShortNames.All(shortName => task.Sections
                            .Any(st => st.Section.SectionShortName.Contains(shortName))); // "и"

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
                            .Any(type => st.Section.SectionType.SectionTypeShortName.Contains(type))) // "или"
                        : filter.SectionTypes.All(type => task.Sections
                            .Any(st => st.Section.SectionType.SectionTypeShortName.Contains(type))); // "и"

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
