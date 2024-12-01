using Microsoft.EntityFrameworkCore;
using VTZProject.Backend.Models;

namespace VTZProject.Backend.BD
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            //Database.EnsureCreated();
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskVTZ>().Property(t => t.IsDeleted).HasDefaultValue(false);

            // Настройка отношения TaskRelation -> TaskVTZ
            modelBuilder.Entity<TaskRelation>()
                .HasOne(tr => tr.SuccessorTask)
                .WithMany(t => t.PredecessorRelations)
                .HasForeignKey(tr => tr.SuccessorTaskId)
                .OnDelete(DeleteBehavior.Restrict); // Избегаем каскадного удаления

            modelBuilder.Entity<TaskRelation>()
                .HasOne(tr => tr.PredecessorTask)
                .WithMany(t => t.SuccessorRelations)
                .HasForeignKey(tr => tr.PredecessorTaskId)
                .OnDelete(DeleteBehavior.Restrict); // Избегаем каскадного удаления

            // Настройка отношения TaskRelation -> Gateways
            modelBuilder.Entity<TaskRelation>()
                .HasOne(tr => tr.Gateway)
                .WithMany(g => g.TaskRelations)
                .HasForeignKey(tr => tr.GatewayId);
        }

        public DbSet<Practice> Practices { get; set; }
        public DbSet<TaskVTZ> TasksVTZ { get; set; }
        public DbSet<PracticeToTask> PracticeToTasks { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<SectionToTask> SectionsToTask { get; set; }
        public DbSet<TaskRelation> TaskRelations { get; set; }
        public DbSet<Gateways> Gateways { get; set; }
        public DbSet<SectionsType> SectionsTypes { get; set; }
        public DbSet<Groups> Groups { get; set; }
        public DbSet<TaskToGroup> TaskToGroups { get; set; }
        public DbSet<Admins> Admins { get; set; }
        public DbSet<Operations> Operations { get; set; }
        public DbSet<History> History { get; set; }
        public DbSet<GroupsOfMatching> GroupsOfMatching { get; set; }
        public DbSet<TaskToGroupOfMatching> TaskToGroupsOfMatching { get; set; }
    }
}
