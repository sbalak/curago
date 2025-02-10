using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CuraGo.Migrations
{
    /// <inheritdoc />
    public partial class removestaffspecialityandsymptoms : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StaffSpecialities");

            migrationBuilder.DropTable(
                name: "StaffSymptoms");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StaffSpecialities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpecialityId = table.Column<int>(type: "int", nullable: false),
                    StaffId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffSpecialities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StaffSpecialities_Specialities_SpecialityId",
                        column: x => x.SpecialityId,
                        principalTable: "Specialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StaffSpecialities_Staffs_StaffId",
                        column: x => x.StaffId,
                        principalTable: "Staffs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StaffSymptoms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StaffId = table.Column<int>(type: "int", nullable: false),
                    SymptomId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffSymptoms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StaffSymptoms_Staffs_StaffId",
                        column: x => x.StaffId,
                        principalTable: "Staffs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StaffSymptoms_Symptoms_SymptomId",
                        column: x => x.SymptomId,
                        principalTable: "Symptoms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StaffSpecialities_SpecialityId",
                table: "StaffSpecialities",
                column: "SpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffSpecialities_StaffId",
                table: "StaffSpecialities",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffSymptoms_StaffId",
                table: "StaffSymptoms",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffSymptoms_SymptomId",
                table: "StaffSymptoms",
                column: "SymptomId");
        }
    }
}
