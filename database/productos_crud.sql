-- INSERTAR
INSERT INTO Producto (Nombre_producto, NroLote, Fec_registro, Costo, PrecioVenta)
VALUES ('Laptop Lenovo ThinkPad', 'LOTE-001', GETDATE(), 2500.00, 3375.00);

-- LISTAR
SELECT Id_producto, Nombre_producto, NroLote, Fec_registro, Costo, PrecioVenta
FROM Producto;

-- ACTUALIZAR
UPDATE Producto
SET Nombre_producto = 'Laptop Lenovo X1',
    Costo = 2600.00,
    PrecioVenta = 3510.00
WHERE Id_producto = 1;

-- ELIMINAR
DELETE FROM Producto WHERE Id_producto = 1;