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
    WHERE [MigrationId] = N'20260610001903_InitialCreate'
)
BEGIN
    CREATE TABLE [CompraCab] (
        [Id_CompraCab] int NOT NULL IDENTITY,
        [FecRegistro] datetime2 NOT NULL,
        [SubTotal] decimal(18,2) NOT NULL,
        [Igv] decimal(18,2) NOT NULL,
        [Total] decimal(18,2) NOT NULL,
        CONSTRAINT [PK_CompraCab] PRIMARY KEY ([Id_CompraCab])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260610001903_InitialCreate'
)
BEGIN
    CREATE TABLE [CompraDet] (
        [Id_CompraDet] int NOT NULL IDENTITY,
        [Id_CompraCab] int NOT NULL,
        [Id_producto] int NOT NULL,
        [Cantidad] int NOT NULL,
        [Precio] decimal(18,2) NOT NULL,
        [Sub_Total] decimal(18,2) NOT NULL,
        [Igv] decimal(18,2) NOT NULL,
        [Total] decimal(18,2) NOT NULL,
        CONSTRAINT [PK_CompraDet] PRIMARY KEY ([Id_CompraDet]),
        CONSTRAINT [FK_CompraDet_CompraCab_Id_CompraCab] FOREIGN KEY ([Id_CompraCab]) REFERENCES [CompraCab] ([Id_CompraCab]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260610001903_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_CompraDet_Id_CompraCab] ON [CompraDet] ([Id_CompraCab]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260610001903_InitialCreate'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260610001903_InitialCreate', N'8.0.11');
END;
GO

COMMIT;
GO

