using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CuraGo.Migrations
{
    /// <inheritdoc />
    public partial class newfieldsadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Experience",
                table: "Staffs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Fee",
                table: "Staffs",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Staffs",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Experience",
                table: "Staffs");

            migrationBuilder.DropColumn(
                name: "Fee",
                table: "Staffs");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Staffs");
        }
    }
}
