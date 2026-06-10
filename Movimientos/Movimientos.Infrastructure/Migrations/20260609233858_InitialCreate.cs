using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Movimientos.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MovimientoCab",
                columns: table => new
                {
                    Id_MovimientoCab = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fec_registro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Id_TipoMovimiento = table.Column<int>(type: "int", nullable: false),
                    Id_DocumentoOrigen = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovimientoCab", x => x.Id_MovimientoCab);
                });

            migrationBuilder.CreateTable(
                name: "MovimientoDet",
                columns: table => new
                {
                    Id_MovimientoDet = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_movimientocab = table.Column<int>(type: "int", nullable: false),
                    Id_Producto = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovimientoDet", x => x.Id_MovimientoDet);
                    table.ForeignKey(
                        name: "FK_MovimientoDet_MovimientoCab_Id_movimientocab",
                        column: x => x.Id_movimientocab,
                        principalTable: "MovimientoCab",
                        principalColumn: "Id_MovimientoCab",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MovimientoDet_Id_movimientocab",
                table: "MovimientoDet",
                column: "Id_movimientocab");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MovimientoDet");

            migrationBuilder.DropTable(
                name: "MovimientoCab");
        }
    }
}
