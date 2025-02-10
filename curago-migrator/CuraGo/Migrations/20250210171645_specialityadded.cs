using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CuraGo.Migrations
{
    /// <inheritdoc />
    public partial class specialityadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PrimarySpecialityId",
                table: "Staffs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SecondarySpecialityId",
                table: "Staffs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Staffs_PrimarySpecialityId",
                table: "Staffs",
                column: "PrimarySpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_Staffs_SecondarySpecialityId",
                table: "Staffs",
                column: "SecondarySpecialityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Staffs_Specialities_PrimarySpecialityId",
                table: "Staffs",
                column: "PrimarySpecialityId",
                principalTable: "Specialities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Staffs_Specialities_SecondarySpecialityId",
                table: "Staffs",
                column: "SecondarySpecialityId",
                principalTable: "Specialities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Staffs_Specialities_PrimarySpecialityId",
                table: "Staffs");

            migrationBuilder.DropForeignKey(
                name: "FK_Staffs_Specialities_SecondarySpecialityId",
                table: "Staffs");

            migrationBuilder.DropIndex(
                name: "IX_Staffs_PrimarySpecialityId",
                table: "Staffs");

            migrationBuilder.DropIndex(
                name: "IX_Staffs_SecondarySpecialityId",
                table: "Staffs");

            migrationBuilder.DropColumn(
                name: "PrimarySpecialityId",
                table: "Staffs");

            migrationBuilder.DropColumn(
                name: "SecondarySpecialityId",
                table: "Staffs");
        }
    }
}
