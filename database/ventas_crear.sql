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
    WHERE [MigrationId] = N'20260610214600_InitialCreate'
)
BEGIN
    CREATE TABLE [VentaCab] (
        [Id_VentaCab] int NOT NULL IDENTITY,
        [fecRegistro] datetime2 NOT NULL,
        [SubTotal] decimal(18,2) NOT NULL,
        [Igv] decimal(18,2) NOT NULL,
        [Total] decimal(18,2) NOT NULL,
        CONSTRAINT [PK_VentaCab] PRIMARY KEY ([Id_VentaCab])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260610214600_InitialCreate'
)
BEGIN
    CREATE TABLE [VentaDet] (
        [Id_VentaDet] int NOT NULL IDENTITY,
        [Id_VentaCab] int NOT NULL,
        [Id_producto] int NOT NULL,
        [Cantidad] int NOT NULL,
        [Precio] decimal(18,2) NOT NULL,
        [Sub_Total] decimal(18,2) NOT NULL,
        [Igv] decimal(18,2) NOT NULL,
        [Total] decimal(18,2) NOT NULL,
        CONSTRAINT [PK_VentaDet] PRIMARY KEY ([Id_VentaDet]),
        CONSTRAINT [FK_VentaDet_VentaCab_Id_VentaCab] FOREIGN KEY ([Id_VentaCab]) REFERENCES [VentaCab] ([Id_VentaCab]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260610214600_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_VentaDet_Id_VentaCab] ON [VentaDet] ([Id_VentaCab]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260610214600_InitialCreate'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260610214600_InitialCreate', N'8.0.11');
END;
GO

COMMIT;
GO

