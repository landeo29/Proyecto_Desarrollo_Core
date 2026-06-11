-- INSERTAR
INSERT INTO MovimientoCab (Fec_registro, Id_TipoMovimiento, Id_DocumentoOrigen)
VALUES (GETDATE(), 1, 1);

INSERT INTO MovimientoDet (Id_movimientocab, Id_Producto, Cantidad)
VALUES (1, 1, 10);

-- LISTAR
SELECT m.Id_MovimientoCab, m.Fec_registro, m.Id_TipoMovimiento,
       d.Id_Producto, d.Cantidad
FROM MovimientoCab m
         INNER JOIN MovimientoDet d ON m.Id_MovimientoCab = d.Id_movimientocab;

-- CONSULTAR
SELECT
    SUM(CASE WHEN m.Id_TipoMovimiento = 1 THEN d.Cantidad ELSE 0 END) -
    SUM(CASE WHEN m.Id_TipoMovimiento = 2 THEN d.Cantidad ELSE 0 END) AS StockActual
FROM MovimientoDet d
         INNER JOIN MovimientoCab m ON d.Id_movimientocab = m.Id_MovimientoCab
WHERE d.Id_Producto = 1;

-- ELIMINAR
DELETE FROM MovimientoDet WHERE Id_movimientocab = 1;
DELETE FROM MovimientoCab WHERE Id_MovimientoCab = 1;