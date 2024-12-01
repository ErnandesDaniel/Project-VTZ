namespace VTZProject.Backend.Models.Filters
{
    public record BaseFilter(
        string Field,          // Поле для фильтрации (например, "TaskName")
        string Operator,       // Оператор фильтра (например, "contains", "equals")
        string Value,          // Значение для фильтрации
        string LogicOperator,  // Логический оператор ("AND", "OR")
        BaseFilter[] Subfilters);  // Вложенные фильтры (если есть)

    public record TaskVTZFilter(
        string? TaskName,                   // Фильтр по имени задачи
        string[]? PracticeShortNames,       // Фильтр по названиям практик
        bool PracticeShortNamesOr,         // Логика "или" или "и" для практик
        string[]? SectionShortNames,       // Фильтр по названиям секций
        bool SectionShortNamesOr,          // Логика "или" или "и" для секций
        string[]? SectionTypes,            // Фильтр по типу секции
        bool SectionTypesOr);              // Логика "или" или "и" для типов секций
}
