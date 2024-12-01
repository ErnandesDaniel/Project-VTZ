using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VTZProject.Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Login = table.Column<string>(type: "text", nullable: false),
                    HashPassword = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Gateways",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gateways", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GroupsOfMatching",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupsOfMatching", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Practices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PracticeShortName = table.Column<string>(type: "text", nullable: false),
                    PracticeFullName = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Practices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SectionsTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SectionTypeShortName = table.Column<string>(type: "text", nullable: false),
                    SectionTypeFullName = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SectionsTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TasksVTZ",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TaskNumber = table.Column<int>(type: "integer", nullable: false),
                    TaskName = table.Column<string>(type: "text", nullable: false),
                    IsOnStagePD = table.Column<bool>(type: "boolean", nullable: false),
                    IsOnStageRD = table.Column<bool>(type: "boolean", nullable: false),
                    IsOnStageVAB1 = table.Column<bool>(type: "boolean", nullable: false),
                    IsOnStageAnalysis = table.Column<bool>(type: "boolean", nullable: false),
                    IsAllSections = table.Column<bool>(type: "boolean", nullable: false),
                    RequiresClarification = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TasksVTZ", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Operations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AdminId = table.Column<Guid>(type: "uuid", nullable: false),
                    DateOfOperation = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Operations_Admins_AdminId",
                        column: x => x.AdminId,
                        principalTable: "Admins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SectionShortName = table.Column<string>(type: "text", nullable: false),
                    SectionName = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    SectionTypeId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sections_SectionsTypes_SectionTypeId",
                        column: x => x.SectionTypeId,
                        principalTable: "SectionsTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PracticeToTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PracticeId = table.Column<Guid>(type: "uuid", nullable: false),
                    TaskId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PracticeToTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PracticeToTasks_Practices_PracticeId",
                        column: x => x.PracticeId,
                        principalTable: "Practices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PracticeToTasks_TasksVTZ_TaskId",
                        column: x => x.TaskId,
                        principalTable: "TasksVTZ",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskRelations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SuccessorTaskId = table.Column<Guid>(type: "uuid", nullable: false),
                    PredecessorTaskId = table.Column<Guid>(type: "uuid", nullable: false),
                    GatewayId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskRelations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskRelations_Gateways_GatewayId",
                        column: x => x.GatewayId,
                        principalTable: "Gateways",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskRelations_TasksVTZ_PredecessorTaskId",
                        column: x => x.PredecessorTaskId,
                        principalTable: "TasksVTZ",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskRelations_TasksVTZ_SuccessorTaskId",
                        column: x => x.SuccessorTaskId,
                        principalTable: "TasksVTZ",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TaskToGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TaskId = table.Column<Guid>(type: "uuid", nullable: false),
                    GroupId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskToGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskToGroups_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskToGroups_TasksVTZ_TaskId",
                        column: x => x.TaskId,
                        principalTable: "TasksVTZ",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskToGroupsOfMatching",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TaskId = table.Column<Guid>(type: "uuid", nullable: false),
                    GroupOfMatchingId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskToGroupsOfMatching", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskToGroupsOfMatching_GroupsOfMatching_GroupOfMatchingId",
                        column: x => x.GroupOfMatchingId,
                        principalTable: "GroupsOfMatching",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskToGroupsOfMatching_TasksVTZ_TaskId",
                        column: x => x.TaskId,
                        principalTable: "TasksVTZ",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "History",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    OperationId = table.Column<Guid>(type: "uuid", nullable: false),
                    TableName = table.Column<string>(type: "text", nullable: false),
                    EntityId = table.Column<Guid>(type: "uuid", nullable: false),
                    Field = table.Column<string>(type: "text", nullable: false),
                    OldValue = table.Column<string>(type: "text", nullable: false),
                    NewValue = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_History", x => x.Id);
                    table.ForeignKey(
                        name: "FK_History_Operations_OperationId",
                        column: x => x.OperationId,
                        principalTable: "Operations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SectionsToTask",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SectionId = table.Column<Guid>(type: "uuid", nullable: false),
                    TaskId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SectionsToTask", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SectionsToTask_Sections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Sections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SectionsToTask_TasksVTZ_TaskId",
                        column: x => x.TaskId,
                        principalTable: "TasksVTZ",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_History_OperationId",
                table: "History",
                column: "OperationId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_AdminId",
                table: "Operations",
                column: "AdminId");

            migrationBuilder.CreateIndex(
                name: "IX_PracticeToTasks_PracticeId",
                table: "PracticeToTasks",
                column: "PracticeId");

            migrationBuilder.CreateIndex(
                name: "IX_PracticeToTasks_TaskId",
                table: "PracticeToTasks",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_SectionTypeId",
                table: "Sections",
                column: "SectionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_SectionsToTask_SectionId",
                table: "SectionsToTask",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_SectionsToTask_TaskId",
                table: "SectionsToTask",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskRelations_GatewayId",
                table: "TaskRelations",
                column: "GatewayId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskRelations_PredecessorTaskId",
                table: "TaskRelations",
                column: "PredecessorTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskRelations_SuccessorTaskId",
                table: "TaskRelations",
                column: "SuccessorTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskToGroups_GroupId",
                table: "TaskToGroups",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskToGroups_TaskId",
                table: "TaskToGroups",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskToGroupsOfMatching_GroupOfMatchingId",
                table: "TaskToGroupsOfMatching",
                column: "GroupOfMatchingId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskToGroupsOfMatching_TaskId",
                table: "TaskToGroupsOfMatching",
                column: "TaskId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "History");

            migrationBuilder.DropTable(
                name: "PracticeToTasks");

            migrationBuilder.DropTable(
                name: "SectionsToTask");

            migrationBuilder.DropTable(
                name: "TaskRelations");

            migrationBuilder.DropTable(
                name: "TaskToGroups");

            migrationBuilder.DropTable(
                name: "TaskToGroupsOfMatching");

            migrationBuilder.DropTable(
                name: "Operations");

            migrationBuilder.DropTable(
                name: "Practices");

            migrationBuilder.DropTable(
                name: "Sections");

            migrationBuilder.DropTable(
                name: "Gateways");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "GroupsOfMatching");

            migrationBuilder.DropTable(
                name: "TasksVTZ");

            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "SectionsTypes");
        }
    }
}
