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
    WHERE [MigrationId] = N'20260609233858_InitialCreate'
)
BEGIN
    CREATE TABLE [MovimientoCab] (
        [Id_MovimientoCab] int NOT NULL IDENTITY,
        [Fec_registro] datetime2 NOT NULL,
        [Id_TipoMovimiento] int NOT NULL,
        [Id_DocumentoOrigen] int NOT NULL,
        CONSTRAINT [PK_MovimientoCab] PRIMARY KEY ([Id_MovimientoCab])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260609233858_InitialCreate'
)
BEGIN
    CREATE TABLE [MovimientoDet] (
        [Id_MovimientoDet] int NOT NULL IDENTITY,
        [Id_movimientocab] int NOT NULL,
        [Id_Producto] int NOT NULL,
        [Cantidad] int NOT NULL,
        CONSTRAINT [PK_MovimientoDet] PRIMARY KEY ([Id_MovimientoDet]),
        CONSTRAINT [FK_MovimientoDet_MovimientoCab_Id_movimientocab] FOREIGN KEY ([Id_movimientocab]) REFERENCES [MovimientoCab] ([Id_MovimientoCab]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260609233858_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_MovimientoDet_Id_movimientocab] ON [MovimientoDet] ([Id_movimientocab]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260609233858_InitialCreate'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260609233858_InitialCreate', N'8.0.11');
END;
GO

COMMIT;
GO

