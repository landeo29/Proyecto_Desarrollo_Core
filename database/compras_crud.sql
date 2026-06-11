-- INSERTAR
INSERT INTO CompraCab (FecRegistro, SubTotal, Igv, Total)
VALUES (GETDATE(), 1000.00, 180.00, 1180.00);

INSERT INTO CompraDet (Id_CompraCab, Id_producto, Cantidad, Precio, Sub_Total, Igv, Total)
VALUES (1, 1, 10, 100.00, 1000.00, 180.00, 1180.00);

-- LISTAR
SELECT c.Id_CompraCab, c.FecRegistro, c.Total,
       d.Id_producto, d.Cantidad, d.Precio
FROM CompraCab c
         INNER JOIN CompraDet d ON c.Id_CompraCab = d.Id_CompraCab;

-- ACTUALIZAR
UPDATE CompraCab SET Total = 1200.00 WHERE Id_CompraCab = 1;

-- ELIMINAR
DELETE FROM CompraDet WHERE Id_CompraCab = 1;
DELETE FROM CompraCab WHERE Id_CompraCab = 1;