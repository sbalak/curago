using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CuraGo.Migrations
{
    /// <inheritdoc />
    public partial class correspondingroleforspecialityadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CorrespondingRole",
                table: "Specialities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CorrespondingRole",
                table: "Specialities");
        }
    }
}
