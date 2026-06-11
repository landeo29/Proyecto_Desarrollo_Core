-- INSERTAR
INSERT INTO VentaCab (fecRegistro, SubTotal, Igv, Total)
VALUES (GETDATE(), 2025.00, 364.50, 2389.50);

INSERT INTO VentaDet (Id_VentaCab, Id_producto, Cantidad, Precio, Sub_Total, Igv, Total)
VALUES (1, 1, 1, 2025.00, 2025.00, 364.50, 2389.50);

-- LISTAR
SELECT v.Id_VentaCab, v.fecRegistro, v.Total,
       d.Id_producto, d.Cantidad, d.Precio
FROM VentaCab v
         INNER JOIN VentaDet d ON v.Id_VentaCab = d.Id_VentaCab;

-- ACTUALIZAR
UPDATE VentaCab SET Total = 2400.00 WHERE Id_VentaCab = 1;

-- ELIMINAR
DELETE FROM VentaDet WHERE Id_VentaCab = 1;
DELETE FROM VentaCab WHERE Id_VentaCab = 1;