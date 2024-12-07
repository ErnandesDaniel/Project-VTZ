using AutoMapper;

namespace VTZProject.Backend.Models.DTO
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Основной маппинг TaskVTZ -> TaskVTZDto и обратно
            CreateMap<TaskVTZ, TaskVTZDto>()
                .ForMember(dest => dest.PredecessorRelations, opt => opt.MapFrom(src => src.PredecessorRelations.Select(r => r.PredecessorTaskId)))
                .ForMember(dest => dest.SuccessorRelations, opt => opt.MapFrom(src => src.SuccessorRelations.Select(r => r.SuccessorTaskId)))
                .ForMember(dest => dest.GroupIds, opt => opt.MapFrom(src => src.TaskToGroups.Select(g => g.GroupId)))
                .ForMember(dest => dest.MatchingGroupIds, opt => opt.MapFrom(src => src.TaskToGroupOfMatchings.Select(g => g.GroupOfMatchingId)))
                .ForMember(dest => dest.Sections, opt => opt.MapFrom(src => src.Sections))
                .ForMember(dest => dest.Practices, opt => opt.MapFrom(src => src.Practices));

            CreateMap<TaskVTZDto, TaskVTZ>()
                .ForMember(dest => dest.SuccessorRelations, opt => opt.MapFrom(src =>
                    src.PredecessorRelations.Select(id => new TaskRelation { PredecessorTaskId = id, SuccessorTaskId = src.Id })))
                .ForMember(dest => dest.PredecessorRelations, opt => opt.MapFrom(src =>
                    src.SuccessorRelations.Select(id => new TaskRelation { SuccessorTaskId = id, PredecessorTaskId = src.Id })))
                .ForMember(dest => dest.Practices, opt => opt.MapFrom(src =>
                    src.Practices.Select(dto => new PracticeToTask
                    {
                        PracticeId = dto.Id,
                        Practice = new Practice
                        {
                            Id = dto.Id,
                            PracticeFullName = dto.PracticeFullName,
                            PracticeShortName = dto.PracticeShortName
                        }
                    })))
                .ForMember(dest => dest.Sections, opt => opt.MapFrom(src =>
                    src.Sections.Select(dto => new SectionToTask
                    {
                        SectionId = dto.Id,
                        Section = new Section
                        {
                            Id = dto.Id,
                            SectionName = dto.SectionName,
                            SectionShortName = dto.SectionShortName,
                            SectionTypeId = dto.SectionTypeId,
                            SectionType = new SectionsType
                            {
                                Id = dto.SectionTypeId,
                                SectionTypeShortName = dto.SectionTypeName
                            }
                        }
                    })));

            // Маппинг SectionToTask <-> SectionDto
            CreateMap<SectionToTask, SectionDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Section.Id))
                .ForMember(dest => dest.SectionShortName, opt => opt.MapFrom(src => src.Section.SectionShortName))
                .ForMember(dest => dest.SectionName, opt => opt.MapFrom(src => src.Section.SectionName))
                .ForMember(dest => dest.SectionTypeId, opt => opt.MapFrom(src => src.Section.SectionTypeId))
                .ForMember(dest => dest.SectionTypeName, opt => opt.MapFrom(src => src.Section.SectionType.SectionTypeShortName));

            // Маппинг PracticeToTask <-> PracticeDto
            CreateMap<PracticeToTask, PracticeDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Practice.Id))
                .ForMember(dest => dest.PracticeShortName, opt => opt.MapFrom(src => src.Practice.PracticeShortName))
                .ForMember(dest => dest.PracticeFullName, opt => opt.MapFrom(src => src.Practice.PracticeFullName));

            CreateMap<PracticeDto, PracticeToTask>()
                .ForMember(dest => dest.PracticeId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Practice, opt => opt.Ignore());

            // Маппинг SectionsType
            CreateMap<SectionsType, SectionDto>()
                .ForMember(dest => dest.SectionTypeId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.SectionTypeName, opt => opt.MapFrom(src => src.SectionTypeShortName));

            CreateMap<TaskRelation, TaskRelationDto>();

            CreateMap<Gateways, GatewayDto>()
                .ForMember(dest => dest.PredecessorIds, opt => opt.MapFrom(src => src.TaskRelations.Select(r => r.PredecessorTaskId).Distinct()))
                .ForMember(dest => dest.SuccessorIds, opt => opt.MapFrom(src => src.TaskRelations.Select(r => r.SuccessorTaskId).Distinct()));
        }
    }
}
