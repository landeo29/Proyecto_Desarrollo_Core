IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260609215101_InitialCreate'
)
BEGIN
    CREATE TABLE [Producto] (
        [Id_producto] int NOT NULL IDENTITY,
        [Nombre_producto] nvarchar(150) NOT NULL,
        [NroLote] nvarchar(50) NULL,
        [Fec_registro] datetime2 NOT NULL,
        [Costo] decimal(18,2) NOT NULL,
        [PrecioVenta] decimal(18,2) NOT NULL,
        CONSTRAINT [PK_Producto] PRIMARY KEY ([Id_producto])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260609215101_InitialCreate'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260609215101_InitialCreate', N'8.0.11');
END;
GO

COMMIT;
GO

