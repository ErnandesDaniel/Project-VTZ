using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VTZProject.Backend.Migrations
{
    /// <inheritdoc />
    public partial class GatewayIdCanBeNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskRelations_Gateways_GatewayId",
                table: "TaskRelations");

            migrationBuilder.AlterColumn<Guid>(
                name: "GatewayId",
                table: "TaskRelations",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskRelations_Gateways_GatewayId",
                table: "TaskRelations",
                column: "GatewayId",
                principalTable: "Gateways",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskRelations_Gateways_GatewayId",
                table: "TaskRelations");

            migrationBuilder.AlterColumn<Guid>(
                name: "GatewayId",
                table: "TaskRelations",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskRelations_Gateways_GatewayId",
                table: "TaskRelations",
                column: "GatewayId",
                principalTable: "Gateways",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
