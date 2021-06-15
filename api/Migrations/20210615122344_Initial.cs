using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cases",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CaseId = table.Column<string>(nullable: true),
                    AmountOfWaste = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cases", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sites",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    ColCount = table.Column<int>(nullable: false),
                    RowCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sites", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiteGridCells",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    SiteId = table.Column<Guid>(nullable: false),
                    Col = table.Column<int>(nullable: false),
                    Row = table.Column<int>(nullable: false),
                    CaseId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteGridCells", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SiteGridCells_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SiteGridCells_Sites_SiteId",
                        column: x => x.SiteId,
                        principalTable: "Sites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SiteGridCells_CaseId",
                table: "SiteGridCells",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteGridCells_SiteId",
                table: "SiteGridCells",
                column: "SiteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SiteGridCells");

            migrationBuilder.DropTable(
                name: "Cases");

            migrationBuilder.DropTable(
                name: "Sites");
        }
    }
}
