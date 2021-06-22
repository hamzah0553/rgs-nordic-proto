using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class CellCaseIdNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SiteGridCells_Cases_CaseId",
                table: "SiteGridCells");

            migrationBuilder.AlterColumn<Guid>(
                name: "CaseId",
                table: "SiteGridCells",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_SiteGridCells_Cases_CaseId",
                table: "SiteGridCells",
                column: "CaseId",
                principalTable: "Cases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SiteGridCells_Cases_CaseId",
                table: "SiteGridCells");

            migrationBuilder.AlterColumn<Guid>(
                name: "CaseId",
                table: "SiteGridCells",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SiteGridCells_Cases_CaseId",
                table: "SiteGridCells",
                column: "CaseId",
                principalTable: "Cases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
