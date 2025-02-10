using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CuraGo.Migrations
{
    /// <inheritdoc />
    public partial class addimage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Symptoms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Specialities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Symptoms");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Specialities");
        }
    }
}
